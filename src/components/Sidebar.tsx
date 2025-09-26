'use client';

import React from 'react';
import MyGamesTab from './MyGamesTab';

export default function Sidebar() {
  return (
    <div className="bg-base-200 border-base-300 custom-scrollbar flex h-full w-64 flex-col overflow-y-auto border-r">
      {/* Sidebar Header */}
      <div className="border-base-300 border-b p-4">
        <h2 className="text-base-content text-lg font-semibold">Menu</h2>
        <p className="text-base-content/60 text-xs">Quick access</p>
      </div>

      <div className="flex-1">
        <MyGamesTab />
      </div>
    </div>
  );
}
