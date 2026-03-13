"use client";

import Link from "next/link";

function ReporterList({ reporters, del }) {
  return (
    <div className="p-6 bg-white rounded shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">সকল সাংবাদিক</h2>

        <Link
          href="/admin/reporter/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + নতুন সাংবাদিক
        </Link>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">ছবি</th>
            <th className="p-3 border">নাম</th>
            <th className="p-3 border">রিপোর্ট এলাকা</th>
            <th className="p-3 border">ঠিকানা</th>
            <th className="p-3 border">স্ট্যাটাস</th>
            <th className="p-3 border">অ্যাকশন</th>
          </tr>
        </thead>

        <tbody>
          {reporters.map((rep) => (
            <tr key={rep._id} className="text-center">

              {/* Profile Image */}
              <td className="p-3 border">
                <img
                  src={rep?.profileImage}
                  className="w-16 h-16 object-cover mx-auto rounded-full"
                />
              </td>

              {/* Name */}
              <td className="p-3 border">{rep?.name}</td>

              {/* Report Area */}
              <td className="p-3 border">{rep?.reportArea}</td>

              {/* Address */}
              <td className="p-3 border">{rep?.address}</td>

              {/* Status */}
              <td className="p-3 border">
                {rep?.status === "published" ? "সক্রিয়" : "ড্রাফট"}
              </td>

              {/* Actions */}
              <td className="p-3 border space-x-2">

                <Link
                  href={`/admin/reporter/edit/${rep?._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  এডিট
                </Link>

                <button
                  onClick={() => del(rep?._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  মুছুন
                </button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReporterList;