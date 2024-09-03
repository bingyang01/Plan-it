import React from "react";
import { Typography, Paper, Box, Rating } from "@mui/material";
import { styled } from "@mui/system";

export default function ReviewsComponent({ element }) {
    const ReviewCard = styled(Paper)({
        padding: "20px",
        margin: "10px",
        textAlign: "left",
        flex: "0 0 300px",
        backgroundColor: "#ffffff",
    });

    const ReviewHeader = styled(Box)({
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
    });

    const ReviewText = styled(Typography)({
        marginTop: "10px",
        color: "black",
    });

    return (
        <ReviewCard elevation={5}>
            <ReviewHeader>
                <Box>
                    <Typography variant="h6">{element.name}</Typography>
                    <Rating value={element.rating} readOnly />
                </Box>
            </ReviewHeader>
            <ReviewText variant="body2">{element.review}</ReviewText>
        </ReviewCard>
    );
}
