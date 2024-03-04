import axios from 'axios';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [data, setdata] = useState([])
  const [index, setindex] = useState()
  const [putinput, setputinput] = useState({})
  const title = useRef()
  const author = useRef()

  useEffect(() => {
    axios.get('http://localhost:3001/posts').then((res) => {
      setdata(res.data)
    })
  }, [])

  const handleAdd = () => {
    const inputData = {
      title: title.current.value,
      author: author.current.value
    }
    axios.post('http://localhost:3001/posts', inputData).then(() => {
      setdata([...data, inputData])
    })
  }
  const handleDelete = (id, index) => {
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setdata(data.filter((e) => e.id !== id));
    });
  }
  const handleUpdate = (val, ind) => {
    console.log(val, "inpuerwuj");
    setputinput(val)
    setindex(ind)
  }
  const handleSave = (e) => {
    setputinput({ ...putinput, [e.target.name]: e.target.value })
  }
  const finalsave = () => {
    axios.put(`http://localhost:3001/posts/${putinput.id}`, putinput).then(() => {
      data.splice(index, 1, putinput)
      setdata([...data])
    })
  }

  return (
    <>
      <input type='text' name='title' ref={title} />
      <input type='text' name='author' ref={author} />
      <button onClick={handleAdd}>Add</button>
      <input type='text' name='title' value={putinput.title} onChange={(e) => handleSave(e)} />
      <input type='text' name='author' value={putinput.author} onChange={(e) => handleSave(e)} />
      <button onClick={finalsave}>Save</button>
      {data?.map((val, ind) => {
        return (
          <>
            <h1>{val.title}</h1>
            <h2>{val.author}</h2>
            <button onClick={() => handleDelete(val.id, ind)}>Delete</button>
            <button onClick={() => handleUpdate(val, ind)}>Update</button>
          </>
        )
      })}
    </>
  );
}

export default App;
