import React, { useEffect, useState } from 'react';

const URL = 'https://api.exchangerate.host/latest';

export default function Header() {
  const [usdRate, setUsdRate] = useState()
  const [eurRate, setEurRate] = useState()

  useEffect(() => {
    fetch(`${URL}?base=USD`)
      .then(res => res.json())
      .then(data => {
        setUsdRate(data.rates['UAH'])
      })
  }, [])

  useEffect(() => {
    fetch(`${URL}?base=EUR`)
      .then(res => res.json())
      .then(data => {
        setEurRate(data.rates['UAH'])
      })
  }, [])


  return (
    <div className='header'>
      <div>
        <h3>UAH / USD</h3>
        {usdRate}
      </div>

      <div>
        <h3>UAH / EUR</h3>
        {eurRate}
      </div>

    </div>
  )
}
