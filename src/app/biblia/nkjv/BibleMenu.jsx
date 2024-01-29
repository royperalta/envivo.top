// components/BibleMenu.js
import React, { useState } from 'react';

const BibleMenu = ({ data, onSelectBook }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleBookSelect = (bookIndex) => {
    onSelectBook(bookIndex);
    setMenuVisible(false);
  };

  return (
    <div className="fixed left-0 top-0 p-4">
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded"
        onClick={() => setMenuVisible(!menuVisible)}
      >
        {menuVisible ? 'Cerrar Menú' : 'Abrir Menú'}
      </button>
      {menuVisible && (
        <div className="flex flex-col mt-4">
          <div className="mr-4">
            <h2 className="text-lg font-bold mb-2">Nuevo Testamento</h2>
            <ul className="list-disc pl-4">
              {data.books.slice(27).map((book, bookIndex) => (
                <li key={bookIndex} onClick={() => handleBookSelect(bookIndex + 27)}>
                  {book.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Antiguo Testamento</h2>
            <ul className="list-disc pl-4">
              {data.books.slice(0, 27).map((book, bookIndex) => (
                <li key={bookIndex} onClick={() => handleBookSelect(bookIndex)}>
                  {book.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleMenu;
