import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContextProps, AppState, QuotesData } from '@/types/types';

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState>({
    user: null,
    savedQuotes: [],
  });

  // Load persisted state when the app starts
  useEffect(() => {
    loadPersistedState();
  }, []);

  //   Define load Persisted State Function
  const loadPersistedState = async () => {
    try {
      const persistedState = await AsyncStorage.getItem('appState');
      if (persistedState) {
        setState(JSON.parse(persistedState));
      }
    } catch (error) {
      console.error('Error loading persisted state:', error);
    }
  };

  // Persist State helper function to save to local storage
  const persistState = async (newState: AppState) => {
    try {
      await AsyncStorage.setItem('appState', JSON.stringify(newState));
    } catch (error) {
      console.error('Error persisting state:', error);
    }
  };

  // Store Selected Quote To Local Storage
  const addQuoteToLocalState = async (quote: QuotesData) => {
    const newState = {
      ...state,
      savedQuotes: [...state.savedQuotes, quote],
    };
    setState(newState);
    await persistState(newState);
  };

  // Remove Selected Quote From Local Storage
  const removeQuoteFromLocalState = async (quote: QuotesData) => {
    const newFilteredState = {
      ...state,
      savedQuotes: state.savedQuotes.filter((q) => q._id !== quote._id),
    };
    setState(newFilteredState);
    await persistState(newFilteredState);
  };

  // Persist the userData to local storage
  const setUser = async (user: any | null) => {
    const newState = { ...state, user };
    setState(newState);
    await persistState(newState);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        addQuoteToLocalState,
        removeQuoteFromLocalState,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Export app Context for use across other components.
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
