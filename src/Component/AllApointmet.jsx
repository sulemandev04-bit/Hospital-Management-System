import "./AllApointment.css";
import { useState , useEffect } from "react";
import axios from "axios"
function AllApointment(){
    const [appoint , setAppoint] = useState([]);
    
     useEffect( () =>{
         const getdataall = async() =>{
            try{
              const response  = await axios.get("http://localhost:8080/api/allappointment");
              setAppoint(response.data);
            }
            catch{
              alert("data not found from database");
            }
    
          }
          getdataall();
        },[])

    return (

         <div className='mytable'>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Id.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Time</th>
                <th scope="col">Date</th>
                <th scope="col">Doctor Name</th>
                <th scope="col">Reasion</th>
              </tr>
            </thead>
            <tbody>

                {
                appoint.length > 0 ?(
                  appoint .map((myappointfil) =>(
                    <tr key = {myappointfil.id}>
                      <td>{myappointfil.id}</td>
                      <td>{myappointfil.name}</td>
                      <td>{myappointfil.email}</td>
                      <td>{myappointfil.time}</td>
                      <td>{myappointfil.date}</td>
                      <td>{myappointfil.dname}</td>
                      <td>{myappointfil.reasion}</td>
                    </tr>
              ))
                ):(
                  <tr>
                    <td colSpan="4"> No Appointment Found</td>
                  </tr>
                )}
           </tbody>
          </table>
  
        </div>


    );
}
export default AllApointment;