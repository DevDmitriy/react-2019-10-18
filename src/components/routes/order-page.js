import React from 'react'
import Cart from '../cart/cart'

function OrderPage(props) {
  console.log('OrderPage props', props)
  return (
    <div>
      <Cart {...props} />
    </div>
  )
}

export default OrderPage
