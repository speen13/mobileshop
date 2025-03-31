'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const storedCart = localStorage.getItem('cart');
            const cart = storedCart ? JSON.parse(storedCart) : [];
            setCartCount(cart.length);
        };

        updateCartCount();
        window.addEventListener('storage', updateCartCount); // Обновление при изменении localStorage

        return () => {
            window.removeEventListener('storage', updateCartCount);
        };
    }, []);

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <Link href="/" className="text-xl font-bold">Головна</Link>
            <Link href="/cart" className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 flex items-center">
                Корзина 🛒
                {cartCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                        {cartCount}
                    </span>
                )}
            </Link>
        </nav>
    );
}

