import React from "react";

const DomainInput = ({ queryValue, setQueryValue }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">Domain or IP</label>
    <input
      type="text"
      className="w-full border p-2 rounded"
      placeholder="e.g. google.com or 8.8.8.8"
      value={queryValue}
      onChange={(e) => setQueryValue(e.target.value)}
    />
  </div>
);

export default DomainInput;
