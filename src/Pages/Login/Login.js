import React, { Component } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import "./Login.scss";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleOnChange = e => {
    console.log("name : " + e.target.name);
    console.log("value : " + e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginSubmit = e => {
    e.preventDefault();
    const idCheck = /^[A-Za-z0-9][A-Za-z0-9._-]+[@]{1}[a-z]+[.]{1}[a-z]{1,4}$/;
    if (!this.state.email) {
      alert("아이디를 입력해주세요");
    } else if (!idCheck.test(this.state.email)) {
      alert("입력된 아이디은(는) 잘못된 형식입니다.");
    } else if (this.state.password === "") {
      alert("패스워드를 입력해주세요");
      return;
    }
    // fetch("http://10.58.23.162:80000/user/login", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: this.state.email,
    //     password: this.state.password,
    //   }),
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res);
    //   });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <section>
          <div className="loginInfo">
            <h2>로그인</h2>
          </div>
          <div className="loginBox">
            <div className="loginSort">
              <ul>
                <li className="Selected">
                  <span>비회원</span>
                </li>
                <li className="nonSelected">
                  <span>비회원</span>
                </li>
              </ul>
            </div>
            <form className="loginForm">
              <div className="login">
                <div className="loginInput">
                  <div className="loginInputId">
                    <input
                      type="text"
                      id="id"
                      name="email"
                      placeholder="이메일"
                      onChange={this.handleOnChange}
                    />
                    <FaUserAlt className="inputIcon" />
                  </div>
                  <div className="loginInputPwd">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="비밀번호"
                      onChange={this.handleOnChange}
                    />
                    <FaLock className="inputIcon" />
                  </div>
                </div>
                <div className="saveId">
                  <input type="checkbox" className="checkBox" />
                  <label for="checkBox">아이디 저장</label>
                </div>
                <button
                  className="btnLogin"
                  type="submit"
                  onClick={this.loginSubmit}
                >
                  <em>로그인 </em>
                </button>
                <div className="loginMenu">
                  <button className="btnSignup">
                    <em>회원가입</em>
                  </button>
                  <div className="divider"></div>
                  <button className="btnFindId">
                    <em>아이디 찾기 </em>
                  </button>
                  <div className="divider"></div>
                  <button className="btnFindPwd">
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
