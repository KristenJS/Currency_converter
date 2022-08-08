import React from 'react'

export default function Currency(props) {

  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount
  } = props

  return (
    <div className='currency_block'>
      <input type='number' className='input' value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {
          currencyOptions.map((option, index) =>
            <option key={index} value={option}>{option}</option>
          )
        }
      </select>
    </div >
  )
}
