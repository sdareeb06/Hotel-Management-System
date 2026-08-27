'use client';

import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'bot',
    text: 'Welcome to Sapphire Grand Hotel & Resort. I am Sapphire AI, your personal 24/7 digital concierge. How may I assist your stay today?',
    time: 'Just now'
  }
];

const PRESET_QUERIES = [
  'What rooms are available?',
  'Recommend a suite for a couple.',
  'Plan my 3-day luxury stay.',
  'What time is check-in?',
  'Book a spa treatment.'
];

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getAIResponse = (userQuery: string): string => {
    const q = userQuery.toLowerCase();
    if (q.includes('room') || q.includes('available')) {
      return 'We currently have availability across our Sapphire King Suite ($650/night), Executive Horizon Suite ($1,200/night), and The Grand Residence ($2,800/night). Would you like me to open the instant reservation portal for your dates?';
    }
    if (q.includes('recommend') || q.includes('couple') || q.includes('suite')) {
      return 'For couples, I highly recommend our Executive Horizon Suite. It features a private Carrara marble spa tub, panoramic ocean views, and exclusive access to the Horizon Sky Lounge for evening champagne tastings.';
    }
    if (q.includes('3-day') || q.includes('plan') || q.includes('stay')) {
      return 'Here is your curated 3-day itinerary:\nDay 1: Arrival & Welcome Cocktail at Horizon Lounge followed by L’Orangerie Fine Dining.\nDay 2: Morning Himalayan Salt Spa Ritual & Private Yacht Excursion.\nDay 3: Breakfast at The Conservatory & Infinity Pool relaxation.';
    }
    if (q.includes('check-in') || q.includes('time')) {
      return 'Standard check-in begins at 15:00, and check-out is until 12:00 noon. Guests in our Executive Suites and Residences enjoy guaranteed early check-in upon request.';
    }
    if (q.includes('spa') || q.includes('treatment')) {
      return 'Our Sapphire Thermal Spa offers Himalayan salt saunas, organic hydrotherapy, and deep tissue botanical rituals. I can reserve your preferred time slot between 08:00 and 21:00.';
    }
    return `Thank you for reaching out regarding "${userQuery}". As Sapphire Grand's digital twin concierge, I have logged your request with our Head Butler team. Is there anything specific about your stay preferences I can assist with?`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: getAIResponse(query),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-[#0B1F3A] border border-[#C8A96B]/50 text-[#F5F1E8] shadow-[0_10px_30px_rgba(7,17,31,0.8)] hover:border-[#C8A96B] hover:shadow-[0_0_25px_rgba(200,169,107,0.4)] transition-all duration-300 group"
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#123B70] text-[#C8A96B]">
          <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0B1F3A]" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-widest text-[#C8A96B] font-semibold">24/7 AI Concierge</span>
          <span className="text-xs font-serif text-[#F5F1E8]">SAPPHIRE AI</span>
        </div>
      </button>

      {/* Drawer / Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-full max-w-md bg-[#0B1F3A]/95 border border-[#C8A96B]/30 rounded-2xl shadow-[0_20px_60px_rgba(7,17,31,0.9)] backdrop-blur-2xl overflow-hidden flex flex-col h-[560px] animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-[#07111F] border-b border-[#C8A96B]/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#123B70] border border-[#C8A96B]/40 flex items-center justify-center text-[#C8A96B]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-serif text-[#F5F1E8]">SAPPHIRE AI CONCIERGE</h4>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Online & Active
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#8B96A8] hover:text-[#F5F1E8] transition-colors rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Presets */}
          <div className="p-3 bg-[#07111F]/50 border-b border-[#C8A96B]/10 overflow-x-auto no-scrollbar flex items-center gap-2">
            {PRESET_QUERIES.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(preset)}
                className="px-3 py-1 rounded-full border border-[#123B70] bg-[#0B1F3A] text-[11px] text-[#C8A96B] whitespace-nowrap hover:border-[#C8A96B] transition-all"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#123B70] border border-[#C8A96B]/30 flex items-center justify-center text-[#C8A96B] shrink-0 mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#C8A96B] text-[#07111F] rounded-br-none font-medium'
                      : 'bg-[#07111F] text-[#F5F1E8] border border-[#C8A96B]/20 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`block text-[9px] mt-1 text-right ${
                    msg.sender === 'user' ? 'text-[#07111F]/70' : 'text-[#8B96A8]'
                  }`}>
                    {msg.time}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#C8A96B] flex items-center justify-center text-[#07111F] shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#8B96A8] italic pl-9">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-[#C8A96B]" />
                <span>Sapphire AI is composing a response...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#07111F] border-t border-[#C8A96B]/20 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Sapphire AI concierge..."
              className="flex-1 bg-[#0B1F3A] border border-[#123B70] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F1E8] placeholder-[#8B96A8] focus:outline-none focus:border-[#C8A96B]"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-[#C8A96B] text-[#07111F] hover:bg-[#E8D49B] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
