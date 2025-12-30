import Header from "./Header";
import {useState} from "react";

function AddProduct() {

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [file,setFile] = useState("");
    const [description,setDescription] = useState("");

    async function addProduct() {
        console.log(name, file, price, description)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", file);
        formData.append("price", price);
        formData.append("description", description);

        let result = await fetch("http://localhost:8000/api/addproduct",{
            method:"POST",
            body: formData
        })
        alert("Data has been saved");
    }
    return(
        <>
            <Header/>
            <div className="col-sm-6 offset-sm-3">
                <br></br>
                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                <br></br>
                <input type="file" className="form-control" onChange={(e)=> setFile(e.target.files[0])} placeholder="file"/>
                <br></br>
                <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} placeholder="price"/>
                <br></br>
                <input type="description" className="form-control" onChange={(e) => setDescription(e.target.value)} placeholder="Description"/>
                <button className="btn btn-primary" onClick={addProduct} >Add Product</button>
                
            </div>
        </>
        
    )
}

export default AddProduct