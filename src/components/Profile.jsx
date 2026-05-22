import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const timezones = [
  "UTC-12:00 Baker Island",
  "UTC-11:00 Samoa",
  "UTC-10:00 Hawaii",
  "UTC-08:00 Pacific Time (US & Canada)",
  "UTC-07:00 Mountain Time (US & Canada)",
  "UTC-06:00 Central Time (US & Canada)",
  "UTC-05:00 Eastern Time (US & Canada)",
  "UTC+00:00 London, Dublin, Lisbon",
  "UTC+01:00 Paris, Berlin, Rome",
  "UTC+02:00 Cairo, Athens",
  "UTC+03:00 Moscow, Riyadh",
  "UTC+05:30 Mumbai, Kolkata (IST)",
  "UTC+06:00 Dhaka",
  "UTC+07:00 Bangkok, Jakarta",
  "UTC+08:00 Singapore, Beijing",
  "UTC+09:00 Tokyo, Seoul",
  "UTC+10:00 Sydney, Melbourne",
  "UTC+12:00 Auckland, Fiji",
];

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "aayanshi.sharma",
    email: "aayanshi.sharma@technians.com",
    phone: "16901-762",
    timezone: "",
  });
  const [avatar, setAvatar] = useState(null); // null = show letter
  const [saved, setSaved] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, newPass: false, confirm: false });
  const [pwError, setPwError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) { setPwError("Passwords do not match."); return; }
    if (passwords.newPass.length < 8) { setPwError("Minimum 8 characters required."); return; }
    setPwError("");
    setPwLoading(true);
    setTimeout(() => {
      setPwLoading(false);
      setPwSuccess(true);
      setTimeout(() => { setShowPasswordModal(false); setPwSuccess(false); setPasswords({ current: "", newPass: "", confirm: "" }); }, 1500);
    }, 1000);
  };

  return (
    <div className="flex-1 p-8 max-w-4xl">
      {/* Page title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-sm text-gray-500">Update your personal details and manage account preferences.</p>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

        {/* Profile Picture */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-4">Profile Picture</p>
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {avatar ? (
                <img src={avatar} alt="avatar"
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-teal-100" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center ring-4 ring-teal-50">
                  <span className="text-3xl font-bold text-teal-500">
                    {form.name?.[0]?.toUpperCase() || "A"}
                  </span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Change Picture
              </button>
              <button
                onClick={() => setAvatar(null)}
                className="flex items-center gap-2 px-4 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 hover:border-red-300 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove Picture
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100 mb-8" />

        {/* Fields row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-50 transition-all bg-white">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name"
                className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-50 transition-all bg-white">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-50 transition-all">
              <div className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 border-r border-gray-200 text-sm text-gray-600 select-none whitespace-nowrap">
                🇮🇳 +91
              </div>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="00000-00000"
                className="flex-1 px-3 py-2.5 text-sm outline-none text-gray-800 bg-white" />
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="mb-8 max-w-sm">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Time Zone</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-50 transition-all bg-white">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <select name="timezone" value={form.timezone} onChange={handleChange}
              className="flex-1 text-sm outline-none text-gray-800 bg-transparent appearance-none cursor-pointer">
              <option value="">Select a timezone</option>
              {timezones.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="h-px bg-gray-100 mb-6" />

        {/* Action row */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2.5 border border-red-200 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 hover:border-red-300 transition"
          >
            Log out
          </button>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Saved!
              </span>
            )}
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
            >
              Change Password
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl text-sm transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* ── Change Password Modal ── */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-800">Change Password</h2>
              <button onClick={() => { setShowPasswordModal(false); setPwError(""); }}
                className="text-gray-400 hover:text-gray-600 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex">
              {/* Left illustration */}
              <div className="w-44 bg-teal-50 flex items-center justify-center flex-shrink-0 min-h-[260px]">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center">
                  <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
              </div>

              {/* Right form */}
              <form onSubmit={handleChangePassword} className="flex-1 p-6 flex flex-col gap-4">
                {pwSuccess ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 py-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">Password updated!</p>
                  </div>
                ) : (
                  <>
                    {pwError && (
                      <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2">{pwError}</div>
                    )}
                    <PwField label="Current Password" placeholder="Enter your current password"
                      value={passwords.current} show={showPw.current}
                      onChange={(v) => setPasswords({ ...passwords, current: v })}
                      onToggle={() => setShowPw({ ...showPw, current: !showPw.current })} />
                    <PwField label="New Password" placeholder="Enter your new password"
                      value={passwords.newPass} show={showPw.newPass}
                      onChange={(v) => setPasswords({ ...passwords, newPass: v })}
                      onToggle={() => setShowPw({ ...showPw, newPass: !showPw.newPass })} />
                    <PwField label="Confirm Password" placeholder="Re-enter your new password"
                      value={passwords.confirm} show={showPw.confirm}
                      onChange={(v) => setPasswords({ ...passwords, confirm: v })}
                      onToggle={() => setShowPw({ ...showPw, confirm: !showPw.confirm })} />
                    <div className="flex items-center justify-end gap-3 pt-1">
                      <button type="button" onClick={() => { setShowPasswordModal(false); setPwError(""); }}
                        className="px-5 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                        Cancel
                      </button>
                      <button type="submit" disabled={pwLoading}
                        className="px-6 py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-bold rounded-lg text-sm transition flex items-center gap-2">
                        {pwLoading
                          ? <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                          : "Change Password"}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PwField({ label, placeholder, value, show, onChange, onToggle }) {
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