import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginUser, logoutUser, registerUser } from "../service/authService";
import { User } from "../types/user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (name:string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const loggedInUser = await loginUser(username, password);
      console.log("logged user", loggedInUser);
      setIsAuthenticated(true);
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name:string, username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const registeredUser = await registerUser(name, username, password);
      console.log("registered user", registeredUser);
      setUser(registeredUser);
      localStorage.setItem("user", JSON.stringify(registeredUser));
    } catch (err) {
      setError("Registered user failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    } catch (err) {
      setError("Logout failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
