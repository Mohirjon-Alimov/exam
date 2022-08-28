import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Lang } from "../components/lang/lang";
import { LangContext } from "../context/langContext";
import { ThemeContext } from "../context/themeContext";
import { useAuth } from "../hooks/useAuth";
import CustomImg from "../assets/img/author.png";

export const AddAuthor = () => {
  const { lang } = useContext(LangContext);
  const { theme } = useContext(ThemeContext);
  const { token } = useAuth();

  const navigate = useNavigate();

  const firstName = useRef("");
  const surname = useRef("");
  const birth = useRef("");
  const death = useRef("");
  const genre = useRef("");
  const bio = useRef("");
  const img = useRef("");
  const country = useRef("");
  
  const AddAuthor = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("first_name", firstName.current.value);
    formData.append("last_name", surname.current.value);
    formData.append("date_of_birth", birth.current.value);
    formData.append("date_of_death", death.current.value);
    formData.append("country", country.current.value);
    formData.append("genre_id", genre.current.value);
    formData.append("bio", bio.current.value);
    formData.append("image", img.current.files[0]);

    axios
      .post(`https://book-service-layer.herokuapp.com/author/`, formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      evt.innerHtml = null
  };

  return (
    <>
      <BackBtn className=" btn btn-info p-0 p-1" onClick={() => navigate(-1)}>
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
      </BackBtn>
      <div className=" row  m-0 p-0 mt-5">
        <div className=" col-6 d-flex justify-content-center align-items-center">
          <div>
            <Image width={350} height={266} src={CustomImg} alt="picture" />
          </div>
        </div>
        <div className=" col-6 d-flex justify-content-center align-items-center">
          <div className=" w-75">
            <h2 className={`${theme}Heading`}>{Lang[lang].addAuthors}</h2>
            <form onSubmit={AddAuthor}>
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
                ref={surname}
                type="text"
                name="last_name"
                placeholder={Lang[lang].lastName}
              />
              <Input 
                className={`${theme}Input`}
                required
                ref={birth}
                type="number"
                name="date_of_birth"
                placeholder={Lang[lang].birthDate}
              />
              <Input  
                className={`${theme}Input`}
                required
                ref={death}
                type="number"
                name="date_of_death"
                placeholder={Lang[lang].deathDate}
              />

              <Select
                required
                className={`${theme}Input`}
                defaultValue={"disabled"}
                ref={genre}
                name="genre_id "
              >
                <option value="disabled" disabled aria-selected>
                  {Lang[lang].choose}
                </option>
                <option value="1">{Lang[lang].temurids}</option>
                <option value="2">{Lang[lang].jadids}</option>
                <option value="3">{Lang[lang].soviet}</option>
                <option value="4">{Lang[lang].independence}</option>
              </Select>

              <TextArea 
                className={`${theme}Input`}
                required
                ref={bio}
                type="text"
                name="bio"
                placeholder={Lang[lang].desciption}
              />
              <ImgInput
                required
                className={`${theme}Input mt-4`}
                ref={img}
                type="file"
                name="image"
              />
              <Button type="submit">{Lang[lang].create}</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
const BackBtn = styled.button`
  margin-top: 30px;
  margin-left: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TextArea = styled.textarea`
  padding-top: 10px;
  padding-left: 10px;
  width: 100%;
  height: 80px;
  resize: none;
  margin-top: 20px;
  display: block;
  border: 1px solid #b4b4bb;
  border-radius: 10px;
`;
const Button = styled.button`
  width: 328px;
  height: 46px;
  margin-top: 35px;
  background: #152540;
  border-radius: 99px;
  font-weight: 500;
  font-size: 18px;
  line-height: 36px;
  color: #ffffff;
`;
const Input = styled.input`
  width: 100%;
  height: 46px;
  padding-left: 30px;
  margin-top: 20px;
  display: block;
  border: 1px solid #b4b4bb;
  border-radius: 10px;
`;
const Select = styled.select`
  width: 100%;
  height: 46px;
  padding-left: 30px;
  margin-top: 20px;
  display: block;
  border: 1px solid #b4b4bb;
  border-radius: 10px;
`;
const Image = styled.img`
  width: 350.35px;
  height: 266.19px;
  border-radius: 15px;
  display: block;
`;
const ImgInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
`;
