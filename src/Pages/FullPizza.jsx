import React, {useState} from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [pizza, setPizza] = useState();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://62fcfd3a6e617f88dea2aff0.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Ошибка, питсы нет!');
                navigate('/');
            }
        }

        fetchPizza();
    }, [])

    if (!pizza) {
        return "Загрузка..."

    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    )
}

export default FullPizza;