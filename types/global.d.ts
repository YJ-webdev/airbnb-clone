// declare global {
//   interface Window {
//     initMap?: () => void;
//   }
// }

// // types/global.d.ts
// declare namespace google {
//   namespace maps {
//     interface MapOptions {
//       // Define any custom MapOptions properties you're using
//       center: google.maps.LatLng | google.maps.LatLngLiteral;
//       zoom: number;
//       // Add more properties as needed
//     }

//     class Map {
//       constructor(mapDiv: Element, opts?: google.maps.MapOptions);
//       // Add methods and properties used in your code
//       setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): void;
//       // Add more methods as needed
//     }

//     interface PlacesService {
//       // Define methods and properties used from PlacesService
//     }

//     interface Autocomplete {
//       constructor(
//         inputField: HTMLInputElement,
//         options?: google.maps.places.AutocompleteOptions,
//       );
//       addListener(event: string, callback: () => void): void;
//       getPlace(): google.maps.places.PlaceResult;
//       // Add more methods and properties as needed
//     }

//     namespace places {
//       interface AutocompleteOptions {
//         types?: string[];
//         // Define autocomplete options as needed
//       }

//       interface PlaceResult {
//         geometry: {
//           location: google.maps.LatLng | google.maps.LatLngLiteral;
//           // Add more properties as needed
//         };
//         address_components: google.maps.GeocoderAddressComponent[];
//         // Add more properties as needed
//       }

//       interface GeocoderAddressComponent {
//         types: string[];
//         short_name: string;
//         long_name: string;
//         // Define address component properties
//       }
//     }
//   }
// }
