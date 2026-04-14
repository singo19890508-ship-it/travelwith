import fs from "fs";
import path from "path";

const MEMORY_FILE = path.join(process.cwd(), "src/data/agent_memories.json");

export interface Memory {
  id: string;
  topic: string;
  summary: string;
  keyDecisions: string[];
  participants: string[];
  timestamp: string;
}

function readMemories(): Memory[] {
  try {
    const raw = fs.readFileSync(MEMORY_FILE, "utf-8");
    return JSON.parse(raw).memories || [];
  } catch {
    return [];
  }
}

function writeMemories(memories: Memory[]): void {
  try {
    // 最新100件だけ保持
    const trimmed = memories.slice(-100);
    fs.writeFileSync(
      MEMORY_FILE,
      JSON.stringify({ memories: trimmed }, null, 2),
    );
  } catch {
    // ファイル書き込みに失敗しても続行
  }
}

export function saveMemory(
  topic: string,
  summary: string,
  keyDecisions: string[],
  participants: string[],
): void {
  const memories = readMemories();
  memories.push({
    id: Date.now().toString(),
    topic,
    summary,
    keyDecisions,
    participants,
    timestamp: new Date().toISOString(),
  });
  writeMemories(memories);
}

export function getRelevantMemories(topic: string, limit = 5): Memory[] {
  const memories = readMemories();
  if (memories.length === 0) return [];

  // 最新の記憶を優先して返す（将来的にはベクトル検索等を追加可能）
  return memories.slice(-limit).reverse();
}

export function formatMemoriesForPrompt(memories: Memory[]): string {
  if (memories.length === 0) return "";

  const lines = memories.map(
    (m) =>
      `・[${m.timestamp.slice(0, 10)}] テーマ「${m.topic}」: ${m.summary}${m.keyDecisions.length > 0 ? `\n  決定事項: ${m.keyDecisions.join("、")}` : ""}`,
  );

  return `\n\n【過去の会議記録（参照してください）】\n${lines.join("\n")}`;
}
