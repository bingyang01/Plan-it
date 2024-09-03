import React from "react";
import { render, screen } from "@testing-library/react";
import Date from "./Date";
import "@testing-library/jest-dom";

describe("Date component", () => {
    test("App renders with initial date value '1'", () => {
        const handleSetStartDate = jest.fn();
        const startDate = "1";
        const startDateArray = [
            { id: "0", date: "Saturday, 20 Jul 2024", value: "2024-07-20" },

            { id: "1", date: "Sunday, 21 Jul 2024", value: "2024-07-21" },

            { id: "2", date: "Monday, 22 Jul 2024", value: "2024-07-22" },
        ];

        render(
            <Date
                handleSetStartDate={handleSetStartDate}
                startDate={startDate}
                startDateArray={startDateArray}
            />
        );
        const selectElement = screen.getByTestId("set-drop-down-date");
        expect(selectElement).toBeInTheDocument();
        expect(selectElement.querySelector("input").value).toBe("1");
    });
});
