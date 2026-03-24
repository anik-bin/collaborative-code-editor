'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const router = useRouter();

  const handleJoinRoom = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the page from reloading on submit

    if (username.trim() && roomId.trim()) {

      // Clean up the room ID
      const cleanRoomId = roomId.trim().toLowerCase().replace(/\s+/g, '-');
      const cleanUser = encodeURIComponent(username.trim());

      // Navigate the user to their custom workspace URL
      router.push(`/${cleanRoomId}?user=${cleanUser}`);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 px-4 text-white">
      <div className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-2xl border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">CoWeave</h1>
          <p className="text-gray-400">Real-time collaborative code editor</p>
        </div>

        <form onSubmit={handleJoinRoom} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Display Name
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg bg-gray-900 border border-gray-600 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="e.g. Alex"
              required
            />
          </div>

          <div>
            <label htmlFor="roomId" className="block text-sm font-medium text-gray-300 mb-2">
              Room ID
            </label>
            <input
              id="roomId"
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full rounded-lg bg-gray-900 border border-gray-600 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="e.g. daily-standup"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all"
          >
            Join Workspace
          </button>
        </form>
      </div>
    </main>
  );
}