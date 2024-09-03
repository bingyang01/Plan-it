import React from "react";
import Card from "../components/Card";
import Date from "./Date";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SearchIcon from "@mui/icons-material/Search";

export default function LeftPanel({
    filteredArray,
    handleSetItineraryEvents,
    selectedTime,
    handleSetStartDate,
    startDate,
    handleSelectedTime,
    startDateArray,
    filterIndexNum,
}) {
    const [showSlider, setShowSlider] = React.useState(true);
    const [showDetails, setShowDetails] = React.useState(true);

    const toggleSlider = () => {
        setShowSlider(!showSlider);
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    // ----------------------------------------------------------------------------------------

    const mark = [
        { value: 6, label: "6:00" },
        { value: 12, label: "12:00" },
        { value: 20, label: "20:00" },
    ];

    // ----------------------------------------------------------------------------------------

    return (
        <div>
            <Box
                sx={{
                    height: "85vh",
                    backgroundColor: "#f5f5f5",
                    padding: "20px",
                    boxShadow: 3,
                    borderRadius: "8px",
                    marginTop: "5em",
                }}
            >
                {/* ---------------------------------------------------------------------------------------------------- */}

                <Paper
                    elevation={3}
                    sx={{
                        padding: "20px",
                    }}
                >
                    {showSlider && (
                        <Box
                            sx={{
                                display: "flex",
                                padding: "10px",
                            }}
                        >
                            <FormControl
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <Date
                                    handleSetStartDate={handleSetStartDate}
                                    startDate={startDate}
                                    startDateArray={startDateArray}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            height: "35px",
                                        },
                                        "& .MuiSelect-select": {
                                            padding: "10px",
                                        },
                                    }}
                                />
                            </FormControl>
                            <Slider
                                defaultValue={8}
                                min={0}
                                max={23}
                                step={1}
                                marks={mark}
                                onChange={handleSelectedTime}
                                value={selectedTime}
                                valueLabelDisplay="auto"
                                sx={{
                                    width: "100%",
                                    margin: "0 auto",
                                    "& .MuiSlider-thumb": {
                                        width: "20px",
                                        height: "20px",
                                    },
                                    "& .MuiSlider-track": {
                                        height: "4px",
                                    },
                                    "& .MuiSlider-rail": {
                                        height: "4px",
                                    },
                                    marginLeft: "2em",
                                }}
                            />
                        </Box>
                    )}
                </Paper>
                {/* ---------------------------------------------------------------------------------------------------- */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        marginTop: "1em",
                    }}
                >
                    <SearchIcon />
                    <Typography variant="body2" sx={{ marginLeft: "10px" }}>
                        Browse
                    </Typography>
                </Box>

                {/* ---------------------------------------------------------------------------------------------------- */}

                {showDetails && (
                    <div
                        style={{
                            height: "calc(100% - 165px)",
                            overflowY: "auto",
                            padding: "10px",
                            scrollbarWidth: "thin",
                        }}
                    >
                        {filteredArray && filteredArray.length > 0 ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "1em",
                                }}
                            >
                                {filteredArray.map((item) => (
                                    <Box
                                        key={item.place_id}
                                        sx={{
                                            width: "45%",
                                        }}
                                    >
                                        <Card
                                            item={item}
                                            handleSetItineraryEvents={
                                                handleSetItineraryEvents
                                            }
                                            filterIndexNum={filterIndexNum}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        )}
                    </div>
                )}
            </Box>
        </div>
    );
}
