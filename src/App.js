import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [result, setresult] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/comments ')
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setresult(data)
      })
  }, [])

  return (
    <>
      {
        result?.map((v, i) => {
          return (
            <>
              <h1>{v.id}</h1>
              <h4>{v.title}</h4>
              <p>{v.body}</p>
            </>
          )
        })
      }
    </>
  );
}

export default App;
