'use client';

import { useEffect, useState } from "react";

type Currency = {
    $: {
        id: string;
        rate: string;
    };
};

type Shop = {
    name: string;
    company: string;
    url: string;
    currencies: {
        currency: Currency[];
    };
};

export default function ProductsPage() {
    const [shopInfo, setShopInfo] = useState<Shop | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                console.log("Data from API:", data);  // Логируем все данные для проверки
                const shopData = data.yml_catalog?.shop || null;
                setShopInfo(shopData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка загрузки данных:", err);
                setError("Ошибка загрузки данных");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Информация о магазине</h1>
            {shopInfo ? (
                <div>
                    <h2>{shopInfo.name}</h2>
                    <p>Компания: {shopInfo.company}</p>
                    <p>URL: <a href={shopInfo.url} target="_blank" rel="noopener noreferrer">{shopInfo.url}</a></p>
                    <h3>Валюты:</h3>
                    <ul>
                        {shopInfo.currencies.currency.map((currency, index) => (  // Теперь используем shopInfo.currencies.currency
                            <li key={index}>
                                {currency.$.id}: {currency.$.rate}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Нет данных о магазине</p>
            )}
        </div>
    );
}
// import { useEffect, useState } from "react";
//
// type Product = {
//     id: string;
//     name: string;
//     price: { _: number; $: { currency: string } };
//     brand: string;
// };
//
// export default function ProductsPage() {
//     const [products, setProducts] = useState<Product[] | null>(null); // Тип данных для products
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null); // Тип данных для error
//
//     useEffect(() => {
//         fetch("/api/products")
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("Data from API:", data)
//                 // Проверь структуру XML → JSON и скорректируй доступ к данным, если нужно
//                 const items = data.store?.product || [];
//                 setProducts(items);
//                 setLoading(false);
//             })
//             .catch((err) => {
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
//                 {products?.map((p) => (
//                     <li key={p.id}>
//                         <strong>{p.shop}</strong> - {p.price._} {p.price.$.currency} ({p.brand})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }