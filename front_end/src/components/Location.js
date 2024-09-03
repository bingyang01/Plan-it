import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

export default function Location({ destination, handleDestinationChange }) {
    return (
        <>
            <InputLabel>Select Destination</InputLabel>
            <Select
                label="Select Destination"
                value={destination}
                onChange={handleDestinationChange}
                data-testid="set-drop-down-location"
            >
                <MenuItem value="Manhattan">Manhattan, New York</MenuItem>
            </Select>
        </>
    );
}
