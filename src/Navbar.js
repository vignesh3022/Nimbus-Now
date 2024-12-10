import React from "react";
import daynight from './day-and-night.png'

const Navbar = (props) => {
  return (
    <nav 
      className="backdrop-blur-md bg-opacity-90 shadow-lg relative"
      id="navbar" 
      style={{ 
        background: props.mode === 'light' 
          ? 'rgba(255,255,255,0.9)' 
          : 'rgba(17, 25, 40, 0.75)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '1rem 0',
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span
            className="text-4xl font-bold"
            style={{ 
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "Dancing Script, cursive",
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
            }}
          >
            Weather Vista
          </span>
        </div>
        <div className="flex items-center">
          <img 
            src={daynight} 
            onClick={props.toggleMode} 
            className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-200" 
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }} 
            alt="theme toggle"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;