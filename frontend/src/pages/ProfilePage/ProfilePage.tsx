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
    return <p style={{ padding: "20px" }}>Loading profile...</p>;
  }

  if (error) {
    return <p style={{ padding: "20px", color: "red" }}>{error}</p>;
  }

  if (!user) {
    return <p style={{ padding: "20px" }}>No user data</p>;
  }

  return (
    <div>
      <h1 className="text-3xl flex items-center justify-center">Profile</h1>
      <div className="flex items-center justify-center ">
        {user.avatar && (
          <img
            src={user.avatar}
            alt="avatar"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "50%",
              marginBottom: "16px",
            }}
          />
        )}
      </div>


      <div className="flex items-center justify-center flex-col">
        <p>
          <strong className="text-red-500">First name:</strong>{" "}
          {isEditing ? (
            <input
              value={form.first_name}
              onChange={(e) =>
                setForm({ ...form, first_name: e.target.value })
              }
            />
          ) : (
            user.first_name || "-"
          )}
        </p>
        <p>
          <strong>Last name:</strong>{" "}
          {isEditing ? (
            <input
              value={form.last_name}
              onChange={(e) =>
                setForm({ ...form, last_name: e.target.value })
              }
            />
          ) : (
            user.last_name || "-"
          )}
        </p>
        <p>
          <strong>Username:</strong>{" "}
          {isEditing ? (
            <input
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          ) : (
            user.username || "-"
          )}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {isEditing ? (
            <input
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          ) : (
            user.phone || "-"
          )}
        </p>
        <p>
          <strong>Avatar:</strong>{" "}
          {isEditing ? (
            <input
              value={form.avatar}
              onChange={(e) =>
                setForm({ ...form, avatar: e.target.value })
              }
            />
          ) : (
            user.avatar || "-"
          )}
        </p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User type:</strong> {user.user_type}</p>
        <p><strong>Created date:</strong> {user.created_date}</p>
      </div>



      <button
        onClick={handleLogout}
        className="bg-black text-2xl text-white rounded-2xl p-1 flex items-center justify-center"
      >
        Logout
      </button>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit"}
      </button>
      {isEditing && (
        <button onClick={handleSave}>
          Save
        </button>
      )}
    </div>
  );
}