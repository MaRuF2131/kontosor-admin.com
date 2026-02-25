import Image from "next/image";
import Link from "next/link";

export default function AllNews({ news,del }) {
  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">সব সংবাদ</h1>

        <Link
          href="/admin/news/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + নতুন সংবাদ যোগ করুন
        </Link>
      </div>

      {/* News List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {news?.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b p-4 hover:bg-gray-50 transition"
          >
            {/* বাম পাশ */}
            <div className="flex items-center gap-4">
              <Image
                src={item.imageUrl || "/default.png"}
                alt={item.title}
                width={200}
                height={300}
                className="w-20 h-16 object-cover rounded"
              />

              <div>
                <h2 className="font-semibold text-lg">{item.title}</h2>

                <p className="text-sm text-gray-500">
                  বিভাগ: {item.division} | জেলা: {item.district} | উপজেলা: {item.upazila}
                </p>

                <div className="flex gap-2 mt-1">
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {item.subcategory}
                  </span>
                </div>
              </div>
            </div>

            {/* ডান পাশ */}
            <div className="flex items-center gap-3">
              {item.breaking && (
                <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                  ব্রেকিং
                </span>
              )}

              <span
                className={`text-xs px-2 py-1 rounded ${
                  item.status === "draft"
                    ? "bg-yellow-500 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {item.status === "draft" ? "খসড়া" : "প্রকাশিত"}
              </span>

              <Link
                href={`/admin/news/edit/${item._id}`}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                সম্পাদনা
              </Link>

              <button
                onClick={(e)=>{e.preventDefault();e.stopPropagation();del(item._id)}}
                className="text-blue-600  cursor-pointer hover:text-black"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}