import React, { Component } from "react";

import Nav from "../../Components/Nav/Nav";
import ImageContainer from "./Components/ImageContainer/ImageContainer";
import ProductContainer from "./Components/ProductContainer/ProductContainer";
import GeneralModal from "./Components/GeneralModal/GeneralModal";
import CartModal from "./Components/CartModal/CartModal";
import Footer from "../../Components/Footer/Footer";

import "./ProductList.scss";

import { COMMON_API } from "../../config.js";

class ProductList extends Component {
  constructor() {
    super();

    this.state = {
      listData: {},
      subCategoryList: [],
      showGeneralModal: false,
      showCartModal: false,
      dataSetName: "",
      productId: "",
      cartProductPrice: "",
      cartTotalPrice: "",
      cartCountNum: "1",
      queryStr: "",
    };
  }

  componentDidMount() {
    fetch(`${COMMON_API}/product`)
      .then(res => res.json())
      .then(result =>
        this.setState({
          listData: result,
        })
      )
      .catch(e => console.log(e));

    fetch(`${COMMON_API}/product/subcategory`)
      .then(res => res.json())
      .then(result =>
        this.setState({
          subCategoryList: result.sub_category_list_data,
        })
      );
  }

  componentDidUpdate() {
    this.state.showHeartModal || this.state.showCartModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }

  sortBySubCategory = e => {
    fetch(`${COMMON_API}/product?sub_category=${e.target.id}`)
      .then(res => res.json())
      .then(result =>
        this.setState({
          listData: result,
        })
      )
      .catch(e => console.log(e));
  };

  clickModal = (e, modal, idNum, text) => {
    e.stopPropagation();
    this.setState(
      {
        productId: idNum,
        dataSetName: text,
        [modal]: !this.state[modal],
        cartProductPrice:
          modal === "showCartModal"
            ? this.state.listData.product_list_data.filter(
                product => product.product_id === idNum
              ).price
            : "",
      },
      () => {
        this.setState({
          cartTotalPrice:
            modal === "showCartModal"
              ? this.printPrice(Number(this.state.cartProductPrice))
              : "",
        });
      }
    );
  };

  clickClose = modal => {
    this.setState({
      [modal]: !this.state[modal],
      cartCountNum: "1",
    });
  };

  goToGeneralModal = () => {
    this.setState({
      showGeneralModal: !this.state.showGeneralModal,
      showCartModal: !this.state.showCartModal,
    });
  };

  putOnCart = () => {
    let token = localStorage.getItem("token");
    fetch(`${COMMON_API}/order/cart/${this.state.productId}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        quantity: this.state.cartCountNum,
      }),
    });

    this.setState(
      {
        cartCountNum: "1",
      },
      () => {
        this.goToGeneralModal();
      }
    );
  };

  //contentHeader select box
  checkSelect = e => {
    this.setState({
      queryStr: e.target.value,
    });
  };

  //for Count Box productDetail의 countBox와 중복된 코드
  printPrice = priceStr => {
    return priceStr;
  };

  changePrice = () => {
    let updatePrice =
      Number(this.state.cartCountNum) * Number(this.state.cartProductPrice);
    this.setState({
      cartTotalPrice: this.printPrice(updatePrice),
    });
  };

  plusBtn = () => {
    this.setState(
      {
        cartCountNum: String(Number(this.state.cartCountNum) + 1),
      },
      () => {
        this.changePrice();
      }
    );
  };

  minusBtn = () => {
    if (this.state.cartCountNum > 1) {
      this.setState(
        {
          cartCountNum: String(Number(this.state.cartCountNum) - 1),
        },
        () => {
          this.changePrice();
        }
      );
    }
  };

  onChangeCountNum = e => {
    this.setState({
      cartCountNum: e.target.value,
    });
  };

  checkEnter = e => {
    if (e.key === "Enter") {
      if (Number(e.target.value) > 20) {
        alert("최대 선택 가능 수량은 20개 입니다!");
        e.target.value = "1";
      }
      this.setState(
        {
          cartCountNum: e.target.value,
        },
        () => {
          this.changePrice();
        }
      );
    }
  };

  render() {
    const products = this.state.listData.product_list_data;
    const categoryName = "배쓰";
    const categoryDesc = "당신에게 향기로운 입욕을 선물합니다";
    const { subCategoryList } = this.state;

    const {
      showGeneralModal,
      showCartModal,
      productId,
      cartTotalPrice,
      cartCountNum,
      dataSetName,
    } = this.state;

    return (
      <>
        <Nav />
        <div className="productListPage">
          {showGeneralModal && (
            <GeneralModal clickClose={this.clickClose} text={dataSetName} />
          )}
          {showCartModal && (
            <CartModal
              productInfo={
                products.filter(
                  product => product.product_id === Number(productId)
                )[0]
              }
              productId={productId}
              cartTotalPrice={cartTotalPrice}
              cartCountNum={cartCountNum}
              plusBtn={this.plusBtn}
              minusBtn={this.minusBtn}
              onChangeCountNum={this.onChangeCountNum}
              checkEnter={this.checkEnter}
              clickClose={this.clickClose}
              putOnCart={this.putOnCart}
            />
          )}
          <ImageContainer
            categoryName={categoryName}
            categoryDesc={categoryDesc}
          />
          {products && (
            <ProductContainer
              sortBySubCategory={this.sortBySubCategory}
              categoryName={categoryName}
              subCategoryList={subCategoryList}
              products={products}
              clickModal={this.clickModal}
              checkSelect={this.checkSelect}
            />
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default ProductList;
