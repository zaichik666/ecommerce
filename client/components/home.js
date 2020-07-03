import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getListData, getRates } from '../redux/reducers/product-list'
import { getLogs } from '../redux/reducers/logs'

import Head from './head'
import Header from './header'
import Store from './store-page'
import Basket from './basket'

const Home = () => {
const logs = useSelector((s) => s.logs)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListData())
  }, [])

  useEffect(() => {
    dispatch(getRates())
  }, [])

  useEffect(() => {
    if (logs.length === 0) dispatch(getLogs())
  })

  return (
    <div>
      <Head title="Pop Shop" />
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Store />} />
        <Route exact path="/basket" component={() => <Basket />} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default Home
