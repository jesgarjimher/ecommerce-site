import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Register() {

    const[name,setName] = useState("");
    const[password,setPassword] = useState("");
    const[email,setEmail] = useState("");
    const navigate = useNavigate();

    async function signUp() {
        let item = {name, password, email};
        console.log(item)

        let result = await fetch("http://localhost:8000/api/register",{
            method:"POST",
            body:JSON.stringify(item),
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        })

        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result));
        navigate("/addproduct")
    }

    return(
        <div className="col-sm-6 offset-sm-3">
            <h1>Register</h1>
            <input type="text" value={name} className="form-control" onChange={(e) => setName(e.target.value)} placeholder="name"></input>
            <br></br>
            <input type="password" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="password"></input>
            <br></br>
            <input type="text" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="email"></input>
            <button className="btn btn-primary" onClick={signUp}>Sign up</button>
        </div>
    )
}

export default Register