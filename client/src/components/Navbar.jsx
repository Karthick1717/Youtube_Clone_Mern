import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeToken, setSearch } from '../redux/slice';

function Navbar() {
  const token = useSelector((state) => state.user.token);
  const search = useSelector((state) => state.user.search) || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(search);
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    dispatch(setSearch(value));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(removeToken());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>

      <input
        type="search"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearchChange}
        id="search"
      />

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`links ${menuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        {token && <Link to="/playlist">Playlist</Link>}
        <Link to="/about">About</Link>
        {!token && <Link to="/login">Login</Link>}
        <Link to="/settings">Settings</Link>
        {token && (
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
