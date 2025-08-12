'use client';

import React from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Minus, Square, X } from 'lucide-react';

export default function Navbar() {
  const handleMinimize = () => {
    invoke('minimize_window');
  };

  const handleMaximize = () => {
    invoke('maximize_window');
  };

  const handleClose = () => {
    invoke('hide_window');
  };

  return (
    <div
      className="navbar bg-base-100 border-base-300 z-50 border-b p-0 pl-4"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* Logo */}
      <div className="navbar-start">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-lg">
            <span className="text-primary-content text-sm font-bold">T</span>
          </div>
          <span className="font-bold">TModWorks</span>
        </div>
      </div>

      {/* Right side actions */}
      <div className="navbar-end h-full gap-2">
        {/* Window Controls */}
        <div
          className="ml-4 flex h-full"
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
        >
          <button
            className="border-base-300 hover:bg-base-300 flex h-full items-center justify-center rounded-none border-l px-4 transition-colors"
            onClick={handleMinimize}
          >
            <Minus size={16} />
          </button>
          <button
            className="border-base-300 hover:bg-base-300 flex h-full items-center justify-center rounded-none border-l px-4 transition-colors"
            onClick={handleMaximize}
          >
            <Square size={16} />
          </button>
          <button
            className="border-base-300 hover:bg-error hover:text-error-content flex h-full items-center justify-center rounded-none border-l px-4 transition-colors"
            onClick={handleClose}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
