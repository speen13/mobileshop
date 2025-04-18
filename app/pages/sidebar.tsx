//
//
// import { useState } from "react";
// import Link from "next/link";
// import { MenuIcon, XIcon } from "lucide-react"; // Иконки для кнопки
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
//         onFilter(newCategory || "");
//         setIsOpen(false);
//     };
//
//     return (
//         <>
//             {/* Кнопка меню */}
//             <button
//                 className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md md:hidden hover:bg-blue-700 transition"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
//             </button>
//
//             {/* Затемнение фона */}
//             {isOpen && (
//                 <div
//                     className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
//                     onClick={() => setIsOpen(false)}
//                 />
//             )}
//
//             {/* Sidebar */}
//             <aside
//                 className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 z-50 shadow-2xl transform ${
//                     isOpen ? "translate-x-0" : "-translate-x-full"
//                 } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64`}
//             >
//                 <h2 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-2">Категорії</h2>
//                 <ul className="space-y-2">
//                     {categories.map((category) => (
//                         <li
//                             key={category}
//                             onClick={() => handleFilter(category)}
//                             className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
//                                 selectedCategory === category
//                                     ? "bg-blue-600 font-semibold shadow-md"
//                                     : "hover:bg-gray-700"
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
//
// import { useState } from "react";
// import Link from "next/link";
// import { MenuIcon, XIcon } from "lucide-react"; // Иконки для кнопки
//
// interface SidebarProps {
//     onFilter: (category: string) => void;
// }
//
// export default function Sidebar({ onFilter }: SidebarProps) {
//     const categories = ["Кабелі/перехідники", "Чохли", "Type-C-Хаби", "USB-хаби"];
//     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//     const [isOpen, setIsOpen] = useState(false);
//
//     const handleFilter = (category: string) => {
//         const newCategory = category === selectedCategory ? null : category;
//         setSelectedCategory(newCategory);
//         onFilter(newCategory || "");
//         setIsOpen(false);
//     };
//
//     return (
//         <>
//             {/* Кнопка меню */}
//             <button
//                 className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md md:hidden hover:bg-blue-700 transition"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
//             </button>
//
//             {/* Затемнение фона */}
//             {isOpen && (
//                 <div
//                     className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
//                     onClick={() => setIsOpen(false)}
//                 />
//             )}
//
//             {/* Sidebar */}
//             <aside
//                 className={`${
//                     isOpen ? "translate-x-0" : "-translate-x-full"
//                 } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 md:h-auto fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 z-50 shadow-2xl md:shadow-none md:static`}
//             >
//                 <h2 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-2">Категорії</h2>
//                 <ul className="space-y-2">
//                     {categories.map((category) => (
//                         <li
//                             key={category}
//                             onClick={() => handleFilter(category)}
//                             className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
//                                 selectedCategory === category
//                                     ? "bg-blue-600 font-semibold shadow-md"
//                                     : "hover:bg-gray-700"
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
import { MenuIcon, XIcon } from "lucide-react";

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
            {/* Кнопка меню для мобильной версии */}
            <button
                className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md md:hidden hover:bg-blue-700 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>

            {/* Затемнение фона для мобильной версии */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out fixed left-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 z-50 shadow-2xl md:relative md:h-auto md:w-64 md:bg-transparent md:shadow-none md:translate-x-0 md:top-12 md:z-auto`}
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