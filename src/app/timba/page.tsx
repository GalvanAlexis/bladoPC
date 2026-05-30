"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import GameCarousel3D from '@/components/timba/GameCarousel3D';
import GamePreviewPanel from '@/components/timba/GamePreviewPanel';
import { GAMES } from '@/lib/games';

export default function TimbaHubPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scene, setScene] = useState<'cave'|'library'>('cave');

  return (
    <main className="relative w-screen h-screen overflow-hidden font-mono select-none bg-[#050505]">
      <Navbar
        scene={scene}
        onReplayIntro={() => {}}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        sidebarOpen={sidebarOpen}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 pt-14 z-10 flex flex-col md:flex-row pb-4">
        <div className="w-full md:w-[40%] h-[200px] md:h-full flex-shrink-0 pt-4 md:pt-0">
          <GameCarousel3D 
            games={GAMES}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </div>
        <div className="w-full md:w-[60%] h-[calc(100%-200px)] md:h-full px-4 md:pr-12 md:pl-0 flex-shrink-0 min-h-0">
          <GamePreviewPanel game={GAMES[selectedIndex]} />
        </div>
      </div>
    </main>
  );
}
