import Headers from "./Header"
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

function UpdateProduct() {
    const {id} = useParams();

    const [data,setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let result = await fetch("http://localhost:8000/api/product/" + id)
            result = await result.json();
            setData(result);
            console.log("result => ",result)
        }
        fetchData();
        
    },[])
    return(
        <>
            <Headers/>
            <div>
                <h1>Update product</h1>
                <h2>{data.name}</h2>
                <input type="text" defaultValue={data.name}/>
                <input type="text" defaultValue={data.price}/>
                <input type="text" defaultValue={data.description}/>
                <input type="file" defaultValue={data.file_path}/>
                <img src={"http://localhost:8000/storage/" + data.file_path} className="img-product" alt={"Photography of " + data.description}></img>
            </div>
        </>
        
    )
}

export default UpdateProduct