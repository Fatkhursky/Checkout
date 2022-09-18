import Summary from "./Summary";
import Context from "../context/Context";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { TbShoppingCartPlus } from "react-icons/tb";
import getData from "../request/getData";
import React, { useContext, useEffect, useState } from "react";
const Products = () => {
  const { products, setProducts } = useContext(Context);
  let { qty, setQty } = useContext(Context);
  let { setSummary } = useContext(Context);
  const [startPagi, setStartPagi] = useState(0);
  const [endPagi, setEndPagi] = useState(4);
  const [sortPrice, setSortPrice] = useState(false);
  const [search, setSearch] = useState("");
  async function fetchData() {
    let res = await getData();
    try {
      if (search) {
        setProducts(
          res?.data.filter((e: any) =>
            e.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        setProducts(res?.data);
      }
 
      //@ts-ignore
      setQty(res?.data.reduce((obj, item) => Object.assign(obj, { [item.name]: 0 }), {}))
      
    } catch (error) {
      console.log(error);
    }
  }
  // Search data by name
  useEffect(() => {
    // if (search) {
    //   setProducts(
    //     products?.filter((e: any) =>
    //       e.name.toLowerCase().includes(search.toLowerCase())
    //     )
    //   );
    // }
    //if (!search) fetchData();
    fetchData()
  }, [search]);

  //sort by price
  function handleSortPrice() {
    setSortPrice((prev) => !prev);
    if (sortPrice) {
      const compare = (a: any, b: any) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      };
      setProducts((prev: any) => prev.sort(compare));
    }
    if (!sortPrice) {
      const compare = (a: any, b: any) => {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      };
      setProducts((prev: any) => prev.sort(compare));
    }
  }
  function handleAddQty(e: any, i: number) {
    setQty((old: any) => ({ ...old, [e.name]: old[e.name] + 1 }));
   }

  function handleMinQty(e: any, i: number) {
    setQty((old: any) => ({ ...old, [e.name]: (old[e.name] > 0 ? old[e.name] - 1 : null) }));
  }

  function handleAddCart (e: any, i: number) {
    //@ts-ignore
    if(qty[e.name] !== 0) {
      setSummary((summary:any) =>{ 
        const getIndexSummary = summary.findIndex((v:any) => v.name === e.name)
        const newSummary = [...summary]
        if (getIndexSummary === -1) {
          //@ts-ignore
          newSummary.push({"name": e.name, "qty":qty[e.name], "total":e.price * qty[e.name] })
        } else {
          //@ts-ignore
          newSummary[getIndexSummary] = {"name": e.name, "qty":qty[e.name], "total":e.price * qty[e.name] }
        }
        return newSummary
      // return  [...summary, {"name": e.name, "qty":qty[e.name], "total":e.price * qty[e.name]}]
      }) 
    } else {
    window.alert('Add quantity')}
  }
  return (
    <div>
      <div className="bg-red-100">
        <div className="container  mx-auto py-1">
          <div className="flex gap-2 shadow-md">
            <div className="w-3/4 bg-white p-10 ">
              <div className="flex justify-between border-b pb-8 mb-4">
                <h1 className="font-semibold text-2xl">Products</h1>
                <h2 className="font-semibold text-2xl">
                  {products.length} Items
                </h2>
              </div>
              <div className="flex items-center">
                <div className="relative max-w-xs border rounded">
                  <label htmlFor="hs-table-search" className="sr-only">
                    Search
                  </label>
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="block w-full p-3 pl-10 text-sm outline-green-400 rounded-md focus:outline-blue-500"
                    placeholder="Search..."
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                      className="h-3.5 w-3.5 text-slate-900"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  List Product
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <div
                  onClick={handleSortPrice}
                  className="w-1/5 flex items-center justify-center cursor-pointer"
                >
                  <h3 className="font-semibold text-center   text-gray-600 text-xs uppercase  text-center">
                    Price
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      //   d="M7 11l5-5m0 0l5 5m-5-5v12"
                      d={
                        sortPrice
                          ? "M7 11l5-5m0 0l5 5m-5-5v12"
                          : "M17 13l-5 5m0 0l-5-5m5 5V6"
                      }
                    />
                  </svg>
                </div>

                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
                <div className="w-1/5 items-center  flex items-center justify-center relative">
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                  Add 
                </h3>
                </div>
              </div>

              {products.slice(startPagi, endPagi).map((e: any, i: number) => (
                <div key={i}>
                  <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                    <div className="flex w-2/5 ">
                      <div className="w-20 h-20">
                        <img className="" src={e["img"]} alt="" />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">{e["name"]}</span>
                        <span className="text-red-500 text-xs">
                          {e["name"]}
                        </span>
                        <a
                          href="http://localhost:3000/dashboard"
                          className="font-semibold hover:text-red-500  text-gray-500 text-xs"
                        >
                          {e["category"]}
                        </a>
                      </div>
                    </div>
                    {/* < Qty /> */}
                    <div className="flex justify-center  w-1/5">
                      <svg
                        onClick={() => handleMinQty(e, i)}
                        className="fill-current text-gray-600 w-3 cursor-pointer"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>

                      <input
                        className="mx-2 border text-center w-8"
                        type="text"
                        // @ts-ignore
                        value={qty[e.name] || 0}
                        readOnly
                      />
                      <svg
                        onClick={() => handleAddQty(e, i)}
                        className="fill-current text-gray-600 w-3 cursor-pointer"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ${e["price"]}.00
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      {/*@ts-ignore*/}
                      ${e["price"] * (qty[e.name] || 0)}.00
                    </span>
                    <span className="flex justify-center w-1/5">
                      <TbShoppingCartPlus onClick={() => handleAddCart(e, i)} className="cursor-pointer text-green-700" />
                    </span>
                  </div>
                </div>
              ))}
              
              <div className="flex gap-2 justify-center">
                <div
                  onClick={() => {
                    if (startPagi > 0) {
                      setStartPagi((e) => (e -= 4));
                      setEndPagi((e) => (e -= 4));
                    }
                  }}
                  className="border cursor-pointer"
                >
                  <IoIosArrowBack />
                </div>
                <div
                  onClick={() => {
                    if (endPagi < products.length) {
                      setStartPagi((e) => (e += 4));
                      setEndPagi((e) => (e += 4));
                    }
                  }}
                  className="border cursor-pointer"
                >
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
            <Summary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
