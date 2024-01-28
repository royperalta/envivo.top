import React from 'react';

const FireEngineDisplay = ({ data }) => {
  return (
    <div>
      {Object.entries(data).map(([english, spanish]) => (
        <div key={english} className='text-center'>
          <p className='text-ms font-bold'><strong></strong> {english}</p>
          <p className='text-xs'><strong></strong> {spanish}</p>
        </div>
      ))}
    </div>
  );
};

export default FireEngineDisplay;
