import React from "react";
import LLMStream from "../components/LLMStream";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Typography, Paper, Box, Button } from "@mui/material";

export default function AIDialogContainer({
    clickedAIButton,
    setClickedAIButton,
    itinerary,
    reset,
}) {
    const handleDialogCloseClick = () => {
        setClickedAIButton(false);
    };

    const [questionNumber, setQuestionNumber] = React.useState(0);

    const handleQuestion = (element) => () => {
        setQuestionNumber(element);
    };

    // ------------------------------------------------------------------------------------------------------------

    const [payload, setPayload] = React.useState({});
    const [payloadState, setPayloadState] = React.useState(false);

    React.useEffect(() => {
        if (itinerary.itin && itinerary.itin.length > 0) {
            let locationArray = [];

            for (let i = 0; i < itinerary.itin.length; i++) {
                locationArray.push(itinerary.itin[i].place.name);
            }

            let locationString = locationArray.join(" or ");

            setPayload({
                model: "qwen2:0.5b",
                prompt: `I am in Manhattan, New York. Please recommend a popular tourist attraction that is near ${locationString}?`,
            });
            setPayloadState(true);
        }
    }, [itinerary]);

    React.useEffect(() => {
        if (reset === true) {
            setPayloadState(false);
        }
    }, [reset]);

    // ------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Dialog
                open={clickedAIButton}
                onClose={handleDialogCloseClick}
                sx={{
                    "& .MuiDialog-paper": {
                        width: "600px",
                        height: "750px",
                    },
                }}
            >
                <DialogContent>
                    <DialogContentText>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Button
                                sx={{ textTransform: "none" }}
                                onClick={handleQuestion(1)}
                            >
                                Please recommend a tourist attraction near my
                                itinerary.
                            </Button>

                            <Button
                                sx={{ textTransform: "none" }}
                                onClick={handleQuestion(2)}
                            >
                                Please recommend a restaurant in Manhattan, New
                                York.
                            </Button>

                            <Button
                                sx={{ textTransform: "none" }}
                                onClick={handleQuestion(3)}
                            >
                                What is the best way to travel around Manhattan,
                                New York?
                            </Button>
                        </Box>
                        <br />

                        {/* ----------------------------------------------------------------------------------------------------------------- */}

                        {questionNumber === 1 && (
                            <>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        marginLeft: "5em",
                                        padding: "15px",
                                        backgroundColor: "#f5f5f5",
                                        borderColor: "#e0e0e0",
                                        borderStyle: "solid",
                                        borderWidth: "3px",
                                    }}
                                >
                                    Please recommend a tourist attraction near
                                    my itinerary.
                                </Paper>
                                <br></br>
                                {payloadState && (
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            marginRight: "5em",
                                            padding: "15px",
                                            backgroundColor: "#f5f5f5",
                                            borderColor: "#e0e0e0",
                                            borderStyle: "solid",
                                            borderWidth: "3px",
                                        }}
                                    >
                                        <LLMStream
                                            endpoint="http://nycplanner.v6.rocks/ai/api/generate"
                                            // endpoint="http://127.0.0.1:11434/api/generate"
                                            payload={payload}
                                        />
                                    </Paper>
                                )}
                            </>
                        )}

                        {/* ----------------------------------------------------------------------------------------------------------------- */}

                        {questionNumber === 2 && (
                            <>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        marginLeft: "5em",
                                        padding: "15px",
                                        backgroundColor: "#f5f5f5",
                                        borderColor: "#e0e0e0",
                                        borderStyle: "solid",
                                        borderWidth: "3px",
                                    }}
                                >
                                    Please recommend a restaurant.
                                </Paper>
                                <br></br>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        marginRight: "5em",
                                        padding: "15px",
                                        backgroundColor: "#f5f5f5",
                                        borderColor: "#e0e0e0",
                                        borderStyle: "solid",
                                        borderWidth: "3px",
                                    }}
                                >
                                    <LLMStream
                                        endpoint="http://nycplanner.v6.rocks/ai/api/generate"
                                        // endpoint="http://127.0.0.1:11434/api/generate"
                                        payload={{
                                            model: "qwen2:0.5b",
                                            prompt: `I am in Manhattan, New York. Please recommend a nice restaurant.`,
                                        }}
                                    />
                                </Paper>
                            </>
                        )}

                        {/* ----------------------------------------------------------------------------------------------------------------- */}

                        {questionNumber === 3 && (
                            <>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        marginLeft: "5em",
                                        padding: "15px",
                                        backgroundColor: "#f5f5f5",
                                        borderColor: "#e0e0e0",
                                        borderStyle: "solid",
                                        borderWidth: "3px",
                                    }}
                                >
                                    What is the best way to travel around the
                                    city?
                                </Paper>
                                <br></br>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        marginRight: "5em",
                                        padding: "15px",
                                        backgroundColor: "#f5f5f5",
                                        borderColor: "#e0e0e0",
                                        borderStyle: "solid",
                                        borderWidth: "3px",
                                    }}
                                >
                                    <LLMStream
                                        endpoint="http://nycplanner.v6.rocks/ai/api/generate"
                                        // endpoint="http://127.0.0.1:11434/api/generate"
                                        payload={{
                                            model: "qwen2:0.5b",
                                            prompt: `What is the best way to travel around Manhattan, New York?`,
                                        }}
                                    />
                                </Paper>
                            </>
                        )}

                        {/* ----------------------------------------------------------------------------------------------------------------- */}
                    </DialogContentText>
                    <br />
                </DialogContent>
            </Dialog>
        </>
    );
}
