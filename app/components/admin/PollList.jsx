"use client";

import Link from "next/link";

export default function PollList({ polls, del }) {

  return (
    <div className="bg-white rounded shadow p-6">

      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">
          সকল জরিপ
        </h2>

        <Link
          href="/admin/poll/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + নতুন জরিপ
        </Link>
      </div>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">ছবি</th>
            <th className="p-3 border">প্রশ্ন</th>
            <th className="p-3 border">ভোট ফলাফল</th>
            <th className="p-3 border">স্ট্যাটাস</th>
            <th className="p-3 border">অ্যাকশন</th>
          </tr>
        </thead>

        <tbody>

          {polls.map((poll)=>{

            const total = poll.options.reduce((a,b)=>a+b.votes,0)

            return (
              <tr key={poll._id} className="text-center">

                <td className="p-3 border">
                  <img
                    src={poll.imageUrl}
                    className="w-16 h-12 object-cover mx-auto rounded"
                  />
                </td>

                <td className="p-3 border">
                  {poll.question}
                </td>

                <td className="p-3 border text-left">

                  {poll.options.map((op,i)=>{

                    const percent = total
                      ? ((op.votes / total)*100).toFixed(0)
                      : 0

                    return (
                      <div key={i} className="mb-2">

                        <div className="flex justify-between text-sm">
                          <span>{op.label}</span>
                          <span>{op.votes} ভোট</span>
                        </div>

                        <div className="bg-gray-200 h-2 rounded">

                          <div
                            className="bg-green-500 h-2 rounded"
                            style={{width:`${percent}%`}}
                          />

                        </div>

                      </div>
                    )

                  })}

                  <p className="text-xs text-gray-500">
                    মোট ভোট: {total}
                  </p>

                </td>

                <td className="p-3 border">
                  {poll.status==="published"?"প্রকাশিত":"ড্রাফট"}
                </td>

                <td className="p-3 border space-x-2">

                  <Link
                    href={`/admin/poll/edit/${poll._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    এডিট
                  </Link>

                  <button
                    onClick={()=>del(poll._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    মুছুন
                  </button>

                </td>

              </tr>
            )

          })}

        </tbody>

      </table>

    </div>
  )
}