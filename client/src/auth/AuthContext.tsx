import { useState, createContext } from "react";

type AuthContextType = {
    email: string;
    token: string;
    updateAuthState: (email: string, token: string) => void;
};

/* This context will be used throughout component tree. */
const AuthContext = createContext<AuthContextType>({
    email: "",
    token: "",
    updateAuthState: () => {}
});

interface AuthContextProviderProps {
    children: React.ReactNode;
}

/* Wraps around the entire app component tree such that AuthContext can be used anywhere. */
const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthContextType>({
      email: "",
      token: "",
      updateAuthState: (email: string, token: string) => {
          setAuthState({
              email: email,
              token: token,
              updateAuthState: authState.updateAuthState
          });
      }
    });

    return (
      <AuthContext.Provider value={authState}>
        {children}
      </AuthContext.Provider>
    );
};
  
export { AuthContext, AuthContextProvider };