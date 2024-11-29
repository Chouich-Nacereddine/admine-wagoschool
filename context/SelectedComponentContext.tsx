// context/SelectedItemContext.tsx
import React, { createContext, useContext, useState } from "react";

// Define the types for the context
type SelectedItemContextType = {
  selectedItem: string;
  setSelectedItem: (item: string) => void;
};

// Create the context with a default value
const SelectedItemContext = createContext<SelectedItemContextType | undefined>(
  undefined
);

// Provider component
export const SelectedItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<string>("Profile");

  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </SelectedItemContext.Provider>
  );
};

// Custom hook to use the selected item context
export const useSelectedItem = () => {
  const context = useContext(SelectedItemContext);
  if (!context) {
    throw new Error("useSelectedItem must be used within a SelectedItemProvider");
  }
  return context;
};
