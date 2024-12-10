import React from 'react';

const Notification = ({ show }) => {
  return (
    <div 
      className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-lg transition-all duration-300"
      style={{
        maxWidth: '90%',
        width: 'max-content',
        zIndex: 9999,
        opacity: show ? '1' : '0',
        visibility: show ? 'visible' : 'hidden',
        transform: `translate(-50%, ${show ? '0' : '-20px'})`,
      }}
    >
      <p className="text-sm font-medium">
        Please enter both location name and country name in respective fields
      </p>
    </div>
  );
};

export default Notification; 