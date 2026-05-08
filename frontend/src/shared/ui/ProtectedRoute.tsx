import { Navigate, Outlet } from "react-router-dom";
import { tokenStorage } from "../lib/tokenStorage";
import { useEffect, useState } from "react";
import { meRequest } from "../../features/auth/api/authApi";
import type { User } from "../../entities/user/model/types";

interface Props {
  role?: "seller" | "buyer";
}

export default function ProtectedRoute({ role }: Props) {
  const token = tokenStorage.get();

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMe() {
      try {
        const data = await meRequest();

        setUser(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      getMe();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // Проверка роли
  if (role && user?.user_type !== role) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}