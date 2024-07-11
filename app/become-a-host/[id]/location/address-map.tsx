"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

interface AddressMapProps {
  location: { lat: number; lng: number } | null;
}

const AddressMap = ({ location }: AddressMapProps) => {
  const [mapCenter, setMapCenter] = useState(location || { lat: 0, lng: 0 });

  useEffect(() => {
    if (location) {
      setMapCenter(location);
    }
  }, [location]);

  const handleCameraChange = useCallback((event: MapCameraChangedEvent) => {
    const center = event.detail.center;
    setMapCenter(center);
  }, []);

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    const newPosition = event.latLng;
    if (newPosition) {
      const lat = newPosition.lat();
      const lng = newPosition.lng();
      const locationOnMap = { lat, lng };
      console.log(locationOnMap);
    }
  };

  return (
    <div className="h-[55vh] flex-1 overflow-hidden rounded-[25px]">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          style={{ height: "100%", width: "100%", borderRadius: "15px" }}
          center={mapCenter}
          defaultZoom={13}
          mapId="2532e45032c3ce52"
          disableDefaultUI={true}
          fullscreenControl={true}
          onCameraChanged={handleCameraChange}
        >
          {location && (
            <AdvancedMarker
              draggable={true}
              position={location}
              onDragEnd={handleMarkerDragEnd}
            >
              <Pin
                background={"#f4495d"}
                glyphColor={"#fff"}
                borderColor={"#E5073F"}
                scale={1.4}
              />
            </AdvancedMarker>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default AddressMap;
