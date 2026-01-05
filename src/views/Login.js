import Headers from "./Header"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function Login() {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("user-info")) {
            navigate("/addproduct");
        }
    },[]);


    async function login() {
        console.log("email " + email, "password " + password)
        let item = {email, password};
        let result = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result))
        navigate("/addproduct");
    }
    return(
        <>
            <Headers/>
            <div className="col-sm-6 offset-sm-3">
                <h1>Login page</h1>
                <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="email" className="form-control"></input>
            <br/>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" className="form-control"></input>
            
            <button onClick={login} className="btn btn-primary login-reg">Login</button>
            </div>
        </>
        
    )
}

export default Login