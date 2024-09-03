import React from "react";
import PolygonCoordinates from "../json/PolygonCoordinates.js";
import GraphDialog from "./GraphDialog";
import Box from "@mui/material/Box";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Polygon,
} from "@react-google-maps/api";

export default function ({
    clickedHeatMapButton,
    searchQuery,
    startDateArray,
    startDate,
    heatmapData,
    queryArray,
    heatmapLoaded,
}) {
    // -------------------------------------------------------------------------

    const [selectedZone, setSelectedZone] = React.useState(null);

    const handleSetSelectedZone = (zone) => {
        setSelectedZone(zone);
    };

    // -------------------------------------------------------------------------

    return (
        <>
            {clickedHeatMapButton && searchQuery ? (
                PolygonCoordinates[0].features.map((feature, index) => {
                    const busynessData = queryArray.find(
                        (data) => data.zoneID === feature.properties.zone_label
                    );
                    const busynessLevel = busynessData
                        ? busynessData.busynessLevel
                        : 0;
                    let fillColor;
                    if (busynessLevel >= 0 && busynessLevel <= 2) {
                        fillColor = "rgba(154, 205, 50, 0.5)"; // Light green for Not Busy
                    } else if (busynessLevel >= 3 && busynessLevel <= 4) {
                        fillColor = "rgba(255, 215, 0, 0.5)"; // Yellow for Somewhat Busy
                    } else if (busynessLevel >= 5 && busynessLevel <= 6) {
                        fillColor = "rgba(255, 165, 0, 0.5)"; // Orange for Moderately Busy
                    } else if (busynessLevel >= 7 && busynessLevel <= 8) {
                        fillColor = "rgba(255, 0, 0, 0.5)"; // Red for Busy
                    } else if (busynessLevel >= 9 && busynessLevel <= 10) {
                        fillColor = "rgba(139, 0, 0, 0.5)"; // Dark red for Very Busy
                    } else {
                        fillColor = "rgba(0, 0, 0, 0.3)"; // Transparent if no busyness level
                    }

                    return (
                        <Polygon
                            key={index}
                            paths={feature.geometry.coordinates[0].map(
                                (coord) => ({
                                    lat: coord[1],
                                    lng: coord[0],
                                })
                            )}
                            options={{
                                fillColor: fillColor,
                                fillOpacity: 0.5,
                                strokeColor: "white",
                                strokeOpacity: 1,
                                strokeWeight: 1,
                                // preserveViewport: true,
                            }}
                            onMouseOver={() =>
                                handleSetSelectedZone(
                                    feature.properties.zone_label
                                )
                            }
                        ></Polygon>
                    );
                })
            ) : (
                <>{console.log("Rendering")}</>
            )}

            <Box
                sx={{
                    backgroundColor: "#fff",
                    padding: "1em",
                    borderRadius: "16px",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
                    textAlign: "center",
                    maxWidth: "350px",
                    minHeight: "235px",
                    zIndex: 1,
                    position: "relative",
                    left: "31%",
                    top: "5em",
                }}
            >
                {selectedZone && (
                    <GraphDialog
                        selectedZone={selectedZone}
                        startDateArray={startDateArray}
                        startDate={startDate}
                        heatmapData={heatmapData}
                        heatmapLoaded={heatmapLoaded}
                    />
                )}
            </Box>
        </>
    );
}
