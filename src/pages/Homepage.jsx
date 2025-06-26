import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box, Button } from "@mui/material";
import styled from "styled-components";
import Students from "../assets/students.jpg";
import { LightPurpleButton } from "../components/buttonStyles";

const Homepage = () => {
  return (
    <StyledContainer>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <img src={Students} alt="students" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTitle>Attendance students' system</StyledTitle>

            <StyledBox>
              <StyledLink to="/choose">
                <LightPurpleButton variant="contained" fullWidth>
                  Login
                </LightPurpleButton>
              </StyledLink>
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
  margin-top: 100px;
  text-align: center;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
