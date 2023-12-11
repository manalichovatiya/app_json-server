import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [result , setresult] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3002/posts").then((res) => {
      setresult(res.data);
    })
  }, []);

  return (
    <>
      {
        result?.map((v,i)=>{
         return (
          <>
          <h1>{v.id}</h1>
          <h2>{v.title}</h2>
          <h3>{v.author}</h3>
          </>

         )
        })
      }
    </>
  );
}

export default App;
