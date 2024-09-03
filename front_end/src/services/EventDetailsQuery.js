import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_DATA = gql`
    query GetEventDetails($eventID: String!) {
        eventDetails(eventID: $eventID) {
            place_id
            name
            types
            openingHours
            website
            internationalPhoneNumber
            formattedAddress
        }
    }
`;

const EventDetailsArrayContext = React.createContext();

const EventDetailsAPI = ({ eventID, children }) => {
    const { loading, error, data } = useQuery(GET_DATA, {
        variables: { eventID },
    });

    const value = {
        loading,
        error,
        eventDetails: data?.eventDetails,
    };

    return (
        <EventDetailsArrayContext.Provider value={value}>
            {children}
        </EventDetailsArrayContext.Provider>
    );
};

export { EventDetailsAPI, EventDetailsArrayContext };
