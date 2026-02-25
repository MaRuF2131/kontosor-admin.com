"use client";

import Link from "next/link";

export default function VideoStoryList({ stories, del }) {
  return (
    <div className="bg-white rounded shadow p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          সকল ভিডিও স্টোরি
        </h2>

        <Link
          href="/admin/video-story/add"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + নতুন ভিডিও স্টোরি
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">ভিডিও</th>
            <th className="p-3 border">শিরোনাম</th>
            <th className="p-3 border">স্ট্যাটাস</th>
            <th className="p-3 border">অ্যাকশন</th>
          </tr>
        </thead>

        <tbody>
          {stories?.map((story) => (
            <tr key={story._id} className="text-center">

              {/* Video Preview */}
              <td className="p-3 border ">
                {story?.videoUrl ? (
                 <div className="relative w-28 h-20 mx-auto">  
                    <video
                        src={story.videoUrl}
                        className="w-28 h-20 object-cover  rounded relative"
                        
                    />
                   <p className="absolute right-0.5 bottom-0.5 text-amber-200 text-sm">{Number((story.videoDuration / 100).toFixed(3))}</p>
                  </div> 
                ) : (
                  <span className="text-gray-400">No Video</span>
                )}
              </td>

              {/* Title */}
              <td className="p-3 border font-medium">
                {story.title}
              </td>

              {/* Status */}
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

              {/* Action */}
              <td className="p-3 border space-x-2">
                <Link
                  href={`/admin/video-story/edit/${story._id}`}
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