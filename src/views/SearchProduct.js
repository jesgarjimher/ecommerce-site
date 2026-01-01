import Header from "./Header";
import {useState} from "react";

function SearchProduct() {

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [file,setFile] = useState("");
    const [description,setDescription] = useState("");

    async function addProduct() {
        
    }
    return(
        <>
            <Header/>
            <div className="col-sm-6 offset-sm-3">
               <h1>Search product</h1>
               <br></br>
               <input type="text" className="form-control"></input>
            </div>
        </>
        
    )
}

export default SearchProduct;