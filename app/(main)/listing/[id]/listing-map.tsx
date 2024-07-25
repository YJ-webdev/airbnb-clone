"use client";

import { Listing } from "@prisma/client";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useEffect } from "react";

export const ListingMap = ({ data }: { data?: Listing }) => {
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
          defaultCenter={{ lat: 53.54992, lng: 10.00678 }}
          defaultZoom={13}
          zoomControl={true}
          mapId="2532e45032c3ce52"
          fullscreenControl={true}
        >
          <AdvancedMarker
            ref={markerRef}
            position={{ lat: 53.54992, lng: 10.00678 }}
          >
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
