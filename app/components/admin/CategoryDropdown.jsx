"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function CategoryDropdown({ value, onChange }) {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/admin/categories");
      return res.data;
    },
  });

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border p-2 rounded"
    >
      <option value="">Select Category</option>
      {data?.map((cat) => (
        <option key={cat._id} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
