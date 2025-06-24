// src/components/ResultViewer.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ResultViewer = ({ apiKey, queryValue, endpoint, result }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!result?.trigger || !apiKey || !queryValue || !endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const headers = { apikey: apiKey };
        let res;

        switch (endpoint) {
          case "domain_details":
            res = await axios.get(`/api/domain_details/${queryValue}`, { headers });
            break;
          case "domain_whois":
            res = await axios.get(`/api/domain_whois/${queryValue}`, { headers });
            break;
          case "domain_whois_history":
            res = await axios.get(`/api/domain_whois_history/${queryValue}`, { headers });
            break;
          case "subdomains":
            res = await axios.get(`/api/subdomains/${queryValue}`, { headers });
            break;
          case "domain_tags":
            res = await axios.get(`/api/domain_tags/${queryValue}`, { headers });
            break;
          case "associated_domains":
            res = await axios.get(`/api/associated_domains/${queryValue}`, { headers });
            break;
          case "domain_ssl":
            res = await axios.get(`/api/domain_ssl/${queryValue}`, { headers });
            break;
          case "ip_details":
            res = await axios.get(`/api/ip_details/${queryValue}`, { headers });
            break;
          case "ip_neighbors":
            res = await axios.get(`/api/ip_neighbors/${queryValue}`, { headers });
            break;
          case "ip_useragents":
            res = await axios.get(`/api/ip_useragents/${queryValue}`, { headers });
            break;
          case "ip_whois":
            res = await axios.get(`/api/ip_whois/${queryValue}`, { headers });
            break;
          default:
            throw new Error("Unsupported endpoint");
        }

        setData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [result, apiKey, queryValue, endpoint]);

  return (
    <div className="mt-4 bg-white p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">API Result</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {data && (
        <pre className="bg-gray-100 p-2 text-sm overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ResultViewer;
