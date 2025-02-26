import React, { useEffect, useState } from 'react';

const TypingEffect = ({ text, speed, loop = true }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!text) return; // Exit early if text is not valid

    const typeText = () => {
      if (isTyping) {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);
        } else if (loop) {
          setIsTyping(false);
          setTimeout(() => {
            setDisplayedText(''); // Clear text before starting over
            setIndex(0); // Reset index
            setIsTyping(true); // Start typing again
          }, 1000);
        }
      }
    };

    const intervalId = setInterval(typeText, speed);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [text, speed, index, isTyping, loop]); // Added 'loop' to dependency array

  return <span className="typing-effect">{displayedText}</span>; // Added class for CSS styling
};

export default TypingEffect;