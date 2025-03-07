import React, { useState, } from "react";
import { useAuth } from "./hooks/useAuth";
import axios from "axios";

const IModelDetails: React.FC = () => {
  const accessToken = useAuth();
  const [iModelId, setIModelId] = useState<string>("");
  const [iModelDetails, setIModelDetails] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchIModelDetails = async () => {
    if (!accessToken || !iModelId) return;

    try {
      const response = await axios.get(`https://api.bentley.com/imodels/${iModelId}`, {
        headers: {
          Authorization: accessToken,
          Accept: "application/vnd.bentley.itwin-platform.v2+json",
        },
      });
      setIModelDetails(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch iModel details");
      setIModelDetails(null);
    }
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIModelId(event.target.value);
  };

  const handleFetchClick = () => {
    fetchIModelDetails();
  };

  return (
    <div>
      <input type="text" placeholder="Enter iModel ID" value={iModelId} onChange={handleInputChange} />
      <button onClick={handleFetchClick}>Fetch Details</button>
      {error && <div>Error: {error}</div>}
      {iModelDetails && (
        <div>
          <h2>iModel Details</h2>
          <pre>{JSON.stringify(iModelDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default IModelDetails;