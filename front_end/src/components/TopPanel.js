import React from "react";
import AIDialogContainer from "./AIDialogContainer";
import Filter from "./Filter";
import Download from "./Download";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material/";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TrafficOutlinedIcon from "@mui/icons-material/TrafficOutlined";
import Tooltip from "@mui/material/Tooltip";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { keyframes } from "@mui/system";

import theme from "../theme.js";

export default function TopPanel({
    handleRightPanelClick,
    clickedRightPanelButton,
    clickedPinButton,
    handlePinClick,
    handleHeatMapClick,
    clickedHeatMapButton,
    itinerary,
    handleFilterIndexNum,
    handleSetFilteredArray,
    reset,
    startDate,
    startDateArray,
}) {
    // ----------------------------------------------------------------------------------------
    // AI icon management

    const [showAIButton, setShowAIButton] = React.useState(false);

    React.useEffect(() => {
        if (itinerary.itin && itinerary.itin.length > 0) {
            setShowAIButton(true);
        }
    }, [itinerary]);

    const [clickedAIButton, setClickedAIButton] = React.useState(false);

    const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

    // ----------------------------------------------------------------------------------------

    return (
        <AppBar
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                boxShadow: "none",
                backdropFilter: "blur(5px)",
                height: "4.5em",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Toolbar
                sx={{
                    minHeight: "64px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "1em",
                        marginBottom: "1em",
                        width: "300px",
                    }}
                >
                    <MapOutlinedIcon
                        sx={{
                            marginRight: "0.2em",
                            fontSize: "2.5rem",
                            color: "primary.main",
                        }}
                    />
                    <Typography variant="h4" color="primary.main">
                        Plan-it
                    </Typography>
                </Box>

                <Filter
                    handleFilterIndexNum={handleFilterIndexNum}
                    handleSetFilteredArray={handleSetFilteredArray}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {/* ---------------------------------------------------------------------------------------------------- */}
                    {/* AI and Download functionality */}

                    {showAIButton && itinerary.itin && (
                        <>
                            <Tooltip title="Get additional recommendations from our AI chatbot">
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        marginRight: "2em",
                                    }}
                                >
                                    <IconButton
                                        onClick={() => setClickedAIButton(true)}
                                        style={{
                                            color: "#ff5722",
                                            backgroundColor: "#fff3e0",
                                            borderColor: clickedAIButton
                                                ? "#ff5722"
                                                : "transparent",
                                            borderWidth: "3px",
                                            borderStyle: "solid",
                                            animation: `${pulse} 2s infinite`,
                                        }}
                                        variant="outlined"
                                    >
                                        <SmartToyIcon />
                                    </IconButton>
                                    <Typography variant="caption">
                                        Chat
                                    </Typography>
                                </Box>
                            </Tooltip>

                            <Download
                                itinerary={itinerary}
                                startDate={startDate}
                                startDateArray={startDateArray}
                            />
                        </>
                    )}

                    {/* AI Dialog */}

                    {clickedAIButton && (
                        <AIDialogContainer
                            clickedAIButton={clickedAIButton}
                            setClickedAIButton={setClickedAIButton}
                            itinerary={itinerary}
                            reset={reset}
                        />
                    )}

                    {/* ---------------------------------------------------------------------------------------------------- */}

                    <Tooltip title="Show pins on map">
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginRight: "2em",
                            }}
                        >
                            <IconButton
                                onClick={handlePinClick}
                                style={{
                                    color: "#ff5722",
                                    borderColor: clickedPinButton
                                        ? "#ff5722"
                                        : "transparent",
                                    borderWidth: "3px",
                                    borderStyle: "solid",
                                }}
                                variant="outlined"
                            >
                                <LocationOnOutlinedIcon />
                            </IconButton>
                            <Typography variant="caption">Pins</Typography>
                        </Box>
                    </Tooltip>

                    {/* ---------------------------------------------------------------------------------------------------- */}

                    <Tooltip title="Show busyness">
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginRight: "2em",
                            }}
                        >
                            <IconButton
                                onClick={handleHeatMapClick}
                                style={{
                                    color: "#ff5722",
                                    borderColor: clickedHeatMapButton
                                        ? "#ff5722"
                                        : "transparent",
                                    borderWidth: "3px",
                                    borderStyle: "solid",
                                }}
                                variant="outlined"
                                color="primary"
                            >
                                <TrafficOutlinedIcon />
                            </IconButton>
                            <Typography variant="caption">Busyness</Typography>
                        </Box>
                    </Tooltip>

                    {/* ---------------------------------------------------------------------------------------------------- */}
                </div>
            </Toolbar>
        </AppBar>
    );
}
