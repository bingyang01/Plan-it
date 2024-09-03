import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

export default function Location({
    handleSetStartDate,
    startDate,
    startDateArray,
}) {
    const [populateDropdown, setPopulateDropdown] = React.useState(false);

    // console.log("please print this:", startDate);

    React.useEffect(() => {
        if (startDateArray.length > 0 && startDate !== null) {
            setPopulateDropdown(true);
        }
    }, []);

    return (
        <>
            {populateDropdown && (
                <>
                    <InputLabel id="date-select-label">Select Day</InputLabel>
                    <Select
                        labelId="date-select-label"
                        value={startDate}
                        onChange={(event) =>
                            handleSetStartDate(event.target.value)
                        }
                        label="Select Day"
                        data-testid="set-drop-down-date"
                    >
                        {startDateArray.map((dateObject, index) => (
                            <MenuItem key={index} value={index}>
                                {dateObject.date}
                            </MenuItem>
                        ))}
                    </Select>
                </>
            )}
        </>
    );
}
