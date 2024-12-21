import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropertyCard from "../componnents/Cards/PropertyCard";
import { getAllCourses, getAllProperty } from "../api";
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
const Property = styled.div`
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

const PropertyListing = () => {
  const [properties, setProperties] = useState([
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29848858/pexels-photo-29848858/free-photo-of-scenic-twilight-view-of-lakefront-in-lombardy.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Beautiful Beach House",
      desc: "A stunning house located near the beach with amazing sea views.",
      rating: "4.5",
      location: "Los, Angles",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29851526/pexels-photo-29851526/free-photo-of-charming-waterfront-in-saint-tropez-france.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Royal Heritage Haven",
      desc: "A grand palace with intricate carvings, vibrant frescoes, and rich cultural history dating back centuries.",
      rating: "4",
      location: "Paris, France",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29843678/pexels-photo-29843678/free-photo-of-ancient-rock-tomb-in-scenic-mugla-landscape.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Timeless Cityscape",
      desc: "A cobblestone street surrounded by ancient buildings, quaint cafes, and iconic landmarks.",
      rating: "3.5",
      location: "Rome, Italy",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29821515/pexels-photo-29821515/free-photo-of-cloud-gate-sculpture-in-millennium-park-chicago.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Majestic Palace Retreat",
      desc: "A historic palace with grand courtyards, ornate interiors, and centuries-old stories",
      rating: "3",
      location: "London, UK",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29828027/pexels-photo-29828027/free-photo-of-scenic-winter-view-of-tatra-mountains-in-zakopane.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Frosted Pines Chalet",
      desc: "A cozy chalet amidst snowy landscapes with fireplaces and hot cocoa waiting for you.",
      rating: "4",
      location: "Zurich, Switzerland",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29787589/pexels-photo-29787589/free-photo-of-stunning-star-trails-over-cao-b-ng-mountains.png?auto=compress&cs=tinysrgb&w=600",
      title: "Rocky Ridge Adventure",
      desc: "Rugged mountains with steep trails, perfect for climbing and adventure seekers.",
      rating: "4.5",
      location: "Sydney, Australia",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29821515/pexels-photo-29821515/free-photo-of-cloud-gate-sculpture-in-millennium-park-chicago.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Majestic Palace Retreat",
      desc: "A historic palace with grand courtyards, ornate interiors, and centuries-old stories",
      rating: "3",
      location: "London, UK",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29828027/pexels-photo-29828027/free-photo-of-scenic-winter-view-of-tatra-mountains-in-zakopane.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Frosted Pines Chalet",
      desc: "A cozy chalet amidst snowy landscapes with fireplaces and hot cocoa waiting for you.",
      rating: "4",
      location: "Zurich, Switzerland",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29787589/pexels-photo-29787589/free-photo-of-stunning-star-trails-over-cao-b-ng-mountains.png?auto=compress&cs=tinysrgb&w=600",
      title: "Rocky Ridge Adventure",
      desc: "Rugged mountains with steep trails, perfect for climbing and adventure seekers.",
      rating: "4.5",
      location: "Sydney, Australia",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29848858/pexels-photo-29848858/free-photo-of-scenic-twilight-view-of-lakefront-in-lombardy.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Beautiful Beach House",
      desc: "A stunning house located near the beach with amazing sea views.",
      rating: "4.5",
      location: "Los, Angles",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29851526/pexels-photo-29851526/free-photo-of-charming-waterfront-in-saint-tropez-france.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Royal Heritage Haven",
      desc: "A grand palace with intricate carvings, vibrant frescoes, and rich cultural history dating back centuries.",
      rating: "4",
      location: "Paris, France",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29843678/pexels-photo-29843678/free-photo-of-ancient-rock-tomb-in-scenic-mugla-landscape.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Timeless Cityscape",
      desc: "A cobblestone street surrounded by ancient buildings, quaint cafes, and iconic landmarks.",
      rating: "3.5",
      location: "Rome, Italy",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29821515/pexels-photo-29821515/free-photo-of-cloud-gate-sculpture-in-millennium-park-chicago.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Majestic Palace Retreat",
      desc: "A historic palace with grand courtyards, ornate interiors, and centuries-old stories",
      rating: "3",
      location: "London, UK",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
    {
      _id: "12345",
      img: "https://images.pexels.com/photos/29828027/pexels-photo-29828027/free-photo-of-scenic-winter-view-of-tatra-mountains-in-zakopane.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Frosted Pines Chalet",
      desc: "A cozy chalet amidst snowy landscapes with fireplaces and hot cocoa waiting for you.",
      rating: "4",
      location: "Zurich, Switzerland",
      price: {
        org: 250,
        mrp: 300,
        off: 17,
      },
    },
  ]);

  return (
    <Container>
      <Property>
        <CardWrapper>
          {
            properties.map((property) => (
              <PropertyCard property={property}/>
            ))
          }
        </CardWrapper>
      </Property>
    </Container>
  )
};

export default PropertyListing;
