import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);
// Define the shape of the context
export interface SocketContextProps {
    socket: object
}

// Create the User context
export const SocketContext = createContext<SocketContextProps | null>(null);

// Create the User context provider component
export const SocketProvider = ({ children }: { children: ReactNode }) => {

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useUserProvider = () => useContext(SocketContext);