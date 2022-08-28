import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "../header";
import "./styles.css";
import { ThemeContext } from "../../context/themeContext";
import { Lang } from "../lang/lang";
import { LangContext } from "../../context/langContext";

export const AuthorPage = ({ modal, setModal }) => {
  const { lang} = useContext(LangContext)
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [data, setData] = useState();
  const [books, setBooks] = useState();

  useEffect(() => {
    axios
      .get(`https://book-service-layer.herokuapp.com/author/authorId/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => data !== undefined && setData(data.data));

    axios
      .get(`https://book-service-layer.herokuapp.com/author/books/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => setBooks(data.data));
  }, [id, token]);

  return (
    <Wrapper className=" authorWrapper">
      <Header modal={modal} setModal={setModal} />
      <button className=" btn btn-info" onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fillRule="currentColor"
          className="bi bi-box-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
          />
          <path
            fillRule="evenodd"
            d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
          />
        </svg>
      </button>
      {data !== undefined && (
        <div className=" d-flex justify-content-between">
          <div className=" w-50 d-flex flex-column align-items-center">
            <PicWrapper>
              <Pic
                width={582}
                height={779}
                src={`https://book-service-layer.herokuapp.com/${data.image}`}
                alt="pic"
              />
            </PicWrapper>

            <div className=" d-flex justify-content-around w-100">
              <DateText className={theme === "dark" ? "darkDate" : "lightDate"}>
                {Lang[lang].birthDate}: <Date>{data.date_of_birth}</Date>{" "}
              </DateText>
              <DateText className={theme === "dark" ? "darkDate" : "lightDate"}>
              {Lang[lang].deathDate}: <Date>{data.date_of_death}</Date>{" "}
              </DateText>
            </div>
          </div>

          <div className=" w-50 d-flex flex-column justify-content-between">
            <Name className={theme === "dark" ? "darkName" : "lightName"}>
              {data.first_name} {data.last_name}
            </Name>
            <Bio className={theme === "dark" ? "darkBio" : "lightBio"}>
              {data.bio}
            </Bio>
            <div>
              <BookList>
                {books !== undefined &&
                  books.map((e) => (
                    <ListItem key={e.id}>
                      <Link className=" text-decoration-none" to={`/books`}>
                        <Inner>
                          <Picture
                            className=" d-block"
                            src={`https://book-service-layer.herokuapp.com/${e.image}`}
                            alt="picture"
                          />
                          <div>
                            <Title>{e.title}</Title>
                          </div>
                        </Inner>
                      </Link>
                    </ListItem>
                  ))}
              </BookList>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};
const ListItem = styled.li`
margin-right: 30px;
`
const Wrapper = styled.div`
  width: 100%;
  height: auto;
`;
const Bio = styled.p`
  font-family: "Steinbeck";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 144.4%;
`;

const Picture = styled.img`
  width: 164.15px;
  height: 246.23px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.6);
`;
const Inner = styled.div`
  width: 164.15px;
`;
const Title = styled.h4`
  margin-top: 17px;
  font-family: Steinbeck;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: #c9ac8c;
`;
const BookList = styled.ul`
  height: 350px;
  padding: 6px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin: 20px, 30px, 20px, 30px;
  list-style-type: none;
  overflow: auto;
`;
const PicWrapper = styled.div`
  width: 582px;
  height: 779px;
  border-radius: 18px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
const Date = styled.span`
  font-family: "RotterburgDisplayFont";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 53px;
  text-align: center;
  color: #c9ac8c;
`;
const DateText = styled.p`
  font-family: "Steinbeck";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 144.4%;
`;
const Pic = styled.img`
  width: 582px;
  height: 779px;
  border-radius: 18px;
`;
const Name = styled.h2`
  font-family: "RotterburgDisplayFont";
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 53px;
  text-align: center;
`;
