import React from "react";
import CardDetails from "./CardDetails";
import PolygonContainer from "./PolygonContainer";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Polygon,
} from "@react-google-maps/api";
import { DetailsAPI } from "../services/DetailsQuery";
import { BusynessContext } from "../services/BusynessQuery";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

import forest from "@material-design-icons/svg/two-tone/forest.svg";
import local_cafe from "@material-design-icons/svg/two-tone/local_cafe.svg";
import star from "@material-design-icons/svg/two-tone/star.svg";
import museum from "@material-design-icons/svg/two-tone/museum.svg";
import lunch_dining from "@material-design-icons/svg/two-tone/lunch_dining.svg";
import palette from "@material-design-icons/svg/two-tone/palette.svg";
import sports_bar from "@material-design-icons/svg/two-tone/sports_bar.svg";
import calendar_month from "@material-design-icons/svg/two-tone/calendar_month.svg";
import CircleIcon from "@mui/icons-material/Circle";

export default function MapContainer({
    filteredArray,
    handleSetItineraryEvents,
    clickedPinButton,
    clickedHeatMapButton,
    filterIndexNum,
    startDateArray,
    startDate,
    selectedTime,
    routeArray,
    routeState,
    itinerary,
    heatmapLoaded,
    handleSetHeatmapLoaded,
    children,
}) {
    const mapContainerStyle = {
        width: "100%",
        height: "100%",
    };

    const colors = [
        "#FF6347",
        "#32CD32",
        "#4682B4",
        "#FFD700",
        "#FF69B4",
        "#00CED1",
    ];

    // ----------------------------------------------------------------------------------------

    const [selectedMarker, setSelectedMarker] = React.useState(null);
    const [showPopup, setShowPopup] = React.useState(false);

    const handleMarkerClick = (event, item) => {
        setSelectedMarker(item);
        setShowPopup(true);
    };

    // ----------------------------------------------------------------------------------------
    // Load heatmap

    const { heatmapData } = React.useContext(BusynessContext);

    React.useEffect(() => {
        if (heatmapData) {
            console.log("Heatmap loaded");
            handleSetHeatmapLoaded(true);
        }
    }, [heatmapData, heatmapLoaded]);

    // ----------------------------------------------------------------------------------------
    // Set the date and time that you would like to query

    const [timeQuery, setTimeQuery] = React.useState("");

    React.useEffect(() => {
        setTimeQuery(
            `${startDateArray[startDate].value} ${
                selectedTime < 10 ? `0${selectedTime}` : selectedTime
            }:00:00`
        );
    }, [startDate, selectedTime, startDateArray]);

    // ----------------------------------------------------------------------------------------
    // Set find query

    const [queryArray, setQueryArray] = React.useState([]);

    React.useEffect(() => {
        if (timeQuery.length > 0 && heatmapLoaded === true) {
            const data = heatmapData.getAllZoneBusyness.find(
                (item) => item.timeKey === timeQuery
            );
            setQueryArray(data ? data.locations : []);
        }
    }, [timeQuery, heatmapLoaded, heatmapData]);

    // ----------------------------------------------------------------------------------------

    const [searchQuery, setSearchQuery] = React.useState(false);

    React.useEffect(() => {
        if (queryArray && queryArray.length > 0) {
            setSearchQuery(true);
        } else {
            setSearchQuery(false);
        }
    }, [queryArray]);

    // ----------------------------------------------------------------------------------------

    React.useEffect(() => {
        if (routeArray.length > 0) {
            calculateRoute();
        }
    }, [routeArray]);

    const [directionsResponses, setDirectionsResponses] = React.useState([]);

    async function calculateRoute() {
        const directionsService = new window.google.maps.DirectionsService();
        const newDirectionsResponses = [];
        for (let i = 0; i <= routeArray.length - 1; i++) {
            const results = await directionsService.route({
                origin: routeArray[i][0],
                destination: routeArray[i][1],
                travelMode: window.google.maps.TravelMode[routeArray[i][2]],
            });
            newDirectionsResponses.push(results);
        }
        setDirectionsResponses(newDirectionsResponses);
    }

    // -----------------------------------------------------------------------

    return (
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{ lat: 40.748, lng: -74.0048 }}
                zoom={14}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    preserveViewport: true,
                    gestureHandling: "auto",
                    scrollwheel: true,
                    zoomControl: true,
                    styles: [
                        {
                            elementType: "geometry",
                            stylers: [{ color: "#f5f5f5" }],
                        },
                        {
                            elementType: "labels.icon",
                            stylers: [{ visibility: "off" }],
                        },
                        {
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#616161" }],
                        },
                        {
                            elementType: "labels.text.stroke",
                            stylers: [{ color: "#f5f5f5" }],
                        },
                        {
                            featureType: "administrative.land_parcel",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#bdbdbd" }],
                        },
                        {
                            featureType: "poi",
                            elementType: "geometry",
                            stylers: [{ color: "#eeeeee" }],
                        },
                        {
                            featureType: "poi",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#757575" }],
                        },
                        {
                            featureType: "poi.park",
                            elementType: "geometry",
                            stylers: [{ color: "#e5e5e5" }],
                        },
                        {
                            featureType: "poi.park",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#9e9e9e" }],
                        },
                        {
                            featureType: "road",
                            elementType: "geometry",
                            stylers: [{ color: "#ffffff" }],
                        },
                        {
                            featureType: "road.arterial",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#757575" }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "geometry",
                            stylers: [{ color: "#dadada" }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#616161" }],
                        },
                        {
                            featureType: "road.local",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#9e9e9e" }],
                        },
                        {
                            featureType: "transit.line",
                            elementType: "geometry",
                            stylers: [{ color: "#e5e5e5" }],
                        },
                        {
                            featureType: "transit.station",
                            elementType: "geometry",
                            stylers: [{ color: "#eeeeee" }],
                        },
                        {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{ color: "#c9c9c9" }],
                        },
                        {
                            featureType: "water",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#9e9e9e" }],
                        },
                    ],
                }}
            >
                <PolygonContainer
                    clickedHeatMapButton={clickedHeatMapButton}
                    searchQuery={searchQuery}
                    startDateArray={startDateArray}
                    startDate={startDate}
                    heatmapData={heatmapData}
                    queryArray={queryArray}
                    heatmapLoaded={heatmapLoaded}
                />

                {clickedPinButton &&
                    filteredArray &&
                    filteredArray.map((item) => (
                        <Marker
                            key={item.place_id}
                            position={{
                                lat: item.location.lat,
                                lng: item.location.lng,
                            }}
                            onClick={(event) => handleMarkerClick(event, item)}
                            icon={
                                filterIndexNum === 0
                                    ? { url: forest }
                                    : filterIndexNum === 1
                                    ? { url: local_cafe }
                                    : filterIndexNum === 2
                                    ? { url: star }
                                    : filterIndexNum === 3
                                    ? { url: museum }
                                    : filterIndexNum === 4
                                    ? { url: lunch_dining }
                                    : filterIndexNum === 5
                                    ? { url: palette }
                                    : filterIndexNum === 6
                                    ? { url: sports_bar }
                                    : filterIndexNum === 7
                                    ? { url: calendar_month }
                                    : undefined
                            }
                        />
                    ))}
                {showPopup && selectedMarker && (
                    <DetailsAPI placeId={selectedMarker.place_id}>
                        <CardDetails
                            item={selectedMarker}
                            handleSetItineraryEvents={handleSetItineraryEvents}
                            setShowPopup={setShowPopup}
                            showPopup={showPopup}
                        />
                    </DetailsAPI>
                )}

                {heatmapLoaded === false && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "60vh",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}

                {clickedHeatMapButton && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: "7.3em",
                            left: "42.5%",
                            zIndex: 1,
                            backgroundColor: "transparent",
                        }}
                    >
                        <Tooltip title="Not Busy">
                            <CircleIcon
                                sx={{
                                    color: "rgba(154, 205, 50, 0.7)",
                                    fontSize: "15px",
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Somewhat Busy">
                            <CircleIcon
                                sx={{
                                    color: "rgba(255, 215, 0, 0.7)",
                                    fontSize: "15px",
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Moderately Busy">
                            <CircleIcon
                                sx={{
                                    color: "rgba(255, 165, 0, 0.7)",
                                    fontSize: "15px",
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Busy">
                            <CircleIcon
                                sx={{
                                    color: "rgba(255, 0, 0, 0.7)",
                                    fontSize: "15px",
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Very Busy">
                            <CircleIcon
                                sx={{
                                    color: "rgba(139, 0, 0, 0.7)",
                                    fontSize: "15px",
                                }}
                            />
                        </Tooltip>
                    </Box>
                )}

                {routeState &&
                    itinerary.itin &&
                    itinerary.itin.map((item, index) => (
                        <Marker
                            key={index}
                            position={{
                                lat: item.place.location.lat,
                                lng: item.place.location.lng,
                            }}
                            label={{
                                text: `${index + 1}`,
                                color: "white",
                                fontSize: "15px",
                                fontWeight: "bold",
                                className: "marker-label",
                            }}
                        />
                    ))}

                {routeState &&
                    directionsResponses &&
                    directionsResponses.map((directionsResponse, index) => (
                        <DirectionsRenderer
                            key={index}
                            directions={directionsResponse}
                            options={{
                                polylineOptions: {
                                    strokeColor: colors[index % colors.length],
                                    strokeOpacity: 0.8,
                                    strokeWeight: 6,
                                },
                                suppressMarkers: true,
                                preserveViewport: true,
                            }}
                        />
                    ))}
                {children}
            </GoogleMap>
        </>
    );
}
