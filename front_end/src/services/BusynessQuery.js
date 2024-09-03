import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_DATA = gql`
    query GetAllZoneBusyness($input_date: String!) {
        getAllZoneBusyness(input_date: $input_date) {
            timeKey
            locations {
                zoneID
                centroid {
                    longitude
                    latitude
                }
                busynessLevel
                message
            }
        }
    }
`;

const BusynessContext = React.createContext();

const BusynessAPI = ({ children, input_date }) => {
    const {
        loading: heatmapLoading,
        error: heatmapError,
        data: heatmapData,
    } = useQuery(GET_DATA, {
        variables: {
            input_date,
        },
    });

    const value = {
        heatmapLoading,
        heatmapError,
        heatmapData,
    };

    return (
        <BusynessContext.Provider value={value}>
            {children}
        </BusynessContext.Provider>
    );
};

export { BusynessAPI, BusynessContext };
