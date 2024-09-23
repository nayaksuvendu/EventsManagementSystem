import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err); // Set error if fetch fails
      }
      setLoading(false);
    };

    fetchData();
  }, [url]); // Include url in dependencies to re-fetch when it changes

  const reFetch = async () => {
    setLoading(true);
    setError(null); // Reset error before refetch
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
