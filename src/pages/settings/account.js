import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import Img from "../../assets/img/person.png";
import { Lang } from "../../components/lang/lang";
import { LangContext } from "../../context/langContext";
import { ThemeContext } from "../../context/themeContext";

export const Account = () => {
  const [account, setAccount] = useState();
  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  const { token } = useAuth();
  useEffect(() => {
    axios
      .get(`https://book-service-layer.herokuapp.com/user/me`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setAccount(res.data);
      })
      .catch(err => console.log(err))
  }, [token]);

  const firstName = useRef("");
  const lastName = useRef("");
  const phone = useRef("");
  const img = useRef("");

  const handleForm = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("first_name", firstName.current.value);
    formData.append("last_name", lastName.current.value);
    formData.append("phone", phone.current.value);
    formData.append("image", img.current.files[0]);

    axios
      .put(`https://book-service-layer.herokuapp.com/user/account`, formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <>
      {account && (
        <div className="row m-0 p-0">
          <div className="col-4">
            <div className=" d-flex justify-content-center">
              <Image
                width={175}
                height={175}
                src={
                  `https://book-service-layer.herokuapp.com/${account.image}` ||
                  Img
                }
                alt="picture"
              />
            </div>
          </div>
          <Column className="col-8 position-relative">
            <h3 className={`${theme}Heading`}>{Lang[lang].myProfile}</h3>
            <form onSubmit={handleForm}>
              <Text className={`${theme}Text`}>{Lang[lang].firstName}</Text>
              <Input 
                ref={firstName}
                className={`${theme}Input w-100`}
                defaultValue={account.first_name}
                type="text"
                name="first_name"
                placeholder={Lang[lang].firstName}
              />
              <Label htmlFor="first_name">{Lang[lang].enterName}</Label>
              <Text className={`${theme}Text`}>{Lang[lang].lastName}</Text>
              <Input 
                ref={lastName}
                className={`${theme}Input w-100`}
                defaultValue={account.last_name}
                type="text"
                name="last_name "
                placeholder={Lang[lang].lastName}
              />
              <Label htmlFor="last_name">{Lang[lang].enterLastName}</Label>
              <div className=" d-flex justify-content-between">
                <div>
                  <Text className={`${theme}Text`}>{Lang[lang].phone}</Text>
                  <Input 
                    className={`${theme}Input`}
                    ref={phone}
                    defaultValue={account.phone}
                    type="number"
                    name="phone"
                    placeholder={Lang[lang].phone}
                  />
                  <Label htmlFor="phone">{Lang[lang].enterPhone}</Label>
                </div>
                <div>
                  <Text className={`${theme}Text`}>{Lang[lang].image}</Text>
                  <Input 
                    className={`${theme}Input`}
                    ref={img}
                    type="file"
                    name="image "
                  />
                  <Label htmlFor="image">{Lang[lang].dropImage}</Label>
                </div>
              </div>
              <Button type="submit">{Lang[lang].saveChanges}</Button>
            </form>
          </Column>
        </div>
      )}
    </>
  );
};
const Text = styled.p`
  margin-top: 30px;
`;
const Input = styled.input`
  height: 44px;
  padding-left: 20px;
  border-radius: 6px;
  border: none;
  border-bottom: 1px solid teal;
`;

const Image = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 100%;
`;
const Column = styled.div`
  padding-right: 121px;
`;
const Label = styled.label`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  display: block;
  color: #b5b5c3;
`;

const Button = styled.button`
  width: auto;
  height: 43px;
  margin-top: 50px;
  color: white;
  position: relative;
  left: 500px;
  background: #152540;
  border-radius: 4px;
`;
