import styled from "styled-components";
import "./styles.css";
import { Lang } from "../../components/lang/lang";
import { LangContext } from "../../context/langContext";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

export const SearchAuthor = ({ setAuthor }) => {
  const { lang} = useContext(LangContext)
  const { theme} = useContext(ThemeContext)

  const handleForm = (evt) => {
    evt.preventDefault();
    let value = evt.target[0].value;
    fetch(
      `https://book-service-layer.herokuapp.com/author/search?author=${value}`
    )
      .then((res) => res.json())
      .then((data) => setAuthor(data));
    evt.target[0].value = null;
  };
  return (
    <>
      <Wrapper className={theme === 'dark' && 'darkWrapper'}>
        <Text className=" search-text text-center">{Lang[lang].search}</Text>
        <form onSubmit={handleForm}>
          <div className=" d-flex justify-content-center">
            <Input 
            className={theme === 'dark' ? 'darkInput': 'lightInput'}
              type="search"
              placeholder={Lang[lang].searchPlaceholder}
            />
            <Button className="searchBtn" type="submit">
            {Lang[lang].find}
            </Button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};
const Button = styled.button`
  width: 160.21px;
  height: 47.02px;
  margin-left: 15px;
  position: relative;
  background: #c9ac8c;
  border-radius: 15px;
`;
const Input = styled.input`
  width: 709.58px;
  height: 47.02px;
  padding-left: 28px;
  border-radius: 15px;
`;
const Wrapper = styled.div`
  width: 1114.54px;
  height: 169.42px;
  position: relative;
  top: -30px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 4px 77px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;
const Text = styled.p`
  font-family: "RotterburgDisplayFont";
  font-style: normal;
  font-weight: 400;
  font-size: 31px;
  line-height: 34px;
  margin-bottom: 13px;

`;
