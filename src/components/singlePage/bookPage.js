import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { BookCard } from "../books/bookCard";
import { Header } from "../header";
import { useAuth } from "../../hooks/useAuth";
import { ThemeContext } from "../../context/themeContext";
import { Lang } from "../lang/lang";
import { LangContext } from "../../context/langContext";
import BookIcon from "../../assets/img/book-icon.svg";
import Headphones from "../../assets/img/headphones.svg";
import ebook from "../../assets/img/ebook.svg";
import like from "../../assets/img/like.svg";
import Export from "../../assets/img/export.svg";

export const BookPage = ({ modal, setModal }) => {
  const [value, setValue] = useState("");
  const [book, setBook] = useState();
  const [name, setName] = useState();
  const { lang } = useContext(LangContext);
  const { theme } = useContext(ThemeContext);
  const { token } = useAuth();
  const { title } = useParams();

  useEffect(() => {
    fetch(`https://book-service-layer.herokuapp.com/book/search?book=${title}`)
      .then((res) => res.json())
      .then((data) => setValue(...data))
      .catch((err) => console.log(err));
    fetch(`https://book-service-layer.herokuapp.com/book/genreId/4`)
      .then((res) => res.json())
      .then((books) => setBook(books))
      .catch((err) => console.log(err));
  }, [book]);

  useEffect(() => {
    axios
      .get(
        `https://book-service-layer.herokuapp.com/author/authorId/${value.author_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => setName(res.data));
  }, [value]);

  return (
    <>
      <Header modal={modal} setModal={setModal} />
      {value !== undefined && (
        <>
          <div className=" pt-2 d-flex justify-content-start">
            <Picture
              width={500}
              height={800}
              src={`https://book-service-layer.herokuapp.com/${value.image}`}
              alt="img"
            />
            <div>
              <div className=" d-block">
                <Heading className={`${theme}Heading`}>{value.title}</Heading>
                {name && (
                  <Author className={`${theme}Name mb-3`}>
                    {name.first_name} {name.last_name}
                  </Author>
                )}
              </div>
              <Text className={`${theme}Text mt-3`}>
                {Lang[lang].pages} : <span>{value.page}</span>
              </Text>
              <Text className={`${theme}Text`}>
                {Lang[lang].creatingDate} : <span>{value.year}</span>
              </Text>

              <Text className={`${theme}Text`}>{Lang[lang].moreInfo} ↓</Text>

              <Text className={`${theme}Bio`}>{value.description}</Text>

              <div className=" mt-5 d-flex justify-content-around align-items-baseline">
                <div className=" d-flex">
                  <Box>
                    <img width={20} height={20} src={BookIcon} alt="icon" />
                    <Text className={`${theme}Teht mb-0`}>{Lang[lang].paperBook}</Text>
                    <Text className={`${theme}Text`}>
                      {Lang[lang].price} : <span>{value.price}</span>$
                    </Text>
                  </Box>
                  <Box>
                    <img width={20} height={20} src={Headphones} alt="icon" />
                    <Text className={`${theme}Text mb-0`}>{Lang[lang].audioBook}</Text>
                  </Box>
                  <Box>
                    <img width={20} height={20} src={ebook} alt="icon" />
                    <Text className={`${theme}Text mb-0`}>{Lang[lang].eBook}</Text>
                    <Text className={`${theme}Text mb-0`}>pdf, epub</Text>
                  </Box>
                </div>
                <BasketBtn>{Lang[lang].basket}</BasketBtn>
              </div>
            </div>
          </div>

          <div className=" pt-5 mt-4 mb-3 d-flex justify-content-around position-relative">
            <div
              className={` position-relative ${theme}DescriptionBox descriptionBox d-flex flex-column  align-items-baseline justify-content-center p-4`}
            >
              <Text className={`${theme}Bio`}>
                {Lang[lang].bookDescription}
              </Text>
              <IconsBox>
                <img className=" mx-2" src={like} alt="icon" />
                <img className=" mx-2" src={Export} alt="icon" />
              </IconsBox>
            </div>
            <div
              className={` w-25 position-relative ${theme}ExceptBox exceptBox d-flex flex-column  align-items-baseline justify-content-center p-4`}
            >
              <Text className={`${theme}Bio`}>{Lang[lang].excerpt}</Text>
            </div>
          </div>

          <div className=" p-3 px-3 mx-3">
            <div className=" d-flex justify-content-around">
              {theme === "dark" ? (
                <>
                  <p className=" darkText">{Lang[lang].youCanLike}</p>
                  <Link
                    className=" darkLink text-decoration-none"
                    to={"/books"}
                  >
                    {Lang[lang].seeAll}→
                  </Link>
                </>
              ) : (
                <>
                  <p className=" lightText">{Lang[lang].youCanLike}</p>
                  <Link
                    className=" lightLink text-decoration-none"
                    to={"/books"}
                  >
                    {Lang[lang].seeAll}→
                  </Link>
                </>
              )}
            </div>
            <List className=" list-unstyled d-flex justify-content-start align-items-center overflow-auto">
              {book !== undefined &&
                book.map((e) => (
                  <BookCard
                    key={e.imge || e.id}
                    data={e}
                    author={e.author_id}
                  />
                ))}
            </List>
          </div>
        </>
      )}
    </>
  );
};
const IconsBox = styled.div`
  position: absolute;
  right: 20px;
  bottom: 10px;
`;
const BasketBtn = styled.button`
  border: none;
  background-color: #c9ac8c;
  color: #3c2710;
`;
const Box = styled.div`
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
const List = styled.ul`
  height: 470px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 40px;
  margin-right: 40px;
`;
const Author = styled.p`
  font-family: "Steinbeck";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
`;
const Text = styled.p`
  font-family: Steinbeck;
  font-weight: 400;
`;
const Picture = styled.img`
  margin-left: 70px;
  margin-right: 70px;
  border: 1px solid rgb(87, 87, 87);
  border-radius: 15px;
`;
const Heading = styled.h2`
  font-family: "RotterburgDisplayFont";
  font-weight: 400;
  font-size: 48px;
  line-height: 53px;
`;
