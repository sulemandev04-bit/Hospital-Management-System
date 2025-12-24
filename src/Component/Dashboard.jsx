import * as React from 'react';
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import EventIcon from '@mui/icons-material/Event';
import './Dashboard.css'
import axios from "axios";

const drawerWidth = 240;

const formdisplay = () =>{

  const card = document.getElementById("card");

  if(card.style.display === "none"){
    card.style.display = "block";
  }
  else{
    card.style.display = "none";
  }

}

export default function Dashboard() {
  const[appointment , setAppointment] = React.useState({
    name:"",
    email:"",
    phone:"",
    date:"",
    time:"",
    dname:"",
    reasion:""

  })

  const handchange = (e)=>{
      setAppointment({...appointment ,[e.target.name]: e.target.value});
  }

  const handelSubmitForm = async (e) => {
          e.preventDefault();
  
          try{
              await axios.post("http://localhost:8080/api/bookappointment" , appointment);
              alert("Appointment Book successfully");
              navigate("/payment");
          }
          catch (error){
              alert("Appointment Book failed");
  
          }
      }

  const [totalappointment , setTotalappointment] = React.useState();

  useEffect( ()=>{
    const fetchappointment = async(e) => {
      try{
        const response = await axios.get("http://localhost:8080/api/getappointment")
        setTotalappointment(response.data);
      }

      catch{
        alert("data cannot find");
      }
    }
    fetchappointment();

    } ,[])

    const [appoint , setAppoint] = React.useState([]);
    const [searchName , setSearchname] = React.useState("");
    const [searchDoctor , setSearchDocter] = React.useState("");

    useEffect( () =>{
     const getdata = async() =>{
        try{
          const response  = await axios.get("http://localhost:8080/api/allappointment");
          setAppoint(response.data);
        }
        catch{
          alert("data not found from database");
        }

      }
      getdata();
    },[])

    const [getamout , setGetamount] = React.useState();
    useEffect( ()=>{
            const fetchamount = async(e) => {
              try{
                const response = await axios.get("http://localhost:8080/api/getallamount")
                setGetamount(response.data);
              }
        
              catch{
                alert("data cannot find");
              }
            }
            fetchamount();
        
            } ,[])


const filteredAppointments = Array.isArray(appoint)
  ? appoint.filter((a) => {
      // Safe conversion to string
      const name = String(a?.name || "").toLowerCase();
      const doctor = String(a?.dname || "").toLowerCase();

      // Your search terms
      const searchNameLower = searchName.toLowerCase();
      const searchDoctorLower = searchDoctor.toLowerCase();

      // Multiple conditions
      return (
        name.includes(searchNameLower) &&
        doctor.includes(searchDoctorLower)
      );
    })
  : [];

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        
          <ListItem disablePadding onClick = {()=> navigate("/appointment")}>
            <ListItemButton>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText>AllApointment</ListItemText>
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
        //   container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        <div className='mycard'>
           <div className="card">
             <h3>Appointment</h3>
             <p>Total Appointment : {totalappointment}</p>
           </div>
            <div className="card">
             <h3>Doctor</h3>
             <p>Total Doctor :6</p>
           </div>
            <div className="card">
             <h3>Amount</h3>
             <p>Total Amount :{getamout}</p>
            </div>
        </div>

        <div className='search'>
          <nav className="navbar navbar-light">
           <div className="container-fluid">
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search By Name" value={searchName} aria-label="Search" onChange={(e) =>setSearchname(e.target.value)}/>
            </form>
           </div>
          </nav>

          <nav className="navbar navbar-light">
           <div className="container-fluid">
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search By Doctor Name" value={searchDoctor} aria-label="Search" onChange={(e) =>setSearchDocter(e.target.value)}/>
            </form>
           </div>
          </nav>



          <button className="btn btn-outline-success " type="submit" onClick={formdisplay}>Add New Appoinment</button>
        </div>

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
                  filteredAppointments .map((myappointfil) =>(
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

        <div>
          <div className="registermyform">
             <form className="myfm" id='card' onSubmit={handelSubmitForm}>
               <div className="hed">
                <h1 id="ti">Appointment Form</h1>
               </div>
          
            <div className='fisrtrow'>
              <div className="mb-3">
               <label htmlFor="exampleInputEmail1" className="form-label lbl">Name</label>
               <input type="text" className="form-control allinp"  id="exampleInputEmail1" name="name" onChange={handchange} />
              </div>
              <div className="mb-3">
               <label htmlFor="exampleInputEmail1" className="form-label lbl">Email address</label>
               <input type="email" className="form-control allinp" id="exampleInputEmail1" name="email" onChange={handchange} />
             </div>
            </div>
        
           <div className='secondrow'>
            <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label lbl">Phone No.</label>
            <input type="tel" className="form-control allinp" id="exampleInputPassword1" name="phone" onChange={handchange}/>
           </div>

           <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label lbl">Date.</label>
            <input type="date" className="form-control allinp" id="exampleInputPassword1" name="date" onChange={handchange}/>
           </div>
           </div>

           <div className='thirdrow'>
            <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label lbl">Time.</label>
            <input type="time" className="form-control allinp" id="exampleInputPassword1" name="time" onChange={handchange}/>
           </div>

           <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label lbl">Doctor Name.</label>
            <input type="text" className="form-control allinp" id="exampleInputPassword1" name="dname"  onChange={handchange}/>
           </div>
           </div>

           <div className='fourthrow'>
            <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label lbl">Reason.</label>
            <textarea className="form-control" id="exampleInputPassword1" name="reasion" onChange={handchange}/>
           </div>
           </div>
        <button type="submit" className="btn btn-primary">Book Appointment</button>
        
    </form>
    </div>

        </div>

      </Box>
    </Box>
  );
}
