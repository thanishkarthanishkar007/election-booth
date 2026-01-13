import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaVoteYea, FaSignOutAlt, FaUser } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <FaVoteYea /> Smart Election Support
        </Link>
        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              <Link to="/voter-validation" className="navbar-link">Voter Validation</Link>
              <Link to="/voter-forms" className="navbar-link">Voter Forms</Link>
              <Link to="/complaints" className="navbar-link">Complaints</Link>
              <Link to="/chatbot" className="navbar-link">Chatbot</Link>
              {isAdmin() && (
                <Link to="/admin" className="navbar-link">Admin</Link>
              )}
              <div className="navbar-user">
                <FaUser /> {user.name}
              </div>
              <button onClick={handleLogout} className="navbar-logout">
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

