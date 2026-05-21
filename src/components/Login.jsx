import { useState } from "react";
import ForgotPassword from "../components/ForgotPassword";

export default function Login({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onNavigate?.("dashboard"); }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-0.5 mb-1">
          <span className="text-2xl font-black text-gray-900 tracking-tight">bounce</span>
          <span className="text-2xl font-black text-teal-500">email</span>
          <span className="text-2xl font-black text-gray-900 tracking-tight">validation</span>
        </div>
        <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">Every Email Address Matters</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-sm px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500 text-center mb-8">Enter your email to sign up or access your account</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-50 transition-all bg-white">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email" required
                className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent" />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={() => onNavigate?.("ForgotPassword")}
              className="text-xs text-teal-500 hover:underline font-medium">
              Forgot password?
            </button>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Verifying...
              </>
            ) : "Login"}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed">
          By Clicking on "Login" button in, you agree to our{" "}
          <span className="text-teal-500 cursor-pointer hover:underline">Privacy Policy</span>
          {" "}and{" "}
          <span className="text-teal-500 cursor-pointer hover:underline">Terms of Service</span>
        </p>

        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <button onClick={() => onNavigate?.("signup")} className="text-teal-500 font-semibold hover:underline">
              Sign up free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}