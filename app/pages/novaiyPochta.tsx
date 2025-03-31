// 'use client';
//
// import { useEffect, useState } from "react";
//
// export default function NovaPoshtaSelection() {
//     const [cities, setCities] = useState<any[]>([]); // Все города
//     const [filteredCities, setFilteredCities] = useState<any[]>([]); // Отфильтрованные города
//     const [selectedCity, setSelectedCity] = useState('');
//     const [warehouses, setWarehouses] = useState<any[]>([]);
//     const [selectedWarehouse, setSelectedWarehouse] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');
//
//     // Запрос городов
//     useEffect(() => {
//         fetch("/api/novaposhta", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 modelName: "Address",
//                 calledMethod: "getCities",
//                 methodProperties: {},
//             }),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.success) {
//                     setCities(data.data || []); // Сохраняем все города
//                     setFilteredCities(data.data || []); // Изначально все города отображаются
//                 } else {
//                     console.error("Ошибка загрузки городов:", data.errors);
//                 }
//             })
//             .catch((err) => console.error("Ошибка загрузки городов:", err));
//     }, []);
//
//     // Запрос отделений при изменении города
//     useEffect(() => {
//         if (!selectedCity) return;
//         fetch("/api/novaposhta", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 modelName: "AddressGeneral",
//                 calledMethod: "getWarehouses",
//                 methodProperties: { CityName: selectedCity },
//             }),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.success) {
//                     setWarehouses(data.data || []);
//                 } else {
//                     console.error("Ошибка загрузки отделений:", data.errors);
//                 }
//             })
//             .catch((err) => console.error("Ошибка загрузки отделений:", err));
//     }, [selectedCity]);
//
//     // Загрузка данных из localStorage при старте компонента
//     useEffect(() => {
//         const savedCity = localStorage.getItem('selectedCity');
//         const savedWarehouse = localStorage.getItem('selectedWarehouse');
//
//         if (savedCity) {
//             setSelectedCity(savedCity); // Восстанавливаем выбранный город
//         }
//         if (savedWarehouse) {
//             setSelectedWarehouse(savedWarehouse); // Восстанавливаем выбранное отделение
//         }
//     }, []);
//
//     // Обработчик изменения текста в поле поиска города
//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const query = e.target.value;
//         setSearchQuery(query); // Обновляем текст запроса
//
//         // Фильтрация городов по введенному запросу
//         if (query === '') {
//             setFilteredCities(cities); // Если пусто, показываем все города
//         } else {
//             const filtered = cities.filter((city) =>
//                 city.Description.toLowerCase().includes(query.toLowerCase())
//             );
//             setFilteredCities(filtered); // Обновляем отфильтрованный список
//         }
//     };
//
//     // Обработчик выбора города из списка
//     const handleCitySelect = (cityName: string) => {
//         setSearchQuery(cityName); // Обновляем текст в поле поиска
//         setSelectedCity(cityName); // Выбираем город
//         localStorage.setItem('selectedCity', cityName); // Сохраняем выбранный город в localStorage
//
//         // После выбора города скрываем список
//         setFilteredCities([]);
//     };
//
//     // Обработчик выбора отделения
//     const handleWarehouseSelect = (warehouseName: string) => {
//         setSelectedWarehouse(warehouseName); // Выбираем отделение
//         localStorage.setItem('selectedWarehouse', warehouseName); // Сохраняем выбранное отделение в localStorage
//     };
//
//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//             <h1 className="text-2xl font-bold text-center mb-4 dark:text-black">Выбор доставки Новой Почты</h1>
//
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Введите город:</label>
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     placeholder="Поиск города..."
//                     className="w-full px-4 py-2 border rounded-md mt-1 dark:text-black"
//                 />
//             </div>
//
//             {filteredCities.length > 0 && (
//                 <div className="mb-4 max-h-60 overflow-auto">
//                     <ul className="w-full px-4 py-2 border rounded-md mt-1 bg-white dark:text-black shadow-md max-h-60 overflow-auto">
//                         {filteredCities.map((city) => (
//                             <li
//                                 key={city.Ref}
//                                 className="cursor-pointer hover:bg-gray-200 p-2"
//                                 onClick={() => handleCitySelect(city.Description)}
//                             >
//                                 {city.Description}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//
//             {selectedCity && (
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Выберите отделение:</label>
//                     <select
//                         value={selectedWarehouse}
//                         onChange={(e) => handleWarehouseSelect(e.target.value)}
//                         className="w-full px-4 py-2 border rounded-md mt-1 dark:text-black"
//                     >
//                         <option value="">-- Выберите отделение --</option>
//                         {warehouses.map((wh) => (
//                             <option key={wh.Ref} value={wh.Description}>
//                                 {wh.Description}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             )}
//
//             {selectedWarehouse && (
//                 <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-md text-green-700">
//                     <p><strong>Вы выбрали:</strong></p>
//                     <p>Город: {selectedCity}</p>
//                     <p>Отделение: {selectedWarehouse}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
//
// 'use client';
//
// import { useEffect, useState } from "react";
//
// interface NovaPoshtaSelectionProps {
//     onSelectionChange: (city: string, warehouse: string) => void;
// }
//
// export default function NovaPoshtaSelection({ onSelectionChange }: NovaPoshtaSelectionProps) {
//     const [cities, setCities] = useState<any[]>([]);
//     const [filteredCities, setFilteredCities] = useState<any[]>([]);
//     const [selectedCity, setSelectedCity] = useState('');
//     const [warehouses, setWarehouses] = useState<any[]>([]);
//     const [selectedWarehouse, setSelectedWarehouse] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');
//
//     useEffect(() => {
//         fetch("/api/novaposhta", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 modelName: "Address",
//                 calledMethod: "getCities",
//                 methodProperties: {},
//             }),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.success) {
//                     setCities(data.data || []);
//                     setFilteredCities(data.data || []);
//                 } else {
//                     console.error("Ошибка загрузки городов:", data.errors);
//                 }
//             })
//             .catch((err) => console.error("Ошибка загрузки городов:", err));
//     }, []);
//
//     useEffect(() => {
//         if (!selectedCity) return;
//         fetch("/api/novaposhta", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 modelName: "AddressGeneral",
//                 calledMethod: "getWarehouses",
//                 methodProperties: { CityName: selectedCity },
//             }),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.success) {
//                     setWarehouses(data.data || []);
//                 } else {
//                     console.error("Ошибка загрузки отделений:", data.errors);
//                 }
//             })
//             .catch((err) => console.error("Ошибка загрузки отделений:", err));
//     }, [selectedCity]);
//
//     useEffect(() => {
//         const savedCity = localStorage.getItem('selectedCity');
//         const savedWarehouse = localStorage.getItem('selectedWarehouse');
//
//         if (savedCity) setSelectedCity(savedCity);
//         if (savedWarehouse) setSelectedWarehouse(savedWarehouse);
//     }, []);
//
//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const query = e.target.value;
//         setSearchQuery(query);
//         setFilteredCities(query ? cities.filter(city => city.Description.toLowerCase().includes(query.toLowerCase())) : cities);
//
//
//     };
//
//     const handleCitySelect = (cityName: string) => {
//         setSearchQuery(cityName);
//         setSelectedCity(cityName);
//         setWarehouses([]);
//         setSelectedWarehouse('');
//         localStorage.setItem('selectedCity', cityName);
//         onSelectionChange(cityName, '');
//     };
//
//     const handleWarehouseSelect = (warehouseName: string) => {
//         setSelectedWarehouse(warehouseName);
//         localStorage.setItem('selectedWarehouse', warehouseName);
//         onSelectionChange(selectedCity, warehouseName);
//     };
//
//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//             <h1 className="text-2xl font-bold text-center mb-4 dark:text-black">Выбор доставки Новой Почты</h1>
//
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Введите город:</label>
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     placeholder="Поиск города..."
//                     className="w-full px-4 py-2 border rounded-md mt-1 dark:text-black"
//                 />
//             </div>
//
//             {filteredCities.length > 0 && (
//                 <ul className="w-full px-4 py-2 border rounded-md mt-1 bg-white dark:text-black shadow-md max-h-60 overflow-auto">
//                     {filteredCities.map((city) => (
//                         <li
//                             key={city.Ref}
//                             className="cursor-pointer hover:bg-gray-200 p-2"
//                             onClick={() => handleCitySelect(city.Description)}
//                         >
//                             {city.Description}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//
//             {selectedCity && (
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Выберите отделение:</label>
//                     <select
//                         value={selectedWarehouse}
//                         onChange={(e) => handleWarehouseSelect(e.target.value)}
//                         className="w-full px-4 py-2 border rounded-md mt-1 dark:text-black"
//                     >
//                         <option value="">-- Выберите отделение --</option>
//                         {warehouses.map((wh) => (
//                             <option key={wh.Ref} value={wh.Description}>
//                                 {wh.Description}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             )}
//
//             {selectedWarehouse && (
//                 <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-md text-green-700">
//                     <p><strong>Вы выбрали:</strong></p>
//                     <p>Город: {selectedCity}</p>
//                     <p>Отделение: {selectedWarehouse}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

'use client';

import { useEffect, useState } from "react";

interface NovaPoshtaSelectionProps {
    onSelectionChange: (city: string, warehouse: string) => void;
}

export default function NovaPoshtaSelection({ onSelectionChange }: NovaPoshtaSelectionProps) {
    const [cities, setCities] = useState<any[]>([]);
    const [filteredCities, setFilteredCities] = useState<any[]>([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [warehouses, setWarehouses] = useState<any[]>([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false); // Управление видимостью списка

    useEffect(() => {
        fetch("/api/novaposhta", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                modelName: "Address",
                calledMethod: "getCities",
                methodProperties: {},
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCities(data.data || []);
                    setFilteredCities(data.data || []);
                } else {
                    console.error("Ошибка загрузки городов:", data.errors);
                }
            })
            .catch((err) => console.error("Ошибка загрузки городов:", err));
    }, []);

    useEffect(() => {
        if (!selectedCity) return;
        fetch("/api/novaposhta", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                modelName: "AddressGeneral",
                calledMethod: "getWarehouses",
                methodProperties: { CityName: selectedCity },
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setWarehouses(data.data || []);
                } else {
                    console.error("Ошибка загрузки отделений:", data.errors);
                }
            })
            .catch((err) => console.error("Ошибка загрузки отделений:", err));
    }, [selectedCity]);

    useEffect(() => {
        const savedCity = localStorage.getItem('selectedCity');
        const savedWarehouse = localStorage.getItem('selectedWarehouse');

        if (savedCity) setSelectedCity(savedCity);
        if (savedWarehouse) setSelectedWarehouse(savedWarehouse);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        setFilteredCities(query ? cities.filter(city => city.Description.toLowerCase().includes(query.toLowerCase())) : cities);
        setShowDropdown(!!query); // Показываем список, если есть ввод
    };

    const handleCitySelect = (cityName: string) => {
        setSearchQuery(cityName);
        setSelectedCity(cityName);
        setWarehouses([]);
        setSelectedWarehouse('');
        localStorage.setItem('selectedCity', cityName);
        onSelectionChange(cityName, '');
        setShowDropdown(false); // Скрываем список после выбора
    };

    const handleWarehouseSelect = (warehouseName: string) => {
        setSelectedWarehouse(warehouseName);
        localStorage.setItem('selectedWarehouse', warehouseName);
        onSelectionChange(selectedCity, warehouseName);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-black">Выбор доставки Новой Почты</h1>

            <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">Введите город:</label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Поиск города..."
                    className="w-full px-4 py-2 border rounded-md mt-1 dark:text-black"
                />
                {showDropdown && filteredCities.length > 0 && (
                    <ul className="absolute z-10 w-full px-4 py-2 border rounded-md mt-1 bg-white dark:text-black shadow-md max-h-60 overflow-auto">
                        {filteredCities.map((city) => (
                            <li
                                key={city.Ref}
                                className="cursor-pointer hover:bg-gray-200 p-2"
                                onClick={() => handleCitySelect(city.Description)}
                            >
                                {city.Description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {selectedCity && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Выберите отделение:</label>
                    <select
                        value={selectedWarehouse}
                        onChange={(e) => handleWarehouseSelect(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md mt-1 dark:text-black"
                    >
                        <option value="">-- Выберите отделение --</option>
                        {warehouses.map((wh) => (
                            <option key={wh.Ref} value={wh.Description}>
                                {wh.Description}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedWarehouse && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-md text-green-700">
                    <p><strong>Вы выбрали:</strong></p>
                    <p>Город: {selectedCity}</p>
                    <p>Отделение: {selectedWarehouse}</p>
                </div>
            )}
        </div>
    );
}