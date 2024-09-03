import React from "react";
import { render, screen } from "@testing-library/react";
import Location from "./Location";
import "@testing-library/jest-dom";

describe("Location component", () => {
    test("renders with initial value 'Manhattan'", () => {
        const destination = "Manhattan";

        const handleDestinationChange = jest.fn();

        render(
            <Location
                destination={destination}
                handleDestinationChange={handleDestinationChange}
            />
        );
        const selectElement = screen.getByTestId("set-drop-down-location");
        expect(selectElement).toBeInTheDocument();
        expect(selectElement.querySelector("input").value).toBe("Manhattan");
    });
});
