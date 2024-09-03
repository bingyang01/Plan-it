import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_DATA = gql`
    query {
        nearbyEvents(location: "40.758678,-73.978798", radius: 5000) {
            place_id
            name
            formattedAddress
            rating
            userRatingCount
            location {
                lat
                lng
            }
            types
            openNow
            photos {
                photoReference
                height
                width
                url
            }
        }
    }
`;

const EventsContext = React.createContext();
//-------------------------------------------------------------------------------------------
const EventsAPI = ({ location, radius, children }) => {
    const {
        loading: eventLoading,
        error: eventError,
        data: eventData,
    } = useQuery(GET_DATA, {
        variables: {
            location,
            radius,
        },
    });

    //-------------------------------------------------------------------------------------------
    const value = {
        eventData,
    };
    //-------------------------------------------------------------------------------------------
    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    );
};

export { EventsAPI, EventsContext };
