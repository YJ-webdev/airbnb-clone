"use client";

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useEffect } from "react";

interface ListingMapProps {
  lat: number;
  lng: number;
}

export const ListingMap = ({ lat, lng }: ListingMapProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  useEffect(() => {
    if (!marker) {
      return;
    }
  }, [marker]);

  return (
    <div className="h-[50vh] w-full rounded-lg border">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          defaultCenter={{ lat: lat, lng: lng }}
          defaultZoom={13}
          zoomControl={true}
          mapId="2532e45032c3ce52"
          fullscreenControl={true}
        >
          <AdvancedMarker ref={markerRef} position={{ lat: lat, lng: lng }}>
            <Pin
              background={"#f4495d"}
              glyphColor={"#fff"}
              borderColor={"#E5073F"}
              scale={1.4}
            />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
};
