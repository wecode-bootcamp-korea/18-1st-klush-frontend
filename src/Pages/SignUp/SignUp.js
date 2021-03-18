import React, { Component } from "react";
import DaumPostcode from "react-daum-postcode";
import "./SignUp.scss";

class SignUp extends Component {
  state = {
    id: 1,
    emailValue: "",
    passwordValue: "",
    rePasswordValue: "",
    name: "",
    nickname: "",
    phoneVlaue: "",
    addressValue: "",
    isSubmitClicked: false,
    zoneCode: "",
    fullAddress: "",
    isDaumPost: false,
    isRegister: false,
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

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

  onCheck = e => {
    e.preventDefault();
    const emailCheck = /^[A-Za-z0-9][A-Za-z0-9._-]+[@]{1}[a-z]+[.]{1}[a-z]{1,4}$/;
    console.log(this.state.passwordValue.length);
    if (this.state.emailValue === "") {
      alert("이메일을 입력 해 주세요");
      return;
    }
    if (!emailCheck.test(this.state.emailValue)) {
      alert("이메일을 형식에 맞게 작성해 주세요");
      return;
    }
    if (!this.state.passwordValue) {
      alert("패스워드를 입력 하시오");
      return;
    }
    if (!this.state.rePasswordValue) {
      alert("비밀번호 확인을 입력 해 주세요");
      return;
    }
    if (this.state.passwordValue.length < 10) {
      alert("비밀번호 길이를 10자리 이상으로 입력해 주세요");
      return;
    }
    this.signUpFinish();
  };
  signUpFinish = () => {
    const {
      emailValue,
      passwordValue,
      name,
      phoneVlaue,
      addressValue,
    } = this.state;
    //    console.log("회원가입 정보 전송");
    fetch("http://10.58.2.56:8888/user/sign-up", {
      method: "POST",
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        name: name,
        phoneVlaue: phoneVlaue,
        addressValue: addressValue,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log("연결");
        if (res.message === "SUCCESS") {
          alert("회원가입 성공");
          this.props.history.push("/login");
        } else {
          alert("필수사항 입력 부탁");
        }
      });
  };
  render() {
    const { isDaumPost, fullAddress, zoneCode } = this.state;
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
    const { handleInputChange, onCheck } = this;
    return (
      <div className="signUp">
        <form className="join" method="post">
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
                  <th className="tableRow ">
                    <div className="token">■</div>
                    <div>이메일</div>
                  </th>
                  <td>
                    <div className="textFieldEmail">
                      <input
                        type="text"
                        className="textEmail"
                        name="emailValue"
                        onChange={handleInputChange}
                      ></input>

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
                      <input type="checkBox" className="checkBox" />
                      <label for="checkBox" className="label">
                        정보/이벤트 메일 수신에 동의합니다.
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="tableRow">
                    <div className="token">■</div>
                    <div> 비밀번호</div>
                  </th>
                  <td>
                    <div className="textField">
                      <input
                        type="text"
                        className="text"
                        name="passwordValue"
                        onChange={handleInputChange}
                      ></input>
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
                      <input
                        type="text"
                        className="text"
                        name="rePasswordValue"
                        onChange={handleInputChange}
                      ></input>
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
                      <input
                        type="text"
                        className="text"
                        name="name"
                        onChange={handleInputChange}
                      ></input>
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
                      <input
                        type="text"
                        name="nickname"
                        className="text"
                        onChange={handleInputChange}
                      ></input>
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
                      <input
                        type="text"
                        name="phoneValue"
                        className="text"
                        onChange={handleInputChange}
                      ></input>
                      <input type="checkBox" className="checkBox" />
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
                            onClick={handleInputChange}
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
        </form>
        <div className="dividerBottom"></div>
        <div className="btn">
          <button className="btnSignUp" onClick={onCheck}>
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
