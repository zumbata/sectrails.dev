

import React, { useEffect, useState } from "react";
import axios from "axios";

const formatDate = (timestamp) =>
  timestamp ? new Date(timestamp).toLocaleDateString() : "—";

const WhoisHistory = ({ apiKey, queryValue, setResult }) => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!apiKey || !queryValue) return;

    const fetchWhois = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/domain/${queryValue}/whois`, {
          headers: { apikey: apiKey },
        });
        setRecords(res.data.result?.items || []);
        setResult(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWhois();
  }, [apiKey, queryValue]);

  if (loading) return <p className="text-sm text-gray-600">Loading WHOIS history...</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error}</p>;

  return (
    <div className="mt-4 bg-white p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">WHOIS History</h2>
      {records.length === 0 ? (
        <p className="text-sm text-gray-600">No WHOIS records found.</p>
      ) : (
        <div className="space-y-4">
          {records.map((rec, i) => (
            <div key={i} className="border p-3 rounded bg-gray-50">
              <p><strong>Registrar:</strong> {rec.registrarName || "—"}</p>
              <p><strong>Created:</strong> {formatDate(rec.createdDate)}</p>
              <p><strong>Updated:</strong> {formatDate(rec.updatedDate)}</p>
              <p><strong>Expires:</strong> {formatDate(rec.expiresDate)}</p>
              <p><strong>Domain:</strong> {rec.domain}</p>
              <p><strong>Status:</strong> {(rec.status || []).join(", ")}</p>
              <p><strong>Name Servers:</strong> {(rec.nameServers || []).join(", ")}</p>
              <div className="mt-2">
                <p className="font-medium">Contacts:</p>
                <ul className="text-sm list-disc list-inside">
                  {(rec.contact || []).map((c, idx) => (
                    <li key={idx}>
                      [{c.type}] {c.name || ""} - {c.email || c.contactEmail || "n/a"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WhoisHistory;