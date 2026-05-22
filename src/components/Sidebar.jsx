import { useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import BulkValidation from "./Bulkvalidation";
import Pricing from "./Pricing";
import Profile from "./Profile";

const sidebarItems = [
  { to: "/app/dashboard", icon: "⊞", label: "Dashboard" },
  { to: "/app/validations", icon: "✉️", label: "Validations" },
  { to: "/app/reacher", icon: "🔓", label: "Reacher" },
  { to: "/app/support", icon: "💬", label: "Support" },
  { to: "/app/pricing", icon: "💳", label: "Pricing" },
];

const validationTabs = [
  { id: "bulk", label: "Bulk Validation", icon: "✉️" },
  { id: "single", label: "Single Validation", icon: "📧" },
  { id: "api", label: "API", icon: "</>" },
  { id: "crm", label: "CRM Integrations", icon: "⚙️" },
];

export default function AppShell() {
  const [activeTab, setActiveTab] = useState("bulk");
  const [balanceDrop, setBalanceDrop] = useState(false);
  const [userDrop, setUserDrop] = useState(false);
  const navigate = useNavigate();

  // Show tabs only on validations route
 const location = useLocation();
const isValidations = location.pathname.includes("/app/validations");

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-6 fixed h-full z-20">
        <div className="flex flex-col items-center mb-2">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-base select-none">
            nb
          </div>
          <span className="text-[8px] text-gray-400 mt-1 font-medium tracking-tight text-center leading-tight">
            EVERY EMAIL
            <br />
            ADDRESS MATTERS
          </span>
        </div>

        <nav className="flex flex-col gap-2 items-center w-full px-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 w-full rounded-xl transition-all
                ${isActive ? "text-teal-600 bg-teal-50" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium leading-tight text-center">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ── Main ── */}
      <div className="ml-20 flex-1 flex flex-col min-h-screen">
        {/* ── Header ── */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10 h-14">
          {/* Validation tabs — only on /app/validations */}
          <div className="flex gap-2 flex-wrap">
            {isValidations &&
              validationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all border
                  ${
                    activeTab === tab.id
                      ? "bg-teal-50 border-teal-400 text-teal-700 shadow-sm"
                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <span className="text-xs">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => navigate("/app/pricing")}
              className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition flex items-center gap-2 whitespace-nowrap"
            >
              🎁 Get Free Credits
            </button>

            {/* Balance */}
            <div className="relative">
              <button
                onClick={() => {
                  setBalanceDrop(!balanceDrop);
                  setUserDrop(false);
                }}
                className="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 bg-yellow-50 hover:bg-yellow-100 transition"
              >
                <span className="text-yellow-500">★</span> Balance 96
                <svg
                  className="w-3 h-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {balanceDrop && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-30 w-48 p-4">
                  <p className="text-xs text-gray-500 mb-1">
                    Available Credits
                  </p>
                  <p className="text-2xl font-bold text-gray-800">96</p>
                  <button className="mt-3 w-full bg-teal-500 text-white text-xs font-semibold py-1.5 rounded-lg hover:bg-teal-600 transition">
                    Buy More Credits
                  </button>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="relative">
              <button
                onClick={() => {
                  setUserDrop(!userDrop);
                  setBalanceDrop(false);
                }}
                className="w-9 h-9 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
              >
                A
              </button>
              {userDrop && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-30 w-44 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-700">
                      aayanshi.sharma
                    </p>
                    <p className="text-xs text-gray-400">Free Plan</p>
                  </div>
                  {["Profile", "Settings"].map((item) => (
                    <button
                      key={item}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition"
                      onClick={() => { navigate("/profile"); setUserDrop(false); }}
                    >
                      {item}
                    </button>
                  ))}
                  <button
                    onClick={() => { navigate("/login"); setUserDrop(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Page Routes ── */}
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="validations"
            element={<BulkValidation activeTab={activeTab} />}
          />
          <Route path="pricing" element={<Pricing />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route
            path="reacher"
            element={
              <Placeholder
                title="Reacher Open Source"
                icon="🔓"
                desc="Open source email verification engine"
              />
            }
          />
          <Route
            path="support"
            element={
              <Placeholder
                title="Support Tickets"
                icon="💬"
                desc="Get help from our team"
              />
            }
          />
        </Routes>
      </div>

      {(balanceDrop || userDrop) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setBalanceDrop(false);
            setUserDrop(false);
          }}
        />
      )}
    </div>
  );
}

function Placeholder({ title, icon, desc }) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="text-center text-gray-400">
        <div className="text-6xl mb-4">{icon}</div>
        <h2 className="text-xl font-bold text-gray-600 mb-1">{title}</h2>
        <p className="text-sm">{desc}</p>
      </div>
    </div>
  );
}
