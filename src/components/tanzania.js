"use client";

import { useCallback, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow  } from "@react-google-maps/api";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -6.369028, // Center of Tanzania
  lng: 34.888822,
};

const locations = [
  {
    name: "Arusha",
    position: { lat: -3.3869, lng: 36.6822 },
    zoom: 14,
  },
  {
    name: "Dar es Salaam",
    position: { lat: -6.7924, lng: 39.2083 },
    zoom: 14,
  },
];

// Arusha markers
const arushaMarkers = [
  { lat: -3.419487, lng: 36.67688112, popup: 'Muriet', id: 1 },
  { lat: -3.417895, lng: 36.675563, popup: 'Muriet', id: 2   },
  { lat: -3.417603, lng: 36.67578, popup: 'Muriet', id: 3   },
  { lat: -3.42218, lng: 36.67795, popup: 'Muriet', id: 4   },
  { lat: -3.425973, lng: 36.677913, popup: 'Muriet', id: 5   },
  { lat: -3.429924, lng: 36.67533, popup: 'Muriet', id: 6   },
  { lat: -3.430462, lng: 36.675247, popup: 'Muriet', id: 7   },
  { lat: -3.429402, lng: 36.674684, popup: 'Muriet', id: 8   },
  { lat: -3.692052, lng: 36.675292, popup: 'Sinoni', id: 9   },
  { lat: -3.392052, lng: 36.678069, popup: 'Sinoni', id: 10    },
  { lat: -3.392034, lng: 36.676232, popup: 'Sinoni', id: 11    },
  { lat: -3.392699, lng: 36.673028, popup: 'Sinoni', id: 12    },
  { lat: -3.378821, lng: 36.67523, popup: 'Sinoni', id: 13    },
  { lat: -3.379732, lng: 36.675052, popup: 'Sinoni', id: 14    },
  { lat: -3.380192, lng: 36.674945, popup: 'Sinoni', id: 15    },
  { lat: -3.381116, lng: 36.674575, popup: 'Sinoni', id: 16    },
  { lat: -3.381554, lng: 36.674268, popup: 'Sinoni', id: 17    },
  { lat: -3.382543, lng: 36.67415, popup: 'Sinoni', id: 18    },
];

// Dar es Salaam markers
const darMarkers = [
  { lat: -6.79648, lng: 39.26629 },
  { lat: -6.79648, lng: 39.26629 },
  { lat: -6.77837, lng: 39.25079 },
  { lat: -6.79558, lng: 39.23548 },
  { lat: -6.85085, lng: 39.27122 },
  { lat: -6.79804, lng: 39.2647 },
  { lat: -6.81279, lng: 39.27433 },
  { lat: -6.80944, lng: 39.27597 },
  { lat: -6.85986, lng: 39.26499 },
  { lat: -6.81446, lng: 39.28554 },
  { lat: -6.76415, lng: 39.28001 },
  { lat: -6.8153, lng: 39.29356 },
  { lat: -6.77122, lng: 39.27024 },
  { lat: -6.80512, lng: 39.27877 },
  { lat: -6.78957, lng: 39.23755 },
  { lat: -6.78957, lng: 39.23755 },
];

export default function Tanzania() {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeCity, setActiveCity] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);

  const onLoad = useCallback(map => {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  const handleMarkerClick = (loc) => {
    if (mapRef.current) {
      mapRef.current.setCenter(loc.position);
      mapRef.current.setZoom(loc.zoom);
    }
    setActiveCity(loc.name);
  };

  return (
    <LoadScript googleMapsApiKey={api_key}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        onLoad={onLoad}
        options={{zoomControl: true, // Enable + and - buttons
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false}}
      >
        {mapLoaded &&
          locations.map((loc) => (
            <Marker
              key={loc.name}
              position={loc.position}
              onClick={() => handleMarkerClick(loc)}
              label={{
                text: loc.name,
                fontWeight: "bold",
                color: "#000",
              }}
            />
          ))}
          {locations.map(
          (loc) =>
            hoveredMarker === loc.name && (
              <InfoWindow
                key={`infowindow-${loc.name}`}
                position={loc.position}
                options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
              >
                <div>
                  <h2 className="font-bold">{loc.name}</h2>
                  <p>This is {loc.name} city marker.</p>
                </div>
              </InfoWindow>
            )
        )}

        {activeCity === "Arusha" &&
          arushaMarkers.map((pos, idx) => (
            <Marker key={`arusha-${idx}`} position={{lat: pos.lat, lng: pos.lng}} onMouseOver={() => setHoveredMarker(pos.id)}onMouseOut={() => setHoveredMarker(null)} />
          ))}
          {activeCity === "Arusha" && arushaMarkers.map(
          (loc) =>
            hoveredMarker === loc.id && (
              <InfoWindow
                key={`infowindow-${loc.id}`}
                position={{lat: loc.lat, lng: loc.lng}}
                options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
              >
                <div>
                  <h2 className="font-bold">{loc.popup}</h2>
                </div>
              </InfoWindow>
            )
        )}

        {activeCity === "Dar es Salaam" &&
          darMarkers.map((pos, idx) => (
            <Marker key={`dar-${idx}`} position={pos} />
          ))}
      </GoogleMap>
    </LoadScript>
  );
}
