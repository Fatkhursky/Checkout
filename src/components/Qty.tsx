import React from 'react'
import { useContext } from 'react';
import Context from '../context/Context';
const Qty = () => {
    let {
        // qty,
        setQty } = useContext(Context);
    const qty = 33

    return (
    <div>{qty}</div>
  )
}

export default Qty
