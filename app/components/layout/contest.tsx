import React from 'react';

// --- SVG Icon Components needed for Contests ---
const ViewAllIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
);

const CodeIcon = () => <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>;
const DesignIcon = () => <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"></path></svg>;
const CameraIcon = () => <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;


// --- Contests Component ---
const Contests = () => {
  return (
    <div className="bg-gray-800 h- p-6 rounded-2xl w-full  text-white font-sans">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Live Contests</h2>
        <button className="flex items-center bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-sm">
          <ViewAllIcon />
          View All
        </button>
      </div>
      <input type="text" placeholder="Search contests" className="w-full bg-gray-700 placeholder-gray-400 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <div className="space-y-5">
        <div className="flex items-start">
          <CodeIcon />
          <div>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Hack the Night 2025</h3>
              <span className="bg-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">1.2k watching</span>
            </div>
            <p className="text-sm text-gray-400">Ends in 2h 34m</p>
            <p className="text-sm mt-2">Theme: AI + Productivity. Prize pool $10k.</p>
          </div>
        </div>

        <div className="flex items-start">
          <DesignIcon />
          <div>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Design Sprint Live</h3>
              <span className="bg-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">540 watching</span>
            </div>
            <p className="text-sm text-red-400">Live now</p>
            <p className="text-sm mt-2">Rapid UI/UX challenge. Submit in Figma or image.</p>
          </div>
        </div>

        <div className="flex items-start">
          <CameraIcon />
          <div>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Photo Marathon</h3>
               <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg text-sm font-semibold">Join</button>
            </div>
            <p className="text-sm text-gray-400">Starts in 45m</p>
            <p className="text-sm mt-2">Cityscapes and street life. 3-hour run.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contests;

