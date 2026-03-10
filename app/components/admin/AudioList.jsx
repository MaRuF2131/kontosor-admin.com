import Link from "next/link";

function AudioList({ audios, del }) {
  return (
    <div className="p-6 bg-white rounded shadow">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">সকল অডিও</h2>

        <Link
          href="/admin/audio/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + নতুন অডিও
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">থাম্বনেইল</th>
            <th className="p-3 border">শিরোনাম</th>
            <th className="p-3 border">অডিও</th>
            <th className="p-3 border">স্ট্যাটাস</th>
            <th className="p-3 border">অ্যাকশন</th>
          </tr>
        </thead>

        <tbody>
          {audios.map((audio) => (
            <tr key={audio._id} className="text-center">

              <td className="p-3 border">
                <img
                  src={audio.thumbnail}
                  className="w-20 h-14 object-cover mx-auto rounded"
                />
              </td>

              <td className="p-3 border">{audio.title}</td>

              <td className="p-3 border">
                <audio controls className="w-40">
                  <source src={audio.audioUrl} />
                </audio>
              </td>

              <td className="p-3 border">
                {audio.status === "published"
                  ? "প্রকাশিত"
                  : "ড্রাফট"}
              </td>

              <td className="p-3 border space-x-2">
                <Link
                  href={`/admin/audio/edit/${audio._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  এডিট
                </Link>

                <button
                  onClick={() => del(audio._id)}
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

export default AudioList;