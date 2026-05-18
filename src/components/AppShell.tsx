"use client";

import React from 'react';
import { AppProvider } from '@/lib/AppContext';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return <AppProvider>{children}</AppProvider>;
}
