
//
// import fs from 'fs';
// import path from 'path';
// import Papa from 'papaparse';
// import { notFound } from 'next/navigation';
//
//
// interface Product {
//     Артикул: string;
//     Найменування: string;
//     Ціна: string;
//     Фото?: string;
// }
//
// export default async function ProductPage({ params }: { params: { id: string } }) {
//     const filePath = path.join(process.cwd(), 'public/data/products.csv');
//     const fileContent = fs.readFileSync(filePath, 'utf8');
//
//     const { data } = Papa.parse<Product>(fileContent, {
//         header: true,
//         skipEmptyLines: true,
//     });
//
//     const product = data.find((p) => p.Артикул === params.id);
//
//     if (!product) return notFound(); // Показываем 404, если товар не найден
//
//     return (
//
//         <div className="max-w-4xl mx-auto p-4">
//             <h1 className="text-3xl font-bold mb-4">{product.Найменування}</h1>
//             <p className="text-xl font-semibold text-gray-700 mb-4">Цена: {product.Ціна} грн</p>
//
//             {/* Проверяем, есть ли фото */}
//             {product.Фото ? (
//                 <div className="flex flex-wrap gap-4">
//                     {product.Фото.split(',').map((img, index) => (
//                         <img
//                             key={index}
//                             src={img.trim()}
//                             alt={product.Найменування}
//                             className="w-48 h-48 object-cover border rounded-md shadow-lg"
//                         />
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-gray-500">Фото отсутствует</p>
//             )}
//         </div>
//     );
// }


'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from "@/app/navbar";

interface Product {
    Артикул: string;
    Найменування: string;
    Ціна: string;
    Фото?: string;
}

export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams(); // Теперь используем useParams()
    const router = useRouter();

    useEffect(() => {
        if (!params.id) return; // Ждём, пока params.id будет доступен

        const fetchProduct = async () => {
            const res = await fetch('/api/products');
            const products: Product[] = await res.json();
            const foundProduct = products.find((p) => p.Артикул === params.id);

            if (!foundProduct) {
                router.push('/404'); // Перенаправляем на 404, если товара нет
            } else {
                setProduct(foundProduct);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [params.id]);

    const handleAddToCart = () => {
        if (!product) return;

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));


        router.push('/cart'); // Перенаправляем в корзину
    };

    if (loading) return <p>Загрузка...</p>;
    if (!product) return <p>Товар не найден</p>;

    return (
        <>
            <Navbar />
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{product.Найменування}</h1>
            <p className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">Ціна: {Math.round(parseFloat(product["Ціна"]))} грн</p>

            {product.Фото ? (
                <div className="flex flex-wrap gap-4">
                    {product.Фото.split(',').map((img, index) => (
                        <img
                            key={index}
                            src={img.trim()}
                            alt={product.Найменування}
                            className="w-96 h-96 object-cover border rounded-md shadow-lg"
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Фото отсутствует</p>
            )}

            <button
                onClick={handleAddToCart}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Купить
            </button>
        </div>
        </>
    );
}

//
// 'use client';
//
// import { useEffect, useState } from 'react';
// import { notFound } from 'next/navigation';
//
// interface Product {
//     Артикул: string;
//     Найменування: string;
//     Ціна: string;
//     Фото?: string;
// }
//
// export default function ProductPage({ params }: { params: { id: string } }) {
//     const [product, setProduct] = useState<Product | null>(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const fetchProduct = async () => {
//             const res = await fetch('/api/products');
//             const products: Product[] = await res.json();
//             const foundProduct = products.find((p) => p.Артикул === params.id);
//             if (!foundProduct) {
//                 notFound(); // Показываем 404, если товар не найден
//             } else {
//                 setProduct(foundProduct);
//             }
//             setLoading(false);
//         };
//
//         fetchProduct();
//     }, [params.id]);
//
//     if (loading) return <p>Загрузка...</p>;
//     if (!product) return <p>Товар не найден</p>;
//
//     return (
//         <div className="max-w-4xl mx-auto p-4">
//             <h1 className="text-3xl font-bold mb-4">{product.Найменування}</h1>
//             <p className="text-xl font-semibold text-gray-700 mb-4">Цена: {product.Ціна} грн</p>
//
//             {product.Фото ? (
//                 <div className="flex flex-wrap gap-4">
//                     {product.Фото.split(',').map((img, index) => (
//                         <img
//                             key={index}
//                             src={img.trim()}
//                             alt={product.Найменування}
//                             className="w-48 h-48 object-cover border rounded-md shadow-lg"
//                         />
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-gray-500">Фото отсутствует</p>
//             )}
//
//             <button
//                 onClick={() => alert('Товар добавлен в корзину!')}
//                 className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
//             >
//                 Купить
//             </button>
//         </div>
//     );
// }

