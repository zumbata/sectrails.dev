import React from "react";

const EndpointSelector = ({ endpoint, setEndpoint }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">Select API Endpoint</label>
    <select
      className="w-full border p-2 rounded"
      value={endpoint}
      onChange={(e) => setEndpoint(e.target.value)}
    >
      <option value="ip_details">IP Details</option>
      <option value="domain_details">Domain Details</option>
      <option value="domain_whois">Domain WHOIS</option>
      <option value="domain_subdomains">Domain Subdomains</option>
      <option value="domain_tags">Domain Tags</option>
      <option value="dns_history">DNS A Record History</option>
      <option value="associated_domains">Associated Domains</option>
      <option value="ip_stats">IP Stats / PTR Search</option>
    </select>
  </div>
);

export default EndpointSelector;