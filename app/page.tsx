import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300">
      <h1 className="text-4xl font-bold text-white mb-6">Welcome to ManageWise</h1>
      <p className="text-lg text-white mb-8">Your simple task management demo app.</p>
      <Link href="/my-manager">
        <button className="px-6 py-3 bg-[#1565c0] text-white rounded-lg shadow hover:bg-[#1976D2] transition-colors font-semibold text-lg cursor-pointer">
          Go to My Manager
        </button>
      </Link>
    </div>
  );
}
