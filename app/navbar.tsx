import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <Link href="/" className="text-xl font-bold">Магазин</Link>
            <Link href="/cart" className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600">
                Корзина 🛒
            </Link>
        </nav>
    );
}