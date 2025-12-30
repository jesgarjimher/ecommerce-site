import React, {useState, useEffect} from "react";
import Header from "./Header";
import {Table} from "react-bootstrap"

function ProductList() {

    const [data,setData] = useState([]);

    useEffect(() => {
        async function fetchResult() {
            let result = await fetch("http://localhost:8000/api/list");
            result = await result.json();
            setData(result);
        }
        fetchResult();
    },[])

    console.log("Result: ", data)

    return(
        <>
            <Header />
            <h1>Product List </h1>
            <div className="col-sm-8 offset-sm-2">
                <Table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Description</td>
                            <td>Image</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        data.map((item) => 
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img className="img-product" src={"http://localhost:8000/storage/" + item.file_path}></img>{}</td>
                            </tr>
                        )
                        }
                    </tbody>
                
                </Table>
            </div>
            
        </>
        
    )
}

export default ProductList;