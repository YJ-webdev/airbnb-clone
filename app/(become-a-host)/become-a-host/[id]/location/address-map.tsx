"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  MapCameraChangedEvent,
  useAdvancedMarkerRef,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { Skeleton } from "@/components/ui/skeleton";

interface AddressMapProps {
  location: { lat: number; lng: number } | null;
  setLng: (value: number) => void;
  setLat: (value: number) => void;
}

const AddressMap = ({ location, setLat, setLng }: AddressMapProps) => {
  const [mapCenter, setMapCenter] = useState(location);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(true);
  const [markerLocation, setMarkerLocation] = useState(location);
  const [loading, setLoading] = useState(true);

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    [],
  );

  const handleCameraChange = useCallback((event: MapCameraChangedEvent) => {
    const center = event.detail.center;
    setMapCenter(center);
  }, []);

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    const newPosition = event.latLng;
    if (newPosition) {
      const lat = newPosition.lat();
      const lng = newPosition.lng();
      const newMarkerLocation = { lat, lng };
      setMarkerLocation(newMarkerLocation);
      setLat(lat);
      setLng(lng);
    }
  };

  useEffect(() => {
    if (location) {
      setMapCenter(location);
      setMarkerLocation(location);
    }
  }, [location]);

  const handleMapLoad = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="h-[55vh] min-h-[360px] w-full overflow-hidden rounded-[25px] md:flex-1">
      {loading && (
        <Skeleton className="h-[55vh] flex-1 overflow-hidden rounded-[25px]" />
      )}
      <APIProvider
        onLoad={handleMapLoad}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      >
        <Map
          style={{ height: "100%", width: "100%" }}
          center={mapCenter}
          defaultZoom={13}
          mapId="2532e45032c3ce52"
          disableDefaultUI={true}
          fullscreenControl={true}
          zoomControl={true}
          onCameraChanged={handleCameraChange}
        >
          {markerLocation && (
            <AdvancedMarker
              ref={markerRef}
              draggable={true}
              position={markerLocation}
              onDragEnd={handleMarkerDragEnd}
              onClick={handleMarkerClick}
            >
              <Pin
                background={"#f4495d"}
                glyphColor={"#fff"}
                borderColor={"#E5073F"}
                scale={1.4}
              />
            </AdvancedMarker>
          )}

          {infoWindowShown && (
            <InfoWindow
              anchor={marker}
              headerContent={
                <h3 className="text-sm font-normal">
                  Make it clear where your place is located.
                </h3>
              }
            />
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default AddressMap;
