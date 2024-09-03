// import { render, screen, fireEvent } from "@testing-library/react";
// import MockTest from "./greet";

// describe("Greet component", () => {
//     test("renders with initial name 'TESTING123'", () => {
//         render(<MockTest />);
//         const textElement = screen.getByTestId("name-display");
//         expect(textElement.textContent).toBe("TESTING123");
//     });

//     test("updates name when button is clicked", () => {
//         render(<MockTest />);
//         const textElement = screen.getByTestId("name-display");

//         fireEvent.click(screen.getByTestId("set-name-button"));

//         expect(textElement.textContent).toBe("Calvin");
//     });
// });

// -------------------------------------------------------------------------------------

// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import MockTest from "./greet";

// describe("Greet component", () => {
//     test("renders with initial name 'Blank'", () => {
//         render(<MockTest />);
//         const textElement = screen.getByTestId("name-display");
//         expect(textElement.textContent).toBe("Blank");
//     });

//     test("updates name when dropdown value changes", () => {
//         render(<MockTest />);
//         const textElement = screen.getByTestId("name-display");
//         const dropdown = screen.getByTestId("set-drop-down");

//         fireEvent.change(dropdown, { target: { value: 1 } });

//         expect(textElement.textContent).toBe("1");
//     });
// });

// -------------------------------------------------------------------------------------

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MockTest from "./mocktest";
import "@testing-library/jest-dom";

describe("Greet component", () => {
    test("renders with initial name 'Blank'", () => {
        render(<MockTest />);

        const selectElement = screen.getByTestId("set-drop-down");

        expect(selectElement.value).toBe("1");
    });

    test("updates name when dropdown value changes", () => {
        render(<MockTest />);
        const selectElement = screen.getByTestId("set-drop-down");

        fireEvent.change(selectElement, { target: { value: "2" } });
        expect(selectElement.value).toBe("2");
    });

    test("renders correct div based on select value", () => {
        render(<MockTest />);

        expect(screen.queryByText("Hello")).toBeNull();

        const selectDropdown = screen.getByTestId("set-drop-down");
        fireEvent.change(selectDropdown, { target: { value: "2" } });
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });
});
