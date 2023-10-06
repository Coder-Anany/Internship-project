import React, { useEffect, useState } from "react";
import Page from './component/Page';
import { toast } from 'react-toastify';

function App() {
  const [apiData, setApiData] = useState([]);
  const url = "https://opentdb.com/api.php?amount=49&category=9&type=multiple";

  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setApiData(data.results);
    } catch (error) {
      console.error("API Error", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#c14747] overflow-hidden">
      <main className="container mx-auto w-11/12 mt-5">
        <Page apiData={apiData} />
      </main>
    </div>
  );
}

export default App;
