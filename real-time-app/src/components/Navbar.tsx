import { Link } from 'react-router-dom';
import logo from '../assets/site_logo.png';
import '../styles/Navbar.css';


/*
  Navbar Component:
    Reusable Navbar Component that lives at the App level above the main content which switches

  Props:
    - Nothing
  
  Dependencies:
    - Logo from assets
    - Link used to navigate with buttons
*/
function Navbar(){
    return(
        <nav className="navbar">
            <div className="left_nav">
                <Link to="/" className="name">
                    <img className="image" src={logo} alt="Logo"/>
                        NetCode
                </Link>
            </div>
            <div className="mid_nav">
            </div>
            <div className="right_nav">

            </div>
        </nav>
    )
}
export default Navbar;
