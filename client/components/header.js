import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setBase, setOrder } from '../redux/reducers/product-list'
import { urlClick } from '../redux/reducers/logs'
import ButtonSort from './button-sort'

const symbols = require('./symbols.js')

const Header = () => {
  const dispatch = useDispatch()
  const base = useSelector((s) => s.prod.base)
  const rates = useSelector((s) => s.prod.rates)
  const prices = useSelector((s) => s.prod.prices)
  const order = useSelector((s) => s.prod.order)

  const selection = useSelector((s) => s.prod.selection)
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)
  const totalPrice = Object.keys(selection)
    .reduce((sum, selectionId) => {
      return sum + prices[selectionId] * selection[selectionId] * (rates[base] || 1)
    }, 0)
    .toFixed(2)

  const ratesArray = ['EUR', 'USD', 'CAD']
  const orderArray = ['price', 'name']

  return (
    <div className="flex justify-between bg-gray-800 px-10 py-5 text-white text-xl text-white shadow">
      <div>
        <Link
          to="/"
          onClick={() => {
            dispatch(urlClick('main'))
          }}
        >
          Pop shop
        </Link>
      </div>
      <div className="flex text-xs self-end">
        {ratesArray.map((it) => {
          return <ButtonSort key={it} action={setBase} value={it} base={base} />
        })}
      </div>
      <div className="ml-4 self-end text-xs">
        Sort by:
        {orderArray.map((it) => {
          return <ButtonSort key={it} action={setOrder} value={it} base={order} />
        })}
      </div>
      <div>
        <div>
          <Link
            to="/basket"
            onClick={() => {
              dispatch(urlClick('basket'))
            }}
          >
            Cart:
          </Link>
        </div>
        <div className="text-xs">{numberOfItems ? `${numberOfItems} items` : 'empty'}</div>
        <div className="text-xs">{!!numberOfItems && `Total: ${totalPrice} ${symbols[base]}`}</div>
      </div>
    </div>
  )
}

export default Header
