"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
  cat: string;
}

interface Props {
  items: FaqItem[];
  categories: string[];
  labelAll: string;
  noResult: string;
}

export default function FaqAccordion({ items, categories, labelAll, noResult }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");

  const filtered = activeCategory
    ? items.filter((item) => item.cat === activeCategory)
    : items;

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("")}
          className={`text-sm px-4 py-2 rounded-full border transition-colors ${
            !activeCategory
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
          }`}
        >
          {labelAll}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat === activeCategory ? "" : cat)}
            className={`text-sm px-4 py-2 rounded-full border transition-colors ${
              activeCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion items */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{noResult}</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-start gap-3 p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    Q
                  </span>
                  <span className="flex-1 font-medium text-gray-900">{item.q}</span>
                  <svg
                    className={`flex-shrink-0 w-5 h-5 text-gray-400 transition-transform mt-0.5 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      A
                    </span>
                    <p className="text-gray-700 leading-relaxed text-sm">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
