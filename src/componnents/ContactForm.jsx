import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom"; // If you're using React Router
import TextInput from "./TextInput";
import Button from "./Button";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 2;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.77); // Dark overlay with opacity
  z-index: 1;
  display: ${({ show }) => (show ? "block" : "none")};
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

const FormFields = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 100%;
`;

const ContactForm = () => {
  const location = useLocation(); // Using React Router to get the current route
  const isContactPage = location.pathname === "/contact"; // Check if we're on the contact page

  useEffect(() => {
    // You can also set the body's opacity here if needed
    document.body.style.overflow = isContactPage ? "hidden" : ""; // Prevent scrolling when overlay is visible
  }, [isContactPage]);

  return (
    <>
      <Overlay show={isContactPage} /> {/* Show the overlay if on contact page */}
      <Container>
        <div>
          <Title>Contact Us</Title>
          <Span>We would love to hear from you! Please fill out the form below.</Span>
        </div>
        <FormFields>
          <TextInput label="Full Name" placeholder="Enter Your Name" />
          <TextInput label="Email Address" placeholder="Enter Your Email" />
          <TextInput label="Subject" placeholder="Enter Subject" />
          <TextInput
            label="Message"
            placeholder="Enter Your Message"
            textarea
            rows="4"
          />
          <Button text="Submit" />
        </FormFields>
      </Container>
    </>
  );
};

export default ContactForm;
