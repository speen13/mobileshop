import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Метод не поддерживается" });
    }

    const { modelName, calledMethod, methodProperties } = req.body;
    const apiKey = process.env.NOVA_POSHTA_API_KEY;

    // Логируем ключ и запрос
    console.log("API Key:", apiKey);
    console.log("Request Body:", req.body);

    if (!apiKey) {
        return res.status(500).json({ error: "API ключ не найден" });
    }

    try {
        const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apiKey,
                modelName,
                calledMethod,
                methodProperties,
            }),
        });

        // Логируем ответ от Новой Почты
        const data = await response.json();
        console.log("Response from Nova Poshta:", data);

        if (!response.ok) {
            return res.status(500).json({
                error: "Ошибка запроса к API Новой Почты",
                details: data,
            });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("API Request Error:", error);
        return res.status(500).json({ error: "Ошибка запроса к API Новой Почты" });
    }
}