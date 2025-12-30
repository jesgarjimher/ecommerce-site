import Header from "./Header"
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

function UpdateProduct() {
    const {id} = useParams();

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [file,setFile] = useState("");
    const [description,setDescription] = useState("");

    const [data,setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let result = await fetch("http://localhost:8000/api/product/" + id)
            result = await result.json();
            setData(result);
            
            setName(result.name)
            setPrice(result.price)
            setDescription(result.description)
        }
        fetchData();
        
    },[])


    async function editProduct() {
        const formData = new FormData;

        formData.append("name", name);
        formData.append("price",price);
        formData.append("file",file);
        formData.append("description",description);

        let result = await fetch("http://localhost:8000/api/editproduct/" + id, {
            method: "POST",
            body: formData
        })
        alert("Product has been updated")
    }

    return(
        <>
            <Header/>
            <div className="col-sm-6 offset-sm-3">
                <h1>Update product</h1>
                <h2>{data.name}</h2>
                <input type="text" className="form-control" defaultValue={data.name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" className="form-control" defaultValue={data.price} onChange={(e) => setPrice(e.target.value)}/>
                <input type="text" className="form-control" defaultValue={data.description} onChange={(e) => setDescription(e.target.value)}/>
                <input type="file" className="form-control" defaultValue={data.file_path} onChange={(e) => setFile(e.target.files[0])}/>
                <img src={"http://localhost:8000/storage/" + data.file_path} className="img-product" alt={"Photography of " + data.description}></img>
                <div>
                    <button className="btn btn-success" onClick={editProduct}>Save changes</button>
                </div>
            </div>
        </>
        
    )
}

export default UpdateProduct