import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    //CRUD full crud
    const [result, setresult] = useState([])
    const [result1, setresult1] = useState({})
    const [index, setindex] = useState()
    // for post API
    const title = useRef();
    const author = useRef();

    useEffect(() => {
        axios.get("http://localhost:3002/posts").then((res) => {
            setresult(res.data);
        })
    }, []);

    function submitData() {
        const input_ = {
            title: title.current.value,
            author: author.current.value
        }
        axios.post("http://localhost:3002/posts", input_).then((res) => {
            setresult([...result, input_])
        })
    }

    function deleteData(id) {
        console.log(id, "delete");
        axios.delete(`http://localhost:3002/posts/${id}`).then((res) => {
            // console.log(res.status);
            setresult(result.filter((e) => e.id !== id))
        })
    }

    function updateData(v,i) {
        setindex(i)
        setresult1(v);
    }

    function input_Update(e) {
        setresult1({ ...result1, [e.target.name]: e.target.value })
    }

    function updatefinal_Data() {
        axios.put(`http://localhost:3002/posts/${result1.id}`, result1).then((res) => {
        result.splice(index,1,result1)
        setresult([...result])
        })
    }
    return (
        <>
            <input type='text' name='title' placeholder='enter title...' ref={title} />
            <input type='text' name='author' placeholder='enter author...' ref={author} />
            <button onClick={submitData}>Submit</button>
            <input type='text' name='title' placeholder='enter title...' onChange={input_Update} value={result1.title} />
            <input type='text' name='author' placeholder='enter author...' onChange={input_Update} value={result1.author} />
            <button onClick={updatefinal_Data}>Update</button>
            {
                result?.map((v, i) => {
                    return (
                        <>
                            <h2>{v.title}</h2>
                            <h3>{v.author}</h3>
                            <button onClick={() => deleteData(v.id)}>Delete</button>
                            <button onClick={() => updateData(v,i)}>Update</button>
                        </>
                    )
                })
            }
        </>
    );
}

export default App;
