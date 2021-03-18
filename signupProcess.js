import React, { Component } from "react";
import DaumPostcode from "react-daum-postcode";
import "./SignupProcess.scss";
class SignupProcess extends Component {
  state = {
    emailAgree: true,
    phoneAgree: true,
    userId: 1,
    userIdUsable: "",
    password: "",
    passwordCheck: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    zoneCode: "",
    fullAddress: "",
    isDaumPost: false,
    isRegister: false,
    register: [],
  };
  //아이디확인
  
  idCheck = e => {
    e.preventDefault();
    fetch("http://localhost:3000/data/iddb.json", {
      method: "GET",
    })
      .then(res => res.json())
      .then(res => {
        const check = Object.values(res).filter(
          i => i.userId === this.state.userId
        );
        if (check.length) {
          alert("이미 사용중이라네");
          return;
        }
        alert("사용가능한 아이디라네");
        // if (response.status === 200) {
        //   alert('사용가능한 아이디라네');
        //   this.setState({ userIdUsable: true });
        // } else if (res.status === 409) {
        //   alert('이미 사용중이라네');
        // } else {
        //   alert('사용 불가한 아이디라네');
        // }
      });
  };
  //input 값
  handleInputChange = e => {
    const idPattern = /^[a-z0-9_]{4,12}$/;
    if (
      e.target.name === "userId" &&
      idPattern.test(e.target.value) === false
    ) {
      this.setState({ userId: "" });
      return;
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //회원가입
  clickJoin = e => {
    e.preventDefault();
    if (this.state.userIdUsable === false) {
      alert("아이디 중복확인 점..");
      return;
    }
    if (!this.state.userId) {
      alert("아이디를 입력해주세요 ");
      return;
    }
    if (!this.state.password) {
      alert("비밀번호를 입력해주세요 ");
      return;
    }
    if (this.state.password !== this.state.passwordCheck) {
      alert("비밀번호를 잘못 입력하셨습니다. ");
      return;
    }
    if (!this.state.name) {
      alert("이름을 입력해주세요");
      return;
    }
    if (!this.state.email) {
      alert("이메일을 입력해주세요");
      return;
    }
    if (!this.state.phone) {
      alert("휴대폰 번호를 입력해주세요");
      return;
    }
    if (true) {
      fetch("주소", {
        method: "POST",
        body: JSON.stringify({
          userId: this.state.userId,
          password: this.state.password,
          name: this.state.name,
          phone: this.state.phone,
          email: this.state.email,
        }),
      }) //
        .then(response => {
          if (response.status === 400) {
            alert("다시 한번 확인해주세요");
          } else {
            alert("가입완료!");
            this.props.history.push("/login");
            window.location.reload();
          }
        });
    }
  };
  //주소 API 연결 및 등록
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
      isDaumPost: false,
    });
  };
  render() {
    const { isModalShow, isModalClose } = this.props;
    const {
      name,
      phone,
      address,
      isDaumPost,
      fullAddress,
      zoneCode,
      isRegister,
    } = this.state;
    const width = 595;
    const height = 450;
    const modalStyle = {
      position: "fixed",
      top: "10%",
      left: "10%",
      zIndex: "100",
      border: "1px solid #000000",
      overflow: "hidden",
    };
    return (
      <div className="signupProcessComponent">
        <form id="formJoin" name="formJoin" method="post">
          <div className="baseInputBox">
            <h3>기본정보</h3>
            <span class="important">
              :검은색_중간_작은_정사각형: 표시는 반드시 입력하셔야 하는
              항목입니다.
            </span>
            <div className="baseInformation">
              <table border="0" cellpadding="0" cellspacing="0">
                <colgroup>
                  <col width="25%" />
                  <col width="75%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>
                      <span className="important">
                        :검은색_중간_작은_정사각형: 아이디
                      </span>
                    </th>
                    <td>
                      <div className="memberWarning">
                        <input
                          className="inputEmail"
                          type="text"
                          onChange={this.handleInputChange}
                          name="userId"
                        ></input>
                        <button
                          className="inputAddressButton"
                          onClick={this.idCheck}
                        >
                          아이디확인
                        </button>
                      </div>
                      {this.state.userId ? null : (
                        <div style={{ color: "red", fontSize: "10px" }}>
                          4~12자 영문소문자, 숫자, 언더라인(_) 사용가능
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className="important">
                        :검은색_중간_작은_정사각형: 비밀번호
                      </span>
                    </th>
                    <td>
                      <div className="memberWarning">
                        <input
                          type="password"
                          onChange={this.handleInputChange}
                          name="password"
                        ></input>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className="important">
                        :검은색_중간_작은_정사각형: 비밀번호 확인
                      </span>
                    </th>
                    <td>
                      <div className="memberWarning">
                        <input
                          type="password"
                          onChange={this.handleInputChange}
                          name="passwordCheck"
                        ></input>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className="important">
                        :검은색_중간_작은_정사각형: 이름
                      </span>
                    </th>
                    <td>
                      <div className="memberWarning">
                        <input
                          onChange={this.handleInputChange}
                          name="name"
                        ></input>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className="important">
                        :검은색_중간_작은_정사각형: 이메일
                      </span>
                    </th>
                    <td>
                      <div className="memberWarning">
                        <input
                          className="inputEmail"
                          type="text"
                          name="email"
                          onChange={this.handleInputChange}
                        />
                        <select id="emailDomain" name="emailDomain">
                          <option value="self">직접입력</option>
                          <option value="naver.com">naver.com</option>
                          <option value="gmail.com">gmail.com</option>
                        </select>
                      </div>
                      <div className="memberWarning jsEmail"></div>
                      <div className="formElement">
                        <input type="checkbox" id="mailing" name="mailing" />
                        <label for="mailing">
                          (선택)마케팅 및 이벤트 정보 메일 수신에 동의합니다.
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className="important">
                        :검은색_중간_작은_정사각형: 휴대폰번호
                      </span>
                    </th>
                    <td>
                      <div className="memberWarning">
                        <input
                          type="tel"
                          name="phone"
                          onChange={this.handleInputChange}
                        ></input>
                      </div>
                      <div className="formElement">
                        <input
                          type="checkbox"
                          id="mailingPhone"
                          name="mailing"
                        />
                        <label for="mailingPhone">
                          (선택)마케팅 및 이벤트 정보 메일 수신에 동의합니다.
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className="important">주소</span>
                    </th>
                    <td>
                      <div className="memberWarning">
                        <input
                          className="inputAddress"
                          type="text"
                          value={zoneCode}
                          onChange={this.handleInputChange}
                          name="address"
                        />
                        <input
                          type="button"
                          className="inputAddressButton"
                          onClick={this.handleOpenPost}
                          value="우편번호 찾기"
                        />
                        <div>
                          <input
                            className="inputAddressBottom"
                            type="text"
                            value={fullAddress}
                          />
                        </div>
                        <div>
                          <input type="text" placeholder="상세주소" />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </form>
        <div className="btnFinalBox">
          <button className="btnMemberCancel">취소</button>
          <button className="btnMemberJoin" onClick={this.clickJoin}>
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
export default SignupProcess;
