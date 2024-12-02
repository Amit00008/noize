import React, { useEffect } from 'react';
import { getAuthUrl } from '../spotifyAuth';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { FaSpotify, FaMusic, FaHeadphonesAlt, FaComments, FaConnectdevelop, FaGithub } from 'react-icons/fa';
import Footer from './ui/footer';

const Login = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 }); // Initialize AOS with the desired animation duration
  }, []);

  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-between">
      {/* Music Notes Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="music-notes absolute inset-0">
          <div className="note" style={{ animationDuration: '7s' }}>🎵</div>
          <div className="note" style={{ animationDuration: '10s', animationDelay: '3s' }}>🎶</div>
          <div className="note" style={{ animationDuration: '8s', animationDelay: '2s' }}>🎵</div>
          <div className="note" style={{ animationDuration: '9s', animationDelay: '4s' }}>🎶</div>
          <div className="note" style={{ animationDuration: '6s', animationDelay: '1s' }}>🎵</div>
        </div>
      </div>

      {/* App Information Section */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-12 md:py-20">
        <h1 
          data-aos="fade-up"
          className="text-4xl md:text-6xl font-extrabold text-white mb-6"
        >
          Welcome to <span className="text-purple-500">Noize</span>
        </h1>
        <p 
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl"
        >
          A music streaming experience like no other. Connect with Spotify to start discovering your favorite tunes and playlists.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full text-left">
          <div data-aos="fade-right" className="flex items-center space-x-4">
            <FaSpotify className="text-green-500 text-4xl" />
            <div>
              <h2 className="text-xl font-bold text-white">Stream Music Free</h2>
              <p className="text-gray-400">
                Use your Spotify account to stream music without any cost.
              </p>
            </div>
          </div>

          <div data-aos="fade-left" className="flex items-center space-x-4">
            <FaMusic className="text-purple-400 text-4xl" />
            <div>
              <h2 className="text-xl font-bold text-white">Music Capsule</h2>
              <p className="text-gray-400">
                Access the Music Capsule to explore your top songs and artists.
              </p>
            </div>
          </div>

          <div data-aos="fade-right" className="flex items-center space-x-4">
            <FaComments className="text-blue-400 text-4xl" />
            <div>
              <h2 className="text-xl font-bold text-white">Chat with Others</h2>
              <p className="text-gray-400">
                Connect and chat with other music lovers using your Spotify ID.
              </p>
            </div>
          </div>

          <div data-aos="fade-left" className="flex items-center space-x-4">
            <FaHeadphonesAlt className="text-blue-400 text-4xl" />
            <div>
              <h2 className="text-xl font-bold text-white">Try Noize Now</h2>
              <p className="text-gray-400">
                Join Noize now and be part of its development journey.
              </p>
            </div>
          </div>

          <div data-aos="fade-up" className="flex items-center space-x-4 sm:col-span-2 lg:col-span-1">
            <FaConnectdevelop className="text-indigo-500 text-5xl" />
            <div>
              <h2 className="text-xl font-bold text-white">Still in Development</h2>
              <p className="text-gray-400">
                Be one of the first to experience Noize and provide your feedback!
              </p>
            </div>
          </div>
        </div>

        {/* Login Button Section */}
        <div className="mt-12 flex gap-4">
          <button 
            onClick={handleLogin} 
            className="px-8 py-4 text-lg bg-purple-500 text-white rounded-full hover:bg-green-400 transition-all duration-300 flex items-center space-x-2"
          >
            <FaSpotify />
            <span>Login with Spotify</span>
          </button>

          <button 
            onClick={()=>{
                window.location.href = 'https://github.com/Amit00008/noize';
            }}
            className="px-8 py-4 text-lg bg-zinc-500 text-white rounded-full hover:bg-zinc-700 transition-all duration-300 flex items-center space-x-2"
          >
            <FaGithub />
            <span>Open Source</span>
          </button>
         
        </div>

        <div className='mt-12'>
       
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Login;
