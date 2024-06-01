import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
    const [coins, setCoins] = useState([]);

    const fetchCoins = async () => {
        try {
            const res = await fetch(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
            );
            const data = await res.json();
            setCoins(data);
        } catch (e) {
            alert("API Error");
        }
    };

    useEffect(() => {
        fetchCoins();
    }, []);

    return (
        <div className="crypto-tracker">
            <h1>Crypto Tracker</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin) => (
                        <tr key={coin.id}>
                            <td>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img height="20px" width="20px" src={coin.image} alt="coin" />
                                    <span style={{ marginLeft: "20px" }}>{coin.name}</span>
                                </div>
                            </td>
                            <td>{`$${coin.current_price}`}</td>
                            <td style={{ color: coin.price_change_percentage_24h < 0 ? "#ff0374" : "#06a847" }}>
                                {coin.price_change_percentage_24h}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
