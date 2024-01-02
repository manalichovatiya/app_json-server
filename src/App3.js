import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    // Get and Post And Delete API
    const [result, setresult] = useState([])
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
        console.log(id , "delete");
        axios.delete(`http://localhost:3002/posts/${id}`).then((res)=>{
            // console.log(res.status);
            setresult(result.filter((e)=>e.id !== id))
        })
    }
    return (
        <>
            <input type='text' name='title' placeholder='enter title...' ref={title} />
            <input type='text' name='author' placeholder='enter author...' ref={author} />
            <button onClick={submitData}>Submit</button>
            {
                result?.map((v, i) => {
                    return (
                        <>
                            <h2>{v.title}</h2>
                            <h3>{v.author}</h3>
                            <button onClick={()=>deleteData(v.id)}>Delete</button>
                        </>

                    )
                })
            }
        </>
    );
}

export default App;
