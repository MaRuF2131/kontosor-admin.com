"use client";

import Link from "next/link";

export default function PhotoStoryList({ stories, del }) {

  return (
    <div className="bg-white rounded shadow p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          সকল ফটোগ্যালারি
        </h2>

        <Link
          href="/admin/photo-story/add"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + নতুন ফটোগ্যালারি
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">ছবি</th>
            <th className="p-3 border">শিরোনাম</th>
            <th className="p-3 border">মোট ছবি</th>
            <th className="p-3 border">স্ট্যাটাস</th>
            <th className="p-3 border">অ্যাকশন</th>
          </tr>
        </thead>

        <tbody>
          {stories?.map((story) => (
            <tr key={story._id} className="text-center">

              <td className="p-3 border">
                <img
                  src={story.images[0]?.imageUrl}
                  alt="thumb"
                  className="w-20 h-14 object-cover mx-auto rounded"
                />
              </td>

                <td className="p-3 border">
                {story.title}
              </td>

              <td className="p-3 border">
                {story.images?.length || 0}
              </td>

              <td className="p-3 border">
                {story.status === "published" ? (
                  <span className="text-green-600 font-semibold">
                    প্রকাশিত
                  </span>
                ) : (
                  <span className="text-yellow-600 font-semibold">
                    ড্রাফট
                  </span>
                )}
              </td>

              <td className="p-3 border space-x-2 space-y-2">
                <Link
                  href={`/admin/photo-gallery/edit/${story._id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  এডিট
                </Link>

                <button
                  onClick={() => del(story._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
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