import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom'; // Make sure to import NavLink and useLocation here

import '../css/Dropdown.css';

const Dropdown = ({ isContainerVisible, toggleContainerVisibility }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    const toggleDropdown = (event) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`dropdown${isOpen ? ' open' : ''}`} ref={dropdownRef}>
<button className="dropdown-toggle" onClick={toggleDropdown}><img src={"../assets/images/avatar.jpg"} alt="" /></button>
{isOpen && (

	<ul className="dropdown-menu">

		<li className="status" onClick={toggleContainerVisibility}>Late Night Coding</li>
		
		<li>
			<NavLink to="/" className={location.pathname === '/' ? 'active-link' : ''} onClick={() => setIsOpen(false)}>Home</NavLink>
		</li>

        <li>
            <NavLink to="/Shows" className={location.pathname === '/Shows' ? 'active-link' : ''} onClick={() => setIsOpen(false)}>About</NavLink>
        </li>

        <li>
            <NavLink to="/Logs" className={location.pathname === '/Logs' ? 'active-link' : ''} onClick={() => setIsOpen(false)}>Logs</NavLink>
        </li>

		<li>
			<a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/spreadsheets/u/0/">Sheets</a>
		</li>

		<li>
			<a target="_blank" rel="noopener noreferrer" href="https://github.com/">Github</a>
		</li>

        

	</ul>
)}
</div>
    );
};

export default Dropdown;