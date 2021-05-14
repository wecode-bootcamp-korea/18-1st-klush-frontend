import React, { Component } from "react";
import { connect } from "react-redux";

import ContentHeader from "./Components/ContentHeader/ContentHeader";
import ContentBody from "./Components/ContentBody/ContentBody";
import ContentFooter from "./Components/ContentFooter/ContentFooter";
import Buttons from "./Components/Buttons/Buttons";

import { addCart } from "../../../../../../store/actions/index";

import "./OrderContent.scss";

class OrderContent extends Component {
  constructor() {
    super();

    this.state = {
      price: 0,
      countNum: 1,
      totalPrice: "",
    };
  }

  componentDidMount() {
    this.setState({
      price: this.props.productPrice,
      totalPrice: this.printPrice(String(this.props.productPrice)),
    });
  }

  putOnCart = () => {
    this.props.dispatch(
      addCart({
        id: this.props.id,
        img: this.props.mainImgSrc,
        name: this.props.name,
        category: "배쓰밤",
        quantity: Number(this.state.countNum),
        price: this.props.productPrice,
        isChecked: true,
      })
    );
    // let token = localStorage.getItem("token");
    // fetch(`${COMMON_API}/order/cart/${this.state.productId}`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: token,
    //   },
    //   body: JSON.stringify({
    //     quantity: this.state.cartCountNum,
    //   }),
    // });

    this.setState(
      {
        cartCountNum: "1",
      },
      () => {
        this.props.goToGeneralModal();
      }
    );
  };

  //가격 쉼표 추가
  printPrice = priceStr => {
    return Number(priceStr).toLocaleString();
  };

  changePrice = () => {
    let updatePrice = String(Number(this.state.countNum) * this.state.price);
    this.setState({
      totalPrice: this.printPrice(updatePrice),
    });
  };

  plusBtn = () => {
    this.setState(
      {
        countNum: String(Number(this.state.countNum) + 1),
      },
      () => {
        this.changePrice();
      }
    );
  };

  minusBtn = () => {
    if (this.state.countNum > 1) {
      this.setState(
        {
          countNum: String(Number(this.state.countNum) - 1),
        },
        () => {
          this.changePrice();
        }
      );
    }
  };

  checkEnter = e => {
    if (e.key === "Enter") {
      if (Number(e.target.value) > 20) {
        alert("최대 선택 가능 수량은 20개 입니다!");
        e.target.value = "1";
      }
      this.setState(
        {
          countNum: e.target.value,
        },
        () => {
          this.changePrice(this.state.price);
        }
      );
    }
  };

  onChangeCountNum = e => {
    if (!Number(e.target.value) && e.target.value !== "") {
      alert("상품 수량은 숫자로 입력해 주세요!");
      e.target.value = "1";
    } else {
      this.setState({
        countNum: e.target.value,
      });
    }
  };

  render() {
    const { price, countNum, totalPrice } = this.state;
    const { reviewCount, hashTags, weight, name } = this.props;
    return (
      <div className="contentContainer">
        <ContentHeader hashTags={hashTags} name={name} />
        <div className="devideLine" />
        <ContentBody
          price={this.printPrice(String(price))}
          totalPrice={totalPrice}
          countNum={countNum}
          reviewCount={reviewCount}
          weight={weight}
          plusBtn={this.plusBtn}
          minusBtn={this.minusBtn}
          checkEnter={this.checkEnter}
          onChangeCountNum={this.onChangeCountNum}
        />
        <div className="devideLine" />
        <ContentFooter totalPrice={totalPrice} />
        <Buttons onClickEvent={this.putOnCart} />
      </div>
    );
  }
}

export default connect(state => ({
  cartList: state.cartReducer.cartList,
}))(OrderContent);
