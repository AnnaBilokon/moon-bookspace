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
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
          {menu === 'home' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('shop')
          }}
        >
          <Link
            to="/search"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Search
          </Link>
          {menu === 'shop' ? <hr /> : <></>}
        </li>
        {/* <li
          onClick={() => {
            setMenu('categories')
          }}
        >
          <Link
            to="/mychallenge"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            My Challenge
          </Link>{' '}
          {menu === 'mychallenge' ? <hr /> : <></>}
        </li> */}
        <li
          onClick={() => {
            setMenu('events')
          }}
        >
          <Link
            to="/events"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Genres
          </Link>{' '}
          {menu === 'events' ? <hr /> : <></>}
        </li>

        <li
          onClick={() => {
            setMenu('favourites')
          }}
        >
          <Link
            to="/favourites"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Favourites
          </Link>{' '}
          {menu === 'favourites' ? <hr /> : <></>}
        </li>
      </ul>
      <i class="fas fa-coffee"></i>
      <div className="nav_account">
        <Link to="/login">
          <button className="account-button"></button>
        </Link>
      </div>
    </div>
  )
}
