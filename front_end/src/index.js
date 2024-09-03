import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { LoadScript } from "@react-google-maps/api";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

const client = new ApolloClient({
    uri: "http://nycplanner.v6.rocks/graphql",
    // uri: "http://127.0.0.1:5000/graphql",
    cache: new InMemoryCache(),
});

const libraries = ["visualization"];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <LoadScript
        googleMapsApiKey={process.env.REACT_APP_API_KEY}
        libraries={libraries}
    >
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </LoadScript>
);
