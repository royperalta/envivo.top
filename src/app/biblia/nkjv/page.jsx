// pages/index.js
import React from 'react';
import Bible from './bible';

import bibleData from 'public/nkjv/bible.json';

const Home = () => {
  return (
    <div>     
      <Bible data={bibleData} />
    </div>
  );
};

export default Home;
