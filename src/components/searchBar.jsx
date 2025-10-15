// src/components/SearchBar.jsx
import React from 'react';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search news..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full md:w-1/2 p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
