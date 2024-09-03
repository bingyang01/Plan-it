import React from "react";
import CardDetails from "./CardDetails";
import { DetailsAPI } from "../services/DetailsQuery";
import { EventDetailsAPI } from "../services/EventDetailsQuery";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function Card({
    item,
    handleSetItineraryEvents,
    filterIndexNum,
}) {
    const [showPopup, setShowPopup] = React.useState(false);
    const [selectedEvent, setSelectedEvent] = React.useState(null);

    const handleMarkerClickOpen = (marker) => {
        setSelectedEvent(marker);
        setShowPopup(true);
    };

    // -------------------------------------------------------------------------------------------

    return (
        <Paper
            elevation={3}
            sx={{
                marginBottom: "1em",
                height: "280px",
                width: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "box-shadow 0.3s",
                "&:hover": {
                    boxShadow: 6,
                },
            }}
        >
            <div
                onClick={() => handleMarkerClickOpen(item)}
                style={{
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <img
                    src={
                        item.photos[0]
                            ? item.photos[0].url
                            : "/images/imageNotFound.jpg"
                    }
                    alt={item.name}
                    style={{
                        width: "100%",
                        height: "8em",
                        objectFit: "cover",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                        borderRadius: "inherit",
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "1em",
                        marginBottom: "1em",
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

                <Box paddingX={1}>
                    <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                        {item.name}
                    </Typography>

                    <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        {item.formattedAddress}
                    </Typography>
                </Box>
            </div>

            {selectedEvent && filterIndexNum !== 7 && (
                <DetailsAPI placeId={selectedEvent.place_id}>
                    <CardDetails
                        item={selectedEvent}
                        handleSetItineraryEvents={handleSetItineraryEvents}
                        showPopup={showPopup}
                        setShowPopup={setShowPopup}
                        filterIndexNum={filterIndexNum}
                    />
                </DetailsAPI>
            )}

            {selectedEvent && filterIndexNum === 7 && (
                <EventDetailsAPI eventID={selectedEvent.place_id}>
                    <CardDetails
                        item={selectedEvent}
                        handleSetItineraryEvents={handleSetItineraryEvents}
                        showPopup={showPopup}
                        setShowPopup={setShowPopup}
                        filterIndexNum={filterIndexNum}
                    />
                </EventDetailsAPI>
            )}
        </Paper>
    );
}
