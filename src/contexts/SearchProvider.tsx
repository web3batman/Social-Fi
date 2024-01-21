import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

// Define the shape of the context
export interface SearchContextProps {
    searchInput: string;
    setSearchInput: Function
}

// Create the User context
export const SearchContext = createContext<SearchContextProps | null>(null);

// Create the User context provider component
export const SearchProvider = ({ children }: { children: ReactNode }) => {

  const [searchInput, setSearchInput] = useState<string>('');

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        setSearchInput
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchProvider = () => useContext(SearchContext);