import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fakeLoad = (cb) => { setLoading(true); setTimeout(() => { setLoading(false); cb(); }, 1000); };

  const handleOtp = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[i] = val; setOtp(next);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };
  const handleOtpKey = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) document.getElementById(`otp-${i - 1}`)?.focus();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) { setError("Passwords do not match."); return; }
    if (passwords.newPass.length < 8) { setError("Password must be at least 8 characters."); return; }
    setError("");
    fakeLoad(() => setStep(4));
  };

  const Logo = () => (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center gap-0.5 mb-1">
        <span className="text-2xl font-black text-gray-900">no</span>
        <span className="text-2xl font-black text-teal-500">2</span>
        <span className="text-2xl font-black text-gray-900">bounce</span>
      </div>
      <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">Every Email Address Matters</p>
    </div>
  );

  if (step === 1) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Logo />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-sm px-8 py-10">
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center">
            <svg className="w-7 h-7 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Forgot Password?</h1>
        <p className="text-sm text-gray-500 text-center mb-8">Enter your email and we'll send you a reset code</p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-50 transition-all">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your work email"
                className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent" />
            </div>
          </div>
          <button onClick={() => fakeLoad(() => setStep(2))} disabled={!email || loading}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-bold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2">
            {loading ? <Spinner /> : "Send Reset Code"}
          </button>
        </div>
        <Link to="/login" className="mt-5 w-full flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-teal-500 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Login
        </Link>
      </div>
    </div>
  );

  if (step === 2) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Logo />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-sm px-8 py-10">
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center">
            <svg className="w-7 h-7 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Check your email</h1>
        <p className="text-sm text-gray-500 text-center mb-1">We sent a 6-digit code to</p>
        <p className="text-sm font-semibold text-teal-600 text-center mb-8">{email}</p>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, i) => (
            <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" value={digit} maxLength={1}
              onChange={(e) => handleOtp(i, e.target.value)} onKeyDown={(e) => handleOtpKey(i, e)}
              className={`w-11 h-12 text-center text-lg font-bold border rounded-xl outline-none transition-all
                ${digit ? "border-teal-400 bg-teal-50 text-teal-700" : "border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-50"}`} />
          ))}
        </div>
        <button onClick={() => fakeLoad(() => setStep(3))} disabled={otp.join("").length < 6 || loading}
          className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-bold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2">
          {loading ? <Spinner /> : "Verify Code"}
        </button>
        <p className="text-center text-xs text-gray-400 mt-4">
          Didn't receive it? <button className="text-teal-500 font-semibold hover:underline">Resend</button>
        </p>
        <button onClick={() => setStep(1)} className="mt-3 w-full flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-teal-500 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
      </div>
    </div>
  );

  if (step === 3) return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <Logo />
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800">Change Password</h2>
          <Link to="/login" className="text-gray-400 hover:text-gray-600 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </Link>
        </div>
        <div className="flex">
          <div className="w-44 bg-teal-50 flex items-center justify-center flex-shrink-0 min-h-[280px]">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center">
              <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          <form onSubmit={handleChangePassword} className="flex-1 p-6 flex flex-col gap-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2">{error}</div>}
            <PasswordField label="Current Password" placeholder="Enter your current password"
              value={passwords.current} show={show.current}
              onChange={(v) => setPasswords({ ...passwords, current: v })}
              onToggle={() => setShow({ ...show, current: !show.current })} />
            <PasswordField label="New Password" placeholder="Enter your new password"
              value={passwords.newPass} show={show.newPass}
              onChange={(v) => setPasswords({ ...passwords, newPass: v })}
              onToggle={() => setShow({ ...show, newPass: !show.newPass })} />
            <PasswordField label="Confirm Password" placeholder="Re-enter your new password"
              value={passwords.confirm} show={show.confirm}
              onChange={(v) => setPasswords({ ...passwords, confirm: v })}
              onToggle={() => setShow({ ...show, confirm: !show.confirm })} />
            <div className="flex items-center justify-end gap-3 pt-1">
              <Link to="/login" className="px-5 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition">Cancel</Link>
              <button type="submit" disabled={loading}
                className="px-6 py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-bold rounded-lg text-sm transition flex items-center gap-2">
                {loading ? <Spinner /> : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Logo />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-sm px-8 py-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Changed!</h2>
        <p className="text-sm text-gray-500 mb-8">Your password has been updated. You can now log in with your new password.</p>
        <button onClick={() => navigate("/login")}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition text-sm">
          Back to Login
        </button>
      </div>
    </div>
  );
}

function PasswordField({ label, placeholder, value, show, onChange, onToggle }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-50 transition-all">
        <input type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} required
          className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent" />
        <button type="button" onClick={onToggle} className="text-gray-400 hover:text-gray-600 transition ml-2 flex-shrink-0">
          {show
            ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
            : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          }
        </button>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
    </svg>
  );
}