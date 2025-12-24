import { useState } from "react";
import axios from "axios";
function Payment(){

    const[amountdata , setAmountData]  = useState("")
     


    const handelChange = (e) =>{
        setAmountData({...amountdata , [e.target.name]: e.target.value});
    };

    const handelSubmit = async (e) => {
            e.preventDefault();
    
            try{
                await axios.post("http://localhost:8080/api/saveamount" , amountdata);
                alert("Amount Add Successfully");
            }
            catch (error){
                alert("Amount failed");
    
            }
    
        }

        


    return(

        <>

    <div className="register">
        <form className="fm" onSubmit={handelSubmit}>
            <div className="hed">
                <h1 id="ti">Ammount form</h1>
            </div>

        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Add Mount</label>
            <input type="text" className="form-control" id="exampleInputPassword1" name="amount" onChange={handelChange}/>
        </div>
    
        <button type="submit" className="btn btn-primary">Submit</button>
        
    </form>
    </div>
    </>

    );
}
export default Payment;