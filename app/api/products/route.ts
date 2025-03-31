import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { parseStringPromise } from "xml2js";

type XmlResponse = {
    store: {
        product: Array<{
            id: string;
            name: string;
            price: {
                _: number;
                $: { currency: string };
            };
            brand: string;
        }>;
    };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const supplierUrl =
            "https://ncase.ua/xml2/?key=b2534682dec058ca88bd76e158effff1&lang=ua";

        // Загружаем XML
        const { data: xmlData } = await axios.get(supplierUrl, { timeout: 10000 });

        // Конвертируем XML в JSON
        const jsonData: XmlResponse = await parseStringPromise(xmlData, {
            explicitArray: false,
        });

        res.status(200).json(jsonData);
    } catch (error: any) {
        // Логирование ошибки
        console.error("Ошибка загрузки XML:", error);

        // Отправка ошибки в ответ
        res.status(500).json({
            error: "Ошибка загрузки XML",
            details: error.message || "Неизвестная ошибка",
        });
    }
}