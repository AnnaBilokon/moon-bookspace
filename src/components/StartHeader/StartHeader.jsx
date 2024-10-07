import React from 'react'
import './StartHeader.css'
import { Link } from 'react-router-dom'
import logoImage from '../../images/logo1.png'

export default function StartHeader() {
  return (
    <div className="start-header">
      <div className="start-header_logo">
        <Link to="/">
          <img src={logoImage} alt="logo" className="logo-image" />
        </Link>
      </div>
      <i class="fas fa-coffee"></i>
      <div className="nav_login_cart">
        <Link to="/login">
          <p className="login-btn"> Log In</p>
        </Link>
        <Link to="/signup">
          <button className="signup-btn"> Sign Up</button>
        </Link>
      </div>
    </div>
  )
}
