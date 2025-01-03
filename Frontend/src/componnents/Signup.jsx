import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";

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

const Signup = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [ButtonDisabled, setButtonDisabled] = useState(false);

  const validateInputs = () => {
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    // setButtonDisabled(true);
    setButtonLoading(true);
    if (validateInputs()) {
      await UserSignUp({ name, email, password })
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
        });
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Airbnb</Title>
        <Span>Sign up to create an account</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Full Name"
          placeholder="Enter Your Name"
          value={name}
          handelChange={(e) => setName(e.target.value)}
        ></TextInput>
        <TextInput
          label="Email Address"
          placeholder="Enter Your Email"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        ></TextInput>
        <TextInput
          label="Password"
          placeholder="Enter Your Password"
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
          password
        ></TextInput>
        <Button
          text="Sign Up"
          onClick={handleSignUp}
          disabled={ButtonDisabled}
          loading={buttonLoading}
        ></Button>
      </div>
    </Container>
  );
};

export default Signup;
