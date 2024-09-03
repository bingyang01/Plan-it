import React from "react";
import { Typography, Paper, Box, Container } from "@mui/material";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
import Looks6Icon from "@mui/icons-material/Looks6";
import Dialog from "@mui/material/Dialog";

export default function KeyFeatures({ openTutorial, handleTutorialClose }) {
    return (
        <>
            <Dialog
                open={openTutorial}
                onClose={handleTutorialClose}
                sx={{
                    "& .MuiDialog-paper": { width: "500px", height: "820px" },
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        marginBottom: "0.5em",
                        marginTop: "0.5em",
                        padding: "10px",
                        marginLeft: "1em",
                    }}
                >
                    A quick tutorial:
                </Typography>
                {/* ---------------------------------------------------------------------------------------------------- */}
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            width: "100%",
                            height: "6em",
                            marginBottom: "1.5em",
                            padding: "10px",
                        }}
                    >
                        <Box height="100px">
                            <LooksOneIcon
                                fontSize="large"
                                sx={{
                                    color: "#ff5722",
                                    marginLeft: "1em",
                                    marginRight: "1.5em",
                                }}
                            />
                        </Box>
                        <Box sx={{ marginRight: "1em" }}>
                            <Typography variant="h6">Pick a day</Typography>
                            <Typography
                                variant="body2"
                                style={{ color: "black" }}
                            >
                                Select the day of your trip.
                            </Typography>
                        </Box>
                    </Paper>
                    {/* ---------------------------------------------------------------------------------------------------- */}
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            width: "100%",
                            height: "6em",
                            marginBottom: "1.5em",
                            padding: "10px",
                        }}
                    >
                        <Box height="100px">
                            <LooksTwoIcon
                                fontSize="large"
                                sx={{
                                    color: "#ff5722",
                                    marginLeft: "1em",
                                    marginRight: "1.5em",
                                }}
                            />
                        </Box>
                        <Box sx={{ marginRight: "1em" }}>
                            <Typography variant="h6">Plan your day</Typography>
                            <Typography
                                variant="body2"
                                style={{ color: "black" }}
                            >
                                Browse a variety of point of interests on our
                                interactive map.
                            </Typography>
                        </Box>
                    </Paper>
                    {/* ---------------------------------------------------------------------------------------------------- */}
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            width: "100%",
                            height: "6em",
                            marginBottom: "1.5em",
                            padding: "10px",
                        }}
                    >
                        <Box height="100px">
                            <Looks3Icon
                                fontSize="large"
                                sx={{
                                    color: "#ff5722",
                                    marginRight: "1.5em",
                                    marginLeft: "1em",
                                }}
                            />
                        </Box>
                        <Box sx={{ marginRight: "1em" }}>
                            <Typography variant="h6">
                                Assess busyness
                            </Typography>

                            <Typography
                                variant="body2"
                                style={{ color: "black" }}
                            >
                                Optimise your trip by using our zonal busyness
                                predictor.
                            </Typography>
                        </Box>
                    </Paper>
                    {/* ---------------------------------------------------------------------------------------------------- */}
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            width: "100%",
                            height: "6em",
                            marginBottom: "1.5em",
                            padding: "10px",
                        }}
                    >
                        <Box height="100px">
                            <Looks4Icon
                                fontSize="large"
                                sx={{
                                    color: "#ff5722",
                                    marginRight: "1.5em",
                                    marginLeft: "1em",
                                }}
                            />
                        </Box>
                        <Box sx={{ marginRight: "1em" }}>
                            <Typography variant="h6">
                                Create an itinerary
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{ color: "black" }}
                            >
                                Select locations and transport to create a
                                custom itinerary plan.
                            </Typography>
                        </Box>
                    </Paper>
                    {/* ---------------------------------------------------------------------------------------------------- */}
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            width: "100%",
                            height: "6em",
                            marginBottom: "1.5em",
                            padding: "10px",
                        }}
                    >
                        <Box height="100px">
                            <Looks5Icon
                                fontSize="large"
                                sx={{
                                    color: "#ff5722",
                                    marginRight: "1.5em",
                                    marginLeft: "1em",
                                }}
                            />
                        </Box>
                        <Box sx={{ marginRight: "1em" }}>
                            <Typography variant="h6">
                                Approve and download
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{ color: "black" }}
                            >
                                Approve your itinerary to see your plans on our
                                interactive map.
                            </Typography>
                        </Box>
                    </Paper>
                    {/* ---------------------------------------------------------------------------------------------------- */}
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            width: "100%",
                            height: "6em",
                            padding: "10px",
                        }}
                    >
                        <Box height="100px">
                            <Looks6Icon
                                fontSize="large"
                                sx={{
                                    color: "#ff5722",
                                    marginRight: "1.5em",
                                    marginLeft: "1em",
                                }}
                            />
                        </Box>
                        <Box sx={{ marginRight: "1em" }}>
                            <Typography variant="h6">
                                Ask for recommendations
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{ color: "black" }}
                            >
                                Ask our chatbot for recommendations on your
                                approved itinerary.
                            </Typography>
                        </Box>
                    </Paper>
                    {/* ---------------------------------------------------------------------------------------------------- */}
                </Container>
            </Dialog>
        </>
    );
}
