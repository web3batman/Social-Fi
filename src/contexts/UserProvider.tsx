import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

// Define the shape of the context
export interface UserContextProps {
    myProfile: object;
    setMyProfile: Function
}

// Create the User context
export const UserContext = createContext<UserContextProps | null>(null);

// Create the User context provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {

  const [myProfile, setMyProfile] = useState<object>({});

  return (
    <UserContext.Provider
      value={{
        myProfile,
        setMyProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);