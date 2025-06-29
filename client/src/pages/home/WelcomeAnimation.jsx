import React, { useEffect, useState } from "react";
import "./WelcomeAnimation.css";

const words = ["Fast", "Secure", "Beautiful", "Simple"];
const finalMessage = "Welcome to Chattrix 🚀";
const typingDelay = 100;
const wordPause = 1000;

const WelcomeAnimation = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (!showFinal) {
      if (wordIndex < words.length) {
        if (charIndex < words[wordIndex].length) {
          const timeout = setTimeout(() => {
            setDisplayedText((prev) => prev + words[wordIndex][charIndex]);
            setCharIndex((prev) => prev + 1);
          }, typingDelay);
          return () => clearTimeout(timeout);
        } else {
          const pause = setTimeout(() => {
            setDisplayedText("");
            setCharIndex(0);
            setWordIndex((prev) => prev + 1);
          }, wordPause);
          return () => clearTimeout(pause);
        }
      } else {
        // Start final message
        setDisplayedText("");
        setCharIndex(0);
        setShowFinal(true);
      }
    } else {
      if (charIndex < finalMessage.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + finalMessage[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, typingDelay);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, wordIndex, showFinal]);

  return (
    <div className="typing-container">
      <h1 className="typing-text">
        {!showFinal && displayedText && (
          <>
            Chattrix is <span className="word">{displayedText}</span>
          </>
        )}
        {showFinal && (
          <span className="final">{displayedText}</span>
        )}
        <span className="cursor">|</span>
      </h1>
    </div>
  );
};

export default WelcomeAnimation;
