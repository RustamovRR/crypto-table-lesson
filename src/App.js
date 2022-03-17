import { useState, useEffect } from 'react';
import Table from './components/Table';
import './App.css';

function App() {
  const [cryptos, setCryptos] = useState([])
  const [currency, setCurrency] = useState('USD')
  const [limit, setLimit] = useState(10)
  const URL = `https://min-api.cryptocompare.com/data/top/totalvolfull`

  const handleFetch = () => {
    fetch(`${URL}?limit=${limit}&tsym=${currency}`)
      .then((res) => res.json())
      .then((data) => setCryptos(data.Data))
  }

  useEffect(() => {
    handleFetch()
  }, [currency, limit])

  const columns = [
    {
      Header: 'Coin Name',
      accessor: 'CoinInfo.Name',
    },
    {
      Header: `Current Price (${currency})`,
      accessor: `RAW['${currency}'].PRICE`,
      Cell: ({ row }) => {
        const price = Number(row.original?.RAW[`${currency}`]?.PRICE).toFixed(2)
        return `$ ${price}`
      }
    },
    {
      Header: `Opening Price (${currency})`,
      accessor: `RAW['${currency}'].OPENDAY`,
      Cell: ({ row }) => {
        const openDay = Number(row.original?.RAW[`${currency}`]?.OPENDAY).toFixed(2)
        return `$ ${openDay}`
      }
    },
    {
      Header: 'Price Increase',
      Cell: ({ row }) => {
        const price = row.original?.RAW[`${currency}`]?.PRICE
        const openDay = row.original?.RAW[`${currency}`]?.OPENDAY
        const foiz = Number(openDay / price).toFixed(3)
        const ayirma = Number(price - openDay).toFixed(2)

        return `${foiz}% ($ ${ayirma})`
      }
    },
  ]
  console.log(currency)

  return (
    <div className="App">
      <div>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        <select value={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>

        <span>{cryptos.length} ta ma'lumot</span>
      </div>

      <div className='table_box'>
        {cryptos.length
          ? <Table
            columns={columns}
            data={cryptos}
          />
          : <div>Loading...</div>
        }
      </div>
    </div>
  );
}

export default App;
