import Header from "./Header";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


function AddProduct() {

    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [file,setFile] = useState("");
    const [description,setDescription] = useState("");
    const [errors,setErrors] = useState({});

    async function addProduct() {
        setErrors({});
        console.log(name, file, price, description)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", file);
        formData.append("price", price);
        formData.append("description", description);

        try {
            let result = await fetch("http://localhost:8000/api/addproduct",{
            method:"POST",
            body: formData
            })

            let data = await result.json();
            if(result.status === 422) {
                setErrors(data.errors);
            }else if(!result.ok) {
                alert("Something went wrong in the server");
            }else {
                alert("The product was added successfully");
               navigate("/");
            }
        }catch(error) {
            alert("Connection error:  " + error.message);
        }
        
    }
    return(
        <>
            <Header/>
            <div className="col-sm-6 offset-sm-3 component-container">
                <br></br>
                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                {errors.name && <span className="text-danger">{errors.name[0]}</span>}
                <br></br>
                <input type="file" className="form-control" onChange={(e)=> setFile(e.target.files[0])} placeholder="file"/>
                {errors.file && <span className="text-danger">{errors.file[0]}</span>}
                <br></br>
                <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} placeholder="price"/>
                {errors.price && <span className="text-danger">{errors.price[0]}</span>}
                <br></br>
                <input type="description" className="form-control" onChange={(e) => setDescription(e.target.value)} placeholder="Description"/>
                {errors.description && <span className="text-danger">{errors.description[0]}</span>}
                
                <button className="btn btn-primary btn-add" onClick={addProduct} >Add Product</button>
                
            </div>
        </>
        
    )
}

export default AddProduct