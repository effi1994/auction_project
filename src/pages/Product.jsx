import { useParams } from 'react-router-dom';

function Product() {
    const { id } = useParams();

    // Fetch the product data using the `id` parameter
    // ...

    return (
        <div>
            {id}

        </div>
    );
}

export default Product;