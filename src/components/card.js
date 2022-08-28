import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../context/themeContext";

export const Card = ({ data }) => {
  const { theme } = useContext(ThemeContext);

  let { first_name, image, id, last_name, date_of_birth, date_of_death } = data;
  return (
    <li className=" mt-3 mx-4">
      <Link className=" text-decoration-none" to={`/author/${id}`}>
        <Wrapper className={theme === 'dark' && 'darkItem'}>
          <Picture
            className=" d-block"
            width={173}
            height={132}
            src={`https://book-service-layer.herokuapp.com/${image}`}
            alt="picture"
          />
          <div className=" text-center d-flex flex-column justify-content-evenly">
            <Name className={theme=== 'dark'? 'darkTitle': 'lightTitle'}>{first_name}</Name>
            <Surname className={theme=== 'dark'? 'darkTitle': 'lightTitle'}>{last_name}</Surname>
            <Date className={`${theme === 'dark' && 'darkDate'} date`}>
              {date_of_birth} - {date_of_death}
            </Date>
          </div>
        </Wrapper>
      </Link>
    </li>
  );
};
const Picture = styled.img`
  width: 173.98px;
  height: 132.19px;
  border-radius: 15px 15px 0px 0px;
`;
const Wrapper = styled.div`
  width: 173.33px;
  padding-bottom: 20px;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 15px;
`;
const Name = styled.h4`
  padding-top: 10px;
  font-family: Steinbeck;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
`;
const Surname = styled.h4`
  font-family: Steinbeck;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
`;
const Date = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
`;
