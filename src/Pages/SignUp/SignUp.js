import React, { Component } from "react";
import DaumPostcode from "react-daum-postcode";
import "./SignUp.scss";

class SignUp extends Component {
  state = {
    id: 1,
    emailValue: "",
    // isemail: false,
    passwordValue: "",
    // ispassword: false,
    rePasswordValue: "",
    // isrepassword: false,
    nickname: "",
    // isname: false,
    phoneVlaue: "",
    // isphone: false,
    isSubmitClicked: false,
    zoneCode: "",
    fullAddress: "",
    isDaumPost: false,
    isRegister: false,
    // register: [],
  };

  handleInputChange = e => {
    const emailCheck = /^[A-Za-z0-9][A-Za-z0-9._-]+[@]{1}[a-z]+[.]{1}[a-z]{1,4}$/;
    if (
      e.target.name === "email" &&
      emailCheck.test(e.target.value) === false
    ) {
      console.log("good");
    }
  };
  // 이메일 check logic
  emailCheck = () => {
    this.state.emailValue.include("@") && this.state.emailValue.includes(".");
  };

  // passwordCheck = () => {
  //   this.state.passwordValue.length > 10;
  // };
  handleOpenPost = () => {
    this.setState({
      isDaumPost: true,
    });
  };
  handleAddress = data => {
    let AllAddress = data.address;
    let extraAddress = "";
    let zoneCodes = data.zonecode;
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      AllAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    this.setState({
      fullAddress: AllAddress,
      zoneCode: zoneCodes,
    });
  };
  checkPassword = () => {
    if (this.state.password !== this.state.rePassword) {
      console.log(this.state.password);
      console.log(this.staterePassword);
      alert("비밀번호 일치 x");
    }
  };
  signUpFinish = () => {
    fetch("http://10.58.4.173/user/login'", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      }),
    })
      .then(res => res.json())
      .then(result => {
        console.log({ result });
        if (result.message === "SUCCESS") {
          alert("회원가입 성공");
          this.props.history.push("/login");
        } else {
          alert("필수 사항을 입력하세요22");
        }
      });
  };
  render() {
    const {
      // name,
      // phone,
      // address,
      isDaumPost,
      fullAddress,
      zoneCode,
      // isRegister,
    } = this.state;
    const width = 595;
    const height = 450;
    const modalStyle = {
      position: "fixed",
      top: "100px",
      left: "300px",
      zIndex: "100",
      border: "1px solid #000000",
      overflow: "hidden",
    };
    return (
      <div className="signUp">
        <div className="join">
          <div className="joinStep">
            <div className="stepTitle">
              <h2>JOIN US</h2>
            </div>
            <div className="stepStage">
              <span className="stepOne">약관동의</span>
              <span className="stepIcon">></span>
              <span className="stepTwo">정보입력</span>
              <span className="stepIcon">></span>
              <span className="stepThree">가입완료</span>
            </div>
          </div>
          <div className="tableTitle">
            <h3>기본정보</h3>
            <div className="titleRight">
              <div className="token">■</div>
              <div className="titleInfo">
                표시는 반드시 입력하셔야 하는 항목입니다.
              </div>
            </div>
          </div>
          <div className="tableSignUp">
            <table>
              <colgroup>
                <col width="25%" />
                <col width="75%" />
              </colgroup>
              <tbody>
                <tr>
                  <th className="tableRow  ">
                    <div className="token">■</div>
                    <div>이메일</div>
                  </th>

                  <td>
                    <div className="textFieldEmail">
                      <input type="text" className="textEmail"></input>
                      <select className="email">
                        <option value="insert" selected="selected">
                          직접입력
                        </option>
                        <option value="naver">naver.com</option>
                        <option value="hanmail">hanmail.net</option>
                        <option value="daum">daum.net</option>
                        <option value="nate">nate.com</option>
                        <option value="hotmail">hotmail.com</option>
                        <option value="gmail">gmail.com</option>
                        <option value="icloud">icloud.com</option>
                      </select>
                      <input type="checkbox" className="checkBox" />
                      <label for="checkBox" className="label">
                        정보/이벤트 메일 수신에 동의합니다.
                      </label>
                    </div>
                    {this.state.emailValue ? null : (
                      <div className="emailAlert">필수항목 입니다.</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="tableRow">
                    <div className="token">■</div>
                    <div> 비밀번호</div>
                  </th>
                  <td>
                    <div className="textField">
                      <input type="text" className="text"></input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="tableRow">
                    <div className="token">■</div>
                    <div>비밀번호 확인</div>
                  </th>
                  <td>
                    <div className="textField">
                      <input type="text" className="text"></input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="tableRow">
                    <div className="token">■</div>
                    <div>이름</div>
                  </th>
                  <td>
                    <div className="textField">
                      <input type="text" className="text"></input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="tableRow">
                    <div className="token"> </div>
                    <div>닉네임</div>
                  </th>
                  <td>
                    <div className="textField">
                      <input type="text" className="text"></input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="tableRow">
                    <div className="token">■</div>
                    <div>휴대폰번호</div>
                  </th>
                  <td>
                    <div className="textFieldPhone">
                      <input type="text" className="text"></input>
                      <input type="checkbox" className="checkBox" />
                      <label for="checkBox" className="label">
                        정보/이벤트 메일 수신에 동의합니다.
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="tableRow">
                    <div className="token"></div>
                    <div>주소</div>
                  </th>
                  <td>
                    <div className="textFieldAddress">
                      <div className="textFieldAddressTop">
                        <input
                          className="inputAddress"
                          type="text"
                          value={zoneCode}
                        />
                        <input
                          type="button"
                          className="inputAddressButton"
                          onClick={this.handleOpenPost}
                          value="우편번호 검색"
                        />
                      </div>
                      <div className="textFieldAddressBottom">
                        <div>
                          <input
                            className="inputAddressBottom"
                            type="text"
                            value={fullAddress}
                          />
                        </div>
                        <div className="addressDetail">
                          <input type="text" className="inputAddressBottom" />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="dividerBottom"></div>
        <div className="btn">
          <button className="btnSignUp" onClick={this.signUpFinish}>
            회원가입
          </button>
          {isDaumPost ? (
            <DaumPostcode
              onComplete={this.handleAddress}
              autoClose
              width={width}
              height={height}
              style={modalStyle}
              isDaumPost={isDaumPost}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default SignUp;
