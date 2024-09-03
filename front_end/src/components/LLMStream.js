import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

export default function LLMStream({ endpoint, payload }) {
    const [responseText, setResponseText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!isComplete) {
            const fetchData = async () => {
                try {
                    const response = await fetch(endpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });

                    const reader = response.body.getReader();
                    let receivedText = "";

                    // Process the stream
                    const read = async () => {
                        const { done, value } = await reader.read();
                        // value is a byte,
                        if (done) {
                            setResponseText(
                                (prevText) => prevText + "\n\n-- Complete --"
                            );
                            setIsComplete(true);
                            return;
                        }
                        const chunk = new TextDecoder().decode(value);
                        receivedText += chunk;
                        // TextDecoder decode value to actual charactors
                        // Attempt to process whenever a complete JSON message is available
                        while (receivedText.includes("\n") && !isComplete) {
                            /* Each line (Ending with \n) is one json string. Split receivvedText from \n. And send the json string to processChunk(completeChunk) to extract 'response' field out
                            Example: {"model":"qwen2:0.5b","created_at":"2024-07-11T08:19:46.7837716Z","response":" sky","done":false}\n{"model":"qwen2:0.5b","created_at":"2024-07-11T08:19:46.7984751Z","response":",","done":false}*/
                            const splitPoint = receivedText.indexOf("\n");
                            const completeChunk = receivedText.substring(
                                0,
                                splitPoint
                            );

                            receivedText = receivedText.substring(
                                splitPoint + 1
                            );
                            processChunk(completeChunk);
                        }

                        await read(); // Continue reading if not complete
                    };

                    await read();
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            };

            fetchData();
        }
    }, [endpoint, payload, isComplete]); // Include isComplete in dependency array

    function processChunk(chunk) {
        // chunk example: {"model":"qwen2:0.5b","created_at":"2024-07-11T08:19:46.7837716Z","response":" sky","done":false}
        try {
            const json = JSON.parse(chunk);
            setResponseText((prevText) => prevText + json.response);
            if (json.done) {
                setIsComplete(true); // Flag as complete, stop further updates
            }
        } catch (e) {
            console.error("Error parsing JSON:", e);
        }
    }

    // ----------------------------------------------------------------------------------------

    return (
        <Box
            sx={{
                height: "25em",
                display: "flex",
                overflowY: "auto",
                overflowY: "scroll",
                scrollbarWidth: "thin",
            }}
        >
            <MapOutlinedIcon sx={{ marginRight: "0.5em", fontSize: "2rem" }} />
            <Typography component="h4" variant="body1">
                {responseText}
            </Typography>
        </Box>
    );
}
