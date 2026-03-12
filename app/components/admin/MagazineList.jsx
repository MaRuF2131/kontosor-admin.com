"use client";

import Link from "next/link";

function MagazineList({ magazines, del }) {
  return (
    <div className="p-6 bg-white rounded shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">সকল ম্যাগাজিন</h2>

        <Link
          href="/admin/magazine/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + নতুন ম্যাগাজিন
        </Link>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">কভার</th>
            <th className="p-3 border">শিরোনাম</th>
            <th className="p-3 border">পৃষ্ঠা সংখ্যা</th>
            <th className="p-3 border">স্ট্যাটাস</th>
            <th className="p-3 border">অ্যাকশন</th>
          </tr>
        </thead>

        <tbody>
          {magazines.map((mag) => (
            <tr key={mag._id} className="text-center">

              {/* Cover */}
              <td className="p-3 border">
                  <img
                    src={
                      mag?.coverImage // যদি DB তে custom cover image থাকে
                        ? mag.coverImage
                        : `https://res.cloudinary.com/drexcxkuq/image/upload/pg_1/f_jpg/${mag?.publicId}.pdf` // Cloudinary PDF page 1 as image
                    }
                    className="w-20 h-28 object-cover mx-auto rounded"
                  />
              </td>

              {/* Title */}
              <td className="p-3 border">{mag?.title}</td>

              {/* Page count */}
              <td className="p-3 border">{mag?.pages}</td>

              {/* Status */}
              <td className="p-3 border">
                {mag?.status === "published" ? "প্রকাশিত" : "ড্রাফট"}
              </td>

              {/* Actions */}
              <td className="p-3 border space-x-2">
                <Link
                  /* href={`/admin/magazine/edit/${mag?._id}`} */
                  href={"#"}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  এডিট
                </Link>

                <button
                  onClick={() => del(mag?._id)}
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

export default MagazineList;