import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  if (submitted) return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">You're all set!</h2>
        <p className="text-sm text-gray-500 mb-6">Your account has been created. 100 free credits are waiting for you.</p>
        <button onClick={() => navigate("/login")}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition text-sm">
          Go to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-teal-400 to-teal-600 flex flex-col">
      <div className="bg-teal-600/60 py-3 text-center text-xs font-semibold text-white tracking-wide">
        🎁 Use Code: <span className="text-yellow-300 font-bold">N2B20</span> — Get 20% OFF
      </div>
      <header className="py-4 flex justify-center">
        <div className="flex items-center gap-0.5">
          <span className="text-2xl font-black text-white">no</span>
          <span className="text-2xl font-black text-yellow-300">2</span>
          <span className="text-2xl font-black text-white">bounce</span>
        </div>
      </header>

      <div className="flex-1 flex items-start justify-center px-4 pb-10">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start gap-10 pt-6">
          <div className="flex-1 text-white pt-4 lg:pt-10 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-4">
              Verify Bulk Emails with{" "}
              <span className="text-yellow-300">98% Accuracy</span>{" "}
              Every. Single. Time
            </h1>
            <p className="text-base text-teal-100 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              no2bounce helps marketers, agencies, and businesses verify email lists, including catch-all email verification to reduce bounce rates, improve inbox placement, and maximise campaign ROI.
            </p>
            <div className="flex items-center gap-0 max-w-md mx-auto lg:mx-0 mb-8">
              <input type="email" placeholder="Enter email to verify"
                className="flex-1 px-4 py-3 rounded-l-xl text-sm text-gray-800 outline-none bg-white/95" />
              <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-5 py-3 rounded-r-xl text-sm transition whitespace-nowrap">
                Verify for free
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 flex-shrink-0">
            <h2 className="text-base font-semibold text-gray-700 text-center mb-6">
              Get 100 Free Email Validation Credits
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { name: "name",     label: "Name",          placeholder: "Your full name",      type: "text"  },
                { name: "email",    label: "Email",         placeholder: "me@company.com",      type: "email" },
                { name: "business", label: "Business Name", placeholder: "Your Business Name",  type: "text"  },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange}
                    placeholder={f.placeholder} required={f.name !== "business"}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-50 transition">
                  <div className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 border-r border-gray-200 text-sm text-gray-600 select-none">🇮🇳 +91</div>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="08123 456789"
                    className="flex-1 px-3 py-2.5 text-sm outline-none bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">How can we support you?</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message..." rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-bold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2 mt-1">
                {loading ? (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                ) : "Submit"}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-500 font-semibold hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}