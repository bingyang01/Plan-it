import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filter from "./Filter";
import { NearbyPlacesContext } from "../services/NearByPlacesQuery";
import { EventsContext } from "../services/EventsQuery";

const mockNearbyPlacesContext = {
    parkData: { nearbyPlaces: ["Park1", "Park2"] },
    cafeData: { nearbyPlaces: ["Cafe1", "Cafe2"] },
    attractionData: { nearbyPlaces: ["Attraction1", "Attraction2"] },
    museumData: { nearbyPlaces: ["Museum1", "Museum2"] },
    restaurantData: { nearbyPlaces: ["Restaurant1", "Restaurant2"] },
    galleryData: { nearbyPlaces: ["Gallery1", "Gallery2"] },
    barData: { nearbyPlaces: ["Bar1", "Bar2"] },
};

const mockEventsContext = {
    eventData: { nearbyEvents: ["Place1", "Place2"] },
};

const mockHandleFilterIndexNum = jest.fn();
const mockHandleSetFilteredArray = jest.fn();

describe("Filter Component", () => {
    test("renders correctly", () => {
        render(
            <NearbyPlacesContext.Provider value={mockNearbyPlacesContext}>
                <EventsContext.Provider value={mockEventsContext}>
                    <Filter
                        handleFilterIndexNum={mockHandleFilterIndexNum}
                        handleSetFilteredArray={mockHandleSetFilteredArray}
                    />
                </EventsContext.Provider>
            </NearbyPlacesContext.Provider>
        );

        const selectElement = screen.getByTestId("Park");
        expect(selectElement).toBeInTheDocument();
    });

    test("clicking on filter buttons calls appropriate handlers", () => {
        render(
            <NearbyPlacesContext.Provider value={mockNearbyPlacesContext}>
                <EventsContext.Provider value={mockEventsContext}>
                    <Filter
                        handleFilterIndexNum={mockHandleFilterIndexNum}
                        handleSetFilteredArray={mockHandleSetFilteredArray}
                    />
                </EventsContext.Provider>
            </NearbyPlacesContext.Provider>
        );

        fireEvent.click(screen.getByTestId("Park"));
        expect(mockHandleSetFilteredArray).toHaveBeenCalledWith([
            "Park1",
            "Park2",
        ]);
        expect(mockHandleFilterIndexNum).toHaveBeenCalledWith(0);

        fireEvent.click(screen.getByTestId("Cafe"));
        expect(mockHandleSetFilteredArray).toHaveBeenCalledWith([
            "Cafe1",
            "Cafe2",
        ]);
        expect(mockHandleFilterIndexNum).toHaveBeenCalledWith(1);

        // Add checks for other buttons
    });

    test("clicking a button updates the button style", () => {
        render(
            <NearbyPlacesContext.Provider value={mockNearbyPlacesContext}>
                <EventsContext.Provider value={mockEventsContext}>
                    <Filter
                        handleFilterIndexNum={mockHandleFilterIndexNum}
                        handleSetFilteredArray={mockHandleSetFilteredArray}
                    />
                </EventsContext.Provider>
            </NearbyPlacesContext.Provider>
        );

        const parksButton = screen.getByTestId("Bar");
        fireEvent.click(parksButton);
        expect(parksButton).toHaveStyle("border-color: #ff5722");
    });
});
