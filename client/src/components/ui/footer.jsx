import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';



const Footer = () => {
  return (
    <footer className=" text-gray-400 py-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* About Me and Social Section */}
        <div className="flex flex-col z-auto md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* About Me */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">About Me</h3>
            <p className="mt-2 text-gray-400 max-w-md">
              Hi, I'm a passionate web developer working on <strong>Noize</strong>, a music streaming platform that connects seamlessly with Spotify. I'm excited to build apps that bring people closer to music and technology. Let's connect!
            </p>
          </div>

          {/* Social Links */}
         
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Noize | Created by <span className="text-white">Amit</span>
          </p>
        </div>
     
    </footer>
  );
};

export default Footer;
