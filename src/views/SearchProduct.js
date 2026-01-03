import { Link } from "react-router-dom";
import Header from "./Header";
import {useState} from "react";
import { Table } from "react-bootstrap";

function SearchProduct() {

    const [data,setData] = useState([]);

    async function search(key) {
        let result = await fetch("http://localhost:8000/api/search/" + key);
        result = await result.json();
        console.log(key)
        setData(result);
    }

     async function deleteOperation(id) {
        let result = await fetch("http://localhost:8000/api/delete/" + id, {
            method: "DELETE"
        });
        result = await result.json();
        search();
    }
    
    
    return(
        <>
            <Header/>
            <div className="col-sm-6 offset-sm-3 component-container">
               <h1 className="title">Search all products</h1>
              
               <input type="text" className="form-control input-search" onChange={(e) => search(e.target.value)}></input>
            </div>

             <div className="col-sm-8 offset-sm-2">
                <Table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Description</td>
                            <td>Image</td>
                            <td>Operations</td>
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
                                <td><img className="img-product" src={"http://localhost:8000/storage/" + item.file_path} alt={`Photography of ${item.description}`}></img>{}</td>
                                <td className="options-td">
                                    <button className="btn btn-danger" onClick={() => deleteOperation(item.id)}>Delete</button>
                                    <Link className="btn btn-secondary"  to={"/updateproduct/" + item.id}>Edit</Link>
                                    </td>
                            </tr>
                        )
                        }
                    </tbody>
                
                </Table>
            </div>
        </>
        
    )
}

export default SearchProduct;