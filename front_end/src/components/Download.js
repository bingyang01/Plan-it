import React from "react";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Tooltip from "@mui/material/Tooltip";
import { IconButton, Box, Typography } from "@mui/material/";

export default function Download({ itinerary, startDate, startDateArray }) {
    // ----------------------------------------------------------------------------------------
    // Download icon management

    const [downloadFile, setDownloadFile] = React.useState("");

    React.useEffect(() => {
        if (itinerary.itin && itinerary.itin.length > 0) {
            let downloadArray = [];

            for (let i = 0; i < itinerary.itin.length; i++) {
                downloadArray.push(
                    itinerary.itin[i].time < 11
                        ? `\t${itinerary.itin[i].time}am to ${
                              itinerary.itin[i].time + 1
                          }am: ${itinerary.itin[i].place.name}.`
                        : itinerary.itin[i].time === 11
                        ? `\t${itinerary.itin[i].time}am to ${
                              itinerary.itin[i].time + 1
                          }pm: ${itinerary.itin[i].place.name}.`
                        : `\t${itinerary.itin[i].time}pm to ${
                              itinerary.itin[i].time + 1
                          }pm: ${itinerary.itin[i].place.name}.`
                );

                if (i + 1 < itinerary.itin.length) {
                    downloadArray.push(
                        `\t\tMode of transport to next stop is: ${itinerary.itin[
                            i
                        ].transport.toLowerCase()}.`
                    );
                }
            }

            let additionalText = `Please see your itinerary for Manhattan (New York City) for ${startDateArray[startDate].date} below.\n\n`;

            let downloadString = additionalText + downloadArray.join("\n\n");

            setDownloadFile(downloadString);
        }
    }, [itinerary]);

    const handleDownload = () => {
        if (downloadFile !== "") {
            const fileData = downloadFile;
            const blob = new Blob([fileData], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = "itinerary.txt";
            link.href = url;
            link.click();
        }
    };

    return (
        <Tooltip title="Download itinerary">
            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginRight: "2em",
                }}
            >
                <IconButton
                    variant="outlined"
                    onClick={handleDownload}
                    style={{
                        color: "#ff5722",
                    }}
                >
                    <ArrowCircleDownIcon />
                </IconButton>
                <Typography variant="caption">Download</Typography>
            </Box>
        </Tooltip>
    );
}
