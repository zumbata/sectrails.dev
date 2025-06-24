import React from "react";

const EndpointSelector = ({ endpoint, setEndpoint }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">Select API Endpoint</label>
    <select
      className="w-full border p-2 rounded"
      value={endpoint}
      onChange={(e) => setEndpoint(e.target.value)}
    >
      <option value="ip/details">IP Details</option>
      <option value="domain/details">Domain Details</option>
      <option value="domain/whois">WHOIS History</option>
      <option value="domain/subdomains">Subdomains</option>
      <option value="domain/tags">Domain Tags</option>
      <option value="history/dns">DNS A Record History</option>
      <option value="domain/associated">Associated Domains</option>
      <option value="ips/stats">IP Stats / PTR Search</option>
    </select>
  </div>
);

export default EndpointSelector;