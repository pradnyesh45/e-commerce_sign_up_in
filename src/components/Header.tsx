import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
      <Link href="/">
        <h1 className="text-xl font-bold">My E-commerce App</h1>
      </Link>
      <nav className="hidden md:flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/about" className="text-gray-300 hover:text-white">
          About Us
        </Link>
        {/* Add more navigation links as needed */}
      </nav>
    </header>
  );
}
