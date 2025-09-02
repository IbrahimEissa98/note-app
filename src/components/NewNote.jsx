import React, { useState, useEffect } from "react";

export default function NewNote({ visible, onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Reset inputs when modal becomes visible
  useEffect(() => {
    if (visible) {
      setTitle("");
      setContent("");
    }
  }, [visible]);

  if (!visible) return null;

  function handleAdd() {
    if (title.trim() === "" || content.trim() === "") {
      alert("Please fill in both title and content.");
      return;
    }
    onAdd({ title, content });
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-50 w-11/12 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          New Note
        </h2>
        <div className="mb-4">
          <label
            htmlFor="note-title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Title:
          </label>
          <input
            id="note-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 text-lg border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="note-content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Content:
          </label>
          <textarea
            id="note-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-24 p-2 text-lg border border-gray-300 dark:border-gray-600 rounded resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
