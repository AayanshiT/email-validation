import { useState } from "react";

const timeRanges = ["Last 7 Days", "Last 30 Days", "Last 90 Days"];

const breakdownStats = [
  { label: "Bulk Validation", value: 0, color: "bg-blue-500" },
  { label: "Single Validation", value: 0, color: "bg-indigo-500" },
  { label: "Api Verification", value: 0, color: "bg-orange-400" },
  { label: "Email Finder", value: 0, color: "bg-green-500" },
];

const creditLegend = [
  { label: "Bulk", value: 0, color: "bg-blue-500" },
  { label: "Single", value: 0, color: "bg-indigo-500" },
  { label: "Finder", value: 0, color: "bg-green-500" },
  { label: "Api", value: 0, color: "bg-orange-400" },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("Last 7 Days");
  const [showRangeDropdown, setShowRangeDropdown] = useState(false);
  const [showFeedback, setShowFeedback] = useState(true);
  const [feedbackAnswer, setFeedbackAnswer] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState("10");

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="px-8 pt-8 pb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, <span className="text-gray-700">aayanshi.sharma</span>
        </h1>
        {/* Time Range Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRangeDropdown(!showRangeDropdown)}
            className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 shadow-sm transition"
          >
            {timeRange}
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showRangeDropdown && (
            <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 w-44 overflow-hidden">
              {timeRanges.map((r) => (
                <button
                  key={r}
                  onClick={() => { setTimeRange(r); setShowRangeDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-gray-50
                    ${r === timeRange ? "text-teal-600 font-semibold bg-teal-50" : "text-gray-700"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-8 pb-8 flex flex-col gap-6">
        {/* Top Row: Account Balance + Credit Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Balance Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            {/* Balance Box */}
            <div className="border border-gray-200 rounded-xl p-4 mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Account Balance Utilized
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <span className="text-base">✉️</span> Validation Credits
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🟡</span>
                <span className="text-3xl font-bold text-gray-800">0</span>
              </div>
            </div>

            {/* Validation Breakdown */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-gray-700">Validation Breakdown</span>
                <span className="text-xs text-gray-400">({timeRange})</span>
              </div>
              {/* Progress Bar */}
              <div className="h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
                <div className="h-full w-0 bg-teal-400 rounded-full" />
              </div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {breakdownStats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${stat.color}`} />
                    <span className="text-xs text-gray-600">
                      {stat.label} : <span className="font-semibold text-gray-800">{stat.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Credit Usage Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-700">Credit Usage</span>
              <div className="flex items-center gap-3 flex-wrap">
                {creditLegend.map((item) => (
                  <div key={item.label} className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs text-gray-500">{item.label} : {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Empty Chart Area */}
            <div className="flex items-center justify-center h-52 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <div className="text-center text-gray-300">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-xs font-medium">No data for {timeRange}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Statistics Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-sm font-semibold text-gray-700">Usage Statistics</span>
            <span className="text-xs text-gray-400">({timeRange})</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    { label: "Date", icon: null },
                    { label: "Bulk Validation", icon: "✉️" },
                    { label: "Single Validation", icon: "✉️" },
                    { label: "Api Validation", icon: "✉️" },
                  ].map((col) => (
                    <th key={col.label} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      <span className="flex items-center gap-1">
                        {col.icon && <span>{col.icon}</span>}
                        {col.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="py-14 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-sm font-medium">No entries found</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination Row */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              Showing
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(e.target.value)}
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-teal-400"
              >
                {["10", "25", "50", "100"].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              of <span className="font-semibold">0</span> entries
            </div>
            <div className="flex items-center gap-1">
              {[
                { label: "«", title: "First" },
                { label: "‹", title: "Prev" },
                { label: "1", active: true },
                { label: "›", title: "Next" },
                { label: "»", title: "Last" },
              ].map((btn, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition
                    ${btn.active
                      ? "bg-teal-500 text-white shadow"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Banner */}
        {showFeedback && !feedbackAnswer && (
          <div className="bg-white rounded-2xl border-l-4 border-teal-500 border border-gray-200 shadow-sm px-6 py-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">💬</span>
            </div>
            <p className="text-sm font-medium text-gray-700 flex-1">
              Do you like using email validation?
            </p>
            {/* Decorative icon */}
            <div className="hidden sm:block text-gray-200 text-4xl mr-4">💬</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFeedbackAnswer("yes")}
                className="px-5 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setFeedbackAnswer("no")}
                className="px-5 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition"
              >
                No
              </button>
            </div>
            <button
              onClick={() => setShowFeedback(false)}
              className="text-gray-300 hover:text-gray-500 transition ml-2 text-lg leading-none"
            >
              ×
            </button>
          </div>
        )}

        {feedbackAnswer && (
          <div className={`rounded-2xl border shadow-sm px-6 py-4 flex items-center gap-3 text-sm font-medium
            ${feedbackAnswer === "yes"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-600"}`}
          >
            <span>{feedbackAnswer === "yes" ? "🎉" : "😔"}</span>
            {feedbackAnswer === "yes"
              ? "Thanks for the love! We're glad you enjoy email validation."
              : "Thanks for the feedback! We'll work to improve your experience."}
          </div>
        )}

        {/* Footer */}
        <footer className="flex items-center justify-between text-xs text-gray-400 pt-2">
          <div className="flex gap-4">
            <a href="#" className="hover:text-teal-500 transition">Support</a>
            <a href="#" className="hover:text-teal-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-teal-500 transition">Terms & Conditions</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-500">n2b</span>
            <span>version 1.4</span>
          </div>
        </footer>
      </div>
    </div>
  );
}