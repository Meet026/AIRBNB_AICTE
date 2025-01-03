import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/lab";
import { CircularProgress, Rating, TextField } from "@mui/material";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { bookProperty, getPropertyById } from "../api";
import Button from "../componnents/Button";
import { Spa } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  padding: 20px;
  height: 95vh;
  margin: 0 20px;
  background: ${({ theme }) => theme.bg};
  border-radius: 12px 12px 0 0;
  overflow-y: scroll;
`;

const Image = styled.img`
  width: 50%;
  border-radius: 6px;
  object-fit: cover;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: line-through;
  margin-left: 8px;
`;

const Percent = styled.span`
  font-size: 16px;
  color: green;
  margin-left: 8px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PropertyDetails = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [property, setProperty] = useState();
  const [loading, setLoading] = useState(false);

  console.log("id", id);
  
  const getPropertyDetailsById = async () => {
    setLoading(true);
    try {
      const res = await getPropertyById(id); // Make sure API is correct
      console.log("API Response:", res.data); // Debug the response
      setProperty(res.data.property); // Adjust based on the actual response structure
    } catch (error) {
      console.error("Error fetching property details:", error);  // Log error
    } finally {
      setLoading(false);  // Always stop loading
    }
  }

  useEffect(() => {
    getPropertyDetailsById();
  }, [id]);  // Add id as a dependency

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Container>
          <Image src={property?.img} alt={property?.title} />
          <Right>
            <Title>{property?.title}</Title>
            <Desc>{property?.desc}</Desc>
            <Price>
              ${property?.price.org}
              <Span>${property?.price.mrp}</Span>
              <Percent>{property?.price.off}% Off</Percent>
            </Price>
            <RatingContainer>
              <Rating value={property?.rating} readOnly />
              <span>({property?.rating})</span>
            </RatingContainer>
            <BookingContainer>
              <DatePicker
                label="Start Date"
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="End Date"
                renderInput={(params) => <TextField {...params} />}
              />
              <Button
                variant="contained"
                color="secondary"
                text="Book Now"
              />
            </BookingContainer>
          </Right>
        </Container>
      )}
    </>
  );
};

export default PropertyDetails;
