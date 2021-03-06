import React from "react";
import "./Footer.scss";

const FOOTER = {
  Info: ["고객센터", "02-521-8238", "KlushGroup@klush.co.kr"],
  Menu: [
    "스카우트",
    "회사소개",
    "개인정보처리방침",
    "영상정보관리지침",
    "이용약관",
    "고객센터",
  ],
};

export default function Footer() {
  return (
    <footer className="footerAll">
      <img src="/Images/lush-footer.jpg" className="icons" />
      <ul className="footerLeftWrap">
        <a href="/main" className="footerLogo">
          KLUSH
        </a>
        {FOOTER.Info.map(el => (
          <li className="logoInfo">{el}</li>
        ))}
      </ul>
      <div className="footerRightWrap">
        <ul className="footerWrap">
          {FOOTER.Menu.map(el => (
            <li className="footerLink">
              <a className="footerLinkBtn" href="#">
                {el}
              </a>
            </li>
          ))}
        </ul>
        <span className="footerLinkInfo">
          매주 금요일 오후, 구독자님을 위한
          <br />
          제품과 브랜드 이야기를 전해드립니다.
          <br />
          <li>구독은 언제든지 해지하실 수 있습니다.</li>
        </span>
      </div>
    </footer>
  );
}
