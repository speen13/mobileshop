import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { modelName, calledMethod, methodProperties } = await req.json();

    try {
        const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                apiKey: process.env.NOVA_POSHTA_API_KEY,
                modelName,
                calledMethod,
                methodProperties,
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            return NextResponse.json({ error: "Ошибка запроса к API Новой Почты", details: errorMessage }, { status: 500 });
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("API Request Error:", error);
        return NextResponse.json({ error: "Ошибка запроса к API Новой Почты" }, { status: 500 });
    }
}