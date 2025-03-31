
//
// 'use client';
//
// import { useEffect, useState } from "react";
// import Papa from "papaparse";
//
// export default function ProductsPage() {
//     const [products, setProducts] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//
//     useEffect(() => {
//         fetch("/data/products.csv") // Путь к CSV файлу
//             .then((res) => res.text())  // Преобразуем CSV в текст
//             .then((csvText) => {
//                 // Парсим CSV в JSON с помощью papaparse
//                 Papa.parse(csvText, {
//                     complete: (result) => {
//                         console.log("Parsed CSV:", result);
//                         setProducts(result.data);  // Сохраняем данные в state
//                         setLoading(false);
//                     },
//                     header: true, // Заголовки в CSV
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
//     return (
//         <div>
//             <h1>Список товаров</h1>
//             <ul>
//                 {products.map((product: any, index: number) => (
//                     <li key={product["Артикул"] || index}>
//                         <h3>{product["Найменування"]}</h3>
//
//                         {/* Если есть изображения, выводим их */}
//                         {product["Фото"] && (
//                             <div>
//                                 {product["Фото"]
//                                     .split(",") // Разделяем ссылки на изображения
//                                     .map((imageUrl: string, imgIndex: number) => (
//                                         <img
//                                             key={imgIndex}
//                                             src={imageUrl.trim()} // Убираем лишние пробелы
//                                             alt={product["Найменування"]}
//                                             width={200}
//                                             height={200}
//                                         />
//                                     ))}
//                             </div>
//                         )}
//
//                         <p>Ціна: {product["Ціна"]} грн</p>
//                         <a href={product["Посилання"]} target="_blank" rel="noopener noreferrer">
//                             Подробнее
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }


'use client';

import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/data/products.csv") // Путь к CSV файлу
            .then((res) => res.text())  // Преобразуем CSV в текст
            .then((csvText) => {
                // Парсим CSV в JSON с помощью papaparse
                Papa.parse(csvText, {
                    complete: (result) => {
                        console.log("Parsed CSV:", result);
                        setProducts(result.data);  // Сохраняем данные в state
                        setLoading(false);
                    },
                    header: true, // Заголовки в CSV
                });
            })
            .catch((err) => {
                console.error("Ошибка загрузки CSV:", err);
                setError("Ошибка загрузки данных");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8">Список товаров</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: any, index: number) => (
                    <div
                        key={product["Артикул"] || index}
                        className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <h3 className="text-xl font-semibold mb-4">{product["Найменування"]}</h3>

                        {/* Если есть изображения, выводим их */}
                        {product["Фото"] && (
                            <div className="mb-4">
                                {product["Фото"]
                                    .split(",") // Разделяем ссылки на изображения
                                    .map((imageUrl: string, imgIndex: number) => (
                                        <img

                                            key={imgIndex}
                                            src={imageUrl.trim()} // Убираем лишние пробелы
                                            alt={product["Найменування"]}
                                            className="w-full h-auto rounded-md"
                                        />
                                    ))}
                            </div>
                        )}

                        <p className="text-lg font-bold text-gray-800 mb-2">Ціна: {product["Ціна"]} грн</p>

                        <a
                            href={product["Посилання"]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Подробнее
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}