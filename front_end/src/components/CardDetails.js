import React from "react";
import {
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { DetailsArrayContext } from "../services/DetailsQuery";
import { EventDetailsArrayContext } from "../services/EventDetailsQuery";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function CardDetails({
    item,
    handleSetItineraryEvents,
    showPopup,
    setShowPopup,
    filterIndexNum,
}) {
    const [selectedTime, setSelectedTime] = React.useState(12);

    const [selectedPlace, setSelectedPlace] = React.useState(null);

    const detailsContext = React.useContext(DetailsArrayContext);
    const eventDetailsContext = React.useContext(EventDetailsArrayContext);

    const placeDetails =
        filterIndexNum !== 7
            ? detailsContext.placeDetails
            : eventDetailsContext.eventDetails;

    // -------------------------------------------------------------------------------------------

    const [keyNo, setKeyNo] = React.useState(0);

    const handleMarkerClickAdd = () => {
        const newEvent = {
            time: selectedTime,
            place: item,
            transport: "WALKING",
        };
        handleSetItineraryEvents((prevEvents) => [...prevEvents, newEvent]);
        setShowPopup(false);
        setKeyNo((prevKeyNo) => prevKeyNo + 1);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleMarkerClose = () => {
        setShowPopup(false);
    };

    // -------------------------------------------------------------------------------------------

    React.useEffect(() => {
        setSelectedPlace(placeDetails);
    }, [placeDetails]);

    // -------------------------------------------------------------------------------------------

    return (
        <Dialog
            open={showPopup}
            onClose={handleMarkerClose}
            sx={{ "& .MuiDialog-paper": { width: "600px", height: "750px" } }}
        >
            <img
                src={
                    item.photos[0]
                        ? item.photos[0].url
                        : "/images/imageNotFound.jpg"
                }
                alt={item.name}
                className="card--details--image"
            />

            <DialogTitle>{item.name}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex" }}>
                    <Box>
                        <Typography component="h3" variant="body2">
                            {item.formattedAddress}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "black",
                            marginLeft: "auto",
                        }}
                    >
                        <Rating
                            name="read-only"
                            value={item.rating}
                            precision={0.25}
                            readOnly
                            size="small"
                        ></Rating>
                        <Typography
                            component="h3"
                            variant="subtitle2"
                            marginLeft={3}
                        >
                            {item.userRatingCount === ""
                                ? "(No review available)"
                                : `(${item.userRatingCount} reviews)`}
                        </Typography>
                    </Box>
                </Box>

                <br></br>
                {selectedPlace && (
                    <>
                        {/* ------------------------------------------------------------------------------------------- */}

                        <Typography component="h5" variant="body2">
                            <b>Website:</b>&nbsp;
                            <a
                                href={selectedPlace.website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit Here
                            </a>
                        </Typography>
                        <br></br>

                        {/* ------------------------------------------------------------------------------------------- */}

                        {selectedPlace.internationalPhoneNumber !== " " ? (
                            <>
                                <Typography component="h5" variant="body2">
                                    <b>Telephone:</b>{" "}
                                    {selectedPlace.internationalPhoneNumber}
                                </Typography>
                                <br></br>
                            </>
                        ) : (
                            <>
                                <Typography component="h5" variant="body2">
                                    <b>Telephone: </b> Number not provided
                                    (please see event website)
                                </Typography>
                                <br></br>
                            </>
                        )}

                        {/* ------------------------------------------------------------------------------------------- */}

                        <Typography component="h5" variant="body2">
                            <b>Opening Hours:</b>
                            <div style={{ marginLeft: "3em" }}>
                                <Typography component="h5" variant="body2">
                                    {filterIndexNum !== 7 ? (
                                        <ul>
                                            {selectedPlace.openingHours.weekdayDescriptions.map(
                                                (timeOpen, index) => (
                                                    <li key={index}>
                                                        {timeOpen}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        selectedPlace.openingHours
                                    )}
                                </Typography>
                            </div>
                        </Typography>
                        <br></br>

                        {/* ------------------------------------------------------------------------------------------- */}

                        {filterIndexNum !== 7 && (
                            <>
                                <Typography component="h5" variant="body2">
                                    <b>Tags:</b>{" "}
                                    {selectedPlace.types.join(", ")}
                                </Typography>
                                <br></br>
                            </>
                        )}
                        {/* ------------------------------------------------------------------------------------------- */}
                    </>
                )}
                <DialogActions>
                    <div className="card--details--dialogbox">
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="time-select-label">
                                Select Time
                            </InputLabel>
                            <Select
                                labelId="time-select-label"
                                value={selectedTime}
                                onChange={handleTimeChange}
                                label="Select Time"
                            >
                                <MenuItem value={1}>1:00-2:00</MenuItem>
                                <MenuItem value={2}>2:00-3:00</MenuItem>
                                <MenuItem value={3}>3:00-4:00</MenuItem>
                                <MenuItem value={4}>4:00-5:00</MenuItem>
                                <MenuItem value={5}>5:00-6:00</MenuItem>
                                <MenuItem value={6}>6:00-7:00</MenuItem>
                                <MenuItem value={7}>7:00-8:00</MenuItem>
                                <MenuItem value={8}>8:00-9:00</MenuItem>
                                <MenuItem value={9}>9:00-10:00</MenuItem>
                                <MenuItem value={10}>10:00-11:00</MenuItem>
                                <MenuItem value={11}>11:00-12:00</MenuItem>
                                <MenuItem value={12}>12:00-13:00</MenuItem>
                                <MenuItem value={13}>13:00-14:00</MenuItem>
                                <MenuItem value={14}>14:00-15:00</MenuItem>
                                <MenuItem value={15}>15:00-16:00</MenuItem>
                                <MenuItem value={16}>16:00-17:00</MenuItem>
                                <MenuItem value={17}>17:00-18:00</MenuItem>
                                <MenuItem value={18}>18:00-19:00</MenuItem>
                                <MenuItem value={19}>19:00-20:00</MenuItem>
                                <MenuItem value={20}>20:00-21:00</MenuItem>
                                <MenuItem value={21}>21:00-22:00</MenuItem>
                                <MenuItem value={22}>22:00-23:00</MenuItem>
                                <MenuItem value={23}>23:00-00:00</MenuItem>
                            </Select>
                        </FormControl>

                        <IconButton
                            variant="contained"
                            onClick={handleMarkerClickAdd}
                            color="primary"
                        >
                            <CheckCircleOutlineIcon />
                        </IconButton>
                    </div>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
