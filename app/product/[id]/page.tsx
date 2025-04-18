//
//
// 'use client';
//
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Navbar from "@/app/navbar";
// import { Skeleton } from "@/components/ui/skeleton";
//
// interface Product {
//     Артикул: string;
//     Найменування: string;
//     Ціна: string;
//     Фото?: string;
// }
//
// export default function ProductPage() {
//     const [product, setProduct] = useState<Product | null>(null);
//     const [loading, setLoading] = useState(true);
//     const params = useParams();
//     const router = useRouter();
//
//     useEffect(() => {
//         if (!params.id) return;
//
//         const fetchProduct = async () => {
//             const res = await fetch('/api/products');
//             const products: Product[] = await res.json();
//             const foundProduct = products.find((p) => p.Артикул === params.id);
//
//             if (!foundProduct) {
//                 router.push('/404');
//             } else {
//                 setProduct(foundProduct);
//             }
//             setLoading(false);
//         };
//
//         fetchProduct();
//     }, [params.id]);
//
//     const handleAddToCart = () => {
//         if (!product) return;
//
//         const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//         cart.push(product);
//         localStorage.setItem('cart', JSON.stringify(cart));
//
//         router.push('/cart');
//     };
//
//     return (
//         <>
//             <Navbar />
//             <div className="max-w-4xl mx-auto p-4">
//                 {loading ? (
//                     <div className="space-y-4">
//                         <Skeleton className="h-8 w-3/4" />
//                         <Skeleton className="h-6 w-1/4" />
//                         <div className="flex gap-4">
//                             <Skeleton className="w-96 h-96" />
//                             <Skeleton className="w-96 h-96" />
//                         </div>
//                         <Skeleton className="h-10 w-32" />
//                     </div>
//                 ) : product ? (
//                     <>
//                         <h1 className="text-3xl font-bold mb-4">{product.Найменування}</h1>
//                         <p className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
//                             Ціна: {Math.round(parseFloat(product["Ціна"]))} грн
//                         </p>
//
//                         <div className="flex flex-col gap-4">
//                             {product.Фото ? (
//                                 <div className="flex flex-wrap gap-4">
//                                     {product.Фото.split(',').map((img, index) => (
//                                         <img
//                                             key={index}
//                                             src={img.trim()}
//                                             alt={product.Найменування}
//                                             className="w-96 h-96 object-cover border rounded-md shadow-lg"
//                                         />
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <p className="text-gray-500">Фото отсутствует</p>
//                             )}
//
//                             <div className="w-96">
//                                 <button
//                                     onClick={handleAddToCart}
//                                     className="cursor-pointer w-full bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
//                                 >
//                                     Купить
//                                 </button>
//                             </div>
//
//                         </div>
//                     </>
//                 ) : (
//                     <p>Товар не найден</p>
//                 )}
//             </div>
//         </>
//     );
// }
//


'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from "@/app/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface Product {
    Артикул: string;
    Найменування: string;
    Ціна: string;
    Фото?: string;
}

export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        if (!params.id) return;

        const fetchProduct = async () => {
            const res = await fetch('/api/products');
            const products: Product[] = await res.json();
            const foundProduct = products.find((p) => p.Артикул === params.id);

            if (!foundProduct) {
                router.push('/404');
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
        router.push('/cart');
    };

    const handleImageClick = (imgUrl: string) => {
        setFullscreenImage(imgUrl);
    };

    const closeFullscreen = () => {
        setFullscreenImage(null);
    };

    return (
        <>
            <Navbar />
            <div className="max-w-5xl mx-auto p-4">
                {loading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <div className="flex gap-4 flex-wrap">
                            <Skeleton className="w-full sm:w-96 h-96" />
                            <Skeleton className="w-full sm:w-96 h-96" />
                        </div>
                        <Skeleton className="h-10 w-32" />
                    </div>
                ) : product ? (
                    <>
                        <h1 className="text-3xl font-bold mb-4">{product.Найменування}</h1>
                        <p className="text-xl font-semibold text-gray-800 mb-6 dark:text-white">
                            Ціна: {Math.round(parseFloat(product["Ціна"]))} грн
                        </p>

                        <div className="flex flex-col items-center gap-6">
                            {product.Фото ? (
                                <div className="w-full max-w-xl">
                                    {/* Основное изображение */}
                                    <Swiper
                                        spaceBetween={10}
                                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                        navigation
                                        modules={[Thumbs, Navigation]}
                                        className="mb-4"
                                    >
                                        {product.Фото.split(',').map((img, index) => (
                                            <SwiperSlide key={`main-${index}`}>
                                                <img
                                                    src={img.trim()}
                                                    alt={`${product.Найменування} ${index + 1}`}
                                                    className="w-full h-[400px] object-contain border rounded-md cursor-zoom-in"
                                                    onClick={() => handleImageClick(img.trim())}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Миниатюры */}
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        watchSlidesProgress
                                        modules={[Thumbs]}
                                        className="w-full"
                                    >
                                        {product.Фото.split(',').map((img, index) => (
                                            <SwiperSlide key={`thumb-${index}`}>
                                                <img
                                                    src={img.trim()}
                                                    alt={`Миниатюра ${index + 1}`}
                                                    className={`h-24 w-full object-contain rounded-md cursor-pointer border-2 ${
                                                        activeIndex === index ? 'border-blue-500' : 'border-transparent'
                                                    }`}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Кнопка "Купить" */}
                                    <div className="mt-6 w-full">
                                        <button
                                            onClick={handleAddToCart}
                                            className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition text-lg font-medium"
                                        >
                                            Купить
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500">Фото отсутствует</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p>Товар не найден</p>
                )}
            </div>

            {/* Модальное окно полноэкранного просмотра */}
            {fullscreenImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                    onClick={closeFullscreen}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
                        onClick={closeFullscreen}
                    >
                        &times;
                    </button>
                    <img
                        src={fullscreenImage}
                        alt="Full screen"
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}


// 'use client';
//
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Navbar from "@/app/navbar";
// import { Skeleton } from "@/components/ui/skeleton";
//
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Thumbs } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/thumbs';
// import 'swiper/css/navigation';
//
// interface Product {
//     Артикул: string;
//     Найменування: string;
//     Ціна: string;
//     Фото?: string;
// }
//
// export default function ProductPage() {
//     const [product, setProduct] = useState<Product | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
//     const [activeIndex, setActiveIndex] = useState(0);
//
//     const params = useParams();
//     const router = useRouter();
//
//     useEffect(() => {
//         if (!params.id) return;
//
//         const fetchProduct = async () => {
//             const res = await fetch('/api/products');
//             const products: Product[] = await res.json();
//             const foundProduct = products.find((p) => p.Артикул === params.id);
//
//             if (!foundProduct) {
//                 router.push('/404');
//             } else {
//                 setProduct(foundProduct);
//             }
//             setLoading(false);
//         };
//
//         fetchProduct();
//     }, [params.id]);
//
//     const handleAddToCart = () => {
//         if (!product) return;
//
//         const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//         cart.push(product);
//         localStorage.setItem('cart', JSON.stringify(cart));
//
//         router.push('/cart');
//     };
//
//     return (
//         <>
//             <Navbar />
//             <div className="max-w-4xl mx-auto p-4">
//                 {loading ? (
//                     <div className="space-y-4">
//                         <Skeleton className="h-8 w-3/4" />
//                         <Skeleton className="h-6 w-1/4" />
//                         <div className="flex gap-4">
//                             <Skeleton className="w-96 h-96" />
//                             <Skeleton className="w-96 h-96" />
//                         </div>
//                         <Skeleton className="h-10 w-32" />
//                     </div>
//                 ) : product ? (
//                     <>
//                         <h1 className="text-3xl font-bold mb-4">{product.Найменування}</h1>
//                         <p className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
//                             Ціна: {Math.round(parseFloat(product["Ціна"]))} грн
//                         </p>
//
//                         <div className="flex flex-col gap-6">
//                             {product.Фото ? (
//                                 <>
//                                     {/* Основное изображение с навигацией */}
//                                     <Swiper
//                                         spaceBetween={10}
//                                         thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//                                         onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//                                         navigation
//                                         modules={[Thumbs, Navigation]}
//                                         className="mb-4 w-full max-w-3xl"
//                                     >
//                                         {product.Фото.split(',').map((img, index) => (
//                                             <SwiperSlide key={`main-${index}`}>
//                                                 <img
//                                                     src={img.trim()}
//                                                     alt={`${product.Найменування} ${index + 1}`}
//                                                     className="w-full h-[400px] object-contain border rounded-md"
//                                                 />
//                                             </SwiperSlide>
//                                         ))}
//                                     </Swiper>
//
//                                     {/* Миниатюры с активной рамкой */}
//                                     <Swiper
//                                         onSwiper={setThumbsSwiper}
//                                         spaceBetween={10}
//                                         slidesPerView={4}
//                                         watchSlidesProgress
//                                         modules={[Thumbs]}
//                                         className="w-full max-w-3xl"
//                                     >
//                                         {product.Фото.split(',').map((img, index) => (
//                                             <SwiperSlide key={`thumb-${index}`}>
//                                                 <img
//                                                     src={img.trim()}
//                                                     alt={`Миниатюра ${index + 1}`}
//                                                     className={`h-24 w-full object-contain rounded-md cursor-pointer border-2 ${
//                                                         activeIndex === index
//                                                             ? 'border-blue-500'
//                                                             : 'border-transparent'
//                                                     }`}
//                                                 />
//                                             </SwiperSlide>
//                                         ))}
//                                     </Swiper>
//                                 </>
//                             ) : (
//                                 <p className="text-gray-500">Фото отсутствует</p>
//                             )}
//
//                             <div className="w-full max-w-sm">
//                                 <button
//                                     onClick={handleAddToCart}
//                                     className="cursor-pointer w-full bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
//                                 >
//                                     Купить
//                                 </button>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <p>Товар не найден</p>
//                 )}
//             </div>
//         </>
//     );
// }




//
//
// 'use client';
//
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Navbar from "@/app/navbar";
// import { Skeleton } from "@/components/ui/skeleton";
//
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Thumbs } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/thumbs';
//
// interface Product {
//     Артикул: string;
//     Найменування: string;
//     Ціна: string;
//     Фото?: string;
// }
//
// export default function ProductPage() {
//     const [product, setProduct] = useState<Product | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
//
//     const params = useParams();
//     const router = useRouter();
//
//     useEffect(() => {
//         if (!params.id) return;
//
//         const fetchProduct = async () => {
//             const res = await fetch('/api/products');
//             const products: Product[] = await res.json();
//             const foundProduct = products.find((p) => p.Артикул === params.id);
//
//             if (!foundProduct) {
//                 router.push('/404');
//             } else {
//                 setProduct(foundProduct);
//             }
//             setLoading(false);
//         };
//
//         fetchProduct();
//     }, [params.id]);
//
//     const handleAddToCart = () => {
//         if (!product) return;
//
//         const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//         cart.push(product);
//         localStorage.setItem('cart', JSON.stringify(cart));
//
//         router.push('/cart');
//     };
//
//     return (
//         <>
//             <Navbar />
//             <div className="max-w-4xl mx-auto p-4">
//                 {loading ? (
//                     <div className="space-y-4">
//                         <Skeleton className="h-8 w-3/4" />
//                         <Skeleton className="h-6 w-1/4" />
//                         <div className="flex gap-4">
//                             <Skeleton className="w-96 h-96" />
//                             <Skeleton className="w-96 h-96" />
//                         </div>
//                         <Skeleton className="h-10 w-32" />
//                     </div>
//                 ) : product ? (
//                     <>
//                         <h1 className="text-3xl font-bold mb-4">{product.Найменування}</h1>
//                         <p className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
//                             Ціна: {Math.round(parseFloat(product["Ціна"]))} грн
//                         </p>
//
//                         <div className="flex flex-col gap-6">
//                             {product.Фото ? (
//                                 <>
//                                     {/* Большое изображение */}
//                                     <Swiper
//                                         spaceBetween={10}
//                                         thumbs={{ swiper: thumbsSwiper }}
//                                         className="mb-4 w-full max-w-3xl"
//                                         modules={[Thumbs]}
//                                     >
//                                         {product.Фото.split(',').map((img, index) => (
//                                             <SwiperSlide key={`main-${index}`}>
//                                                 <img
//                                                     src={img.trim()}
//                                                     alt={`${product.Найменування} ${index + 1}`}
//                                                     className="w-full h-[400px] object-contain border rounded-md"
//                                                 />
//                                             </SwiperSlide>
//                                         ))}
//                                     </Swiper>
//
//                                     {/* Миниатюры */}
//                                     <Swiper
//                                         onSwiper={setThumbsSwiper}
//                                         spaceBetween={10}
//                                         slidesPerView={4}
//                                         watchSlidesProgress
//                                         className="w-full max-w-3xl"
//                                         modules={[Thumbs]}
//                                     >
//                                         {product.Фото.split(',').map((img, index) => (
//                                             <SwiperSlide key={`thumb-${index}`}>
//                                                 <img
//                                                     src={img.trim()}
//                                                     alt={`Миниатюра ${index + 1}`}
//                                                     className="h-24 w-full object-contain border rounded-md cursor-pointer"
//                                                 />
//                                             </SwiperSlide>
//                                         ))}
//                                     </Swiper>
//                                 </>
//                             ) : (
//                                 <p className="text-gray-500">Фото отсутствует</p>
//                             )}
//
//                             <div className="w-full max-w-sm">
//                                 <button
//                                     onClick={handleAddToCart}
//                                     className="cursor-pointer w-full bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
//                                 >
//                                     Купить
//                                 </button>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <p>Товар не найден</p>
//                 )}
//             </div>
//         </>
//     );
// }

