'use client'

import ProductsPage from "@/app/pages/products";
import CsvPage from "@/app/pages/catalog";
import SearchPage from "@/app/pages/search";
import Navbar from "@/app/navbar";
import Footer from "@/app/pages/footer";
import Sidebar from "@/app/pages/sidebar";
import {useState} from "react";

export default function Home() {
    const [filter, setFilter] = useState('')

    return (
        <div className="flex flex-col min-h-screen">

            <Navbar />
            <Sidebar onFilter={setFilter}/>
            <div className="flex flex-1">

                <div className="flex-1 p-4">
                    {/* <ProductsPage /> */}
                    {/* <CsvPage /> */}
                    <SearchPage filter={filter}/>
                </div>
            </div>

            <Footer />
        </div>
    );
}