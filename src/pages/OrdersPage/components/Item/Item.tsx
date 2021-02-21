import React, { useState, useEffect, useContext } from "react";
import Styles from "./style/Item.module.scss";
import { IItemProps, IItemDisplay } from "../../../../interfaces/interfaces";
import { OrdersContext } from "../Orders/Orders";
import Product from "../Product/Product";
import resolveData from "./resolveData";
import Options from "../Options/Options";

const Item = (props: IItemProps) => {
  const { id } = props;
  const [itemData, setItemData] = useState<IItemDisplay>({});
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const ordersContext = useContext(OrdersContext);
  const itemObject = ordersContext.selectedProducts[`item${id}`];
  const { rating } = itemData;
  const [childerAreOpen, setChildrenAreOpen] = useState(false);

  const openChildren = () => {
    setChildrenAreOpen(!childerAreOpen);
  };
  const showOptions = () => {
    setOptionsIsOpen(true);
  };
  const hideOptions = () => {
    setOptionsIsOpen(false);
  };
  useEffect(() => {
    setItemData({ ...resolveData(itemObject) });
  }, []);

  return (
    <>
      <tr className={Styles.main} onClick={() => openChildren()}>
        <td>
          <input
            type="checkbox"
            name=""
            id=""
            onClick={e => e.stopPropagation()}
          />
        </td>
        <td>{itemData.order_id}</td>
        <td>{itemData.time} min ago</td>
        <td>{rating && `${rating[0]}.${rating[1]}`}</td>
        <td>${itemData.total}</td>
        <td>{itemData.profit}</td>
        <td>
          <div className={Styles.status}>
            <p>
              unknown <span></span>
            </p>
          </div>
        </td>
        <td
          onMouseEnter={() => showOptions()}
          onMouseLeave={() => hideOptions()}>
          <div className={Styles.options}>
            <button onClick={e => e.stopPropagation()}>...</button>
            {optionsIsOpen ? <Options /> : <></>}
          </div>
        </td>
      </tr>
      {childerAreOpen ? (
        <>
          <tr>
            <td></td>
            <td colSpan={6}>
              <table
                cellPadding="0"
                cellSpacing="0"
                className={Styles.productsTable}>
                <tbody>
                  <tr className={Styles.productsHeader}>
                    <th>#</th>
                    <th>SKU</th>
                    <th>Name</th>

                    <th>Price</th>
                    <th>Qty</th>
                    <th>Disc</th>
                    <th>Total</th>
                  </tr>
                  {Object.keys(itemObject).map((product, index) => {
                    const prop = itemObject[product];
                    prop.hasBeenSelected = true;
                    return <Product key={`prod${index}`} {...prop} />;
                  })}
                  <tr className={Styles.orderSummary}></tr>
                  <tr className={Styles.orderSummary}>
                    <td colSpan={3}></td>
                    <td colSpan={3}>Subtotal</td>
                    <td colSpan={2}>${itemData.total}</td>
                  </tr>
                  <tr className={Styles.orderSummary}>
                    <td colSpan={3}></td>
                    <td colSpan={3}>Shipping</td>
                    <td colSpan={2}>${itemData.shipping}</td>
                  </tr>
                  <tr className={Styles.orderSummary}>
                    <td colSpan={3}></td>
                    <td colSpan={3}>Discount</td>
                    <td colSpan={2}>${itemData.discount}</td>
                  </tr>
                  <tr className={Styles.orderSummary}>
                    <td colSpan={3}></td>
                    <td colSpan={3}>Total</td>
                    <td colSpan={2}>${itemData.grandTotal}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default Item;
