import React from "react";
import { useNavigate } from "react-router-dom";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { AppBar, Button, Typography, Box, Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

export default function AboutUs({}) {
    const navigate = useNavigate();

    const handleNavigate = () => navigate("/home");

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
                            onClick={handleNavigate}
                        >
                            Home
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
            {/* -------------------------------------------------------------------------------------------------------- */}
            <Container>
                <Typography
                    variant="h4"
                    sx={{ marginBottom: "1em", color: "#0E2841" }}
                >
                    Itinerary planning, simplified.
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "2em" }}>
                    Welcome to Plan-it, our web-based application that aims to
                    provide a focused, linear approach to itinerary planning
                    with a predictive zonal busyness heatmap to help users make
                    informed decisions. Although, Plan-it only currently offers
                    an itinerary solution for Manhattan, New York City, the
                    team’s vision is to scale this service across the{" "}
                    <i>planet</i>.<br></br>
                    <br></br>
                    The research team designed Plan-it to provide users with an
                    easy-to-se tool that allows them to seamlessly browse points
                    of interest, plan an itinerary in a structured and intuitive
                    linear fashion, see focused points of interest and their
                    itinerary on an interactive map, assess busyness, and
                    receive recommendations. Plan-it aims to capture the
                    imagination of those that are seeking personalised
                    experiences to seize the day.
                    <br></br>
                    <br></br>
                    The name ‘Plan-it’ drew inspiration from the phrase ‘just
                    plan it’, a phrase that invokes a sense of action and
                    excitement, as well as the concept of “planning”, which
                    conveys a sense of purpose, control, and curiosity.
                    <br></br>
                    <br></br>A view of expected busyness was intentionally
                    introduced to help users make decisions that meet their
                    busyness preference. It is our hope that this enhances the
                    overall experience, making it less stressful and more
                    enjoyable.
                </Typography>
            </Container>
            {/* -------------------------------------------------------------------------------------------------------- */}
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "3em",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ marginBottom: "1em", color: "#0E2841" }}
                    >
                        Meet our team
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "2em",
                    }}
                >
                    {/* --------------------------------------------------------------------------- */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        width="250px"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src="/images/Qingtian.png"
                            sx={{
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Typography variant="h6">Qingtian Ye</Typography>
                        <Typography variant="h7">Maintenance Lead</Typography>
                    </Box>
                    {/* --------------------------------------------------------------------------- */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        width="250px"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src="/images/Precious.png"
                            sx={{
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Typography variant="h6">Precious Ewans</Typography>
                        <Typography variant="h7">Coordination Lead</Typography>
                    </Box>
                    {/* --------------------------------------------------------------------------- */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        width="250px"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src="/images/Phillip.png"
                            sx={{
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Typography variant="h6">Phillip McNamee</Typography>
                        <Typography variant="h7">Customer Lead</Typography>
                    </Box>
                    {/* --------------------------------------------------------------------------- */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        width="250px"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src="/images/Calvin.png"
                            sx={{
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Typography variant="h6">
                            Calvin van der Riet
                        </Typography>
                        <Typography variant="h7">Front-end Lead</Typography>
                    </Box>
                    {/* --------------------------------------------------------------------------- */}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "2em",
                        marginTop: "3em",
                    }}
                >
                    {/* --------------------------------------------------------------------------- */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        width="250px"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src="/images/Michael.png"
                            sx={{
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Typography variant="h6">Michael Glennon</Typography>
                        <Typography variant="h7">Data Lead</Typography>
                    </Box>
                    {/* --------------------------------------------------------------------------- */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        width="250px"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src="/images/Bingyang.png"
                            sx={{
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Typography variant="h6">Bingyang Li</Typography>
                        <Typography variant="h7">Back-end Lead</Typography>
                    </Box>
                    {/* --------------------------------------------------------------------------- */}
                </Box>
            </Container>
        </>
    );
}
