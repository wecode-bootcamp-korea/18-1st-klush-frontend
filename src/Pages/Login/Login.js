import React, { Component } from "react";
import "./Login.scss";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      pw: "",
    };
  }
  render() {
    const { id, pw } = this.state;
    return (
      <div className="container">
        <section>
          <div className="loginInfo">
            <h2>로그인</h2>
          </div>
          <div className="loginBox">
            <div className="loginSort">
              <ul>
                <li>회원</li>
                <li className="nonSelected">
                  <span>비회원</span>
                </li>
              </ul>
            </div>
            <form className="loginForm">
              <div className="login">
                <div className="loginInput">
                  <div className="loginInputId">
                    <input type="text" id="id" placeholder="아이디" />
                    <div className="inputIcon">
                      <FaUserAlt />
                    </div>
                  </div>
                  <div className="loginInputPwd">
                    <input
                      type="password"
                      id="password"
                      placeholder="비밀번호"
                    />
                    <div className="inputIcon">
                      <FaLock />
                    </div>
                  </div>
                </div>
                <div className="saveId">
                  <input type="checkbox" className="checkBox" />
                  <label for="checkBox">아이디 저장</label>
                </div>
                <button id="btnLogin">
                  <em>로그인 </em>
                </button>
                <div className="loginMenu">
                  <button id="btnSignup">
                    <em>회원가입</em>
                  </button>
                  <div className="divider"></div>
                  <button id="btnFindId">
                    <em>아이디 찾기 </em>
                  </button>
                  <div className="divider"></div>
                  <button id="btnFindPwd">
                    <em>비밀번호 찾기 </em>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
