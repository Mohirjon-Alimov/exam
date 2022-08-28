import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import Img from "../assets/img/login.svg";
import axios from "axios";
import styled from "styled-components";
import { Lang } from "../components/lang/lang";
import { LangContext } from "../context/langContext";
import { ThemeContext } from "../context/themeContext";

export const SignIn = () => {
  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();

  const handleForm = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("email", email.current.value);
    formData.append("password", password.current.value);

    axios
      .post("https://book-service-layer.herokuapp.com/user/login", formData)
      .then((data) => {
        window.localStorage.setItem("token", data.data.token);

        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper className=" d-flex justify-content-evenly">
      <ImgBg>
        <img src={Img} alt="Pic" />
      </ImgBg>

      <Content>
        <div>
          <Heading className={`${theme}Heading`}>{Lang[lang].signIn}</Heading>
          <LinkTo className={`${theme}Text`}>
            {Lang[lang].dontHaveAcc}
            <Link
              className={`${theme}Link text-decoration-none mx-4`}
              to="/signUp"
            >
              {Lang[lang].signUp}
            </Link>
          </LinkTo>
        </div>

        <form onSubmit={handleForm}>
          <div className=" d-flex flex-column justify-content-center align-items-center">
            <Email
              className={`${theme}Input`}
              ref={email}
              type="email"
              name="email"
              placeholder={Lang[lang].email}
            />
            <Password
              className={`${theme}Input`}
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
const Email = styled.input`
  padding-left: 30px;
  width: 330px;
  height: 46px;
  margin-top: 20px;
  border: 1px solid #b4b4bb;
  border-radius: 10px;
`;
const Password = styled.input`
  padding-left: 30px;
  width: 330px;
  height: 46px;
  margin-top: 17px;
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
