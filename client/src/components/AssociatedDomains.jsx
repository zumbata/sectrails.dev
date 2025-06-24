

import React, { useEffect, useState } from "react";
import axios from "axios";

const formatDate = (ts) =>
  ts ? new Date(ts).toLocaleDateString() : "—";

const AssociatedDomains = ({ apiKey, queryValue, setResult }) => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!apiKey || !queryValue) return;

    const fetchAssociated = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/domain/${queryValue}/associated`, {
          headers: { apikey: apiKey },
        });
        setRecords(res.data.records || []);
        setResult(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociated();
  }, [apiKey, queryValue]);

  if (loading) return <p className="text-sm text-gray-600">Loading associated domains...</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error}</p>;

  return (
    <div className="mt-4 bg-white p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Associated Domains</h2>
      {records.length === 0 ? (
        <p className="text-sm text-gray-600">No associated domains found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">Domain</th>
                <th className="text-left p-2">Company</th>
                <th className="text-left p-2">Mail Provider</th>
                <th className="text-left p-2">Host Provider</th>
                <th className="text-left p-2">Registrar</th>
                <th className="text-left p-2">Created</th>
                <th className="text-left p-2">Expires</th>
                <th className="text-left p-2">Alexa Rank</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{rec.hostname}</td>
                  <td className="p-2">{rec.computed?.company_name || "—"}</td>
                  <td className="p-2">{(rec.mail_provider || []).join(", ") || "—"}</td>
                  <td className="p-2">{(rec.host_provider || []).join(", ") || "—"}</td>
                  <td className="p-2">{rec.whois?.registrar || "—"}</td>
                  <td className="p-2">{formatDate(rec.whois?.createdDate)}</td>
                  <td className="p-2">{formatDate(rec.whois?.expiresDate)}</td>
                  <td className="p-2">{rec.alexa_rank ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssociatedDomains;