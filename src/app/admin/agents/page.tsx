"use client";

import { useState, useRef, useEffect } from "react";
import { AGENTS, getAvatarUrl } from "@/lib/agents";
import type { ChatMessage } from "@/app/api/agents/chat/route";

type Mode = "task" | "meeting";

export default function AgentsPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("task");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([
    "tachibana",
    "morita",
    "yoshida",
  ]);
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [lastTopic, setLastTopic] = useState("");
  const [saved, setSaved] = useState(false);
  const [savedToDoc, setSavedToDoc] = useState(false);
  const [docUrl, setDocUrl] = useState("");
  const [savingToDoc, setSavingToDoc] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // メッセージを1つずつアニメーションで表示
  useEffect(() => {
    if (messages.length === 0) return;
    setDisplayedMessages([]);
    messages.forEach((msg, i) => {
      setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, msg]);
      }, i * 800);
    });
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedMessages]);

  const saveMinutes = () => {
    if (!messages.length) return;
    const date = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    const participants = [...new Set(messages.map((m) => m.agentName))];

    const lines = [
      `${"═".repeat(50)}`,
      `📅 ${date}`,
      `🎯 議題：${lastTopic}`,
      `👥 参加：${participants.join("・")}`,
      `${"═".repeat(50)}`,
      "",
      ...messages.flatMap((m) => [
        `【${m.agentName} / ${m.role}】`,
        m.content,
        "",
      ]),
    ];

    const text = lines.join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const fileName = `会議録_${lastTopic.slice(0, 20)}_${new Date().toISOString().slice(0, 10)}.txt`;
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
  };

  const saveToGoogleDocs = async () => {
    if (!messages.length || savingToDoc) return;
    setSavingToDoc(true);
    try {
      const participants = [...new Set(messages.map((m) => m.agentName))];
      const res = await fetch("/api/agents/save-minutes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: lastTopic,
          participants,
          messages,
          keyDecisions: [],
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedToDoc(true);
        if (data.url) setDocUrl(data.url);
      } else {
        alert("保存に失敗しました: " + (data.error || "不明なエラー"));
      }
    } catch {
      alert("Googleドキュメントへの保存に失敗しました。");
    } finally {
      setSavingToDoc(false);
    }
  };

  const toggleAgent = (id: string) => {
    setSelectedAgents((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setLoading(true);
    setMessages([]);
    setDisplayedMessages([]);
    setSaved(false);
    setSavedToDoc(false);
    setDocUrl("");
    setLastTopic(userMsg);

    try {
      const res = await fetch("/api/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          mode,
          agentIds: mode === "meeting" ? selectedAgents : undefined,
          rounds: 1,
        }),
      });
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch {
      alert("エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-950">
      {/* 左：社員一覧 */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col overflow-hidden">
        <div className="px-4 py-4 border-b border-gray-800">
          <h2 className="text-white font-bold text-sm">AI社員室</h2>
          <p className="text-gray-500 text-xs mt-0.5">
            {AGENTS.length}名 在籍中
          </p>
        </div>

        {/* モード切替 */}
        <div className="px-3 py-3 border-b border-gray-800">
          <div className="flex rounded-lg overflow-hidden text-xs">
            <button
              onClick={() => setMode("task")}
              className={`flex-1 py-1.5 font-medium transition-colors ${
                mode === "task"
                  ? "bg-amber-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              タスク依頼
            </button>
            <button
              onClick={() => setMode("meeting")}
              className={`flex-1 py-1.5 font-medium transition-colors ${
                mode === "meeting"
                  ? "bg-amber-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              会議モード
            </button>
          </div>
          {mode === "meeting" && (
            <p className="text-gray-500 text-xs mt-2">
              参加メンバーを選択してください
            </p>
          )}
        </div>

        {/* 社員リスト */}
        <div className="flex-1 overflow-y-auto py-2">
          {AGENTS.map((agent) => {
            const isSelected = selectedAgents.includes(agent.id);
            return (
              <button
                key={agent.id}
                onClick={() => mode === "meeting" && toggleAgent(agent.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
                  mode === "meeting"
                    ? isSelected
                      ? "bg-amber-900/30 hover:bg-amber-900/40"
                      : "hover:bg-gray-800"
                    : "cursor-default hover:bg-gray-800/50"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={getAvatarUrl(agent)}
                    alt={agent.name}
                    className="w-8 h-8 rounded-full bg-gray-700"
                  />
                  {mode === "meeting" && isSelected && (
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-500 rounded-full border border-gray-900" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-medium truncate">
                    {agent.name}
                  </p>
                  <p className="text-gray-500 text-xs truncate">{agent.role}</p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* 右：チャット */}
      <div className="flex-1 flex flex-col">
        {/* ヘッダー */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold">
              {mode === "task" ? "タスク依頼モード" : "会議モード"}
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">
              {mode === "task"
                ? "タスクを投げると、参謀が最適な社員を選んで議論します"
                : `参加中：${selectedAgents.length}名 — 社員たちが自律的に議論します`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {messages.length > 0 && !loading && (
              <>
                <button
                  onClick={saveMinutes}
                  disabled={saved}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    saved
                      ? "bg-green-900/40 text-green-400 cursor-default"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {saved ? "✅ ダウンロード済み" : "📄 ダウンロード"}
                </button>
                {savedToDoc ? (
                  <a
                    href={docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-900/40 text-blue-400 hover:bg-blue-900/60 transition-colors"
                  >
                    ✅ Docsで開く
                  </a>
                ) : (
                  <button
                    onClick={saveToGoogleDocs}
                    disabled={savingToDoc}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  >
                    {savingToDoc
                      ? "⏳ 保存中..."
                      : "📋 Googleドキュメントに保存"}
                  </button>
                )}
              </>
            )}
            {loading && (
              <div className="flex items-center gap-2 text-amber-400 text-sm">
                <span className="animate-pulse">●</span>
                <span>社員たちが議論中...</span>
              </div>
            )}
          </div>
        </div>

        {/* チャットエリア */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {displayedMessages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="flex -space-x-2 mb-4">
                {AGENTS.slice(0, 5).map((a) => (
                  <img
                    key={a.id}
                    src={getAvatarUrl(a)}
                    alt={a.name}
                    className="w-10 h-10 rounded-full border-2 border-gray-900 bg-gray-700"
                  />
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                {mode === "task"
                  ? "タスクや質問を入力してください"
                  : "議題を入力して会議を開始してください"}
              </p>
              <p className="text-gray-600 text-xs mt-1">
                例：「FUKU-TABIの集客を増やすには？」
              </p>
            </div>
          )}

          {displayedMessages.map((msg, i) => {
            const agent = AGENTS.find((a) => a.id === msg.agentId);
            return (
              <div key={i} className="flex gap-3 animate-fade-in">
                <img
                  src={agent ? getAvatarUrl(agent) : ""}
                  alt={msg.agentName}
                  className="w-9 h-9 rounded-full flex-shrink-0 bg-gray-700 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="text-sm font-bold"
                      style={{ color: agent?.color || "#fff" }}
                    >
                      {msg.agentName}
                    </span>
                    <span className="text-gray-500 text-xs">{msg.role}</span>
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-100 leading-relaxed whitespace-pre-wrap break-words"
                    style={{
                      backgroundColor: agent?.bgColor
                        ? agent.bgColor + "15"
                        : "#1f2937",
                      border: `1px solid ${agent?.color || "#374151"}22`,
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-700 animate-pulse" />
              <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* 入力エリア */}
        <div className="px-6 py-4 border-t border-gray-800">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder={
                mode === "task"
                  ? "タスク・質問を入力..."
                  : "会議の議題を入力..."
              }
              className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 text-sm border border-gray-700 focus:outline-none focus:border-amber-500 placeholder-gray-500"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-5 py-3 text-sm font-medium transition-colors"
            >
              {mode === "task" ? "依頼" : "会議開始"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
