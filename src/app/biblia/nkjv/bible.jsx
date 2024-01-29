'use client'
// components/Bible.js
import React, { useState, useRef } from 'react';

const Bible = ({ data }) => {
  const targetRef = useRef(null);

  const [selectedBook, setSelectedBook] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(0);

  const handleBookChange = (bookIndex) => {
    setSelectedBook(bookIndex);
    setSelectedChapter(0);
    // Hacer que la página regrese al componente específico
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChapterChange = (chapterIndex) => {
    setSelectedChapter(chapterIndex);
    // Hacer que la página regrese al componente específico
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedBookData = data.books[selectedBook];
  const selectedChapterData = selectedBookData.chapters[selectedChapter];

  return (
    <div className='p-4 h-screen'>
      <div className="flex flex-wrap gap-1">
        {data.books.map((book, bookIndex) => (
          <div
            key={bookIndex}
            onClick={() => handleBookChange(bookIndex)}
            className={` text-sm m-1 p-1 cursor-pointer rounded ${selectedBook === bookIndex ? 'text-white bg-[#5f312f]' : 'hover:bg-[#f4e7e0]'
              } ${bookIndex > 38 ? 'border border-[#d8ab99] bg-[#faf4f2] ':'border border-[#5f312f] '}`}
          >
            {book.name}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row" ref={targetRef} >
        <div className="lg:w-2/3 py-5">
          <h2 className="text-2xl font-bold mb-4 text-[#5f312f]">{selectedBookData.name}</h2>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#5f312f]">Chapter {selectedChapterData.num}</h3>
            {selectedChapterData.verses.map((verse, verseIndex) => (
              <p key={verseIndex} className="mb-1">
                <strong className="mr-1 text-[#5f312f]">{verse.num}.</strong> {verse.text}
              </p>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3 p-4 flex-grow gap-2 ">
          <h2 className="text-2xl font-bold py-5 text-[#5f312f]">Chapters</h2>
          <div className='flex flex-wrap gap-2 text-[#753a37]'>
            {selectedBookData.chapters.map((chapter, chapterIndex) => (
              <button
                key={chapterIndex}
                onClick={() => handleChapterChange(chapterIndex)}
                className={` border border-[#90443e] px-4 py-2 rounded ${selectedChapter === chapterIndex ? 'text-white bg-[#5f312f] font-extrabold' : 'hover:bg-[#f4e7e0] hover:text-black '
                  }`}
              >
                {chapter.num}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>


  );
};

export default Bible;
