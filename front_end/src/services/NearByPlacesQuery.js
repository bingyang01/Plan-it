import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_DATA = gql`
    query NearbyPlaces(
        $location: String!
        $radius: Int!
        $placeTypes: [String!]!
        $keyword: [String!]!
    ) {
        nearbyPlaces(
            location: $location
            radius: $radius
            placeTypes: $placeTypes
            keyword: $keyword
        ) {
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

const NearbyPlacesContext = React.createContext();
//-------------------------------------------------------------------------------------------
const NearByPlacesAPI = ({
    location,
    radius,
    placeTypes,
    keyword,
    children,
}) => {
    const {
        loading: parkLoading,
        error: parkError,
        data: parkData,
    } = useQuery(GET_DATA, {
        variables: {
            location,
            radius,
            placeTypes: ["park"],
            keyword: ["nature"],
        },
    });

    //-------------------------------------------------------------------------------------------

    const {
        loading: cafeLoading,
        error: cafeError,
        data: cafeData,
    } = useQuery(GET_DATA, {
        variables: {
            location,
            radius,
            placeTypes: ["cafe"],
            keyword: ["coffee"],
        },
    });
    //-------------------------------------------------------------------------------------------

    const {
        loading: attractionLoading,
        error: attractionError,
        data: attractionData,
    } = useQuery(GET_DATA, {
        variables: {
            location,
            radius,
            placeTypes: ["tourist_attraction"],
            keyword: ["attraction"],
        },
    });

    //-------------------------------------------------------------------------------------------

    const {
        loading: museumLoading,
        error: museumError,
        data: museumData,
    } = useQuery(GET_DATA, {
        variables: {
            location,
            radius,
            placeTypes: ["museum"],
            keyword: ["museum"],
        },
    });

    //-------------------------------------------------------------------------------------------

    const {
        loading: restaurantLoading,
        error: restaurantError,
        data: restaurantData,
    } = useQuery(GET_DATA, {
        variables: {
            location,
            radius,
            placeTypes: ["restaurant"],
            keyword: ["pizza, burgers"],
        },
    });
    //-------------------------------------------------------------------------------------------

    const {
        loading: galleryLoading,
        error: galleryError,
        data: galleryData,
    } = useQuery(GET_DATA, {
        variables: {
            location,
            radius,
            placeTypes: ["art_gallery"],
            keyword: ["gallery"],
        },
    });

    //-------------------------------------------------------------------------------------------

    const {
        loading: barLoading,
        error: barError,
        data: barData,
    } = useQuery(GET_DATA, {
        variables: {
            location,
            radius,
            placeTypes: ["bar"],
            keyword: ["bar"],
        },
    });
    //-------------------------------------------------------------------------------------------

    const value = {
        parkData,
        cafeData,
        attractionData,
        museumData,
        restaurantData,
        galleryData,
        barData,
    };
    //-------------------------------------------------------------------------------------------
    return (
        <NearbyPlacesContext.Provider value={value}>
            {children}
        </NearbyPlacesContext.Provider>
    );
};

export { NearByPlacesAPI, NearbyPlacesContext };
