
import { useState } from 'react';
import './FireworksEffect.css';

const FireworksEffect = () => {
  const [fireworksVisible, setFireworksVisible] = useState(true);

  const onAnimationEnd = () => {
    setFireworksVisible(false);
  };

  return (
    <div className={`fireworks-container ${fireworksVisible ? 'visible' : ''}`}>
      <div className="firework" id="firework1" onAnimationEnd={onAnimationEnd}></div>
      <div className="firework" id="firework2" onAnimationEnd={onAnimationEnd}></div>
      <div className="firework" id="firework3" onAnimationEnd={onAnimationEnd}></div>
      {/* Agrega más divs de fuegos artificiales según sea necesario */}
    </div>
  );
};

export default FireworksEffect;
