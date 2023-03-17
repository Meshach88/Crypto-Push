import React from 'react';
// import { RxDropdownMenu } from 'react-icons/rx';
// import { RiCloseCircleLine } from 'react-icons/ri';


import logo from '../assets/logo.png';

const NavList = ({ title, classprops }) => (
    <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
    return (
        <nav className='bg-purple-900 w-full justify-between items-center p-5'>
            <div>
                <img src={logo} alt='CryptoPush' className='w-50 h-30 cursor-pointer' />
            </div>
            <ul className='text-white md:flex justify-end items-center'>
                {['Exchange', 'Market Info','About us', 'Wallets'].map((item, idx) => (
                    <NavList key={item + idx} title={item} />
                ))}

            </ul>

        </nav>
    );
}

export default Navbar;
