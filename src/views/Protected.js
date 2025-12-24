import Headers from "./Header"
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Protected(props) {
    let Component = props.component;
    useEffect(() => {
        if(!localStorage.getItem("user-info")) {
            navigate("/register")
        }
    })

    const navigate = useNavigate();

    return(
        <>
            <div>
                <Component/>
            </div>
        </>
        
    )
}

export default Protected