import React from 'react';
import "./navbar.css";
import { FaHome, FaTrophy} from 'react-icons/fa';

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-1 w-75 mx-auto mt-2 rounded ">
        <div class="container-fluid w-50">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo01">

            <ul class="navbar-nav mb-2 mb-lg-0 mx-auto fs-6">
              <li class="nav-item  me-3">
                <a className="nav-link active" aria-current="page" href="/">
                  <FaHome className="me-1 mt-n5" /> Home
                </a>
              </li>
              <li class="nav-item ms-3">
                <a className="nav-link" href="/ranks">
                  <FaTrophy className="me-1 mt-n2" /> Leaderboard
                </a>
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