'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function CreateServerModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, imageUrl }),
      });

      if (response.ok) {
        onClose();
        router.refresh(); 
      } else {
        console.error('Failed to create server:', await response.text());
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-[#2b2d31] p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Create Your Server</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-xs font-bold text-gray-400 uppercase mb-2">Server Image URL</label>
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#1e1f22] border-transparent rounded p-2 text-white"
              disabled={isLoading}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block text-xs font-bold text-gray-400 uppercase mb-2">Server Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1e1f22] border-transparent rounded p-2 text-white"
              disabled={isLoading}
              required
            />
          </div>
          <div className="bg-[#1e1f22] p-4 rounded-b-lg flex justify-between items-center">
             <button type="button" onClick={onClose} className="text-white hover:underline">
               Back
             </button>
            <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}