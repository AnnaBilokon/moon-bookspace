import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import logoImage from '../../images/logo1.png'

export default function Header() {
  const [menu, setMenu] = useState('bookshop')

  return (
    <div className="header">
      <div
        onClick={() => {
          setMenu('logo')
        }}
        className="header_logo"
      >
        <Link to="/">
          <img src={logoImage} alt="logo" className="logo-image" />
        </Link>
        {menu === 'logo' ? <hr /> : <></>}
      </div>
      <ul className="header_menu">
        <li
          onClick={() => {
            setMenu('home')
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
          {menu === 'home' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('shop')
          }}
        >
          <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>
            Challenge
          </Link>
          {menu === 'shop' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('categories')
          }}
        >
          <Link
            to="/categories"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Genres
          </Link>{' '}
          {menu === 'categories' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('events')
          }}
        >
          <Link
            to="/events"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Favourites
          </Link>{' '}
          {menu === 'events' ? <hr /> : <></>}
        </li>
      </ul>
      <i class="fas fa-coffee"></i>
      <div className="nav_login_cart">
        <Link to="/login">
          <p className="login-btn"> Log In</p>
        </Link>
        <Link to="/login">
          <button className="signup-btn"> Sign Up</button>
        </Link>
      </div>
    </div>
  )
}
