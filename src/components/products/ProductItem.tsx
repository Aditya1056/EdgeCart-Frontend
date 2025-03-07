import React from "react";

import { useNavigate } from "react-router-dom";

import styles from './ProductItem.module.css'

interface productItemInterface{
    id: string,
    name: string,
    description: string,
    brand: string,
    availability: boolean,
    price: number,
    image: string
}

const ProductItem : React.FC<productItemInterface> = (props) => {

    const navigate = useNavigate();

    const viewProductHandler = () => {
        navigate(`/product/${props.id}`);
    }

    return (
        <li className={styles['product-item']} >
            <div className={styles['product-image']} >
                <img src={props.image} alt={"product " + props.id} />
            </div>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <h4>₹ {props.price}</h4>
            <button className={styles['view-btn']} onClick={viewProductHandler} >
                View
            </button>
        </li>
    );
}

export default ProductItem;