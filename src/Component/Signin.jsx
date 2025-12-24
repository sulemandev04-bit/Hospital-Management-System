import Navebar from "./Navebar";
import './Signin.css'
import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signin(){
    const[user , setUser]  = useState({
        name:"",
        email:"",
        password:""
    });

    const navigate  = useNavigate();


    const handelChange = (e) =>{
        setUser({...user , [e.target.name]: e.target.value});
    };

    const handelSubmit = async (e) => {
        e.preventDefault();

        try{
            await axios.post("http://localhost:8080/api/register" , user);
            alert("Registration successfully");
            navigate("/login");
        }
        catch (error){
            alert("Registration failed");

        }

    }


    return(
        <>
        <div>
            <Navebar/>
        </div>

    <div className="register">
        <form className="fm" onSubmit={handelSubmit}>
            <div className="hed">
                <h1 id="ti">Registratin Form</h1>
            </div>

        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" className="form-control" id="exampleInputEmail1" name="name" onChange={handelChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={handelChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handelChange}/>
        </div>
       
       <p>Already have an account ?{""}
        <Link to="/login">Login</Link>
       </p>
        <button type="submit" className="btn btn-primary">Submit</button>
        
    </form>
    </div>
    </>
    )
}
export default Signin;