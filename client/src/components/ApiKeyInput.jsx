import React, { useEffect, useState } from "react";

const ApiKeyInput = ({ apiKey, setApiKey }) => {
  const [inputValue, setInputValue] = useState(() => {
    return localStorage.getItem("securitytrails_api_key") || "";
  });

  useEffect(() => {
    const savedKey = localStorage.getItem("securitytrails_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, [setApiKey]);

  const handleSetApiKey = () => {
    if (inputValue) {
      setApiKey(inputValue);
      localStorage.setItem("securitytrails_api_key", inputValue);
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">SecurityTrails API Key</label>
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Enter your API key"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={handleSetApiKey}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        disabled={!inputValue}
      >
        Set API Key
      </button>
    </div>
  );
};

export default ApiKeyInput;
