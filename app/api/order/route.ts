// 'use server';
//
// import { NextRequest, NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';
//
// export async function POST(req: NextRequest) {
//     try {
//         const { firstName, lastName, phone, email, cart, totalPrice } = await req.json();
//
//         if (!firstName || !lastName || !phone || !email || !cart || !totalPrice) {
//             return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 });
//         }
//
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.GMAIL_USER,
//                 pass: process.env.GMAIL_PASS,
//             },
//         });
//
//         const mailOptions = {
//             from: process.env.GMAIL_USER,
//             to: process.env.GMAIL_USER,
//             subject: 'Новый заказ',
//             html: `
//                 <h2>Новый заказ</h2>
//                 <p><strong>Имя:</strong> ${firstName}</p>
//                 <p><strong>Фамилия:</strong> ${lastName}</p>
//                 <p><strong>Телефон:</strong> ${phone}</p>
//                 <p><strong>Email:</strong> ${email}</p>
//                 <h3>Товары:</h3>
//                 <ul>
//                     ${cart.map((item: any) => `<li>${item.Найменування} - ${item.Ціна} грн</li>`).join('')}
//                 </ul>
//                 <h3>Общая сумма: ${totalPrice} грн</h3>
//             `,
//         };
//
//         await transporter.sendMail(mailOptions);
//
//         return NextResponse.json({ message: 'Заказ успешно отправлен' }, { status: 200 });
//     } catch (error) {
//         console.error('Ошибка отправки письма:', error);
//         return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
//     }
// }


'use server';

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { firstName, lastName, phone, email, cart, totalPrice, delivery } = await req.json();

        if (!firstName || !lastName || !phone || !email || !cart.length || !totalPrice || !delivery?.city || !delivery?.warehouse) {
            return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 });
        }

        // Настройки для Gmail через nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        // Формирование письма
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Кому отправлять заказ
            subject: 'Новый заказ',
            html: `
                <h2>Новый заказ</h2>
                <p><strong>Имя:</strong> ${firstName}</p>
                <p><strong>Фамилия:</strong> ${lastName}</p>
                <p><strong>Телефон:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <h3>Доставка:</h3>
                <p><strong>Город:</strong> ${delivery.city}</p>
                <p><strong>Отделение Новой Почты:</strong> ${delivery.warehouse}</p>
                <h3>Товары:</h3>
                <ul>
                    ${cart.map((item: any) => `<li>${item.Найменування} - ${item.Ціна} грн</li>`).join('')}
                </ul>
                <h3>Общая сумма: ${totalPrice} грн</h3>
            `,
        };

        // Отправка письма
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Заказ успешно отправлен' }, { status: 200 });

    } catch (error) {
        console.error('Ошибка отправки письма:', error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}