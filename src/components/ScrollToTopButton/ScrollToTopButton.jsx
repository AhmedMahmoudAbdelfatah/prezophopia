import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import './scrollToTopButton.css';

const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button className="scroll-to-top-button" onClick={handleScrollToTop}>
      <FontAwesomeIcon icon={faAngleUp} />
    </button>
  );
};

export default ScrollToTopButton;