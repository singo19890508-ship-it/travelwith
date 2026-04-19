import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { AGENTS, AGENT_MAP, getOrchestratorPrompt } from "@/lib/agents";
import {
  getRelevantMemories,
  formatMemoriesForPrompt,
  saveMemory,
} from "@/lib/agent-memory";

function getProjectBrief(): string {
  try {
    const briefPath = join(process.cwd(), "src/data/project_brief.md");
    return readFileSync(briefPath, "utf-8");
  } catch {
    return "";
  }
}

const MODEL = "claude-sonnet-4-6";

function getClient() {
  // APP_ANTHROPIC_KEY を優先（ANTHROPIC_API_KEY はClaude Code環境が上書きするため）
  const apiKey = process.env.APP_ANTHROPIC_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("APP_ANTHROPIC_KEY not set in .env.local");
  return new Anthropic({ apiKey, baseURL: "https://api.anthropic.com" });
}

export interface ChatMessage {
  agentId: string;
  agentName: string;
  role: string;
  content: string;
}

async function callAgent(
  agentId: string,
  userMessage: string,
  history: ChatMessage[],
  projectContext?: string,
  memoryContext?: string,
): Promise<string> {
  const agent = AGENT_MAP[agentId];
  if (!agent) return "";

  const contextMessages = history
    .map((m) => `${m.agentName}（${m.role}）：${m.content}`)
    .join("\n");

  const memoryNote = memoryContext ? `\n${memoryContext}\n` : "";

  const userContent =
    history.length > 0
      ? `${memoryNote}会議のテーマ：「${userMessage}」\n\nここまでの発言：\n${contextMessages}\n\nあなたの意見を述べてください。`
      : `${memoryNote}議題：「${userMessage}」\n\nあなたの意見を述べてください。`;

  const systemPrompt = projectContext
    ? `${projectContext}\n\n${agent.systemPrompt}`
    : agent.systemPrompt;

  const response = await getClient().messages.create({
    model: MODEL,
    max_tokens: 900,
    system: systemPrompt,
    messages: [{ role: "user", content: userContent }],
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}

// タスクモード：オーケストレーター→選ばれた社員が順番に発言
async function runTaskMode(userMessage: string): Promise<ChatMessage[]> {
  const messages: ChatMessage[] = [];

  // プロジェクト共有情報を取得
  const projectBrief = getProjectBrief();
  const projectContext = projectBrief
    ? `## 📋 プロジェクト共有情報（常時参照）\n${projectBrief}`
    : "";

  // 過去の記憶を取得
  const memories = getRelevantMemories(userMessage, 5);
  const memoryContext = formatMemoriesForPrompt(memories);

  // Step1: 篠原が誰を呼ぶか判断
  const agentList = AGENTS.map((a) => `${a.id}: ${a.name}（${a.role}）`).join(
    "\n",
  );
  const orchResponse = await getClient().messages.create({
    model: MODEL,
    max_tokens: 200,
    system: projectContext || undefined,
    messages: [
      {
        role: "user",
        content: getOrchestratorPrompt(userMessage, agentList, memoryContext),
      },
    ],
  });

  let selectedAgents: string[] = [];
  let briefing = "";

  try {
    const text =
      orchResponse.content[0].type === "text"
        ? orchResponse.content[0].text
        : "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      selectedAgents = parsed.selectedAgents || [];
      briefing = parsed.briefing || "";
    }
  } catch {
    selectedAgents = ["tachibana", "morita"];
    briefing = "状況を整理して関係者に確認します。";
  }

  // 篠原のブリーフィングを追加
  if (briefing) {
    messages.push({
      agentId: "shinohara",
      agentName: "琥珀",
      role: "参謀",
      content: briefing,
    });
  }

  // Step2: 選ばれた社員が順番に発言
  for (const agentId of selectedAgents.slice(0, 4)) {
    const agent = AGENT_MAP[agentId];
    if (!agent) continue;
    const content = await callAgent(
      agentId,
      userMessage,
      messages,
      projectContext,
      memoryContext,
    );
    if (content) {
      messages.push({
        agentId,
        agentName: agent.name,
        role: agent.role,
        content,
      });
    }
  }

  // 会話をメモリに保存
  const summary = messages
    .map((m) => `${m.agentName}：${m.content.slice(0, 50)}...`)
    .join(" / ");
  const participants = messages.map((m) => m.agentId);
  saveMemory(userMessage, summary, [], participants);

  return messages;
}

// 会議モード：指定された社員たちが自律的に議論
async function runMeetingMode(
  topic: string,
  agentIds: string[],
  rounds: number = 2,
): Promise<ChatMessage[]> {
  const messages: ChatMessage[] = [];

  // プロジェクト共有情報を取得
  const projectBrief = getProjectBrief();
  const projectContext = projectBrief
    ? `## 📋 プロジェクト共有情報（常時参照）\n${projectBrief}`
    : "";

  // 過去の記憶を取得
  const memories = getRelevantMemories(topic, 5);
  const memoryContext = formatMemoriesForPrompt(memories);

  // 篠原が議題を設定（記憶を含む）
  const shinohara = AGENT_MAP["shinohara"];
  const openingPrompt = memoryContext
    ? `議題：「${topic}」${memoryContext}\n\n議題を設定し、会議の方向性を示してください。`
    : `議題：「${topic}」\n\nあなたの意見を述べてください。`;

  const openingSystemPrompt = projectContext
    ? `${projectContext}\n\n${shinohara.systemPrompt}`
    : shinohara.systemPrompt;

  const openingResponse = await getClient().messages.create({
    model: MODEL,
    max_tokens: 900,
    system: openingSystemPrompt,
    messages: [{ role: "user", content: openingPrompt }],
  });
  const openingContent =
    openingResponse.content[0].type === "text"
      ? openingResponse.content[0].text
      : "";

  messages.push({
    agentId: "shinohara",
    agentName: shinohara.name,
    role: shinohara.role,
    content: openingContent,
  });

  // 各メンバーがroundsラウンド発言
  for (let round = 0; round < rounds; round++) {
    for (const agentId of agentIds) {
      if (agentId === "shinohara") continue;
      const agent = AGENT_MAP[agentId];
      if (!agent) continue;
      const content = await callAgent(
        agentId,
        topic,
        messages,
        projectContext,
        memoryContext,
      );
      if (content) {
        messages.push({
          agentId,
          agentName: agent.name,
          role: agent.role,
          content,
        });
      }
    }
  }

  // 篠原がまとめ（決定事項を抽出）
  const summarySystemPrompt = projectContext
    ? `${projectContext}\n\n${shinohara.systemPrompt}\n\n議論をまとめる際は、必ず「決定事項：」として重要な決定を箇条書きで示すこと。`
    : shinohara.systemPrompt +
      "\n\n議論をまとめる際は、必ず「決定事項：」として重要な決定を箇条書きで示すこと。";
  const summaryResponse = await getClient().messages.create({
    model: MODEL,
    max_tokens: 900,
    system: summarySystemPrompt,
    messages: [
      {
        role: "user",
        content: `「${topic}」の議論をまとめてください。\n\n発言内容：\n${messages.map((m) => `${m.agentName}：${m.content}`).join("\n\n")}`,
      },
    ],
  });
  const summaryContent =
    summaryResponse.content[0].type === "text"
      ? summaryResponse.content[0].text
      : "";

  messages.push({
    agentId: "shinohara",
    agentName: shinohara.name,
    role: shinohara.role,
    content: summaryContent,
  });

  // 決定事項を抽出してメモリ保存
  const keyDecisionMatch = summaryContent.match(
    /決定事項[：:]([\s\S]*?)(?:\n\n|$)/,
  );
  const keyDecisions = keyDecisionMatch
    ? keyDecisionMatch[1]
        .split(/[\n・•]/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const summary = `${topic}について${agentIds.length}名で議論。${messages.length}発言。`;
  saveMemory(topic, summary, keyDecisions, agentIds);

  return messages;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, mode, agentIds, rounds } = body;

    if (!message) {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 },
      );
    }

    let messages: ChatMessage[];

    if (mode === "meeting" && agentIds?.length > 0) {
      messages = await runMeetingMode(message, agentIds, rounds || 1);
    } else {
      messages = await runTaskMode(message);
    }

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Agent chat error:", error);
    return NextResponse.json(
      { error: "エラーが発生しました。APIキーを確認してください。" },
      { status: 500 },
    );
  }
}
