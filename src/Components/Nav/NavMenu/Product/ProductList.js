import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ProductList.scss";

class ProductList extends Component {
  render() {
    const { title, items } = this.props;

    return (
      <ul className="productList">
        <li>
          <Link className="title" to="#">
            {title}
          </Link>
        </li>
        {items.map(el => (
          <li>
            <Link className="items" to="#">
              {el}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default ProductList;
