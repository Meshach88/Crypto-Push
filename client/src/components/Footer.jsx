import React from "react";

import logo from '../assets/logo.png';

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 bg-purple-800">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-straight items-center">
        <img src={logo} alt="logo" className="w-30 h-10" />
      </div>
    </div>

    <div className="flex justify-straight items-center flex-col mt-5">
      <p className="text-3xl text-white text-sm font-semibold text-center">Have a pleasant experience</p>
      <p className="text-white text-sm text-center font-medium mt-2">Cryptopush.com</p>
    </div>


    <div className="w-full flex justify-around items-center mt-3">
      <p className="text-white text-left text-xs">@CryptoPush2023</p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;