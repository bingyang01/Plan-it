import React from "react";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import LocalCafeOutlinedIcon from "@mui/icons-material/LocalCafeOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MuseumOutlinedIcon from "@mui/icons-material/MuseumOutlined";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import SportsBarOutlinedIcon from "@mui/icons-material/SportsBarOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { NearbyPlacesContext } from "../services/NearByPlacesQuery";
import { EventsContext } from "../services/EventsQuery";
import Tooltip from "@mui/material/Tooltip";
import { IconButton, Typography, Box } from "@mui/material/";

export default function Filter({
    handleFilterIndexNum,
    handleSetFilteredArray,
}) {
    // ----------------------------------------------------------------------------------------
    // Load Google Places and Ticketmaster data

    const {
        parkData,
        cafeData,
        attractionData,
        museumData,
        restaurantData,
        galleryData,
        barData,
    } = React.useContext(NearbyPlacesContext);

    const { eventData } = React.useContext(EventsContext);

    // By default, the app will load Parks data
    React.useEffect(() => {
        if (parkData) {
            handleSetFilteredArray(parkData.nearbyPlaces);
        }
    }, [parkData]);

    // ----------------------------------------------------------------------------------------
    // Filter management

    const [clickedFilterButton, setClickedFilterButton] = React.useState(0);

    const handleFilterClick = (buttonIndex) => {
        setClickedFilterButton(buttonIndex);

        if (buttonIndex === 0 && parkData) {
            handleSetFilteredArray(parkData.nearbyPlaces);
            handleFilterIndexNum(0);
        }

        if (buttonIndex === 1 && cafeData) {
            handleSetFilteredArray(cafeData.nearbyPlaces);
            handleFilterIndexNum(1);
        }

        if (buttonIndex === 2 && attractionData) {
            handleSetFilteredArray(attractionData.nearbyPlaces);
            handleFilterIndexNum(2);
        }

        if (buttonIndex === 3 && museumData) {
            handleSetFilteredArray(museumData.nearbyPlaces);
            handleFilterIndexNum(3);
        }

        if (buttonIndex === 4 && restaurantData) {
            handleSetFilteredArray(restaurantData.nearbyPlaces);
            handleFilterIndexNum(4);
        }

        if (buttonIndex === 5 && galleryData) {
            handleSetFilteredArray(galleryData.nearbyPlaces);
            handleFilterIndexNum(5);
        }

        if (buttonIndex === 6 && barData) {
            handleSetFilteredArray(barData.nearbyPlaces);
            handleFilterIndexNum(6);
        }
        if (buttonIndex === 7 && eventData) {
            handleSetFilteredArray(eventData.nearbyEvents);
            handleFilterIndexNum(7);
        }
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                {/* ---------------------------------------------------------------------------------------------------- */}

                <Tooltip title="Filter on Parks">
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginRight: "2em",
                        }}
                    >
                        <IconButton
                            onClick={() => handleFilterClick(0)}
                            style={{
                                color: "#ff5722",
                                borderColor:
                                    clickedFilterButton === 0
                                        ? "#ff5722"
                                        : "transparent",
                                borderWidth: "3px",
                                borderStyle: "solid",
                            }}
                            variant="outlined"
                            color="primary"
                            data-testid="Park"
                        >
                            <ForestOutlinedIcon />
                        </IconButton>
                        <Typography variant="caption">Parks</Typography>
                    </Box>
                </Tooltip>

                <Tooltip title="Filter on Cafes">
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginRight: "2em",
                        }}
                    >
                        <IconButton
                            onClick={() => handleFilterClick(1)}
                            style={{
                                color: "#ff5722",
                                borderColor:
                                    clickedFilterButton === 1
                                        ? "#ff5722"
                                        : "transparent",
                                borderWidth: "3px",
                                borderStyle: "solid",
                            }}
                            variant="outlined"
                            color="primary"
                            data-testid="Cafe"
                        >
                            <LocalCafeOutlinedIcon />
                        </IconButton>
                        <Typography variant="caption">Cafes</Typography>
                    </Box>
                </Tooltip>

                <Tooltip title="Filter on Attractions">
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginRight: "2em",
                        }}
                    >
                        <IconButton
                            onClick={() => handleFilterClick(2)}
                            style={{
                                color: "#ff5722",
                                borderColor:
                                    clickedFilterButton === 2
                                        ? "#ff5722"
                                        : "transparent",
                                borderWidth: "3px",
                                borderStyle: "solid",
                            }}
                            variant="outlined"
                            color="primary"
                            data-testid="Attraction"
                        >
                            <StarBorderIcon />
                        </IconButton>
                        <Typography variant="caption">Attractions</Typography>
                    </Box>
                </Tooltip>

                <Tooltip title="Filter on Museums">
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginRight: "2em",
                        }}
                    >
                        <IconButton
                            onClick={() => handleFilterClick(3)}
                            style={{
                                color: "#ff5722",
                                borderColor:
                                    clickedFilterButton === 3
                                        ? "#ff5722"
                                        : "transparent",
                                borderWidth: "3px",
                                borderStyle: "solid",
                            }}
                            variant="outlined"
                            color="primary"
                            data-testid="Museum"
                        >
                            <MuseumOutlinedIcon />
                        </IconButton>
                        <Typography variant="caption">Museums</Typography>
                    </Box>
                </Tooltip>

                <Tooltip title="Filter on Restaurants">
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginRight: "2em",
                        }}
                    >
                        <IconButton
                            onClick={() => handleFilterClick(4)}
                            style={{
                                color: "#ff5722",
                                borderColor:
                                    clickedFilterButton === 4
                                        ? "#ff5722"
                                        : "transparent",
                                borderWidth: "3px",
                                borderStyle: "solid",
                            }}
                            variant="outlined"
                            color="primary"
                            data-testid="Restaurant"
                        >
                            <LunchDiningOutlinedIcon />
                        </IconButton>
                        <Typography variant="caption">Restaurants</Typography>
                    </Box>
                </Tooltip>

                <Tooltip title="Filter on Galleries">
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            onClick={() => handleFilterClick(5)}
                            style={{
                                color: "#ff5722",
                                marginRight: "2em",
                                borderColor:
                                    clickedFilterButton === 5
                                        ? "#ff5722"
                                        : "transparent",
                                borderWidth: "3px",
                                borderStyle: "solid",
                            }}
                            variant="outlined"
                            color="primary"
                            data-testid="Gallery"
                        >
                            <PaletteOutlinedIcon />
                        </IconButton>
                        <Typography
                            variant="caption"
                            sx={{ marginTop: "-2px", marginLeft: "-40px" }}
                        >
                            Galleries
                        </Typography>
                    </Box>
                </Tooltip>

                <Tooltip title="Filter on Bars">
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginRight: "2em",
                        }}
                    >
                        <IconButton
                            onClick={() => handleFilterClick(6)}
                            style={{
                                color: "#ff5722",
                                borderColor:
                                    clickedFilterButton === 6
                                        ? "#ff5722"
                                        : "transparent",
                                borderWidth: "3px",
                                borderStyle: "solid",
                            }}
                            variant="outlined"
                            color="primary"
                            data-testid="Bar"
                        >
                            <SportsBarOutlinedIcon />
                        </IconButton>
                        <Typography variant="caption">Bars</Typography>
                    </Box>
                </Tooltip>

                {/* ---------------------------------------------------------------------------------------------------- */}

                <Tooltip title="Filter on Events">
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginRight: "2em",
                        }}
                    >
                        <IconButton
                            onClick={() => handleFilterClick(7)}
                            style={{
                                color: "#ff5722",
                                borderColor:
                                    clickedFilterButton === 7
                                        ? "#ff5722"
                                        : "transparent",
                                borderWidth: "3px",
                                borderStyle: "solid",
                            }}
                            variant="outlined"
                            color="primary"
                            data-testid="Event"
                        >
                            <CalendarMonthOutlinedIcon />
                        </IconButton>
                        <Typography variant="caption">Events</Typography>
                    </Box>
                </Tooltip>

                {/* ---------------------------------------------------------------------------------------------------- */}
            </div>
        </>
    );
}
