import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">সংবাদ পোর্টালে স্বাগতম</h1>
      <p className="text-gray-700 mb-6 text-center">
        এটি আপনার পাবলিক হোমপেজ। ব্যবহারকারীরা এখান থেকে সংবাদ পড়তে পারবেন।
      </p>

      <div className="space-x-4">
        <Link
          href="/login"
          className="bg-black text-white px-4 py-2 rounded"
        >
          এডমিন লগইন
        </Link>

        <Link
          href="https://com-liard.vercel.app"
          className="bg-white border border-black px-4 py-2 rounded"
        >
          সংবাদ পড়ুন
        </Link>
      </div>
    </div>
  );
}
