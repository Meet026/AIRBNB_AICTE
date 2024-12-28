import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GalleryCard from "./Cards/GalleryCard.jsx";
import { getAllBlogs } from "../api/index.js"; // You can implement an API call to fetch blog data
import { CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 20px 0;
  height: 95vh;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
    flex-direction: column;
    overflow-y: scroll;
  }
  background: ${({ theme }) => theme.bg};
  margin: 0 20px;
  border-radius: 12px 12px 0 0;
`;

const Blog = styled.div`
  padding: 12px;
  overflow: hidden;
  height: fit-content;
  @media (min-width: 768px) {
    width: 100%;
    overflow-y: scroll;
    height: 100%;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  @media (max-width: 750px) {
    gap: 14px;
  }
`;

const GalleryPage = () => {
  const [blogs, setBlogs] = useState([
    {
      _id: "1",
      img: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Sunset Beach Paradise",
      desc: "This beach is a slice of heaven! The soft golden sands and crystal-clear waters make it the perfect spot for relaxation. Watching the sun set over the ocean was absolutely magical. The waves were gentle enough for kids to play safely, and the nearby café served some of the best seafood we've ever had. It’s the perfect escape for families, couples, or solo travelers looking for peace and beauty.",
      date: "Dec 1, 2024",
      author: "John Doe",
      rating: 3.5
    },
    {
      _id: "2",
      img: "https://images.pexels.com/photos/29767803/pexels-photo-29767803/free-photo-of-traditional-chinese-architecture-in-mountain-valley.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Cliffs of Moher Adventure",
      desc: "Standing atop the Cliffs of Moher was a humbling experience. The sheer drop to the Atlantic Ocean and the panoramic views were awe-inspiring. The visitor center provided insightful information about the area's geology and history. A must-see for nature enthusiasts",
      date: "Nov 20, 2024",
      author: "Jane Smith",
      rating: 3.5
    },
    {
      _id: "3",
      img: "https://images.pexels.com/photos/1449767/pexels-photo-1449767.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Torres del Paine Expedition",
      desc: "Torres del Paine is a trekker's paradise. The diverse landscapes, from glaciers to turquoise lakes, were unlike anything I've ever seen. The trails were well-marked, and the refugios offered cozy accommodations. Truly a bucket-list destination for adventurers.",
      date: "Oct 15, 2024",
      author: "Mark Wilson",
      rating: 3.5
    },
    {
      _id: "4",
      img: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Sunset Beach Paradise",
      desc: "This beach is a slice of heaven! The soft golden sands and crystal-clear waters make it the perfect spot for relaxation. Watching the sun set over the ocean was absolutely magical. The waves were gentle enough for kids to play safely, and the nearby café served some of the best seafood we've ever had. It’s the perfect escape for families, couples, or solo travelers looking for peace and beauty.",
      date: "Dec 1, 2024",
      author: "John Doe",
      rating: 3.5
    },
    {
      _id: "5",
      img: "https://images.pexels.com/photos/29767803/pexels-photo-29767803/free-photo-of-traditional-chinese-architecture-in-mountain-valley.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Cliffs of Moher Adventure",
      desc: "Standing atop the Cliffs of Moher was a humbling experience. The sheer drop to the Atlantic Ocean and the panoramic views were awe-inspiring. The visitor center provided insightful information about the area's geology and history. A must-see for nature enthusiasts",
      date: "Nov 20, 2024",
      author: "Jane Smith",
      rating: 3.5
    },
    {
      _id: "6",
      img: "https://images.pexels.com/photos/1449767/pexels-photo-1449767.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Torres del Paine Expedition",
      desc: "Torres del Paine is a trekker's paradise. The diverse landscapes, from glaciers to turquoise lakes, were unlike anything I've ever seen. The trails were well-marked, and the refugios offered cozy accommodations. Truly a bucket-list destination for adventurers.",
      date: "Oct 15, 2024",
      author: "Mark Wilson",
      rating: 3.5
    },
  ]);

  return (
    <Container>
      <Blog>
        <CardWrapper>
          {blogs.map((blog) => (
            <GalleryCard key={blog._id} blog={blog} />
          ))}
        </CardWrapper>
      </Blog>
    </Container>
  );
};

export default GalleryPage;
