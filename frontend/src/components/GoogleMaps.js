import React, { useEffect, useState, useRef } from 'react';
import { createCustomEqual } from 'fast-equals';

export default function GoogleMaps({
  setCenter,
  setZoom,
  onClick,
  onIdle,
  children,
  style,
  ...options
}) {
  const searchInput = useRef(null);

  const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
      if (
        isLatLngLiteral(a) ||
        a instanceof google.maps.LatLng ||
        isLatLngLiteral(b) ||
        b instanceof google.maps.LatLng
      ) {
        return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
      }

      // TODO extend to other types

      // use fast-equals for other objects
      return deepEqual(a, b);
    });

  function useDeepCompareMemoize(value) {
    const ref = useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
      ref.current = value;
    }

    return ref.current;
  }

  function useDeepCompareEffectForMaps(callback, dependencies) {
    useEffect(callback, dependencies.map(useDeepCompareMemoize));
  }
  const ref = useRef(null);
  const [map, setMap] = useState();

  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const options = {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false
    };
    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current, options);
    autocomplete.setFields(["place_id", "geometry", "name"]);
    autocomplete.addListener('place_changed', () => onChangeAddress(autocomplete))
  };

  const onChangeAddress = (autocomplete) => {
    const location = autocomplete.getPlace();
    if(!location.geometry){
      alert('Sorry that place was not found.');
      return;
    }
    setCenter({ lat: location.geometry.location.lat(), lng: location.geometry.location.lng() });
  };

  useEffect(() => {
    if (!searchInput.current) return;
    initAutocomplete();
  }, [searchInput.current])

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  return (
    <>
      <input ref={searchInput} type='text' placeholder='Search Location...' />
      <button>Get Current Location</button>
      <h2>Google Maps Component</h2>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  )
}