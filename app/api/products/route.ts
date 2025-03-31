// // app/api/products/route.ts
// import { NextResponse } from "next/server";
// import axios from "axios";
// import { parseStringPromise } from "xml2js";
//
// export async function GET() {
//     try {
//         const supplierUrl = "https://ncase.ua/xml2/?key=b2534682dec058ca88bd76e158effff1&lang=ua";
//
//         const { data: xmlData } = await axios.get(supplierUrl);
//         const jsonData = await parseStringPromise(xmlData, { explicitArray: false });
//
//         return NextResponse.json(jsonData);
//     } catch (error: any) {
//         console.error("Ошибка загрузки XML:", error);
//         return NextResponse.json({
//             error: "Ошибка загрузки XML",
//             details: error.message || "Неизвестная ошибка",
//         });
//     }
// }
//
// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';
// import Papa from 'papaparse';
//
// export async function GET() {
//     const filePath = path.join(process.cwd(), 'public/data/products.csv');
//     const fileContent = fs.readFileSync(filePath, 'utf8');
//
//     const { data } = Papa.parse(fileContent, {
//         header: true,
//         skipEmptyLines: true,
//     });
//
//     return NextResponse.json(data);
// }

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'public/data/products.csv');

        // Проверяем, существует ли файл
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Файл products.csv не найден' }, { status: 404 });
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
        });

        return NextResponse.json(data);  // Отправляем данные как JSON
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка при загрузке данных' }, { status: 500 });
    }
}