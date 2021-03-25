import React, { Component } from "react";
import { AiFillStar } from "react-icons/ai";

import LinkTab from "./Components/LinkTab/LinkTab";

import "./DetailInfo.scss";

class DetailInfo extends Component {
  render() {
    const { productDetail, reviewCount } = this.props;
    return (
      <section className="detailInfo">
        <div id="detail">
          <LinkTab reviewCount={reviewCount} tabName="detail" />
        </div>
        <div className="infoTitleContainer">
          <span className="categoryName infoTitle">
            {productDetail.category}
          </span>
          <span className="productName infoTitle">{productDetail.name}</span>
          <span className="productEnName infoTitle">
            {productDetail.enName}
          </span>
        </div>
        <div className="infoImgContainer">
          <img className="infoMainImg" src={productDetail.mainImg} alt="" />
          <div className="infoMainImgReview">
            <h1 className="reviewHeader">
              미리 써 본 후기&nbsp;
              {[0, 0, 0, 0, 0].map((x, idx) => (
                <AiFillStar key={idx + 10} />
              ))}
            </h1>
            <article className="reviewContent">
              {productDetail.mainReview}
            </article>
          </div>
        </div>
        <div className="infoProductDescContainer">
          <p className="infoProductDesc">{productDetail.description}</p>
        </div>
        <img
          className="infoMiddleImg"
          src={productDetail.middleImg}
          alt={productDetail.name}
        />
        <div className="infoFooter">
          <article className="infoFooterUse">
            <h1 className="useTitle">사용방법</h1>
            <p className="useContent">{productDetail.mainReview}</p>
            <div className="useHashTags">
              {productDetail.footerHashTag.map(el => "#" + el + " ")}
            </div>
          </article>
          <img
            className="infoFooterImg"
            src={productDetail.footerImg}
            alt={productDetail.name}
          />
        </div>
        <div id="delivery">
          <LinkTab reviewCount={reviewCount} tabName="delivery" />
        </div>
      </section>
    );
  }
}

export default DetailInfo;
