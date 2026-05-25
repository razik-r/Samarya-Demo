import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-brand">
          ShopHub
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/checkout" className="navbar-link">
            Cart
          </Link>
        </div>

        <div className="navabr-auth">
            <div className="navbar-auth-links">
            <Link to="/auth" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/auth" className="btn btn-primary">
                Signup
              </Link>
            </div>
         </div>


        </div>
        </nav>
    );
};

// const styles = {
//     navbar: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: '10px 20px',
//         backgroundColor: '#333',
//         color: '#fff',
//     },
//     logo: {
//         fontSize: '24px',
//         fontWeight: 'bold',
//     },
//     navLinks: {
//         listStyle: 'none',
//         display: 'flex',
//         gap: '15px',
//         margin: 0,
//         padding: 0,
//     },
//     link: {
//         textDecoration: 'none',
//         color: '#fff',
//         fontSize: '18px',
//     },
// };

export default Navbar;