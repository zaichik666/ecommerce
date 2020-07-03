import React from 'react'
import { useSelector } from 'react-redux'
import { addSelection, removeSelection } from '../redux/reducers/product-list'
import Button from './button'

const symbols = require('./symbols.js')

const Basket = () => {
  const list = useSelector((s) => s.prod.list)
  const base = useSelector((s) => s.prod.base)
  const rates = useSelector((s) => s.prod.rates)
  const selection = useSelector((s) => s.prod.selection)
  const order = useSelector((s) => s.prod.order)
  const prices = useSelector((s) => s.prod.prices)

  const cartList = list.filter((item) => Object.keys(selection).includes(item.id)) || []

  const totalPrice = Object.keys(selection)
    .reduce((sum, selectionId) => {
      return sum + prices[selectionId] * selection[selectionId] * (rates[base] || 1)
    }, 0)
    .toFixed(2)

  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)

  const cartListOrdered = (str) => {
    switch (str) {
      case 'price':
        return cartList.sort((a, b) => b.price - a.price)
      case 'name':
        return cartList.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return cartList
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <td>image</td>
          <td>title</td>
          <td>unit price</td>
          <td>count</td>
          <td>totlal price</td>
          <td> </td>
          <td> </td>
        </tr>
      </thead>
      {cartList.length !== 0 &&
        cartListOrdered(order).map((it) => {
          return (
            <tr key={it.id}>
              <td>
                <img className="h-5" src={it.image} alt={it.title} />{' '}
              </td>
              <td>{it.title}</td>
              <td>
                {(it.price * rates[base]).toFixed(2)} {symbols[base]}
              </td>
              <td>{selection[it.id]}</td>
              <td>
                {(it.price * selection[it.id] * rates[base]).toFixed(2)} {symbols[base]}
              </td>
              <td>
                <Button actionFunction={removeSelection} text="-" id={it.id} />
              </td>
              <td>
                <Button actionFunction={addSelection} text="+" id={it.id} />
              </td>
            </tr>
          )
        })}
      <tr>
        <td> </td>
        <td> </td>
        <td>Items: </td>
        <td>{numberOfItems}</td>
        <td>totlal price:</td>
        <td>
          {totalPrice} {symbols[base]}
        </td>
      </tr>
    </table>
  )
}

export default Basket
