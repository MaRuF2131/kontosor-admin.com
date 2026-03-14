"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function AdminPanel() {
  const { data: session } = useSession();

  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "admin",
    password: "",
  });

  const [editForm, setEditForm] = useState(null);

  // Fetch admins
  const fetchAdmins = async () => {
    try {
      if (session?.user?.role !== "superadmin") return;

      const res = await api.get("/superadmin", {
        params: { search },
      });

      setAdmins(res.data.data);
    } catch {
      toast.error("Failed to load admins");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [search]);

  // Create admin
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/superadmin/create", form);

      if (res.data.ok) {
        toast.success("Admin created");

        setShowCreate(false);
        setForm({
          name: "",
          email: "",
          role: "admin",
          password: "",
        });

        fetchAdmins();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
    }
  };

  // Update admin
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/superadmin/update/${editForm._id}`, editForm);

      if (res.data.ok) {
        toast.success("Admin updated");
        setShowEdit(false);
        fetchAdmins();
      }
    } catch {
      toast.error("Update failed");
    }
  };

  // Toggle status
  const toggleStatus = async (id, disabled) => {
    try {
      const res = await api.patch(`/superadmin/status/${id}`, {
        disabled: !disabled,
      });

      if (res.data.ok) {
        toast.success("Status updated");
        fetchAdmins();
      }
    } catch {
      toast.error("Status update failed");
    }
  };

  if (session?.user?.role !== "superadmin") return null;

  return (
    <div className="p-6 relative h-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Management</h1>

        <button
          onClick={() => setShowCreate(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Admin
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="border p-2 w-full rounded mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">

          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((a) => (
              <tr key={a._id}>

                <td className="p-2 border">{a.name}</td>
                <td className="p-2 border">{a.email}</td>
                <td className="p-2 border capitalize">{a.role}</td>

                {/* Status */}
                <td className="p-2 border">
                  <button
                    onClick={() => toggleStatus(a._id, a.disabled)}
                    className={`px-3 py-1 rounded text-white ${
                      a.disabled ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {a.disabled ? "Disabled" : "Active"}
                  </button>
                </td>

                {/* Action */}
                <td className="p-2 border">
                  <button
                    onClick={() => {
                      setEditForm(a);
                      setShowEdit(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">

          <form
            onSubmit={handleCreate}
            className="bg-white p-6 rounded w-96 space-y-4"
          >

            <h2 className="text-xl font-bold">Create Admin</h2>

            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full rounded"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-full rounded"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <select
              className="border p-2 w-full rounded"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>

            <input
              type="password"
              placeholder="Password"
              className="border p-2 w-full rounded"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <div className="flex justify-end gap-2">

              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && editForm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">

          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded w-96 space-y-4"
          >

            <h2 className="text-xl font-bold">Update Admin</h2>

            <input
              type="text"
              className="border p-2 w-full rounded"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />

            <input
              type="email"
              className="border p-2 w-full rounded"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
            />

            <select
              className="border p-2 w-full rounded"
              value={editForm.role}
              onChange={(e) =>
                setEditForm({ ...editForm, role: e.target.value })
              }
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>

            <input
              type="password"
              placeholder="New Password (optional)"
              className="border p-2 w-full rounded"
              onChange={(e) =>
                setEditForm({ ...editForm, password: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">

              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>

            </div>

          </form>
        </div>
      )}

    </div>
  );
}