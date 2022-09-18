import React, { useEffect } from "react";
import Context from "../context/Context";
import { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const Summary = () => {
  let navigate = useNavigate()
  let { summary, setSummary } = useContext(Context);
  let { total, setTotal } = useContext(Context);
  useEffect(() => {
    //@ts-ignore
    setTotal (summary.reduce((acc, obj) => acc + obj.total,0))
  }, [summary]);
function handleDeleteSummary (e:any, i:number) {
//@ts-ignore
  setSummary(summary => summary.filter((item) => item.name!==e.name))
}
  return (
    <div className="bg-white">
      <div id="summary" className="px-8 flex flex-col py-10 h-full">
        <h1 className="font-semibold text-2xl pb-8">Order Summary</h1>
        <div className="flex text-xs grow flex-col">
          <div className="flex border-b mb-4 pb-2 w-full ">
            <p className="w-1/2">Item</p>
            <p className="w-1/3">Piece</p>
            <p className="w-1/3">Cost</p>
            <p className="w-1/3">Remove</p>
          </div>
          {summary.map((e, i) => (
            <div key={i} className="flex text-slate-500 hover:bg-slate-200 p-2">
              {/*@ts-ignore*/}
              <p className="w-1/2 ">{e.name}</p>
              {/*@ts-ignore*/}
              <p className="w-1/3 ">{e.qty}</p>
              {/*@ts-ignore*/}
              <p className="w-1/3 ">${e.total}.00</p>
              <RiDeleteBin6Line onClick={() => handleDeleteSummary(e, i)} className="cursor-pointer w-1/3 text-red-400"/>
            </div>
          ))}
        </div>
        <div className="py-10">
          <label
            htmlFor="promo"
            className="font-semibold inline-block mb-3 text-sm uppercase"
          >
            Promo Code
          </label>
          <input
            type="text"
            id="promo"
            placeholder="Enter your code"
            className="p-2 text-sm w-full border focus:outline-orange-400"
          />
        </div>
        <button className="bg-red-500 rounded hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
          Apply
        </button>
        <div className="border-t mt-8 flex flex-col" >
          <div className="flex gap-2 font-semibold justify-between py-6 text-sm uppercase">
            <span>Total</span>
            {/*@ts-ignore*/}
            <span>${total}.00</span>
          </div>
          <button onClick={() => {
            total !== 0 ? navigate('/checkout') : window.alert("Add some product to cart")
          }} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 px-1 rounded text-sm text-white uppercase">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
