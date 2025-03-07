import React from "react";

import { useParams } from "react-router-dom";

import SingleProduct from "../../components/products/SingleProduct";

const Product : React.FC = () => {

    const params = useParams();

    return (
        <SingleProduct id={params.id!} />
    );
}

export default Product;