"use client";

import Link from "next/link";

export default function OpinionList({ opinions, del }) {

  return (
    <div className="p-6 bg-white rounded shadow">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          সকল মতামত
        </h2>

        <Link
          href="/admin/opinion/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + নতুন মতামত
        </Link>
      </div>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">ছবি</th>
            <th className="p-3 border">নাম</th>
            <th className="p-3 border">পদবি</th>
            <th className="p-3 border">শিরোনাম</th>
            <th className="p-3 border">স্ট্যাটাস</th>
            <th className="p-3 border">অ্যাকশন</th>
          </tr>
        </thead>

        <tbody>
          {opinions?.map((item)=>(
            <tr key={item._id} className="text-center">

              <td className="p-3 border">
                <img
                  src={item.imageUrl}
                  className="w-14 h-14 object-cover rounded mx-auto"
                />
              </td>

              <td className="p-3 border">{item.name}</td>
              <td className="p-3 border">{item.occupation}</td>
              <td className="p-3 border">{item.title}</td>

              <td className="p-3 border">
                {item.status==="published"
                  ? "প্রকাশিত"
                  : "ড্রাফট"}
              </td>

              <td className="p-3 border space-x-2">

                <Link
                  href={`/admin/opinion/edit/${item._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  এডিট
                </Link>

                <button
                  onClick={()=>del(item._id)}
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
  )
}