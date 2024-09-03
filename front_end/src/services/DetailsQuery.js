import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_DATA = gql`
    query GetPlaceDetails($placeId: String!) {
        placeDetails(placeId: $placeId) {
            place_id
            name
            formattedAddress
            rating
            userRatingCount
            location {
                lat
                lng
            }
            openNow
            website
            types
            internationalPhoneNumber
            googleMapsUri
            openingHours {
                openNow
                periods {
                    open {
                        day
                        hour
                        minute
                    }
                    close {
                        day
                        hour
                        minute
                    }
                }
                weekdayDescriptions
                specialDays {
                    date {
                        year
                        month
                        day
                    }
                }
            }
            photos {
                photoReference
                height
                width
                url
            }
        }
    }
`;

const DetailsArrayContext = React.createContext();

const DetailsAPI = ({ placeId, children }) => {
    const { loading, error, data } = useQuery(GET_DATA, {
        variables: { placeId },
    });

    const value = {
        loading,
        error,
        placeDetails: data?.placeDetails,
    };

    return (
        <DetailsArrayContext.Provider value={value}>
            {children}
        </DetailsArrayContext.Provider>
    );
};

export { DetailsAPI, DetailsArrayContext };
