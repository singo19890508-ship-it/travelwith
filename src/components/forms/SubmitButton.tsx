"use client";

import { ButtonHTMLAttributes } from "react";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

export default function SubmitButton({
  loading = false,
  loadingText = "送信中...",
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      {...props}
      type="submit"
      disabled={loading || props.disabled}
      className={`btn-primary w-full text-lg py-4 ${loading ? "opacity-75" : ""} ${props.className || ""}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
