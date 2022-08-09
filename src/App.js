import Currency from "./Currency";
import Header from "./Header";
import React, { useEffect, useState } from 'react';
import img from './img/img.png'

const URL = 'https://api.exchangerate.host/latest';

function App() {

  const options = ['UAH', 'USD', 'EUR']

  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState('')
  const [amount, setAmount] = useState(1)
  const [amountFromCurrency, setAmountFromCurrency] = useState(true)

  let toAmount, fromAmount;
  if (amountFromCurrency) {
    fromAmount = amount
    toAmount = (amount * exchangeRate).toFixed(6)
  } else {
    toAmount = amount
    fromAmount = (amount / exchangeRate).toFixed(6)
  }

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        const currency1 = options.map(cur => cur)
        setFromCurrency(data.base)
        setToCurrency(currency1[0])
        setExchangeRate(data.rates[currency1[0]])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountFromCurrency(true)
  }

  const handleToAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountFromCurrency(false)
  }

  return (
    <div>
      <Header />
      <div className='title'>
        <h1>Currency Converter</h1>
      </div>
      <div className='main'>
      <h4>Date: {new Date().toLocaleDateString('en-GB')}</h4>
        <div className='main_currency'>
          <Currency
            currencyOptions={options}
            selectedCurrency={fromCurrency}
            onChangeCurrency={e => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
          <div className='main_equals'>=</div>
          <Currency
            currencyOptions={options}
            selectedCurrency={toCurrency}
            onChangeCurrency={e => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </div>
        <div className='main_img'>
          <img src={img} alt='img' />
          <img src={img} alt='img' />
          <img src={img} alt='img' />
        </div>
      </div>
    </div>
  );
}

export default App;
