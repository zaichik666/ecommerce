import React from 'react'
import { useSelector } from 'react-redux'
import { addSelection, removeSelection } from '../redux/reducers/product-list'
import Button from './button'

const symbols = require('./symbols.js')

const Store = () => {
  const list = useSelector((s) => s.prod.list)
  const base = useSelector((s) => s.prod.base)
  const rates = useSelector((s) => s.prod.rates)
  const selection = useSelector((s) => s.prod.selection)
  const order = useSelector((s) => s.prod.order)

  const listOrdered = (str) => {
    switch (str) {
      case 'price':
        return list.sort((a, b) => b.price - a.price)
      case 'name':
        return list.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return list
    }
  }

  return (
    <div>
      <div className="flex flex-wrap">
        {listOrdered(order).map((item) => {
          return (
            <div
              className="flex flex-wrap justify-center border border-solid border-black w-32 m-2"
              key={item.id}
            >
              <div className="text-sm h-10 mb-2">{item.title}</div>
              <div className="flex justify-center w-32">
                <img className="h-20" src={item.image} alt={item.title} />
              </div>
              <div className="text-sm font-bold">
                {(item.price * rates[base]).toFixed(2)} {symbols[base]}{' '}
              </div>
              <div className="flex justify-around w-32">
                <Button actionFunction={removeSelection} text="-" id={item.id} />
                <div className="text-grey-700">{selection[item.id] || 0}</div>
                <Button actionFunction={addSelection} text="+" id={item.id} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Store.propTypes = {}

export default React.memo(Store)
