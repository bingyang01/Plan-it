import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Plan from "./pages/Plan";
import { NearByPlacesAPI } from "./services/NearByPlacesQuery";
import { EventsAPI } from "./services/EventsQuery";
import { BusynessAPI } from "./services/BusynessQuery";

export default function App() {
    // ----------------------------------------------------------------------------------------

    const [destination, setDestination] = React.useState("Manhattan");

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };

    const [startDateArray, setStartDateArray] = React.useState([]);

    // startDateArray:
    // Array of objects where each object has an id, date, and value.
    // 0 : [ {id: '0', date: 'Sun, 14 Jul 2024', value: '2024-07-14'}
    // 1 : {id: '1', date: 'Mon, 15 Jul 2024', value: '2024-07-15'}
    // 2 : {id: '2', date: 'Tue, 16 Jul 2024', value: '2024-07-16'} ]

    const handleSetStartDateArray = (dateArrayElement) => {
        setStartDateArray(dateArrayElement);
    };

    // The useEffect below will render each time the app is booted up:

    React.useEffect(() => {
        const dayOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const monthOfYear = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const dateArray = [];
        const dateStart = new Date();

        for (let i = 0; i <= 2; i++) {
            const tempDate = new Date();
            tempDate.setDate(dateStart.getDate() + i);
            const dayIndex = tempDate.getDay();
            const dayName = dayOfWeek[dayIndex];

            const day = tempDate.getDate();
            const month = tempDate.getMonth();
            const year = tempDate.getFullYear();

            dateArray.push({
                id: `${i}`,
                date: `${dayName}, ${day} ${monthOfYear[month]} ${year}`,
                value: `${year}-${
                    month + 1 < 10 ? `0${month + 1}` : month + 1
                }-${day < 10 ? `0${day}` : day}`,
            });
        }
        handleSetStartDateArray(dateArray);
    }, []);

    // Test correct output of date array:

    React.useEffect(() => {
        if (startDateArray.length > 0) {
            console.log("Date Array: ", startDateArray);
        }
    }, [startDateArray]);

    // ----------------------------------------------------------------------------------------

    const [heatmapLoaded, setHeatmapLoaded] = React.useState(false);

    const handleSetHeatmapLoaded = () => {
        setHeatmapLoaded(true);
    };

    // ----------------------------------------------------------------------------------------

    //  Start date can be either 0, 1, or 2.
    //      0: Today
    //      1: Tomorrow
    //      2: The day after tomorrow

    //  By default, the start date is set to 1 (i.e., tomorrow).

    const [startDate, setStartDate] = React.useState(1);

    const handleSetStartDate = (newDate) => {
        setStartDate(newDate);
        setHeatmapLoaded(false);
    };

    React.useEffect(() => {
        console.log("Date: ", startDate);
    }, [startDate]);

    // ----------------------------------------------------------------------------------------

    // When the application is booted up, the app should retrieve the itinerary stored in local storage
    // It is important to note that the "date" stored is a relative number (0, 1, or 2).
    // Put differently, if I select "Today" (0) on 14 July 2024, and then I open the itinerary tomorrow,
    // then local storage will retrieve the 0 and associated that with 15 July 2024.

    React.useEffect(() => {
        const data = window.localStorage.getItem("WIP_DATE");
        if (data !== null) setStartDate(JSON.parse(data));
    }, []);

    // ----------------------------------------------------------------------------------------
    // Set local storage

    React.useEffect(() => {
        window.localStorage.setItem("WIP_DATE", JSON.stringify(startDate));
    }, [startDate]);

    // ----------------------------------------------------------------------------------------

    return (
        <>
            {startDateArray.length > 0 && (
                <div>
                    <NearByPlacesAPI
                        location={"40.758678, -73.978798"}
                        radius={5000}
                    >
                        <EventsAPI>
                            <BusynessAPI
                                input_date={startDateArray[startDate].value}
                            >
                                <BrowserRouter>
                                    <Routes>
                                        <Route
                                            index
                                            element={
                                                <Home
                                                    handleSetStartDate={
                                                        handleSetStartDate
                                                    }
                                                    startDate={startDate}
                                                    startDateArray={
                                                        startDateArray
                                                    }
                                                    destination={destination}
                                                    handleDestinationChange={
                                                        handleDestinationChange
                                                    }
                                                />
                                            }
                                        />
                                        <Route
                                            path="/home"
                                            element={
                                                <Home
                                                    handleSetStartDate={
                                                        handleSetStartDate
                                                    }
                                                    startDate={startDate}
                                                    startDateArray={
                                                        startDateArray
                                                    }
                                                    destination={destination}
                                                    handleDestinationChange={
                                                        handleDestinationChange
                                                    }
                                                />
                                            }
                                        />
                                        <Route
                                            path="/aboutus"
                                            element={<AboutUs />}
                                        />
                                        <Route
                                            path="/plan"
                                            element={
                                                <Plan
                                                    handleSetStartDate={
                                                        handleSetStartDate
                                                    }
                                                    startDate={startDate}
                                                    startDateArray={
                                                        startDateArray
                                                    }
                                                    destination={destination}
                                                    heatmapLoaded={
                                                        heatmapLoaded
                                                    }
                                                    handleSetHeatmapLoaded={
                                                        handleSetHeatmapLoaded
                                                    }
                                                />
                                            }
                                        />
                                    </Routes>
                                </BrowserRouter>
                            </BusynessAPI>
                        </EventsAPI>
                    </NearByPlacesAPI>
                </div>
            )}
        </>
    );
}
