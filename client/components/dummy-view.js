import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getListData } from '../redux/reducers/product-list'
import Head from './head'

const Dummy = () => {
  const list = useSelector((s) => s.prod.list)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListData())
  }, [])

  return (
    <div>
      <Head title="Hello" />
      <div className="bg-green-300 text-white min-h-screen w-screen">
        <nav className="flex justify-between items-center z-20 fixed w-full bg-red-700 px-10 py-5">
          <div className="bg-green-300">Dummy shop</div>
          <div className="bg-green-300">Currency</div>
          <div className="bg-green-300">Basket</div>
        </nav>
        <div>qwertyyuuioop</div>
        <div className="flex flex-wrap pt-20">
          {list.map((it) => {
            return <div key={it.id}>{it.id}</div>
          })}
        </div>
      </div>
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
