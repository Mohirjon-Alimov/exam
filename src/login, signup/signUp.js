import axios from "axios";
import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Img from "../assets/img/signupPic.png";
import { Lang } from "../components/lang/lang";
import { LangContext } from "../context/langContext";
import { ThemeContext } from "../context/themeContext";

export const SignUp = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { lang } = useContext(LangContext);

  const firstName = useRef("");
  const lastName = useRef("");
  const phone = useRef("");
  const email = useRef("");
  const password = useRef("");

  const handleForm = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("first_name", firstName.current.value);
    formData.append("last_name", lastName.current.value);
    formData.append("phone", phone.current.value);
    formData.append("email", email.current.value);
    formData.append("password", password.current.value);

    axios
      .post("https://book-service-layer.herokuapp.com/user/register", formData)
      .then((data) => {
        window.localStorage.setItem("token", data.data.token);
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <ImgBg>
        <img src={Img} alt="Pic" />
      </ImgBg>
      <Content>
        <div>
          <Heading className={`${theme}Heading`}>{Lang[lang].signUp}</Heading>
          <LinkTo className={`${theme}Text`}>
            {Lang[lang].haveAcc}
            <Link
              className={`${theme}Link text-decoration-none mx-4`}
              to="/signIn"
            >
              {Lang[lang].signIn}
            </Link>
          </LinkTo>
        </div>
        <form onSubmit={handleForm}>
          <div className=" d-flex flex-column justify-content-center align-items-center">
            <Input
              className={`${theme}Input`}
              required
              ref={firstName}
              type="text"
              name="first_name"
              placeholder={Lang[lang].firstName}
            />
            <Input
              className={`${theme}Input`}
              required
              ref={lastName}
              type="text"
              name="last_name"
              placeholder={Lang[lang].lastName}
            />
            <Input
              className={`${theme}Input`}
              required
              ref={phone}
              type="number"
              name="phone"
              placeholder={Lang[lang].phone}
            />
            <Input
              className={`${theme}Input`}
              required
              ref={email}
              type="email"
              name="email"
              placeholder={Lang[lang].email}
            />
            <Input
              className={`${theme}Input`}
              required
              ref={password}
              type="password"
              name="password"
              placeholder={Lang[lang].password}
            />
            <Button type="submit">{Lang[lang].nextStep}</Button>
          </div>
        </form>
      </Content>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const ImgBg = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(201, 172, 140, 0.93);
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  padding-left: 30px;
  width: 330px;
  height: 46px;
  margin-top: 20px;
  border: 1px solid #b4b4bb;
  border-radius: 10px;
`;
const Button = styled.button`
  width: 328px;
  height: 46px;
  margin-top: 35px;
  border: none;
  background: #152540;
  border-radius: 99px;
  font-weight: 500;
  font-size: 18px;
  line-height: 36px;
  color: #ffffff;
`;
const Heading = styled.h2`
  font-family: Arial;
  font-weight: 900;
  font-size: 36px;
  line-height: 51px;
`;
const LinkTo = styled.p`
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
`;
