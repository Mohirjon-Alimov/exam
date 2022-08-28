import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { ThemeContext } from "../../context/themeContext";
import "./styles.css";

export const BookCard = ({ data, author }) => {
  const { theme } = useContext(ThemeContext);
  const { token } = useAuth();
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://book-service-layer.herokuapp.com/author/authorId/${author}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => setName(res.data));
  }, [setName, author, token]);

  const { image, title } = data;
  return (
    <>
      <Item>
        <Link className=" text-decoration-none" to={`/book/${title}`}>
          <Wrapper>
            <Picture
              className=" d-block"
              src={`https://book-service-layer.herokuapp.com/${image}`}
              alt="picture"
            />
            <div className="px-3">
              <Title className={theme === "light" ? "lightTitle" : "darkTitle"}>
                {title}
              </Title>
              <Name className={theme === "light" ? "lightTitle" : "darkTitle"}>
                {name.first_name}
              </Name>
            </div>
          </Wrapper>
        </Link>
      </Item>
    </>
  );
};
const Item = styled.li`
height: 350px;
margin: 20px 20px 0 20px;
border-radius: 15px;
box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
`;
const Name = styled.p`
  font-family: Steinbeck;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 144.4%;
`;
const Picture = styled.img`
  width: 164.15px;
  height: 246.23px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.6);
`;
const Wrapper = styled.div`
  width: 164.15px;
`;
const Title = styled.h4`
  margin-top: 17px;
  font-family: Steinbeck;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
`;
