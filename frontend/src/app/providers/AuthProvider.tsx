import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { User } from "../../entities/user/model/types";
import { meRequest } from "../../features/auth/api/authApi";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSeller: boolean;
  isBuyer: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isSeller: false,
  isBuyer: false,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const data = await meRequest();

        setUser(data.user);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSeller: user?.user_type === "seller",
        isBuyer: user?.user_type === "buyer",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}