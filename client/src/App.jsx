import React, { useState } from "react";
import ApiKeyInput from "./components/ApiKeyInput";
import DomainInput from "./components/DomainInput";
import EndpointSelector from "./components/EndpointSelector";
import ResultViewer from "./components/ResultViewer";
import DNSHistory from "./components/DNSHistory";
import Subdomains from "./components/Subdomains";
import WhoisHistory from "./components/WhoisHistory";
import AssociatedDomains from "./components/AssociatedDomains";
import IpStats from "./components/IpStats";
import QueryButton from "./components/QueryButton";

const App = () => {
  const [apiKey, setApiKey] = useState(import.meta.env.SECURITYTRAILS_API_KEY || "");
  const [queryValue, setQueryValue] = useState("");
  const [endpoint, setEndpoint] = useState("ip_details");
  const [result, setResult] = useState(null);

  const handleRunQuery = () => {
    if (!apiKey || !queryValue || !endpoint) return;
    setResult(null); // Clear previous result
  };

  const renderComponent = () => {
    const props = { apiKey, queryValue, setResult };
    switch (endpoint) {
      case "dns_history":
        return <DNSHistory {...props} />;
      case "subdomains":
        return <Subdomains {...props} />;
      case "whois_history":
        return <WhoisHistory {...props} />;
      case "associated_domains":
        return <AssociatedDomains {...props} />;
      case "ip_stats":
        return <IpStats {...props} />;
      default:
        return <ResultViewer apiKey={apiKey} queryValue={queryValue} endpoint={endpoint} setResult={setResult} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🔍 SecurityTrails Explorer</h1>
      <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
      <DomainInput queryValue={queryValue} setQueryValue={setQueryValue} />
      <EndpointSelector endpoint={endpoint} setEndpoint={setEndpoint} />
      <QueryButton onClick={handleRunQuery} />
      <div className="mt-6">{renderComponent()}</div>
    </div>
  );
};

export default App;