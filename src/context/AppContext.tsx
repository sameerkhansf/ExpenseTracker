"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useSession } from "next-auth/react";

type AppState = {
  language: string;
  currency: string;
};

type AppAction =
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "SET_CURRENCY"; payload: string };

const initialState: AppState = {
  language: "English",
  currency: "USD",
};

const AppContext = createContext<
  | {
      state: AppState;
      dispatch: React.Dispatch<AppAction>;
    }
  | undefined
>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "SET_CURRENCY":
      return { ...state, currency: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      const newLanguage = (session.user as any).language || "English";
      const newCurrency = (session.user as any).currency || "USD";

      if (newLanguage !== state.language || newCurrency !== state.currency) {
        console.log("AppProvider: Updating state from session", session.user);
        dispatch({ type: "SET_LANGUAGE", payload: newLanguage });
        dispatch({ type: "SET_CURRENCY", payload: newCurrency });
      }
    }
  }, [session, state.language, state.currency]);

  useEffect(() => {
    console.log("AppProvider: State updated", state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
