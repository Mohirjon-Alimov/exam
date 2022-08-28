import { useContext } from "react";
import styled from "styled-components";
import { Lang } from "../../components/lang/lang";
import { LangContext } from "../../context/langContext";
import { ThemeContext } from "../../context/themeContext";
import './styles.css';

export const Others = () => {
  const { lang, setLang } = useContext(LangContext);
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <div className=" d-flex justify-content-center">
        <div className=" w-75">
          <h3 className={
            `${theme}Heading`
          }>{Lang[lang].others}</h3>
          <div>
            <p className={`${theme}Text mt-4`}>{Lang[lang].language}</p>
            <Select
              className={`w-100 ${theme}Select`}
              defaultValue={window.localStorage.getItem("lang")}
              name="lang"
              onChange={(evt) => {
                setLang(evt.target.value);
                window.localStorage.setItem("lang", evt.target.value);
              }}
            >
              <option value="ru">Русский</option>
              <option value="en">English</option>
              <option value="uz">O'zbekcha</option>
            </Select>
            <Label className={`${theme}Label`} htmlFor="lang">{Lang[lang].setLang}</Label>

            <p className={`${theme}Text mt-4`}>{Lang[lang].theme}</p>
            <Select
              className={`w-100 ${theme}Select`}
              defaultValue={window.localStorage.getItem("theme")}
              onChange={(evt) => {
                window.localStorage.setItem("theme", evt.target.value);
                setTheme(evt.target.value);
              }}
            >
              <option value="dark">{Lang[lang].dark}</option>
              <option value="light">{Lang[lang].light}</option>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};
const Select = styled.select`
  height: 44px;
  padding-left: 20px;
  border-radius: 6px;
  border: none;
  border-bottom: 1px solid teal;
`;
const Label = styled.label`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  display: block;
  color: #b5b5c3;
`;
