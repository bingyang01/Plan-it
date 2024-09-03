import React from "react";
import { Chart } from "react-google-charts";
import Box from "@mui/material/Box";

export default function ({
    selectedZone,
    startDateArray,
    startDate,
    heatmapData,
    heatmapLoaded,
}) {
    // ----------------------------------------------------------------------------------------------------
    // Set the time

    const [timeArray, setTimeArray] = React.useState([]);

    React.useEffect(() => {
        const tempTimeArray = [];

        for (let i = 0; i < 24; i++) {
            let tempTimeStamp = "";

            if (i < 10) {
                tempTimeStamp = `${startDateArray[startDate].value} 0${i}:00:00`;
                tempTimeArray.push(tempTimeStamp);
            } else {
                tempTimeStamp = `${startDateArray[startDate].value} ${i}:00:00`;
                tempTimeArray.push(tempTimeStamp);
            }
        }
        setTimeArray(tempTimeArray);
    }, [startDate, startDateArray]);

    // ----------------------------------------------------------------------------------------------------
    // Set the day array

    const [barGraphArray, setBarGraphArray] = React.useState([]);

    React.useEffect(() => {
        if (timeArray && timeArray.length > 0 && heatmapLoaded) {
            const locations = [];

            timeArray.forEach((time) => {
                const match = heatmapData.getAllZoneBusyness.find(
                    (item) => item.timeKey === time
                );

                if (match) {
                    match.locations.forEach((location) => {
                        locations.push({
                            time: match.timeKey,
                            ...location,
                        });
                    });
                }
            });
            setBarGraphArray(locations);
        }
    }, [timeArray]);

    // ----------------------------------------------------------------------------------------------------

    const [zoneIDArray, setZoneIDArray] = React.useState([]);

    React.useEffect(() => {
        if (barGraphArray && barGraphArray.length > 0 && selectedZone) {
            const filteredItems = barGraphArray.filter(
                (item) => item.zoneID === selectedZone
            );

            setZoneIDArray(filteredItems);
        }
    }, [barGraphArray, selectedZone]);

    // ----------------------------------------------------------------------------------------------------

    const [graphArray, setGraphArray] = React.useState([]);
    const [graphName, setGraphName] = React.useState("");

    React.useEffect(() => {
        const tempGraphArray = [["Time", "Score"]];

        if (zoneIDArray && zoneIDArray.length > 0) {
            for (let i = 0; i < zoneIDArray.length; i++) {
                let temp = [
                    zoneIDArray[i].time.split(" ")[1].split(":")[0],
                    zoneIDArray[i].busynessLevel,
                ];
                tempGraphArray.push(temp);
            }

            setGraphArray(tempGraphArray);

            let options = [];

            options = {
                chart: {
                    title: `Expected busyness for Zone ${selectedZone}`,
                    subtitle: `For the day ${startDateArray[startDate].value}`,
                },
                colors: ["#FF7043"],
                legend: { position: "none" },
            };

            setGraphName(options);
        }
    }, [zoneIDArray]);

    // ----------------------------------------------------------------------------------------------------

    return (
        <>
            {graphArray && graphArray.length > 0 && (
                <>
                    <Box>
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="200px"
                            data={graphArray}
                            options={graphName}
                        />
                    </Box>
                </>
            )}
        </>
    );
}
