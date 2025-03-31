import { useRouter } from 'next/router';

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Товар {id}</h1>
            {/* Тут можно загружать данные о товаре по ID */}
        </div>
    );
};

export default ProductPage;