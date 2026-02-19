"use client";

import Link from "next/link";
import { useState } from "react";

export default function VideoListPage() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "আজকের প্রধান সংবাদ",
      thumbnail: "https://via.placeholder.com/150",
      category: "সাধারণ",
      status: "published",
    },
  ]);

  const deleteVideo = (id) => {
    if (!confirm("আপনি কি মুছে ফেলতে চান?")) return;
    setVideos(videos.filter((v) => v.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded shadow">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">সকল ভিডিও</h2>

        <Link
          href="/admin/video/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + নতুন ভিডিও
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">থাম্বনেইল</th>
            <th className="p-3 border">শিরোনাম</th>
            <th className="p-3 border">ক্যাটাগরি</th>
            <th className="p-3 border">স্ট্যাটাস</th>
            <th className="p-3 border">অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id} className="text-center">
              <td className="p-3 border">
                <img
                  src={video.thumbnail}
                  className="w-20 h-14 object-cover mx-auto rounded"
                />
              </td>
              <td className="p-3 border">{video.title}</td>
              <td className="p-3 border">{video.category}</td>
              <td className="p-3 border">
                {video.status === "published" ? "প্রকাশিত" : "ড্রাফট"}
              </td>
              <td className="p-3 border space-x-2">
                <Link
                  href={`/admin/video/edit/${video.id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  এডিট
                </Link>
                <button
                  onClick={() => deleteVideo(video.id)}
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
