import { Link } from "react-router-dom";
import "../components/styles.css";
import Img from "../assets/img/person.png";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Lang } from "./lang/lang";
import { LangContext } from "../context/langContext";
import { ThemeContext } from "../context/themeContext";

export const Header = ({ modal, setModal }) => {
  const { theme}= useContext(ThemeContext)

  const {lang} = useContext(LangContext)
  const { token } = useAuth();
  const [account, setAccount] = useState('');


  useEffect(() => {
    axios
      .get(`https://book-service-layer.herokuapp.com/user/me`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if(res.data !== undefined){
          setAccount(res.data.image);
        }
      })
      .catch(err => console.log(err))
  }, [token]);
  const openModal = () => {
    setModal(true);
  };


  return (
    <>
      <header 
      className={`${theme === 'dark' && 'darkHeader'} header d-flex justify-content-between align-items-center`}>
        <Link className={`${theme === 'dark' && 'darkLogo'} logo-link`} to={"/"}>
          Badiiyat
        </Link>
        <div className=" d-flex position-relative justify-content-between align-items-center w-50">
          <nav>
            <ul className={` nav-link-list`}>
              <Link className={theme === 'dark' ? 'darkLink': 'lightLink'} to={"/"}>{Lang[lang].authors}</Link>
              <Link className={theme === 'dark' ? 'darkLink': 'lightLink'} to={"/books"}>{Lang[lang].books}</Link>
            </ul>
          </nav>
          <Button 
          // style={theme === 'dark' && darkBtn}
           className={`${theme === 'dark' && 'darkBtn'} modal-btn`} onClick={openModal}>
            {account !== undefined ? 
            <Image src={`https://book-service-layer.herokuapp.com/${account}`} width="50"
            height={50}
            alt="person"/> : <Image src={Img} width="50"
            height={50}
            alt="person"/>}▽</Button>
        </div>
      </header>
    </>
  );
};

const Image = styled.img`
border-radius: 100%;
`
const Button = styled.button`
border-radius: 10px;
border: none;
`;
