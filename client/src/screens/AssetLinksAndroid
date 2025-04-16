import React, { useState, useEffect } from 'react';

const DisplayAssetLinks = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssetLinks = async () => {
      try {
        const response = await fetch('/assetlinks.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAssetLinks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
};

export default DisplayAssetLinks;
