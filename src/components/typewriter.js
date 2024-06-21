import React, { useState, useEffect } from 'react';

const Typewriter = () => {
    const words = [
        "Advanced Spam Filtering <br> Technology",
        "Designed by Tirth!!",
        "Developed by Prince!!"
      ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentLetterIndex(currentLetterIndex - 1);
        if (currentLetterIndex === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setCurrentLetterIndex(currentLetterIndex + 1);
        if (currentLetterIndex === currentWord.length) {
          setIsDeleting(true);
        }
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [currentLetterIndex, isDeleting, words, currentWordIndex]);

  return (
    <div className="">
      <span id="typewriter" className="roboto300 text-[5vh] font-extralight tracking-wid max-w-[35vw]">
      <span dangerouslySetInnerHTML={{ __html: words[currentWordIndex].substring(0, currentLetterIndex) }} />
    
      </span>
    </div>
  );
};

export default Typewriter;
