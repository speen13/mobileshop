
'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import Papa from "papaparse";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {Skeleton} from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from 'lucide-react'; // добавь импорт иконок
import { Navigation } from 'swiper/modules'; // импорт Swiper Navigation

// Добавь хук useRef:
import { useRef } from "react";

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
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
                        <Skeleton className="h-40 w-full rounded-md mb-4" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                ))}
            </div>
        );
    }
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
                            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                                <h3 className="overflow-hidden text-xl font-semibold mb-4 dark:text-white">{product["Найменування"]}</h3>
                                {/*{product["Фото"] && (*/}
                                {/*    <div className="mb-4">*/}
                                {/*        <Swiper spaceBetween={10} slidesPerView={1} navigation pagination={{ clickable: true }} loop>*/}
                                {/*            {product["Фото"].split(",").map((imageUrl: string, imgIndex: number) => (*/}
                                {/*                <SwiperSlide key={imgIndex}>*/}
                                {/*                    <img src={imageUrl.trim()} alt={product["Найменування"]} className="w-full h-auto rounded-md" />*/}
                                {/*                </SwiperSlide>*/}
                                {/*            ))}*/}
                                {/*        </Swiper>*/}
                                {/*    </div>*/}
                                {/*)}*/}

                                {product["Фото"] && (
                                    <div className="mb-4 relative">
                                        {/* Кастомные стрелки */}
                                        <button
                                            ref={prevRef}
                                            className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white/90 hover:bg-white text-black rounded-full p-2 shadow-md"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            ref={nextRef}
                                            className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white/90 hover:bg-white text-black rounded-full p-2 shadow-md"
                                        >
                                            <ChevronRight size={24} />
                                        </button>

                                        <Swiper
                                            spaceBetween={10}
                                            slidesPerView={1}
                                            loop
                                            modules={[Navigation]}
                                            navigation={{
                                                prevEl: prevRef.current,
                                                nextEl: nextRef.current,
                                            }}
                                            onBeforeInit={(swiper) => {
                                                // @ts-ignore
                                                swiper.params.navigation.prevEl = prevRef.current;
                                                // @ts-ignore
                                                swiper.params.navigation.nextEl = nextRef.current;
                                            }}
                                        >
                                            {product["Фото"].split(",").map((imageUrl: string, imgIndex: number) => (
                                                <SwiperSlide key={imgIndex}>
                                                    <img
                                                        src={imageUrl.trim()}
                                                        alt={product["Найменування"]}
                                                        className="w-full h-auto rounded-md"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                )}
                                <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Ціна: {Math.round(parseFloat(product["Ціна"] || "0"))} грн</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Товары не найдены.</p>
                )}
            </div>



            <div className="flex justify-center items-center mt-6 flex-wrap gap-2">
                <button
                    className="cursor-pointer px-3 py-1 border rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Назад
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) =>
                        totalPages <= 5 || // если страниц всего 5 или меньше — показываем все
                        Math.abs(currentPage - page) <= 2 || // показываем +-2 от текущей
                        page === 1 || page === totalPages // всегда показываем 1 и последнюю
                    )
                    .reduce<number[]>((acc, page, i, arr) => {
                        if (i > 0 && page - arr[i - 1] > 1) acc.push(-1); // -1 будет означать "..."
                        acc.push(page);
                        return acc;
                    }, [])
                    .map((page, index) =>
                        page === -1 ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-500 select-none">...</span>
                        ) : (
                            <button
                                key={page}
                                className={`cursor-pointer px-3 py-1 border rounded-md ${
                                    currentPage === page
                                        ? 'bg-blue-700 text-white'
                                        : 'bg-white dark:bg-gray-700 text-black dark:text-white'
                                } hover:bg-blue-500 hover:text-white transition cursor-pointer`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        )
                    )}

                <button
                    className="cursor-pointer px-3 py-1 border rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Вперед
                </button>
            </div>
        </div>
    );
}