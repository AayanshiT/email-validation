import { useState } from "react";


const monthlyPlans = [
  { credits: "10,000",   price: 17,  perCredit: "$0.00170/credit", best: false },
  { credits: "25,000",   price: 41,  perCredit: "$0.00167/credit", best: false },
  { credits: "50,000",   price: 72,  perCredit: "$0.00145/credit", best: false },
  { credits: "100,000",  price: 126, perCredit: "$0.00127/credit", best: false },
  { credits: "250,000",  price: 254, perCredit: "$0.00102/credit", best: true  },
  { credits: "500,000",  price: 424, perCredit: "$0.00085/credit", best: false },
  { credits: "1,000,000",price: 721, perCredit: "$0.00072/credit", best: false },
];

const payAsYouGoPlans = [
  { credits: "5,000",    price: 12,  perCredit: "$0.00240/credit", best: false },
  { credits: "15,000",   price: 29,  perCredit: "$0.00193/credit", best: false },
  { credits: "30,000",   price: 49,  perCredit: "$0.00163/credit", best: false },
  { credits: "75,000",   price: 99,  perCredit: "$0.00132/credit", best: true  },
  { credits: "150,000",  price: 179, perCredit: "$0.00119/credit", best: false },
  { credits: "300,000",  price: 299, perCredit: "$0.00100/credit", best: false },
];

export default function Pricing() {
  const [tab, setTab] = useState("monthly");
  const plans = tab === "monthly" ? monthlyPlans : payAsYouGoPlans;

  // split into rows: first 4, then rest
  const firstRow = plans.slice(0, 4);
  const secondRow = plans.slice(4);

  return (
    <div className="flex-1 px-8 py-10 overflow-y-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Verification Pricing</h1>
        <p className="text-sm text-gray-500">
          Choose the perfect plan for your needs. Monthly subscriptions or flexible credit packs.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
          <button
            onClick={() => setTab("monthly")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all
              ${tab === "monthly" ? "bg-white shadow text-gray-800" : "text-gray-500 hover:text-gray-700"}`}
          >
            Monthly Plans
            {tab === "monthly" && (
              <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Save 15%</span>
            )}
          </button>
          <button
            onClick={() => setTab("payg")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all
              ${tab === "payg" ? "bg-white shadow text-gray-800" : "text-gray-500 hover:text-gray-700"}`}
          >
            Pay-As-You-Go
          </button>
        </div>
      </div>

      {/* First row — 4 cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 max-w-5xl mx-auto">
        {firstRow.map((plan) => (
          <PlanCard key={plan.credits} plan={plan} />
        ))}
      </div>

      {/* Second row — centered remaining */}
      <div className={`grid gap-4 max-w-5xl mx-auto
        ${secondRow.length === 3 ? "grid-cols-3" : secondRow.length === 2 ? "grid-cols-2 max-w-2xl" : "grid-cols-1 max-w-xs"}`}>
        {secondRow.map((plan) => (
          <PlanCard key={plan.credits} plan={plan} />
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-gray-400 mt-10">
        Monthly credits renew every 30 days. Cancel anytime.
      </p>
    </div>
  );
}

function PlanCard({ plan }) {
  return (
    <div className={`relative rounded-2xl border p-6 flex flex-col items-center gap-3 transition-all
      ${plan.best
        ? "border-teal-400 bg-white shadow-lg shadow-teal-100 ring-2 ring-teal-400"
        : "border-gray-200 bg-white hover:border-teal-200 hover:shadow-md"}`}
    >
      {/* Best value badge */}
      {plan.best && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow">
            Best Value
          </span>
        </div>
      )}

      {/* Credits */}
      <div className="text-center mt-2">
        <p className="text-3xl text-gray-900 font-semibold leading-none">{plan.credits}</p>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Email Credits</p>
      </div>

      {/* Price */}
      <div className="text-center">
        <div className="flex items-start justify-center">
          <span className="text-lg font-bold text-gray-700 mt-1">$</span>
          <span className="text-4xl font-black text-gray-900 leading-none">{plan.price}</span>
        </div>
        <p className={`text-xs mt-1 font-medium ${plan.best ? "text-teal-500" : "text-gray-400"}`}>
          {plan.perCredit}
        </p>
      </div>

      {/* Button */}
      <button
        className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all mt-1
          ${plan.best
            ? "bg-teal-500 hover:bg-teal-600 text-white shadow-sm"
            : "border border-gray-300 text-gray-700 hover:border-teal-400 hover:text-teal-600 bg-white"}`}
      >
        Subscribe
      </button>
    </div>
  );
}