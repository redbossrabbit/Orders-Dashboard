import React, { useState, useReducer, useContext } from "react";
import Styles from "./style/Orders.module.scss";
import { selectedProducts } from "../../../../stores/SelectedProducts_store";
import ProductTable from "../ProductTable/ProductTable";
import orderReducer from "../../../../reducers/Orders_reducer";
import Item from "../Item/Item";
import Product from "../Product/Product";
import { getItem } from "../../../../utils/localStorage";

export const OrdersContext = React.createContext(selectedProducts);

const Order = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [state, dispatch] = useReducer(orderReducer, selectedProducts);
  const ordersContext = useContext(OrdersContext);
  const props = {
    setIsOpen: setIsOpen
  };
  const openOrdersList = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={Styles.main}>
      <div className={Styles.pageHeaderCont}>
        <div className={Styles.pageHeader}>
          <div>
            <h1>Orders</h1>
            <p>Status: All</p>
            <p>Time: Ascending</p>
            <input type="search" name="" id="" />
          </div>
          <p className={Styles.newOrder} onClick={() => openOrdersList()}>
            + New order
          </p>
        </div>
        <table cellSpacing="0" cellPadding="0" className={Styles.tableHeader}>
          <tbody>
            <tr>
              <th>#</th>
              <th>Order id</th>
              <th>Created</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Profit</th>
              <th>Status</th>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
      <table cellSpacing="0" cellPadding="0" className={Styles.itemTable}>
        <tbody>
          {Object.keys(ordersContext.selectedProducts).map((item, index) => {
            const props = {
              id: index
            };
            return <Item key={index} {...props} />;
          })}
        </tbody>
      </table>
      <OrdersContext.Provider value={{ ...state, dispatch: dispatch }}>
        {isOpen ? <ProductTable {...props} /> : <></>}
      </OrdersContext.Provider>
    </div>
  );
};
export default Order;