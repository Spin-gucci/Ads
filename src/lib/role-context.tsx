import { createContext, useContext, useState, useEffect } from "react";
import type { UserRole } from "@shared/schema";

type CurrentUser = {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
};

type RoleContextType = {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
  logout: () => void;
  refreshSession: () => Promise<boolean>;
  isRefreshing: boolean;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
    }
    return null;
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const refreshSession = async (): Promise<boolean> => {
    if (!currentUser?.email) return false;
    
    setIsRefreshing(true);
    try {
      const response = await fetch(`/api/auth/session?email=${encodeURIComponent(currentUser.email)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setCurrentUser({
            id: data.user.id,
            name: data.user.name,
            role: data.user.role,
            email: data.user.email,
          });
          return true;
        }
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <RoleContext.Provider value={{ currentUser, setCurrentUser, logout, refreshSession, isRefreshing }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return context;
}
