import { createContext } from 'react';

const Context = createContext({
    userName: "",
    setUserName: (userName:string) => {},
    products: [],
    setProducts: (products:any) => {},
    qty: {},
    setQty: (qty:any):any => {},
    cart: 0,
    setCart: (cart:number) => {},
    summary: [],
    setSummary: (summary:any) => {},
    total: 0,
    setTotal: (total:number) => {},
  });
export default Context
