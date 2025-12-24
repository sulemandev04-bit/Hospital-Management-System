
import Navebar from './Component/Navebar';
import './Login.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Login(){

    const [email, setEmail]  = useState("");
    const [password, setPassword]  = useState("");
    const [message, setMessage]  = useState("");

    const navigate  = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8080/api/login" ,{
                email,
                password
            } );

            setMessage(response.data)
            if(response.data === "Login successfull"){
                alert("Login Successfully");
                navigate("/dashboard");
            }
        }
        catch (error){
            setMessage("Login failed")

        }

    }

    return(
        <>
        <div>
            <Navebar/>
        </div>

    <div className="register">
        <form className="fm" onSubmit={ handelSubmit}>
            <div className="hed">
                <h1 id="ti">Login Form</h1>
            </div>

            {message && <p id='message' style={{color:"red"}}>{message}</p>}

        <div className="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" name='email' onChange={ (e) => setEmail(e.target.value)}/>
        
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password'  onChange={ (e) => setPassword(e.target.value)}/>
            
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
        
    </form>
    </div>
    </>
    )
}
export default Login;