"use client";

import Link from "next/link";
import { useState } from "react";

export default function VideoStoryListPage() {
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "নদীর তীরে একদিন",
      thumbnail: "https://via.placeholder.com/150",
      status: "published",
    },
    {
      id: 2,
      title: "গ্রামের উৎসব",
      thumbnail: "https://via.placeholder.com/150",
      status: "draft",
    },
  ]);

  const deleteStory = (id) => {
    if (!confirm("আপনি কি মুছে ফেলতে চান?")) return;
    setStories(stories.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded shadow">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">সকল ভিডিও স্টোরি</h2>

        <Link
          href="/admin/video-story/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + নতুন ভিডিও স্টোরি
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">থাম্বনেইল</th>
            <th className="p-3 border">শিরোনাম</th>
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
                  className="w-20 h-14 object-cover mx-auto rounded"
                />
              </td>
              <td className="p-3 border">{story.title}</td>
              <td className="p-3 border">
                {story.status === "published" ? "প্রকাশিত" : "ড্রাফট"}
              </td>
              <td className="p-3 border space-x-2">
                <Link
                  href={`/admin/video-story/edit/${story.id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  এডিট
                </Link>
                <button
                  onClick={() => deleteStory(story.id)}
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
