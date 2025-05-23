
'use client';

import { useEffect, useState } from 'react';
import Navbar from "@/app/navbar";
import NovaPoshtaSelection from "@/app/pages/novaiyPochta";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

interface Product {
    Артикул: string;
    Найменування: string;
    Ціна: string;
    Фото?: string;
}

export default function CartPage() {
    const [cart, setCart] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    });

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedWarehouse, setSelectedWarehouse] = useState('');

    // Диалоговое окно
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart: Product[] = JSON.parse(storedCart);
            setCart(parsedCart);
            calculateTotal(parsedCart);
        }

        const savedCity = localStorage.getItem('selectedCity');
        const savedWarehouse = localStorage.getItem('selectedWarehouse');
        if (savedCity) setSelectedCity(savedCity);
        if (savedWarehouse) setSelectedWarehouse(savedWarehouse);
    }, []);

    const calculateTotal = (cartItems: Product[]) => {
        const total = cartItems.reduce((sum, item) => sum + parseFloat(item.Ціна), 0);
        setTotalPrice(Math.round(total));
    };

    const handleRemoveFromCart = (index: number) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        calculateTotal(newCart);
    };

    const validateField = (name: string, value: string) => {
        let error = '';
        if (name === 'firstName' || name === 'lastName') {
            if (!/^[a-zA-Zа-яА-ЯёЁїЇєЄіІ]{2,}$/.test(value)) {
                error = 'Минимум 2 буквы, только буквы.';
            }
        }
        if (name === 'phone') {
            if (!/^\d{10,15}$/.test(value)) {
                error = 'Введите корректный номер (10-15 цифр).';
            }
        }
        if (name === 'email') {
            if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                error = 'Введите корректный email.';
            }
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        validateField(name, value);
    };

    const handleNovaPoshtaSelection = (city: string, warehouse: string) => {
        setSelectedCity(city);
        setSelectedWarehouse(warehouse);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let formValid = true;
        Object.entries(formData).forEach(([key, value]) => {
            validateField(key, value);
            if (!value.trim() || errors[key as keyof typeof errors]) {
                formValid = false;
            }
        });

        if (!selectedCity || !selectedWarehouse) {
            setDialogContent('Пожалуйста, выберите город и отделение Новой Почты.');
            setDialogOpen(true);
            return;
        }

        if (!formValid) {
            setDialogContent('Пожалуйста, исправьте ошибки в форме.');
            setDialogOpen(true);
            return;
        }

        const orderData = {
            ...formData,
            cart,
            totalPrice,
            delivery: {
                city: selectedCity,
                warehouse: selectedWarehouse,
            }
        };

        const response = await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });

        const result = await response.json();
        if (response.ok) {
            setDialogContent('Заказ успешно оформлен!');
            setDialogOpen(true);
            localStorage.removeItem('cart');
            setCart([]);
        } else {
            setDialogContent(`Ошибка: ${result.error}`);
            setDialogOpen(true);
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Корзина</h1>

                {cart.length === 0 ? (
                    <p>Корзина пуста</p>
                ) : (
                    <>
                        {cart.map((product, index) => (
                            <div key={index} className="flex items-center justify-between border-b py-4">
                                <img src={product.Фото} alt={product.Найменування} className="w-16 h-16 object-cover rounded-md" />
                                <p className="text-lg">{product.Найменування}</p>
                                <p className="text-lg font-bold">{Math.round(Number(product.Ціна))} грн</p>
                                <button
                                    onClick={() => handleRemoveFromCart(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Удалить
                                </button>
                            </div>
                        ))}

                        <div className="mt-6 text-xl font-bold text-right">
                            Общая сумма: {totalPrice.toFixed(2)} грн
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 p-4 border rounded-md shadow-md bg-white dark:bg-[#1E1E1E]">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Оформление заказа</h2>

                            {[
                                { label: "Имя", name: "firstName", type: "text" },
                                { label: "Фамилия", name: "lastName", type: "text" },
                                { label: "Номер телефона", name: "phone", type: "tel" },
                                { label: "Email", name: "email", type: "email" }
                            ].map(({ label, name, type }) => (
                                <div key={name} className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300">{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={formData[name as keyof typeof formData]}
                                        onChange={handleChange}
                                        required
                                        className={`w-full p-2 border rounded-md bg-white dark:bg-[#2C2C2C] text-black dark:text-white border-gray-300 dark:border-gray-600 ${errors[name as keyof typeof errors] ? 'border-red-500' : ''}`}
                                    />
                                    {errors[name as keyof typeof errors] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[name as keyof typeof errors]}</p>
                                    )}
                                </div>
                            ))}

                            <NovaPoshtaSelection onSelectionChange={handleNovaPoshtaSelection} />

                            <button
                                type="submit"
                                className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 mt-4"
                            >
                                Оформить заказ
                            </button>
                        </form>
                    </>
                )}
            </div>

            {/* Диалог */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Уведомление</DialogTitle>
                        <DialogDescription>{dialogContent}</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}