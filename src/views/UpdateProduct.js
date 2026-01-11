import Header from "./Header"
import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

function UpdateProduct() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [file,setFile] = useState("");
    const [description,setDescription] = useState("");

    const [data,setData] = useState([]);

    const [errors, setErrors] = useState(null)
    const [valError, setValError] = useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                let result = await fetch("http://localhost:8000/api/product/" + id)
                console.log(result)
                if(!result.ok) {
                    throw new Error("Couldn't fetch data");
                }
                result = await result.json()
                console.log("enJson => ",result)
                setData(result.data);
                
                setName(result.data.name)
                setPrice(result.data.price)
                setDescription(result.data.description)

            }catch(error) {
                setErrors(error.message);
            }
        }
        fetchData();
    },[id])


    async function editProduct() {
        setValError({});
        const formData = new FormData();

        formData.append("name", name);
        formData.append("price",price);
        formData.append("file",file);
        formData.append("description",description);

        try {
            let result = await fetch("http://localhost:8000/api/editproduct/" + id, {
            method: "POST",
            body: formData
        })
        if(result.status === 422) {
            const errorData = await result.json();
            setValError(errorData.errors);
            console.log(valError)
            return
        }

        if(!result.ok) {
            throw new Error("Could't update the product");
        }
        alert("Product has been updated")
        navigate("/")
        }catch(error){
            alert("Error " + error.message)
        }
        
        
    }

    return(
        <>
            <Header/>
            <div className="col-sm-4 offset-sm-3 form-update">
                <h1>Update product</h1>
                {
                    errors && (
                        <div className="alert alert-danger">
                            <p>An error happened: {errors}</p>
                            <Link to="/" className="link-name"> Return</Link>
                        </div>
                    )
                }

                {
                    !errors && (
                <>
                <h2>{data.name}</h2>
                <input type="text" className="form-control" defaultValue={data.name} onChange={(e) => setName(e.target.value)}/>
                {valError.name && <span className="text-danger">{valError.name}</span>}
                <input type="text" className="form-control" defaultValue={data.price} onChange={(e) => setPrice(e.target.value)}/>
                {valError.price && <span className="text-danger">{valError.price}</span>}
                <input type="text" className="form-control" defaultValue={data.description} onChange={(e) => setDescription(e.target.value)}/>
                {valError.description && <span className="text-danger">{valError.description}</span>}
                <input type="file" className="form-control" defaultValue={data.file_path} onChange={(e) => setFile(e.target.files[0])}/>
                {valError.file && <span className="text-danger">{valError.file[0]}</span>}
                <img src={"http://localhost:8000/storage/" + data.file_path} className="img-product" alt={"Photography of " + data.description}></img>
                <div>
                    <button className="btn btn-success" onClick={editProduct}>Save changes</button>
                </div>
                </>
                )}

                
            </div>
            
        </>
        
    )
}

export default UpdateProduct