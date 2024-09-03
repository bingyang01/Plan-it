import React from "react";
import {
    Typography,
    FormControl,
    Select,
    MenuItem,
    IconButton,
    InputLabel,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DriveEtaOutlinedIcon from "@mui/icons-material/DriveEtaOutlined";
import DirectionsBikeOutlinedIcon from "@mui/icons-material/DirectionsBikeOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import EventNoteIcon from "@mui/icons-material/EventNote";

export default function RightPanel({
    handleSetItinerary,
    handleReset,
    itineraryEvents,
    handleSetItineraryEvents,
}) {
    // -------------------------------------------------------------------------------------------------------
    // Sort itinerary events

    itineraryEvents.sort((a, b) => {
        return a.time - b.time;
    });

    // -------------------------------------------------------------------------------------------------------

    // Action: Click on delete button
    const handleDelete = (item, index) => () => {
        if (itineraryEvents.length === 1) {
            handleReset();
        } else {
            const updatedItinerary = itineraryEvents.filter(
                (item, i) => i !== index
            );
            handleSetItineraryEvents(updatedItinerary);
        }
    };

    // -------------------------------------------------------------------------------------------------------
    // Action: Edit transport

    const handleTransportChange = (event, index) => {
        const updatedItinerary = [...itineraryEvents];
        updatedItinerary[index] = {
            ...updatedItinerary[index],
            transport: event,
        };
        handleSetItineraryEvents(updatedItinerary);
    };

    // -------------------------------------------------------------------------------------------------------
    // Action: Edit time

    const handleTimeChange = (event, index) => {
        const updatedItinerary = [...itineraryEvents];
        updatedItinerary[index] = {
            ...updatedItinerary[index],
            time: Number(event.target.value),
        };
        handleSetItineraryEvents(updatedItinerary);
    };

    React.useEffect(() => {
        console.log("Itinerary Array: ", itineraryEvents);
    }, [itineraryEvents]);

    // -------------------------------------------------------------------------------------------------------
    return (
        <>
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
                {/* ------------------------------------------------------------------------------------------------------- */}

                <div className="container--right--top">
                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        <EventNoteIcon />
                        <Typography
                            variant="body1"
                            sx={{
                                marginLeft: "0.5em",
                            }}
                        >
                            Itinerary
                        </Typography>
                    </Box>

                    <Tooltip title="Visualise and approve itinerary on map">
                        <IconButton
                            variant="outlined"
                            onClick={() => handleSetItinerary()}
                            disabled={itineraryEvents.length === 0}
                            sx={{
                                color: "#c1246b",
                            }}
                            data-testid="approve"
                        >
                            <CheckCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Restart itinerary">
                        <IconButton
                            variant="outlined"
                            onClick={handleReset}
                            disabled={itineraryEvents.length === 0}
                            sx={{
                                color: "#c1246b",
                            }}
                            data-testid="reset"
                        >
                            <RestartAltIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                {/* ------------------------------------------------------------------------------------------------------- */}
                <div
                    style={{
                        height: "calc(100% - 50px)",
                        overflowY: "auto",
                        padding: "10px",
                        scrollbarWidth: "thin",
                    }}
                >
                    {itineraryEvents.map((item, index) => (
                        <div key={index}>
                            {/* ------------------------------------------------------------------------------------------------------- */}

                            <div className="container--right--bottom--item">
                                <Paper
                                    elevation={3}
                                    sx={{
                                        padding: "1.5em",
                                        backgroundColor: "#fafafa",
                                        transition: "box-shadow 0.3s",
                                        "&:hover": {
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    <Box paddingX={1} marginBottom="1em">
                                        <Typography
                                            component="h2"
                                            variant="subtitle1"
                                            sx={{ color: "black" }}
                                        >
                                            <b>Event {index + 1}:</b>
                                        </Typography>
                                        <Typography
                                            component="h2"
                                            variant="subtitle2"
                                            sx={{ color: "black" }}
                                        >
                                            &nbsp;&nbsp;{item.place.name}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Box
                                            paddingX={1}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    marginRight: "1em",
                                                    color: "#000000",
                                                }}
                                            >
                                                <Select
                                                    labelId="time-select-label"
                                                    onChange={(event) =>
                                                        handleTimeChange(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                    value={item.time}
                                                    label="Select New Time"
                                                    sx={{
                                                        width: "100%",
                                                        fontSize: "0.8rem",
                                                    }}
                                                    data-testid={`time-${index}`}
                                                >
                                                    <MenuItem value={1}>
                                                        1:00-2:00
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        2:00-3:00
                                                    </MenuItem>
                                                    <MenuItem value={3}>
                                                        3:00-4:00
                                                    </MenuItem>
                                                    <MenuItem value={4}>
                                                        4:00-5:00
                                                    </MenuItem>
                                                    <MenuItem value={5}>
                                                        5:00-6:00
                                                    </MenuItem>
                                                    <MenuItem value={6}>
                                                        6:00-7:00
                                                    </MenuItem>
                                                    <MenuItem value={7}>
                                                        7:00-8:00
                                                    </MenuItem>
                                                    <MenuItem value={8}>
                                                        8:00-9:00
                                                    </MenuItem>
                                                    <MenuItem value={9}>
                                                        9:00-10:00
                                                    </MenuItem>
                                                    <MenuItem value={10}>
                                                        10:00-11:00
                                                    </MenuItem>
                                                    <MenuItem value={11}>
                                                        11:00-12:00
                                                    </MenuItem>
                                                    <MenuItem value={12}>
                                                        12:00-13:00
                                                    </MenuItem>
                                                    <MenuItem value={13}>
                                                        13:00-14:00
                                                    </MenuItem>
                                                    <MenuItem value={14}>
                                                        14:00-15:00
                                                    </MenuItem>
                                                    <MenuItem value={15}>
                                                        15:00-16:00
                                                    </MenuItem>
                                                    <MenuItem value={16}>
                                                        16:00-17:00
                                                    </MenuItem>
                                                    <MenuItem value={17}>
                                                        17:00-18:00
                                                    </MenuItem>
                                                    <MenuItem value={18}>
                                                        18:00-19:00
                                                    </MenuItem>
                                                    <MenuItem value={19}>
                                                        19:00-20:00
                                                    </MenuItem>
                                                    <MenuItem value={20}>
                                                        20:00-21:00
                                                    </MenuItem>
                                                    <MenuItem value={21}>
                                                        21:00-22:00
                                                    </MenuItem>
                                                    <MenuItem value={22}>
                                                        22:00-23:00
                                                    </MenuItem>
                                                    <MenuItem value={23}>
                                                        23:00-00:00
                                                    </MenuItem>
                                                </Select>
                                            </Box>
                                            <Box sx={{ marginLeft: "auto" }}>
                                                <IconButton
                                                    variant="contained"
                                                    onClick={handleDelete(
                                                        item,
                                                        index
                                                    )}
                                                    color="primary"
                                                    data-testid={`delete-${index}`}
                                                >
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Paper>
                            </div>
                            {/* ------------------------------------------------------------------------------------------------------- */}

                            {index + 1 < itineraryEvents.length && (
                                <div className="container--right--bottom--item">
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            padding: "1em",
                                            transition: "box-shadow 0.3s",
                                            "&:hover": {
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        <div className="container--right--bottom--radio">
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    <FormControlLabel
                                                        value="DRIVING"
                                                        control={<Radio />}
                                                        label={
                                                            <DriveEtaOutlinedIcon
                                                                sx={{
                                                                    mr: "0.1em",
                                                                }}
                                                            />
                                                        }
                                                        onClick={() =>
                                                            handleTransportChange(
                                                                "DRIVING",
                                                                index
                                                            )
                                                        }
                                                        checked={
                                                            item.transport ===
                                                            "DRIVING"
                                                        }
                                                        data-testid="drive"
                                                    />

                                                    <FormControlLabel
                                                        value="BICYCLING"
                                                        control={<Radio />}
                                                        label={
                                                            <DirectionsBikeOutlinedIcon
                                                                sx={{
                                                                    mr: "0.1em",
                                                                }}
                                                            />
                                                        }
                                                        onClick={() =>
                                                            handleTransportChange(
                                                                "BICYCLING",
                                                                index
                                                            )
                                                        }
                                                        checked={
                                                            item.transport ===
                                                            "BICYCLING"
                                                        }
                                                    />

                                                    <FormControlLabel
                                                        value="WALKING"
                                                        control={<Radio />}
                                                        label={
                                                            <DirectionsWalkOutlinedIcon />
                                                        }
                                                        onClick={() =>
                                                            handleTransportChange(
                                                                "WALKING",
                                                                index
                                                            )
                                                        }
                                                        checked={
                                                            item.transport ===
                                                            "WALKING"
                                                        }
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </Paper>
                                </div>
                            )}
                            {/* ------------------------------------------------------------------------------------------------------- */}
                        </div>
                    ))}
                </div>
            </Box>
        </>
    );
}
