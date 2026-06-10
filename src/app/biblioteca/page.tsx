"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import LibraryRoom from '@/components/biblioteca/LibraryRoom';

export default function BibliotecaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#050505]">
      <Navbar
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        sidebarOpen={sidebarOpen}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="absolute inset-0 pt-14 z-10">
        <LibraryRoom />
      </div>
    </main>
  );
}
