import React, { Component } from "react";
import "./SignUp.scss";

class SignUp extends Component {
  render() {
    return (
      <div className="container">
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
            <p>■ 표시는 반드시 입력하셔야 하는 항목입니다.</p>
          </div>
          <div className="tableSignUp">
            <table>
              <colgroup>
                <col width="25%"></col>
                <col width="75%"></col>
              </colgroup>
              <tbody>
                <tr>
                  <th class="tableRow one">
                    <div class="token">■</div>
                    <div> 아이디</div>
                  </th>
                  <td>
                    <div className="textField">
                      <input type="text" className="text"></input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="tableRow two">
                    <div class="token">■</div>
                    <div> 비밀번호</div>
                  </th>
                  <td>
                    <div className="textField">
                      <input type="text" className="text"></input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="tableRow three">
                    <div class="token">■</div>
                    <div>비밀번호 확인</div>
                  </th>
                  <td>
                    <div className="textField">
                      <input type="text" className="text"></input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="tableRow four">
                    <div class="token">■</div>
                    <div>이름</div>
                  </th>
                  <td>
                    <div className="textField">
                      <input type="text" className="text"></input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="tableRow five">
                    <div class="token"> </div>
                    <div>닉네임</div>
                  </th>
                  <td>
                    <div className="textField">
                      <input type="text" className="text"></input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th class="tableRow six">
                    <div class="token">■</div>
                    <div>이메일</div>
                  </th>
                  <td>
                    <div className="textFieldEmail">
                      <input type="text" className="textEmail"></input>
                      <select class="email">
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
                  </td>
                </tr>
                <tr>
                  <th class="tableRow seven">
                    <div class="token">■</div>
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
                  <th class="tableRow six">
                    <div class="token"></div>
                    <div>주소</div>
                  </th>
                  <td>
                    <div className="textFieldAddress">
                      <input type="text" className="text"></input>
                      <button>우편번호검색</button>
                    </div>
                    <div className="textFieldAddressMore">
                      <input type="text" className="adressMore"></input>
                      <input type="text" className="adressMore"></input>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="dividerBottom"></div>
        <div class="btn">
          <button className="btnSignUp">회원가입</button>
        </div>
      </div>
    );
  }
}

export default SignUp;
