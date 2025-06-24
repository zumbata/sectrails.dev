import React from "react";

const ApiKeyInput = ({ apiKey, setApiKey }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">SecurityTrails API Key</label>
    <input
      type="text"
      className="w-full border p-2 rounded"
      placeholder="Enter your API key"
      value={apiKey}
      onChange={(e) => setApiKey(e.target.value)}
    />
  </div>
);

export default ApiKeyInput;