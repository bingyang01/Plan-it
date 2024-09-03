import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RightPanel from "./RightPanel";

describe("RightPanel Component", () => {
    const handleSetItinerary = jest.fn();
    const handleReset = jest.fn();
    const handleSetItineraryEvents = jest.fn();

    const itineraryEvents = [
        { time: 1, place: { name: "Place 1" }, transport: "DRIVING" },
        { time: 2, place: { name: "Place 2" }, transport: "WALKING" },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with given props", () => {
        render(
            <RightPanel
                handleSetItinerary={handleSetItinerary}
                handleReset={handleReset}
                itineraryEvents={itineraryEvents}
                handleSetItineraryEvents={handleSetItineraryEvents}
            />
        );
        expect(screen.getByText("Place 1")).toBeInTheDocument();
        expect(screen.getByText("Place 2")).toBeInTheDocument();
    });

    test("calls handleSetItinerary when approve icon is clicked", () => {
        render(
            <RightPanel
                handleSetItinerary={handleSetItinerary}
                handleReset={handleReset}
                itineraryEvents={itineraryEvents}
                handleSetItineraryEvents={handleSetItineraryEvents}
            />
        );

        fireEvent.click(screen.getByTestId("approve"));
        expect(handleSetItinerary).toHaveBeenCalled();
    });

    test("calls handleReset when reset is clicked", () => {
        render(
            <RightPanel
                handleSetItinerary={handleSetItinerary}
                handleReset={handleReset}
                itineraryEvents={itineraryEvents}
                handleSetItineraryEvents={handleSetItineraryEvents}
            />
        );

        fireEvent.click(screen.getByTestId("reset"));
        expect(handleReset).toHaveBeenCalled();
    });

    test("calls handleDelete with correct parameters when delete button is clicked", () => {
        render(
            <RightPanel
                handleSetItinerary={handleSetItinerary}
                handleReset={handleReset}
                itineraryEvents={itineraryEvents}
                handleSetItineraryEvents={handleSetItineraryEvents}
            />
        );

        fireEvent.click(screen.getByTestId("delete-0"));
        expect(handleSetItineraryEvents).toHaveBeenCalledWith([
            { time: 2, place: { name: "Place 2" }, transport: "WALKING" },
        ]);
    });

    test("calls handleTransportChange when a transport option is clicked", () => {
        render(
            <RightPanel
                handleSetItinerary={handleSetItinerary}
                handleReset={handleReset}
                itineraryEvents={itineraryEvents}
                handleSetItineraryEvents={handleSetItineraryEvents}
            />
        );

        fireEvent.click(screen.getByTestId("drive"));
        expect(handleSetItineraryEvents).toHaveBeenCalled();
    });

    // test("calls handleTimeChange when a time is selected", () => {
    //     // This test only runs if you change the Material UI component from Select to "select",
    //     // and the MenuItem to "option"

    //     render(
    //         <RightPanel
    //             handleSetItinerary={handleSetItinerary}
    //             handleReset={handleReset}
    //             itineraryEvents={itineraryEvents}
    //             handleSetItineraryEvents={handleSetItineraryEvents}
    //         />
    //     );

    //     const selectElement = screen.getByTestId("time-0");

    //     fireEvent.change(selectElement, { target: { value: 5 } });

    //     expect(handleSetItineraryEvents).toHaveBeenCalledWith([
    //         { time: 5, place: { name: "Place 1" }, transport: "DRIVING" },
    //         { time: 2, place: { name: "Place 2" }, transport: "WALKING" },
    //     ]);
    // });
});
