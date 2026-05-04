import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../../features/auth/api/authApi";
import { tokenStorage } from "../../shared/lib/tokenStorage";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    avatar: "",
    phone: "",
    userType: "buyer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const data = await registerRequest({
        email: form.email,
        password: form.password,
        username: form.username,
        firstName: form.firstName || undefined,
        lastName: form.lastName || undefined,
        avatar: form.avatar || undefined,
        phone: form.phone || undefined,
        userType: form.userType || "buyer",
      });

      tokenStorage.set(data.token);
      navigate("/profile");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Register failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-lg bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">

        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          Create account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email + Password */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="text-sm text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">First name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Last name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </div>
          </div>

          {/* Avatar */}
          <div>
            <label className="text-sm text-gray-400">Avatar URL</label>
            <input
              type="text"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
            />
          </div>

          {/* Phone + Role */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">User type</label>
              <select
                name="userType"
                value={form.userType}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
              >
                <option value="buyer">buyer</option>
                <option value="seller">seller</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium disabled:opacity-50"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}