"use client";

import React, { createContext, useContext, useState } from "react";

interface AppContextProps {
  isMeetingModalOpen: boolean;
  openMeetingModal: () => void;
  closeMeetingModal: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  const openMeetingModal = () => setIsMeetingModalOpen(true);
  const closeMeetingModal = () => setIsMeetingModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        isMeetingModalOpen,
        openMeetingModal,
        closeMeetingModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
