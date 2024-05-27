global.google = {
    maps: {
      places: {
        PlacesService: function () {
          return {
            getDetails: (request, callback) => {
              callback({
                name: 'Mock Place',
                formatted_address: '123 Mock St',
                place_id: request.placeId,
                geometry: {
                  location: {
                    lat: () => 0,
                    lng: () => 0,
                  },
                },
                photos: [],
              }, google.maps.places.PlacesServiceStatus.OK);
            },
          };
        },
        PlacesServiceStatus: {
          OK: 'OK',
        },
      },
    },
  };
  