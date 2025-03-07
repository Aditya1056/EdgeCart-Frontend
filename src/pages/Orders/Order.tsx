import React from "react";

import { useParams } from "react-router-dom";

import SingleOrder from "../../components/orders/SingleOrder";

const Order: React.FC = () => {

    const params = useParams();

    return (
        <SingleOrder id={params.id!} />
    );
}

export default Order;