import { useRef, useState } from "react";

export default function BulkValidation({ activeTab = "bulk" }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) setUploadedFile(f);
  };

  if (activeTab === "bulk") return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 text-lg">✉️</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bulk Validation</h1>
          <p className="text-sm text-gray-500">Quickly validate bulk emails for accuracy and efficiency</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <p className="text-sm font-medium text-gray-700 mb-4">
          Upload CSV, Excel file to start Validation{" "}
          <span className="text-teal-500 cursor-pointer hover:underline">(Sample file)</span>
        </p>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) setUploadedFile(f); }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-14 cursor-pointer transition-all
            ${dragOver ? "border-teal-400 bg-teal-50" : uploadedFile ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50 hover:border-teal-300 hover:bg-teal-50"}`}
        >
          <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleFileChange} />
          {uploadedFile ? (
            <>
              <div className="text-4xl mb-3">✅</div>
              <p className="text-sm font-semibold text-green-700">{uploadedFile.name}</p>
              <p className="text-xs text-gray-500 mt-1">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
              <button onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }} className="mt-3 text-xs text-red-500 hover:underline">Remove file</button>
            </>
          ) : (
            <>
              <div className="text-teal-400 text-5xl mb-3">☁️</div>
              <p className="text-sm font-semibold text-gray-700">Select a CSV or Excel file to import</p>
              <p className="text-xs text-gray-400 mt-1">or drag and drop it here</p>
              <p className="text-xs text-gray-400 mt-2">Maximum file size: 10 MB and up to 50,000 rows allowed.</p>
            </>
          )}
        </div>
        {uploadedFile && (
          <div className="mt-4 flex justify-end">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition">
              Start Validation →
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-800">Bulk Validation History</h2>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input type="text" placeholder="Search history..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-teal-400 w-52" />
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-sm text-yellow-800 mb-4">
          <span className="font-semibold">Note:</span> Report Download available only for <span className="font-bold">7 days</span> from creation
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["Date","Filename","Records","Deliverable","Risky","UnDeliverable","Status","Download"].map(h => (
                <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={8} className="py-16 text-center text-gray-400">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-5xl">📭</span>
                  <p className="text-sm font-medium">No validation history yet</p>
                  <p className="text-xs text-gray-300">Upload a file above to get started</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  if (activeTab === "single") return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-lg">📧</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Single Validation</h1>
          <p className="text-sm text-gray-500">Validate a single email address instantly</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
        <input type="email" placeholder="e.g. user@example.com"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 mb-4" />
        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition text-sm">
          Validate Email →
        </button>
      </div>
    </div>
  );

  if (activeTab === "api") return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-mono text-xs">&lt;/&gt;</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">API Access</h1>
          <p className="text-sm text-gray-500">Integrate email validation into your application</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <p className="text-sm font-semibold text-gray-700 mb-3">Your API Key</p>
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-6">
          <code className="text-xs text-gray-600 flex-1 font-mono">••••••••••••••••••••••••••••••••</code>
          <button className="text-teal-500 text-xs font-semibold hover:underline">Copy</button>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono text-green-400 leading-relaxed">
          <p className="text-gray-500"># Example request</p>
          <p>curl -X POST https://api.nobounce.com/v1/validate \</p>
          <p className="pl-4">-H "Authorization: Bearer YOUR_API_KEY" \</p>
          <p className="pl-4">{`-d '{ "email": "user@example.com" }'`}</p>
        </div>
      </div>
    </div>
  );

  if (activeTab === "crm") return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-lg">⚙️</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">CRM Integrations</h1>
          <p className="text-sm text-gray-500">Connect with your favorite CRM tools</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {["HubSpot","Salesforce","Mailchimp","ActiveCampaign"].map(crm => (
          <div key={crm} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center gap-3 hover:border-teal-300 hover:shadow-md transition cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">🔗</div>
            <p className="text-sm font-semibold text-gray-700">{crm}</p>
            <button className="text-xs text-teal-500 border border-teal-300 rounded-full px-4 py-1 hover:bg-teal-50 transition">Connect</button>
          </div>
        ))}
      </div>
    </div>
  );

  return null;
}