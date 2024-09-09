import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginUser, logoutUser, registerUser } from "../service/authService";
import { User } from "../types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

// Interface pour le contexte de l'authentification
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Création du contexte d'authentification
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("userToken");
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
          // Vous pouvez également récupérer les informations de l'utilisateur
        }
      } catch (error) {
        console.error("Error laoding token:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    // Ici, vous pouvez intégrer une logique d'authentification réelle
    // Par exemple, une requête vers une API
    // Pour cet exemple, nous simulons une authentification réussie
    if (username === "admin" && password === "password") {
      const fakeToken = "fake-jwt-token";
      setToken(fakeToken);
      setUser(username);
      setIsAuthenticated(true);
      await SecureStore.setItemAsync("userToken", fakeToken);
      return true;
    }
    // Authentification échouée
    return false;
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    await SecureStore.deleteItemAsync("userToken");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, isLoading, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder facilement au contexte d'authentification
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
