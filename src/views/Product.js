import React, {useState, useEffect} from "react";
import Header from "./Header";
import {Table} from "react-bootstrap"
import {Link, useParams} from "react-router-dom";


function ProductList() {

    const [data,setData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        async function fetchData() {
            let result = await fetch("http://localhost:8000/api/product/" + id);
            result = await result.json();
            setData(result);
            console.log("result ",result)
            console.log("data",data)
        }
        fetchData();
        
    },[])

    async function deleteOperation(id) {
        let result = await fetch("http://localhost:8000/api/delete/" + id, {
            method: "DELETE"
        });
        result = await result.json();
        
    }


 
    return(
        <>
            <Header />
            <h1 className="title">{data.name}</h1>
            <div className="col-sm-8 offset-sm-2 product-card">
                <div id="container-img-product">
                    <img src={"http://localhost:8000/storage/" + data.file_path} alt={"Photography of " + data.description}></img>
                </div>
                <div className="product-info">
                    <h2>{data.name}</h2>
                    <p>{data.price}€</p>
                    <p>Characteristics of the product: {data.description}</p>
                    <div className="product-btns">
                        <button className="btn btn-danger" onClick={() => deleteOperation(data.id)}>Delete</button>
                        <Link className="btn btn-secondary"  to={"updateproduct/" + data.id}>Edit</Link>
                    </div>
                               
                </div>
            </div>
            
        </>
        
    )
}

export default ProductList;