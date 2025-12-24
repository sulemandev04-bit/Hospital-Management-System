import { Link } from "react-router-dom";
function Navebar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <h5>AGASHE HOSPITAL</h5>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav d-flex justify-content-end">
                        <Link className="nav-link" to="/home">Home</Link>
                        <Link className="nav-link" to="/about">About Us</Link>
                        <Link className="nav-link" to="/signin">Signin</Link>
                    </div>
                    </div>
                </div>
            </nav>

    );
}
export default Navebar;