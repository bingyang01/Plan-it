import React from "react";
import LeftPanel from "../components/LeftPanel";
import TopPanel from "../components/TopPanel";
import MapContainer from "../components/MapContainer";
import RightPanel from "../components/RightPanel";
import KeyFeatures from "../components/KeyFeatures";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function Plan({
    handleSetStartDate,
    startDate,
    startDateArray,
    destination,
    heatmapLoaded,
    handleSetHeatmapLoaded,
}) {
    // ----------------------------------------------------------------------------------------
    // The itinerary array

    const [itinerary, setItinerary] = React.useState([]);

    const handleSetItinerary = () => {
        setItinerary({
            location: destination,
            startdate: startDate,
            itin: itineraryEvents,
        });
    };

    // The array has two components:
    // (1) startdate: This element stores the date of the trip (0, 1, or 2);
    //      0: Today
    //      1: Tomorrow
    //      2: The day after tomorrow

    // (2) itin: This is an array, where each element in the array is an object that has the following
    // two properties: time and place.
    //      "time" is a value from 1 to 24 (a represents when the user plans to go to that place); and
    //      "place" is the actualy point of interest object that the user plans to go to.
    //      "transport" is the transport associated with the start location.

    // ----------------------------------------------------------------------------------------
    // The itinerary events

    const [itineraryEvents, setItineraryEvents] = React.useState([]);

    const handleSetItineraryEvents = (itineraryArray) => {
        setItineraryEvents(itineraryArray);
    };

    const [itineraryEventIndex, setItineraryEventIndex] = React.useState(null);

    const handleSetItineraryEventIndex = (i) => {
        setItineraryEventIndex(i);
    };

    // -------------------------------------------------------------------------------------------------------
    // Management of local storage
    React.useEffect(() => {
        const data = window.localStorage.getItem("WIP_ITINERARY");
        if (data !== null) handleSetItineraryEvents(JSON.parse(data));
    }, []);

    React.useEffect(() => {
        window.localStorage.setItem(
            "WIP_ITINERARY",
            JSON.stringify(itineraryEvents)
        );
    }, [itineraryEvents]);

    // ----------------------------------------------------------------------------------------
    // Management of filtered Points of Interest array (e.g., "restaurants, cafes, parks")

    const [filteredArray, setFilteredArray] = React.useState([]);

    const handleSetFilteredArray = (selectedFilteredData) => {
        setFilteredArray(selectedFilteredData);
    };

    const [filterIndexNum, setFilterIndexNum] = React.useState(0);

    const handleFilterIndexNum = (filteredIndex) => {
        setFilterIndexNum(filteredIndex);
    };

    // ----------------------------------------------------------------------------------------

    const [routeArray, setRouteArray] = React.useState([]);
    const [routeState, setRouteState] = React.useState(false);

    let newRouteArray = [];

    React.useEffect(() => {
        if (itinerary.itin && itinerary.itin.length > 0) {
            for (let i = 0; i < itinerary.itin.length - 1; i++) {
                newRouteArray.push([
                    {
                        lat: itinerary.itin[i].place.location.lat,
                        lng: itinerary.itin[i].place.location.lng,
                    },
                    {
                        lat: itinerary.itin[i + 1].place.location.lat,
                        lng: itinerary.itin[i + 1].place.location.lng,
                    },
                    itinerary.itin[i].transport,
                ]);
            }
            setRouteArray(newRouteArray);
            setRouteState(true);
        } else {
            setRouteArray([]);
            setRouteState(false);
        }
    }, [itinerary]);

    // ----------------------------------------------------------------------------------------
    // Reset management

    const [reset, setReset] = React.useState(false);

    const handleReset = () => {
        handleSetItineraryEvents([]);
        setItinerary([]);
        setReset(true);
    };

    // ----------------------------------------------------------------------------------------
    // Slider

    const [selectedTime, setSelectedTime] = React.useState(12);

    const handleSelectedTime = (event, value) => {
        setSelectedTime(value);
    };

    // ----------------------------------------------------------------------------------------
    // Left and right pannel button logic

    const [clickedLeftPanelButton, setClickedLeftPanelButton] =
        React.useState(true);

    const handleLeftPanelClick = () => {
        setClickedLeftPanelButton(!clickedLeftPanelButton);
    };

    const [clickedRightPanelButton, setClickedRightPanelButton] =
        React.useState(true);

    const handleRightPanelClick = () => {
        setClickedRightPanelButton(!clickedRightPanelButton);
    };

    // ----------------------------------------------------------------------------------------
    // Pin and heatmap button logic

    const [clickedPinButton, setClickedPinButton] = React.useState(true);

    const handlePinClick = () => {
        setClickedPinButton(!clickedPinButton);
    };

    const [clickedHeatMapButton, setClickedHeatMapButton] =
        React.useState(true);

    const handleHeatMapClick = (e) => {
        setClickedHeatMapButton(!clickedHeatMapButton);
    };

    // ----------------------------------------------------------------------------------------

    const [openTutorial, setOpenTutorial] = React.useState(true);

    const handleTutorialClose = () => {
        setOpenTutorial(false);
    };

    // ----------------------------------------------------------------------------------------

    return (
        <>
            {/* Top Panel */}
            <TopPanel
                handleLeftPanelClick={handleLeftPanelClick}
                clickedLeftPanelButton={clickedLeftPanelButton}
                handleRightPanelClick={handleRightPanelClick}
                clickedRightPanelButton={clickedRightPanelButton}
                clickedPinButton={clickedPinButton}
                handlePinClick={handlePinClick}
                handleHeatMapClick={handleHeatMapClick}
                clickedHeatMapButton={clickedHeatMapButton}
                itinerary={itinerary}
                handleFilterIndexNum={handleFilterIndexNum}
                handleSetFilteredArray={handleSetFilteredArray}
                reset={reset}
                startDate={startDate}
                startDateArray={startDateArray}
            />
            <div
                style={{ position: "relative", width: "100%", height: "100vh" }}
            >
                {/* ---------------------------------------------------------------------------------------------------- */}
                {/* Left Panel */}

                {/* Toggle Button */}
                <IconButton
                    onClick={handleLeftPanelClick}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: clickedLeftPanelButton ? "30.01%" : 0,
                        transform: "translateY(-50%) rotate(90deg)",
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        zIndex: 1,
                    }}
                >
                    {clickedLeftPanelButton ? (
                        <ExpandMoreIcon />
                    ) : (
                        <ExpandLessIcon />
                    )}
                </IconButton>

                {clickedLeftPanelButton && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: clickedLeftPanelButton ? 0 : "-30%",
                            width: "30%",
                            transition: "left 0.3s ease-in-out",
                            zIndex: 1,
                            height: "85vh",
                        }}
                    >
                        <LeftPanel
                            filteredArray={filteredArray}
                            handleSetItineraryEvents={handleSetItineraryEvents}
                            selectedTime={selectedTime}
                            handleSetStartDate={handleSetStartDate}
                            startDate={startDate}
                            handleSelectedTime={handleSelectedTime}
                            startDateArray={startDateArray}
                            filterIndexNum={filterIndexNum}
                        />
                    </div>
                )}

                {/* ---------------------------------------------------------------------------------------------------- */}

                {/* Main Content */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 0,
                    }}
                >
                    <MapContainer
                        filteredArray={filteredArray}
                        handleSetItineraryEvents={handleSetItineraryEvents}
                        clickedPinButton={clickedPinButton}
                        clickedHeatMapButton={clickedHeatMapButton}
                        filterIndexNum={filterIndexNum}
                        startDateArray={startDateArray}
                        startDate={startDate}
                        selectedTime={selectedTime}
                        routeArray={routeArray}
                        routeState={routeState}
                        itinerary={itinerary}
                        heatmapLoaded={heatmapLoaded}
                        handleSetHeatmapLoaded={handleSetHeatmapLoaded}
                    />
                </div>

                {/* ---------------------------------------------------------------------------------------------------- */}

                {/* Right Panel */}

                {/* Toggle Button */}
                <IconButton
                    onClick={handleRightPanelClick}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: clickedRightPanelButton ? "20.01%" : 0,
                        transform: "translateY(-50%) rotate(90deg)",
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        zIndex: 1,
                    }}
                >
                    {clickedRightPanelButton ? (
                        <ExpandLessIcon />
                    ) : (
                        <ExpandMoreIcon />
                    )}
                </IconButton>

                {clickedRightPanelButton && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: clickedRightPanelButton ? 0 : "-20%",
                            width: "20%",
                            transition: "right 0.3s ease-in-out",
                            zIndex: 1,
                            height: "85vh",
                        }}
                    >
                        <RightPanel
                            handleSetItinerary={handleSetItinerary}
                            handleReset={handleReset}
                            itineraryEvents={itineraryEvents}
                            handleSetItineraryEvents={handleSetItineraryEvents}
                        />
                    </div>
                )}
            </div>
            <KeyFeatures
                openTutorial={openTutorial}
                handleTutorialClose={handleTutorialClose}
            />
        </>
    );
}
