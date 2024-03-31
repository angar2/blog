'use client';
import React, { useState, useEffect } from 'react';

interface TypingProps {
  texts: string[];
}

export default function Typing({ texts }: TypingProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        const newText = currentText.substring(0, currentIndex + 1);
        setText(newText);

        if (newText === currentText) {
          // Start deleting after typing is complete
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000); // Wait for 2 seconds before starting to delete
        }
      } else {
        // Deleting
        const newText = currentText.substring(0, currentIndex);
        setText(newText);

        if (newText === '') {
          // Reset index and stop deleting when text is completely deleted
          setIsDeleting(false);
          setCurrentIndex(0);

          // Move to the next text
          const nextIndex = (textIndex + 1) % texts.length;
          setTextIndex(nextIndex);
        }
      }

      // Update index for next iteration
      setCurrentIndex((prevIndex) => prevIndex + (isDeleting ? -1 : 1));
    };

    const typingInterval = isDeleting ? 80 : 80; // Adjust the typing and deleting speed here

    const typingTimer = setTimeout(() => {
      handleTyping();
    }, typingInterval);

    return () => clearTimeout(typingTimer);
  }, [textIndex, text, isDeleting, currentIndex]);
  return <p className="inline animate-blink">{text}</p>;
}
