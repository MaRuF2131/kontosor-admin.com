"use client";

import Link from "next/link";
import { useState } from "react";

export default function PhotoStoryListPage() {
  // Demo Data (পরে API থেকে আসবে)
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "বর্ষার দিনে শহরের দৃশ্য",
      thumbnail: "https://via.placeholder.com/150",
      totalImages: 5,
      status: "published",
    },
    {
      id: 2,
      title: "গ্রামের জীবনচিত্র",
      thumbnail: "https://via.placeholder.com/150",
      totalImages: 8,
      status: "draft",
    },
  ]);

  const deleteStory = (id) => {
    const confirmDelete = confirm("আপনি কি নিশ্চিতভাবে মুছে ফেলতে চান?");
    if (!confirmDelete) return;

    setStories(stories.filter((story) => story.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">সকল ফটো স্টোরি</h2>

        <Link
          href="/admin/photo-story/add"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + নতুন ফটো স্টোরি
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
          {stories.map((story) => (
            <tr key={story.id} className="text-center">
              <td className="p-3 border">
                <img
                  src={story.thumbnail}
                  alt="thumb"
                  className="w-20 h-14 object-cover mx-auto rounded"
                />
              </td>

              <td className="p-3 border">{story.title}</td>

              <td className="p-3 border">{story.totalImages}</td>

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

              <td className="p-3 border space-x-2">
                <Link
                  href={`/admin/photo-story/edit/${story.id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  এডিট
                </Link>

                <button
                  onClick={() => deleteStory(story.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                >
                  মুছুন
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {stories.length === 0 && (
        <p className="text-center py-6 text-gray-500">
          কোনো ফটো স্টোরি পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
}
