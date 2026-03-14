"use client";

import Link from "next/link";
import { useState } from "react";

function ReporterList({ reporters, del }) {

  const [viewReporter, setViewReporter] = useState(null);
  const [page, setPage] = useState(1);

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

              <td className="p-3 border">
                <img
                  src={rep?.profileImage}
                  className="w-16 h-16 object-cover mx-auto rounded-full"
                />
              </td>

              <td className="p-3 border">{rep?.name}</td>
              <td className="p-3 border">{rep?.reportArea}</td>
              <td className="p-3 border">{rep?.address}</td>

              <td className="p-3 border">
                {rep?.status === "published" ? "সক্রিয়" : "ড্রাফট"}
              </td>

              <td className="p-3 border space-x-2">

                {/* VIEW */}
                <button
                  onClick={() => {
                    setViewReporter(rep);
                    setPage(1);
                  }}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  View
                </button>

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

      {/* ================= MODAL ================= */}

      {viewReporter && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-1000">

          <div className="bg-white rounded-xl max-w-[900px] w-full max-h-[90vh] overflow-y-auto p-6 relative">

            {/* Close */}
            <button
              onClick={() => setViewReporter(null)}
              className="absolute top-4 right-4 text-gray-600 text-xl"
            >
              ✕
            </button>

            {/* Reporter Info */}
            <div className="flex gap-6 mb-6">

              <img
                src={viewReporter.profileImage}
                className="w-32 h-32 rounded-full object-cover border"
              />

              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{viewReporter.name}</h3>
                <p><b>এলাকা:</b> {viewReporter.reportArea}</p>
                <p><b>ঠিকানা:</b> {viewReporter.address}</p>
                <p>
                  <b>স্ট্যাটাস:</b>{" "}
                  {viewReporter.status === "published"
                    ? "সক্রিয়"
                    : "ড্রাফট"}
                </p>
              </div>

            </div>

            {/* CV Viewer */}
            <div>

              <h3 className="text-xl font-semibold mb-4">CV</h3>

              <div className="border rounded overflow-hidden">

                {/* CV PAGE IMAGE */}
                <img
                  src={`${viewReporter.cv.replace(
                    ".pdf",
                    `.jpg`
                  )}?page=${page}`}
                  className="w-full"
                />

              </div>

              {/* Pagination */}
              <div className="flex justify-between mt-4">

                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Previous
                </button>

                <span>
                  Page {page} / {viewReporter.pages}
                </span>

                <button
                  disabled={page === viewReporter.pages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Next
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ReporterList;