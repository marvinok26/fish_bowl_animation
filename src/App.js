import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure this is the correct path to your CSS file

const Fishbowl = () => {
  const [fill, setFill] = useState(90);
  const [intervalId, setIntervalId] = useState(null);
  const [tapActive, setTapActive] = useState(false);

  const emptyingFn = () => setInterval(() => {
    setFill(prevFill => {
      const newFill = prevFill - 1;
      if (newFill <= 0) {
        clearInterval(intervalId);
      }
      return newFill;
    });
  }, 200);

  useEffect(() => {
    const id = emptyingFn();
    setIntervalId(id);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (fill <= 0) {
      clearInterval(intervalId);
    }
  }, [fill, intervalId]);

  const handleTapClick = () => {
    setTapActive(true);
    setTimeout(() => setTapActive(false), 500);
    setFill(prevFill => Math.min(prevFill + 20, 90));
    if (fill <= 0) {
      const id = emptyingFn();
      setIntervalId(id);
    }
  };

  return (
    <div id="fishbowl" className="fishbowl" style={{ '--filling': fill }}>
      <div className="fishbowl__pool"></div>
      <div className="fishbowl__background"></div>
      <div className="fishbowl__bottom"></div>
      <div className="fishbowl__decoration">
        <div className="fishbowl__seaweed fishbowl__seaweed--1"></div>
        <div className="fishbowl__seaweed fishbowl__seaweed--2"></div>
        <div className="fishbowl__seaweed fishbowl__seaweed--3"></div>
      </div>
      <div className="fishbowl__water">
        <div id="fish" className={`fishbowl__fish ${fill < 20 ? 'fishbowl__fish--dead' : fill < 50 ? 'fishbowl__fish--dying' : ''}`}>
          <div className="fishbowl__fish-tail"></div>
        </div>
        <div className="fishbowl__water-color"></div>
      </div>
      <div className="fishbowl__top"></div>
      <div id="tap" className={`fishbowl__tap ${tapActive ? 'fishbowl__tap--active' : ''}`} onClick={handleTapClick}>
        <div className="fishbowl__tap-base"></div>
        <div className="fishbowl__tap-handle"></div>
        <div className="fishbowl__tap-stream"></div>
        <div className="fishbowl__tap-end"></div>
        <div className="fishbowl__tap-head"></div>
        <div className="fishbowl__tap-text">Click to refill</div>
      </div>
    </div>
  );
};

export default Fishbowl;
