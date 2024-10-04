import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./navbar.css";
import { FaHome, FaTrophy} from 'react-icons/fa';

function Navbar() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
  };
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-1 w-75 mx-auto mt-2 rounded ">
        <div class="container-fluid w-50">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo01">

            <ul class="navbar-nav mb-2 mb-lg-0 mx-auto fs-6">
              <li class="nav-item  me-3">
                <Link 
                    className={`nav-link ${activeTab == '/' ? 'active text-primary' : ''}`}
                    aria-current="page" 
                    to="/"
                    onClick={() => handleTabClick('/')}
                >
                  <FaHome className="me-1 mt-n5" /> Home
                </Link>
              </li>
              <li class="nav-item ms-3">
                <Link 
                    className={`nav-link ${activeTab == '/ranks' ? 'active text-primary' : ''}`}
                    to="/ranks"
                    onClick={() => handleTabClick('/ranks')}
                >
                  <FaTrophy className="me-1 mt-n2" /> Leaderboard
                </Link>
              </li>
            </ul>
            <div className="profile-button-wrapper">
              <button 
                className="btn me-2 shadow-lg rounded-circle profile-button"
                onClick={() => window.location.href='profile'}
                >
              </button>
            </div>
          </div>
        </div>
    </nav>
  )
};

export default Navbar;