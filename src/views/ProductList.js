import React, {useState, useEffect} from "react";
import Header from "./Header";
import {Table} from "react-bootstrap"
import {Link} from "react-router-dom";

function ProductList() {

    const [data,setData] = useState([]);
    const [currentPage,setCurrentpage] = useState(1);
    const [lastPage, setLastpage] = useState(1);

    const numsPages = [];
    for(let i = 1; i <= lastPage; i++) {
        numsPages.push(i);
    }

    useEffect(() => {
        renderData(currentPage);
    },[currentPage])

    async function deleteOperation(id,currentPage) {
        let result = await fetch("http://localhost:8000/api/delete/" + id, {
            method: "DELETE"
        });
        result = await result.json();
        renderData(currentPage);
    }

    function renderData(page) {
        async function fetchResult() {
            let result = await fetch("http://localhost:8000/api/list?page=" + page);
            result = await result.json();
            setData(result.data);
            setLastpage(result.last_page)
        }
       fetchResult();
    }

    function nextPage() {
        if(currentPage < lastPage) {
            setCurrentpage(currentPage + 1);
        }
    }

    function previousPage() {
        if(currentPage > 1) {
            setCurrentpage(currentPage - 1);
        }
    }



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
                                    <button className="btn btn-danger" onClick={() => deleteOperation(item.id,currentPage)}>Delete</button>
                                    <Link className="btn btn-secondary"  to={"updateproduct/" + item.id}>Edit</Link>
                                    </td>
                            </tr>
                        )
                        }
                    </tbody>
                
                </Table>
                <div className="pagination">
                    <button className="btn btn-primary" onClick={previousPage} disabled={currentPage===1}>Previous</button>
                    {
                        numsPages.map((num) => {
                            return <button key={num} className={currentPage === num ? "btn btn-primary" : "btn btn-outline-primary"} disabled={num === currentPage} onClick={() =>setCurrentpage(num)}>{num}</button>
                        })
                    }
                    <button className="btn btn-primary" onClick={nextPage} disabled={currentPage===lastPage}>Next</button>
                </div>
            </div>
            
        </>
        
    )
}

export default ProductList;