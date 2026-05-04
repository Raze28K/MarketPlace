import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { meRequest } from "../../features/auth/api/authApi";
import { tokenStorage } from "../../shared/lib/tokenStorage";
import type { User } from "../../entities/user/model/types";
import { baseApi } from "../../shared/api/baseApi";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone: "",
    avatar: ""
  });

  const handleSave = async () => {
    const res = await baseApi.put("/users/profile", {
      firstName: form.first_name,
      lastName: form.last_name,
      username: form.username,
      phone: form.phone,
      avatar: form.avatar
    });

    setUser(res.data.user);
    setIsEditing(false);
  };

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await meRequest();
      setUser(data.user);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to load profile"
      );

      tokenStorage.remove();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        username: user.username || "",
        phone: user.phone || "",
        avatar: user.avatar || ""
      });
    }
  }, [user]);

  const handleLogout = () => {
    tokenStorage.remove();
    navigate("/login");
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="text-center mt-10 text-gray-400">No user data</p>;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-gray-900 rounded-2xl border border-gray-800 shadow-xl p-6">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={form.avatar || user.avatar || "https://via.placeholder.com/120"}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-800 mb-3"
          />
          <h2 className="text-xl text-white font-semibold">
            {user.username}
          </h2>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>

        {/* Info */}
        <div className="space-y-4">

          {[
            { label: "First name", key: "first_name" },
            { label: "Last name", key: "last_name" },
            { label: "Username", key: "username" },
            { label: "Phone", key: "phone" },
            { label: "Avatar URL", key: "avatar" }
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm text-gray-400 mb-1">
                {field.label}
              </label>

              {isEditing ? (
                <input
                  value={(form as any)[field.key]}
                  onChange={(e) =>
                    setForm({ ...form, [field.key]: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <div className="text-white bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                  {(user as any)[field.key] || "-"}
                </div>
              )}
            </div>
          ))}

          <div className="text-sm text-gray-400 mt-4">
            <p><strong>User type:</strong> {user.user_type}</p>
            <p><strong>Created:</strong> {user.created_date}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          {isEditing && (
            <button
              onClick={handleSave}
              className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </button>
          )}

          <button
            onClick={handleLogout}
            className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}