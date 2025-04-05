import { Link } from 'react-router-dom';
import logo from '../assets/react.svg';
import './styles/Navbar.css';

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
