//
// import { useState } from "react";
// import Link from "next/link";
//
// interface SidebarProps {
//     onFilter: (category: string) => void;
// }
//
// export default function Sidebar({ onFilter }: SidebarProps) {
//     const categories = ["Кабелі/перехідники", "Чохли", "Type-C-Хаби", "USB-хабы"];
//     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//     const [isOpen, setIsOpen] = useState(false);
//
//     const handleFilter = (category: string) => {
//         const newCategory = category === selectedCategory ? null : category;
//         setSelectedCategory(newCategory);
//         onFilter(newCategory || ""); // Если категория снята, передаем пустую строку
//         setIsOpen(false); // Закрываем Sidebar после выбора
//     };
//
//     return (
//         <>
//             {/* Кнопка для открытия Sidebar */}
//             <button
//                 className="fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-md md:hidden"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 ☰
//             </button>
//
//             {/* Затемнение фона при открытом Sidebar */}
//             {isOpen && (
//                 <div
//                     className="fixed inset-0 bg-black opacity-50 z-40"
//                     onClick={() => setIsOpen(false)}
//                 />
//             )}
//
//             {/* Sidebar */}
//             <aside
//                 className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 z-50 shadow-lg transform ${
//                     isOpen ? "translate-x-0" : "-translate-x-full"
//                 } transition-transform duration-300 md:relative md:translate-x-0 md:w-64`}
//             >
//                 <h2 className="text-xl font-bold mb-4">Категории</h2>
//                 <ul>
//
//                     {categories.map((category) => (
//                         <li
//                             key={category}
//                             onClick={() => handleFilter(category)}
//                             className={`p-2 cursor-pointer hover:bg-gray-700 rounded ${
//                                 selectedCategory === category ? "bg-gray-600" : ""
//                             }`}
//                         >
//                             {category}
//                         </li>
//                     ))}
//                 </ul>
//             </aside>
//         </>
//     );
// }

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react"; // Иконки для кнопки

interface SidebarProps {
    onFilter: (category: string) => void;
}

export default function Sidebar({ onFilter }: SidebarProps) {
    const categories = ["Кабелі/перехідники", "Чохли", "Type-C-Хаби", "USB-хабы"];
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleFilter = (category: string) => {
        const newCategory = category === selectedCategory ? null : category;
        setSelectedCategory(newCategory);
        onFilter(newCategory || "");
        setIsOpen(false);
    };

    return (
        <>
            {/* Кнопка меню */}
            <button
                className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md md:hidden hover:bg-blue-700 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>

            {/* Затемнение фона */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 z-50 shadow-2xl transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64`}
            >
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-2">Категорії</h2>
                <ul className="space-y-2">
                    {categories.map((category) => (
                        <li
                            key={category}
                            onClick={() => handleFilter(category)}
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                selectedCategory === category
                                    ? "bg-blue-600 font-semibold shadow-md"
                                    : "hover:bg-gray-700"
                            }`}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
}