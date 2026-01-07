import React, {useState, useEffect} from "react";
import Header from "./Header";
import {Table} from "react-bootstrap"
import {Link, useParams, useNavigate} from "react-router-dom";



function ProductList() {

    const [data,setData] = useState([]);
    const {id} = useParams();
    const [errors,setErrors] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                let result = await fetch("http://localhost:8000/api/product/" + id);
                
                if(!result.ok) {
                    throw new Error("Product doesn't exist");
                }
                
                result = await result.json();
                setData(result);

                console.log("result ",result)
                console.log("data",data)
            }catch(error) {
                setErrors(error);
            }
            
        }
        fetchData();
        
    },[])

    async function deleteOperation(id) {
        if(window.confirm("Do you really want to delete this product?")) {
            try {
                let result = await fetch("http://localhost:8000/api/delete/" + id, {
                    method: "DELETE"
                });
                if(!result.ok) {
                    const dataError = await result.json();
                    throw new Error(dataError.message);
                }
                alert("The product has been deleted");
                navigate("/")
            
            }catch(error) {
                alert("Error " + error.message);
            }
        }
        
    }


 
    if(errors) 
        return (
        <>
            <Header />
            <div className="alert alert-danger window-error">
                <p>⚠️ {errors.message}</p>
                <Link to="/">&#8617; Return to see all the products</Link>
            </div>
        </>
            
        )
    

    return(
        <>
            <Header />
            <h1 className="title">{data.name}</h1>
            <div className="product-card">
                <div id="container-img-product">
                    <img src={"http://localhost:8000/storage/" + data.file_path} alt={"Photography of " + data.description}></img>
                </div>
                <div className="product-info">
                    <h2>{data.name}</h2>
                    <p>{data.price}€</p>
                    <p>Characteristics of the product: {data.description}</p>
                    <div className="product-btns">
                        <button className="btn btn-danger" onClick={() => deleteOperation(data.id)}>Delete</button>
                        <Link className="btn btn-secondary"  to={"/updateproduct/" + data.id}>Edit</Link>
                    </div>
                               
                </div>
            </div>
            
        </>
        
    )
}

export default ProductList;