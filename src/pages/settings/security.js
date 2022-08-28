import axios from "axios";
import { useContext, useRef } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { Lang } from "../../components/lang/lang";
import { LangContext } from "../../context/langContext";
import { ThemeContext } from "../../context/themeContext";

export const Security = () => {
  const { token } = useAuth();
  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  const email = useRef();
  const password = useRef();
  const newPassword = useRef();
  const confirm = useRef();

  const formData = new FormData();

  const HandleForm = (evt) => {
    evt.preventDefault();

    formData.append("email", email.current.value);
    formData.append("currentPassword", password.current.value);
    formData.append("newPassword", newPassword.current.value);

    if (
      (email.current.value,
      password.current.value,
      newPassword.current.value,
      newPassword.current.value === confirm.current.value)
    ) {
      axios
        .put(
          `https://book-service-layer.herokuapp.com/user/security`,
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className=" d-flex justify-content-center">
      <div>
        <h3 className={`${theme}Heading`}>{Lang[lang].changePass}</h3>

        <form onSubmit={HandleForm}>
          <Text className={`${theme}Text`}>{Lang[lang].email}</Text>
          <Input
            
            className={`${theme}Input w-100`}
            required
            ref={email}
            type="email"
            placeholder={Lang[lang].email}
            name="email"
          />
          <Label htmlFor="email">{Lang[lang].enterEmail}</Label>

          <Text className={`${theme}Text`}>{Lang[lang].currentPass}</Text>
          <Input
            
            className={`${theme}Input w-100`}
            required
            ref={password}
            type="password"
            placeholder={Lang[lang].currentPass}
            name="currentPassword"
          />
          <Label htmlFor="currentPassword">Please enter your password.</Label>

          <div className=" w-100 d-flex justify-content-between">
            <InnerBox>
              <Text className={`${theme}Text`}>{Lang[lang].newPass}</Text>
              <Input
                
                className={`${theme}Input w-100`}
                required
                ref={newPassword}
                type="password"
                placeholder={Lang[lang].newPass}
                name="newPassword"
              />
              <Label htmlFor="newPassword">{Lang[lang].enterPass} </Label>
            </InnerBox>
            <InnerBox>
              <Text className={`${theme}Text`}>{Lang[lang].confirmPass}</Text>
              <Input
                
                className={`${theme}Input w-100`}
                required
                ref={confirm}
                type="password"
                name="confirm"
                placeholder={Lang[lang].confirmPass}
              />
              <Label htmlFor="confirm">{Lang[lang].confirmNewPass}</Label>
            </InnerBox>
          </div>
          <Button className=" w-auto" type="submit">
            {Lang[lang].saveChanges}
          </Button>
        </form>
      </div>
    </div>
  );
};
const InnerBox = styled.div`
  width: 45%;
`;
const Input = styled.input`
  height: 44px;
  padding-left: 20px;
  border-radius: 6px;
  border: none;
  border-bottom: 1px solid teal;
`;
const Text = styled.p`
  margin-top: 30px;
`;
const Label = styled.label`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  display: block;
  color: #b5b5c3;
`;
const Button = styled.button`
  width: 142px;
  height: 43px;
  margin-top: 50px;
  color: white;
  position: relative;
  left: 500px;
  background: #152540;
  border-radius: 4px;
`;
