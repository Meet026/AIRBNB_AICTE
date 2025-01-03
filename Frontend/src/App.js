import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componnents/Navbar";
import { useState } from "react";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import { useSelector } from "react-redux";
import PropertyDetails from "./pages/PropertyDetails";
import PropertyListing from "./pages/PropertyListing";
import background from "./utils/Images/Background.jpg";
import ContactForm from "./componnents/ContactForm";
import GalleryPage from "./componnents/GalleryPage";
import GalleryDetails from "./pages/GalleryDetailes";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)),
    url(${({ background }) => background});
  background-size: cover;
  background-repeat: no-repeat;
`;

function App() {
  const {currentUser} = useSelector((state) => state.user);
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container background={background}>
          <Navbar setOpenAuth={setOpenAuth} openAuth={openAuth} currentUser={currentUser}/>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/contact" exact element={<ContactForm />}></Route>
            <Route path="/gallery" exact element={<GalleryPage />}></Route>
            <Route path="/gallery/:id" exact element={<GalleryDetails />}></Route>
            <Route
              path="/properties"
              exact
              element={<PropertyListing />}
            ></Route>
            <Route
              path="/properties/:id"
              exact
              element={<PropertyDetails />}
            ></Route>
          </Routes>
          {openAuth && (
            <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
          )}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
