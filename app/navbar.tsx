//
//
// 'use client';
//
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { ShoppingCartIcon } from "lucide-react";
//
// export default function Navbar() {
//     const [cartCount, setCartCount] = useState(0);
//
//     useEffect(() => {
//         const updateCartCount = () => {
//             const storedCart = localStorage.getItem('cart');
//             const cart = storedCart ? JSON.parse(storedCart) : [];
//             setCartCount(cart.length);
//         };
//
//         updateCartCount();
//         window.addEventListener('storage', updateCartCount);
//
//         return () => {
//             window.removeEventListener('storage', updateCartCount);
//         };
//     }, []);
//
//     return (
//         <nav className="bg-gray-800 text-white p-4 flex justify-between">
//             <Link href="/" className="text-xl font-bold">Головна</Link>
//             <Link href="/cart" className="relative px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 flex items-center gap-2">
//                 <span>Корзина</span>
//                 <div className="relative">
//                     <ShoppingCartIcon className="h-6 w-6 text-white" />
//                     {cartCount > 0 && (
//                         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-[6px]">
//                             {cartCount}
//                         </span>
//                     )}
//                 </div>
//             </Link>
//         </nav>
//     );
// }

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon } from "lucide-react";

export default function Navbar() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const storedCart = localStorage.getItem('cart');
            const cart = storedCart ? JSON.parse(storedCart) : [];
            setCartCount(cart.length);
        };

        updateCartCount();
        window.addEventListener('storage', updateCartCount);

        return () => {
            window.removeEventListener('storage', updateCartCount);
        };
    }, []);

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex items-center justify-center md:justify-between">
                <Link href="/" className="text-xl font-bold flex-1 text-center md:text-left">
                    Головна
                </Link>
                <Link href="/cart" className="relative px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 flex items-center gap-2">
                    <span>Корзина</span>
                    <div className="relative">
                        <ShoppingCartIcon className="h-6 w-6 text-white" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-[6px]">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </Link>
            </div>
        </nav>
    );
}