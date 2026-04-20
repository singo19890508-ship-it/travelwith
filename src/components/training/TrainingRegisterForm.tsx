"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  trainingRegisterAction,
  TrainingRegisterState,
} from "@/app/actions/training-register";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 bg-satsuma-600 text-white font-bold text-base rounded-xl hover:bg-satsuma-700 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "送信中…" : "仮登録する（無料）"}
    </button>
  );
}

const initialState: TrainingRegisterState = { status: "idle" };

export default function TrainingRegisterForm() {
  const [state, action] = useActionState(trainingRegisterAction, initialState);

  if (state.status === "success") {
    return (
      <div className="bg-satsuma-50 border border-satsuma-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <p className="font-bold text-gray-900 text-lg mb-2">
          仮登録を受け付けました
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          ご登録ありがとうございます。
          <br />
          説明会・開催情報をメールでお届けします。
          <br />
          しばらくお待ちください。
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      {state.status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          お名前 <span className="text-satsuma-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="福田 真悟"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-satsuma-400 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          メールアドレス <span className="text-satsuma-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="example@email.com"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-satsuma-400 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          電話番号{" "}
          <span className="text-gray-400 font-normal text-xs">（任意）</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="090-0000-0000"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-satsuma-400 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          一言・きっかけ{" "}
          <span className="text-gray-400 font-normal text-xs">（任意）</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="旅行サポートに興味を持ったきっかけなど、なんでも。"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-satsuma-400 focus:border-transparent resize-none"
        />
      </div>

      <SubmitButton />

      <p className="text-xs text-gray-400 text-center">
        仮登録は無料です。個人情報は説明会・開催案内の送付にのみ使用します。
      </p>
    </form>
  );
}
