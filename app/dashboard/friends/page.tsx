"use client"; // Required because we are using hooks

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Menu, Send, Paperclip, UserPlus, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
  user: string;
  text: string;
  time: string;
  file?: string;
}

interface Friend {
  name: string;
  online: boolean;
}

export default function FriendsPage() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { user: "Sarah", text: "Anyone need help with math homework?", time: "2:15 PM" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [friendSearch, setFriendSearch] = useState("");
  const [friends, setFriends] = useState<Friend[]>([
    { name: "Sarah", online: true },
    { name: "Mike", online: false },
    { name: "John", online: true },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Typing simulation
  useEffect(() => {
    if (typing) {
      const timeout = setTimeout(() => setTyping(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [typing]);

  const sendMessage = () => {
    if (!input.trim() && !attachedFile) return;

    const fileURL = attachedFile ? URL.createObjectURL(attachedFile) : undefined;

    setMessages([
      ...messages,
      {
        user: "You",
        text: input,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        file: fileURL,
      },
    ]);

    setInput("");
    setAttachedFile(null);
    setTyping(true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setAttachedFile(e.target.files[0]);
  };

  const addFriend = (name: string) => {
    if (!name.trim()) return;
    setFriends([...friends, { name, online: false }]);
  };

  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(friendSearch.toLowerCase())
  );

  return (
    <div className="flex m-auto h-[90vh] rounded bg-[#313338] text-white relative">
      {/* Sidebar */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="w-70 bg-[#2b2d31] flex flex-col border-r border-gray-700 z-50 h-full"
          >
            <h2 className="text-lg font-semibold p-4 border-b border-gray-700">Direct Messages</h2>

            {/* Friend search */}
            <div className="px-4 py-2 flex items-center gap-2 border-b border-gray-700">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search friends"
                value={friendSearch}
                onChange={(e) => setFriendSearch(e.target.value)}
                className="flex-1 bg-[#383a40] text-gray-200 placeholder-gray-400 rounded-full px-3 py-1 focus:outline-none"
              />
            </div>

            {/* Add friend */}
            <div className="px-4 py-2 flex items-center gap-2 border-b border-gray-700">
              <input
                type="text"
                placeholder="Add friend"
                className="flex-3 bg-[#383a40] text-gray-200 placeholder-gray-400 rounded-full px-3 py-1 focus:outline-none"
                id="addFriendInput"
              />
              <button
                onClick={() => {
                  const input = document.getElementById("addFriendInput") as HTMLInputElement;
                  if (input) addFriend(input.value);
                  if (input) input.value = "";
                }}
                className="bg-blue-600 hover:bg-blue-700 rounded-full p-2"
              >
                <UserPlus size={16} />
              </button>
            </div>

            {/* Friend list */}
            <div className="flex-1 overflow-y-auto">
              {filteredFriends.map((friend, i) => (
                <div key={i} className="flex items-center p-3 hover:bg-[#383a40] cursor-pointer gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      friend.online ? "bg-green-500" : "bg-gray-600"
                    }`}
                  >
                    {friend.name[0].toUpperCase()}
                  </div>
                  <p>{friend.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#2b2d31] border-b border-gray-700">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="md:hidden text-gray-300 hover:text-white z-30"
            >
              <Menu size={20} />
            </button>
            <div>
              <h3 className="font-semibold"># homework-help</h3>
              <p className="text-xs text-gray-400">Get help with homework</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
          {messages.map((msg, index) => {
            const previous = messages[index - 1];
            const showAvatar = !previous || previous.user !== msg.user;
            const isYou = msg.user === "You";

            return (
              <div
                key={index}
                className={`flex items-start gap-3 ${isYou ? "justify-end" : "justify-start"}`}
              >
                {!isYou && showAvatar && (
                  <div className="bg-blue-500 w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold">
                    {msg.user[0].toUpperCase()}
                  </div>
                )}

                <div className={`flex flex-col max-w-[70%] ${isYou ? "items-end" : "items-start"}`}>
                  {showAvatar && !isYou && (
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{msg.user}</p>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                  )}

                  <div
                    className={`px-4 py-2 rounded-2xl break-words ${
                      isYou
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-700 text-gray-200 rounded-bl-none"
                    } hover:brightness-110 transition`}
                  >
                    {msg.text}
                    {msg.file && (
                      <div className="mt-1">
                        <a
                          href={msg.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 underline break-all"
                        >
                          {msg.file.split("/").pop()}
                        </a>
                      </div>
                    )}
                  </div>

                  {isYou && <span className="text-xs text-gray-400 mt-1">{msg.time}</span>}
                </div>

                {isYou && showAvatar && (
                  <div className="bg-blue-500 w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold">
                    Y
                  </div>
                )}
              </div>
            );
          })}
          {typing && <p className="text-gray-400 text-sm px-4">Sarah is typing...</p>}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Chat Input */}
        <div className="bg-[#2b2d31] border-t border-gray-700 p-4 flex flex-col gap-2 md:relative fixed bottom-0 w-full">
          {attachedFile && (
            <div className="bg-gray-700 p-2 rounded flex justify-between items-center">
              <p>{attachedFile.name}</p>
              <button onClick={() => setAttachedFile(null)} className="text-red-400 font-bold">
                X
              </button>
            </div>
          )}
          <div className="flex items-center gap-3">
            <label htmlFor="fileInput" className="cursor-pointer text-gray-400 hover:text-white">
              <Paperclip />
            </label>
            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />

            <input
              type="text"
              placeholder="Message #homework-help"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-[#383a40] text-gray-200 placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
