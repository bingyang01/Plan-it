# COMP47360 Research Practicum
**COMP47360 | Group 4 | Summer Research Practicum | 2024**


# Run
Execute:
`flask run` in terminal
or
`python app.py`

Tests:
`pytest`

# CI/CD
GitHub Action will run tests for all branches when pushed.

# Directories

- `flaskr/`, a Python package containing the back end application code and files.
- `front_end`, a directory that contains all core front end files.
- `tests/`, a directory containing test modules.
- `.git/info/exclude` equivalent of .gitignore

# Git commit conventions
https://www.conventionalcommits.org/en/v1.0.0/#summary

- **fix**: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
- **feat**: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
- **BREAKING CHANGE**: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
- **other than fix**: and feat: are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
- **footers other than BREAKING CHANGE**: <description> may be provided and follow a convention similar to git trailer format.

# Example GraphQL Queries
Endpoint: `/graphql`

### For TicketMaster API
```
query {
    nearbyEvents(location: "37.7749,-122.4194", radius: 1500) {
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
```

#### get event details
```
query {
  eventDetails(eventID: "G5vYZbadG53zZ") {
    place_id
    name
    types
    openingHours
    website
    internationalPhoneNumber
    formattedAddress
  }
}

```

### For Mock Places Data

```
query {
    mockNearbyPlaces(location: "50,-122.4194", radius: 1500, placeTypes: ["restaurant"]){
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

```
#### getplacedetails
```
query {
    mockPlaceDetails(placeId: "EXAMPLE_PLACE_ID_6") {
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


```
### For Mock Busyness Data

- Please enter a time which is greater than current time 

#### to get all mock busyness level of zone

input_datetime and input_date are optional.

- with input_date
```
query {
  getAllZoneBusyness (input_date: "2024-07-25"){
    timeKey
    locations {
      zoneID
      busynessLevel
      message
    }
  }
}
```

- with input_datetime
```
query {
  getAllZoneBusyness {
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

```
- without input_datetime
```
query {
  getAllZoneBusyness (input_datetime: "2024-07-10 23:00:00"){
    timeKey
    locations {
      centroid {
        longitude
        latitude
      }
      busynessLevel
      message
    }
  }
}


```

#### to get busyness level of certain of certain poi

```
query {
  getCertainZoneBusyness(centroid: {longitude: -74.02849308538867, latitude: 40.64104967681389}, input_datetime: "2024-07-02 21:00:00") {
    centroid {
      longitude
      latitude
    }
    busynessLevel
    message
  }
}
```

#### to get future 24 hours of busyness level  of certain poi

```
query {
  getCertainZoneFutureBusyness(centroid: {longitude: -74.02849308538867, latitude: 40.64104967681389}, input_datetime: "2024-07-02 21:00:00") {
    hour
    busynessLevel
    message
  }
}
```



### For Google Place API
#### to get nearby data
```
query {
    nearbyPlaces(location: "37.7749,-122.4194", radius: 1500, placeTypes: ["restaurant"]) {
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

```

#### User click on one and return certain details
```
query {
    placeDetails(placeId: "ChIJZ9s5SJeAhYARIX3Fxl6oj6c") {
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


```

### for poi data
#### to get all poi data
```
query {
  allPOIData {
    _id
    type
    id
    lat
    lon
    tags
  }
}

```
#### to get poi data by type
```
query {
  POIDataByType(tagKey: "tourism", tagValue: "attraction") {
    _id
    type
    id
    lat
    lon
    tags
  }
}
```
#### to get poi data by multiple filters
```
query {
  POIDataByFilters(filters: {
    tags: [
      { key: "tourism", value: "attraction" },
      { key: "wheelchair", value: "yes" }
    ],
    latMin: 40.0,
    latMax: 45.0,
    lonMin: -75.0,
    lonMax: -70.0
  }) {
    _id
    type
    id
    lat
    lon
    tags
  }
}
```

#### To filter places by placeType, lat,lng,radius
```
query {
  getPlace(placeType: "Restaurant", lat: 40.75447, lng: -73.97479, radius: 1000) {
    success
    places {
      id
      title
      description
      coverImg
      rating
      reviewCount
      coordinates
      placeType
    }
    errors
  }
}
```
#### To get all places
```
query {
    getAllPlaces {
        success
        places {
            id
            title
            description
            coverImg
            rating
            reviewCount
            coordinates
            placeType
        }
        errors
    }
}
```
