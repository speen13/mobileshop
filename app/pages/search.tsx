
//
// 'use client';
//
// import { useEffect, useState } from "react";
// import Link from 'next/link';
// import Papa from "papaparse";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
//
// export default function SearchPage() {
//     const [products, setProducts] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(12);
//
//     useEffect(() => {
//         fetch("/data/products.csv")
//             .then((res) => res.text())
//             .then((csvText) => {
//                 Papa.parse(csvText, {
//                     complete: (result) => {
//                         console.log("Parsed CSV:", result);
//                         setProducts(result.data);
//                         setLoading(false);
//                     },
//                     header: true,
//                 });
//             })
//             .catch((err) => {
//                 console.error("Ошибка загрузки CSV:", err);
//                 setError("Ошибка загрузки данных");
//                 setLoading(false);
//             });
//     }, []);
//
//     if (loading) return <p>Загрузка...</p>;
//     if (error) return <p>{error}</p>;
//
//     const filteredProducts = products.filter((product: any) =>
//         product["Найменування"]?.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//
//     const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//     const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
//
//     return (
//         <div>
//             <h1 className="text-3xl font-bold text-center mb-8">Список товаров</h1>
//
//             <div className="mb-6 text-center">
//                 <input
//                     type="text"
//                     placeholder="Поиск по названию..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="px-4 py-2 border rounded-md"
//                 />
//             </div>
//
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {displayedProducts.length > 0 ? (
//                     displayedProducts.map((product: any, index: number) => (
//                         <Link
//                             key={product["Артикул"] || index}
//                             href={`/product/${product["Артикул"] || index}`}
//                             className="block"
//                         >
//                             <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
//                                 <h3 className="text-xl font-semibold mb-4 dark:text-black">{product["Найменування"]}</h3>
//
//                                 {product["Фото"] && (
//                                     <div className="mb-4">
//                                         <Swiper
//                                             spaceBetween={10}
//                                             slidesPerView={1}
//                                             navigation
//                                             pagination={{ clickable: true }}
//                                             loop
//                                             className="product-slider"
//                                         >
//                                             {product["Фото"]
//                                                 .split(",")
//                                                 .map((imageUrl: string, imgIndex: number) => (
//                                                     <SwiperSlide key={imgIndex}>
//                                                         <img
//                                                             src={imageUrl.trim()}
//                                                             alt={product["Найменування"]}
//                                                             className="w-full h-auto rounded-md"
//                                                         />
//                                                     </SwiperSlide>
//                                                 ))}
//                                         </Swiper>
//                                     </div>
//                                 )}
//
//                                 <p className="text-lg font-bold text-gray-800 mb-2">Ціна:{Math.round(parseFloat(product["Ціна"]))} грн</p>
//                             </div>
//                         </Link>
//                     ))
//                 ) : (
//                     <p>Товары не найдены.</p>
//                 )}
//             </div>
//
//             <div className="flex justify-center items-center mt-6 space-x-4">
//                 <button
//                     className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
//                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                 >
//                     Назад
//                 </button>
//                 <span>Страница {currentPage} из {totalPages}</span>
//                 <button
//                     className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
//                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                 >
//                     Вперед
//                 </button>
//             </div>
//         </div>
//     );
// }

// 'use client';
//
// import { useEffect, useState } from "react";
// import Link from 'next/link';
// import Papa from "papaparse";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
//
// interface SearchPageProps {
//     filter: string; // Фильтр категории из Sidebar
// }
//
// export default function SearchPage({ filter }: SearchPageProps) {
//     const [products, setProducts] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 12;
//
//     // Функция для определения категории товара
//     const categorizeProduct = (product: any) => {
//         const name = product["Найменування"]?.toLowerCase();
//         if (!name) return "";
//
//         if (name.includes("кабель") || name.includes("перехідник")) return "Кабелі/перехідники";
//         if (name.includes("чохол")) return "Чохли";
//         if (name.includes("type-c-хаб")) return "Type-C-Хаби";
//         if (name.includes("хаб")) return "USB-хабы";
//
//         return "Інше";
//     };
//
//     useEffect(() => {
//         fetch("/data/products.csv")
//             .then((res) => res.text())
//             .then((csvText) => {
//                 Papa.parse(csvText, {
//                     complete: (result) => {
//
//                         const productsWithCategory = result.data.map((product: any) => ({
//                             ...product,
//                             category: categorizeProduct(product),
//                         }));
//                         setProducts(productsWithCategory);
//                         setLoading(false);
//                     },
//                     header: true,
//                 });
//             })
//             .catch((err) => {
//                 console.error("Ошибка загрузки CSV:", err);
//                 setError("Ошибка загрузки данных");
//                 setLoading(false);
//             });
//     }, []);
//
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [filter]);
//
//     if (loading) return <p>Загрузка...</p>;
//     if (error) return <p>{error}</p>;
//
//     // Фильтрация товаров по названию и категории
//     const filteredProducts = products.filter((product) => {
//         const matchesSearch = product["Найменування"]?.toLowerCase().includes(searchQuery.toLowerCase());
//         const matchesCategory = filter ? product.category === filter : true;
//
//
//         return matchesSearch && matchesCategory;
//     });
//
//     const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//     const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
//
//     return (
//         <div>
//             <h1 className="text-3xl font-bold text-center mb-8">Список товаров</h1>
//
//             {/* Поле поиска */}
//             <div className="mb-6 text-center">
//                 <input
//                     type="text"
//                     placeholder="Поиск по названию..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="px-4 py-2 border rounded-md"
//                 />
//             </div>
//
//             {/* Сетка товаров */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {displayedProducts.length > 0 ? (
//                     displayedProducts.map((product: any, index: number) => (
//                         <Link
//                             key={product["Артикул"] || index}
//                             href={`/product/${product["Артикул"] || index}`}
//                             className="block"
//                         >
//                             <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
//                                 <h3 className="text-xl font-semibold mb-4 dark:text-black">{product["Найменування"]}</h3>
//
//                                 {product["Фото"] && (
//                                     <div className="mb-4">
//                                         <Swiper spaceBetween={10} slidesPerView={1} navigation pagination={{ clickable: true }} loop>
//                                             {product["Фото"]
//                                                 .split(",")
//                                                 .map((imageUrl: string, imgIndex: number) => (
//                                                     <SwiperSlide key={imgIndex}>
//                                                         <img
//                                                             src={imageUrl.trim()}
//                                                             alt={product["Найменування"]}
//                                                             className="w-full h-auto rounded-md"
//                                                         />
//                                                     </SwiperSlide>
//                                                 ))}
//                                         </Swiper>
//                                     </div>
//                                 )}
//
//                                 <p className="text-lg font-bold text-gray-800 mb-2">Ціна: {Math.round(parseFloat(product["Ціна"] || "0"))} грн</p>
//                             </div>
//                         </Link>
//                     ))
//                 ) : (
//                     <p>Товары не найдены.</p>
//                 )}
//             </div>
//
//             {/* Пагинация */}
//             <div className="flex justify-center items-center mt-6 space-x-4">
//                 <button
//                     className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
//                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                 >
//                     Назад
//                 </button>
//                 <span>Страница {currentPage} из {totalPages}</span>
//                 <button
//                     className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
//                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                 >
//                     Вперед
//                 </button>
//             </div>
//         </div>
//     );
// }

'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import Papa from "papaparse";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface SearchPageProps {
    filter: string; // Фильтр категории из Sidebar
}

export default function SearchPage({ filter }: SearchPageProps) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [brands, setBrands] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const categorizeProduct = (product: any) => {
        const name = product["Найменування"]?.toLowerCase();
        if (!name) return "";

        if (name.includes("кабель") || name.includes("перехідник")) return "Кабелі/перехідники";
        if (name.includes("чохол")) return "Чохли";
        if (name.includes("type-c-хаб")) return "Type-C-Хаби";
        if (name.includes("хаб")) return "USB-хабы";

        return "Інше";
    };

    useEffect(() => {
        fetch("/data/products.csv")
            .then((res) => res.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    complete: (result) => {
                        const productsWithCategory = result.data.map((product: any) => ({
                            ...product,
                            category: categorizeProduct(product),
                        }));
                        setProducts(productsWithCategory);
                        setLoading(false);
                    },
                    header: true,
                });
            })
            .catch((err) => {
                console.error("Ошибка загрузки CSV:", err);
                setError("Ошибка загрузки данных");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        setSelectedBrand('');
        const filteredBrands = Array.from(new Set(products
            .filter(p => !filter || p.category === filter)
            .map(p => p["Бренд"])
            .filter(Boolean)));
        setBrands(filteredBrands);
    }, [filter, products]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product["Найменування"]?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filter ? product.category === filter : true;
        const matchesBrand = selectedBrand ? product["Бренд"] === selectedBrand : true;
        return matchesSearch && matchesCategory && matchesBrand;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8">Список товаров</h1>

            <div className="mb-6 text-center flex justify-center space-x-4">
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border rounded-md"
                />
                <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="px-4 py-2 border rounded-md"
                >
                    <option value="">Все бренды</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedProducts.length > 0 ? (
                    displayedProducts.map((product: any, index: number) => (
                        <Link key={product["Артикул"] || index} href={`/product/${product["Артикул"] || index}`} className="block">
                            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                                <h3 className="text-xl font-semibold mb-4 dark:text-black">{product["Найменування"]}</h3>
                                {product["Фото"] && (
                                    <div className="mb-4">
                                        <Swiper spaceBetween={10} slidesPerView={1} navigation pagination={{ clickable: true }} loop>
                                            {product["Фото"].split(",").map((imageUrl: string, imgIndex: number) => (
                                                <SwiperSlide key={imgIndex}>
                                                    <img src={imageUrl.trim()} alt={product["Найменування"]} className="w-full h-auto rounded-md" />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                )}
                                <p className="text-lg font-bold text-gray-800 mb-2">Ціна: {Math.round(parseFloat(product["Ціна"] || "0"))} грн</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Товары не найдены.</p>
                )}
            </div>

            <div className="flex justify-center items-center mt-6 space-x-4">
                <button className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Назад</button>
                <span>Страница {currentPage} из {totalPages}</span>
                <button className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Вперед</button>
            </div>
        </div>
    );
}
