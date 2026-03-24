'use client';

import React, { useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { useCodeEditor } from '@/hooks/useCodeEditor';

export default function Home() {
  // Hardcode a room for testing (we will make this dynamic later)
  const documentId = 'doc-123';

  // Generate a random user ID on load so you can test with multiple tabs
  const currentUser = useMemo(() => `User_${Math.floor(Math.random() * 10000)}`, []);

  //Bring in our custom real-time engine
  const { code, isConnected, sendCodeUpdate } = useCodeEditor(documentId, currentUser);

  //Handle typing in the editor
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      sendCodeUpdate(value);
    }
  };

  return (
    <main className="flex h-screen flex-col bg-[#1e1e1e] text-white">
      {/* Header Bar */}
      <header className="flex items-center justify-between bg-[#2d2d2d] px-6 py-3 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-blue-400">CoWeave</h1>
          <span className="text-sm text-gray-400 border-l border-gray-600 pl-4">
            Room: {documentId}
          </span>
        </div>

        {/* Connection Status Indicator */}
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium text-gray-300">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </header>

      {/* The Monaco Editor */}
      <div className="flex-grow w-full pt-4">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code} // This binds the editor to our WebSocket state
          onChange={handleEditorChange} // This fires our debounce function when you type
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            wordWrap: 'on',
            padding: { top: 16 }
          }}
        />
      </div>
    </main>
  );
}