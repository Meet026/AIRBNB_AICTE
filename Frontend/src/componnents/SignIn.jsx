import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import button from "./Button";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.secondary + 90};
`;
const TextButton = styled.div`
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.secondary + 90};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const SignIn = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [ButtonDisabled, setButtonDisabled] = useState(false);

  const validateInputs = () => {
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    // setButtonDisabled(true);
    setButtonLoading(true);
    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          setOpenAuth(false);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {
          setButtonLoading(false);
          setButtonDisabled(false);
        })
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Airbnb</Title>
        <Span>Please login with your details here</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Email Address"
          placeholder="Enter Your Email"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        ></TextInput>
        <TextInput
          label="Password"
          placeholder="Enter Your Password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        ></TextInput>
        <TextButton>Forgot Password?</TextButton>
        <Button
          text="Sign In"
          isLoading={buttonLoading}
          isDisabled={ButtonDisabled}
          onClick={handleSignIn}
        ></Button>
      </div>
    </Container>
  );
};

export default SignIn;
