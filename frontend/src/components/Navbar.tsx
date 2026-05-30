
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

type Props = {
  currentUser: string | null;
  setCurrentUser: (value: string | null) => void;
};

const Navbar = ({ currentUser, setCurrentUser }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="site-nav">
      {/* Brand */}
      <Link to="/" className="brand">
        <svg className="brand-icon" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M3 11.5 16 5l13 6.5L16 18 3 11.5Z" fill="currentColor" />
          <path d="M8 15.5v6c4.6 3.2 11.4 3.2 16 0v-6l-8 4-8-4Z" fill="currentColor" opacity="0.78" />
        </svg>
        <span>CollegeHub</span>
      </Link>

      {/* Navigation links */}
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
          Home
        </NavLink>
        <NavLink to="/compare" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
          Compare
        </NavLink>
        <NavLink to="/predictor" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
          Predictor
        </NavLink>
        <NavLink to="/discussions" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
          Discussions
        </NavLink>

        {/* Auth State */}
        {currentUser ? (
          <div className="profile-container">
            <button 
              type="button"
              className="profile-trigger" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar-fallback">
                  {getInitials(currentUser)}
                </div>
                <span className="profile-online-indicator"></span>
              </div>
              <span className="profile-name-display">{currentUser}</span>
              <svg 
                className={`chevron-icon ${dropdownOpen ? 'rotated' : ''}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Dropdown Card */}
            {dropdownOpen && (
              <>
                <div className="dropdown-overlay" onClick={() => setDropdownOpen(false)} />
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <p className="user-title">{currentUser}</p>
                    <p className="user-subtitle">Student Workspace</p>
                  </div>
                  
                  <div className="dropdown-divider" />
                  
                  <NavLink 
                    to="/saved" 
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span>Saved Colleges</span>
                  </NavLink>

                  <div className="dropdown-divider" />
                  
                  <button 
                    type="button"
                    onClick={() => { 
                      setCurrentUser(null); 
                      setDropdownOpen(false); 
                    }} 
                    className="dropdown-item logout-action"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link className="outline-button small-button login-btn-glowing" to="/login">
            <span>Login / Signup</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
