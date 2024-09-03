import React from "react";
import review from "../json/Reviews";
import ReviewsComponent from "../components/ReviewsComponent";
import Location from "../components/Location";
import Date from "../components/Date";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
    AppBar,
    Button,
    Typography,
    Box,
    Container,
    IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";

const ReviewsContainer = styled(Box)({
    display: "flex",
    overflowX: "auto",
    padding: "20px 0",
    gap: "10px",
});

const clientReviews = review.map((element) => {
    return <ReviewsComponent key={element.id} element={element} />;
});

export default function Home({
    handleSetStartDate,
    startDate,
    startDateArray,
    destination,
    handleDestinationChange,
}) {
    const navigate = useNavigate();
    const handleNavigate = () => navigate("/plan");
    const handleNavigateAboutUs = () => navigate("/aboutus");

    return (
        <>
            <AppBar
                position="static"
                sx={{ backgroundColor: "secondary.main", boxShadow: "none" }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "1em",
                        marginBottom: "1em",
                    }}
                >
                    <MapOutlinedIcon
                        sx={{
                            marginLeft: "4em",
                            marginRight: "0.5em",
                            fontSize: "4rem",
                            color: "primary.main",
                        }}
                    />
                    <Typography
                        component="h1"
                        variant="h1"
                        color="primary.main"
                    >
                        Plan-it
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            marginLeft: "auto",
                        }}
                    >
                        <Button
                            sx={{
                                textTransform: "none",
                                fontSize: "1.2rem",
                                marginRight: "2em",
                            }}
                            onClick={handleNavigateAboutUs}
                        >
                            About Us
                        </Button>
                        <Tooltip title="Coming soon!">
                            <Button
                                sx={{
                                    textTransform: "none",
                                    fontSize: "1.2rem",
                                    marginRight: "2em",
                                }}
                            >
                                Create Account
                            </Button>
                        </Tooltip>
                        <Tooltip title="Coming soon!">
                            <Button
                                sx={{
                                    textTransform: "none",
                                    fontSize: "1.2rem",
                                    marginRight: "5em",
                                }}
                            >
                                Login
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </AppBar>

            <Container
                sx={{
                    position: "relative",
                    height: "70vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        minHeight: "70vh",
                        backgroundImage: `url('/images/nyc.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "4px",
                        clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                        zIndex: 0,
                    }}
                ></Box>
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        padding: "2em",
                        borderRadius: "16px",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
                        textAlign: "center",
                        maxWidth: "800px",
                        zIndex: 1,
                        position: "relative",
                        right: "15%",
                        top: "-17%",
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h2"
                        color="primary.main"
                    ></Typography>
                    <Typography
                        variant="h4"
                        sx={{ marginBottom: "1em", color: "#0E2841" }}
                    >
                        Itinerary planning, simplified.
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "2em" }}>
                        Welcome to Plan-it, an app designed to assist you with
                        optimising your travel experience. This linear itinerary
                        planner will bring structure to your planning and allow
                        you to plan your day according to your busyness
                        preference.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "2em",
                        }}
                    >
                        {/* ---------------------------------------------------------------------------- */}
                        <FormControl
                            sx={{
                                width: "100%",
                                maxWidth: "300px",
                            }}
                        >
                            <Location
                                destination={destination}
                                handleDestinationChange={
                                    handleDestinationChange
                                }
                            />
                        </FormControl>
                        {/* ---------------------------------------------------------------------------- */}
                        <FormControl
                            sx={{
                                width: "100%",
                                maxWidth: "300px",
                            }}
                        >
                            <Date
                                handleSetStartDate={handleSetStartDate}
                                startDate={startDate}
                                startDateArray={startDateArray}
                            />
                        </FormControl>
                        {/* ---------------------------------------------------------------------------- */}
                        <IconButton
                            onClick={handleNavigate}
                            sx={{ color: "#ff5722" }}
                        >
                            <CheckCircleOutlineIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Container>

            <Container sx={{ textAlign: "center", marginTop: "2em" }}>
                <Typography variant="h4">What our travelers say</Typography>
                <ReviewsContainer>{clientReviews}</ReviewsContainer>
            </Container>
        </>
    );
}
