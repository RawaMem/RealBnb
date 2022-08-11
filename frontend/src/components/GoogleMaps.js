import React, { useEffect, useState, useRef } from 'react';
import { createCustomEqual } from 'fast-equals';

export default function GoogleMaps({
    onClick,
    onIdle,
    children,
    style,
    ...options
}) {
    const deepCompareEqualsForMaps = createCustomEqual(
        (deepEqual) => (a, b) => {
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
        }
      );
      
      function useDeepCompareMemoize(value) {
        const ref = useRef();
      
        if (!deepCompareEqualsForMaps(value, ref.current)) {
          ref.current = value;
        }
      
        return ref.current;
      }
      
      function useDeepCompareEffectForMaps(
        callback,
        dependencies
      ) {
        useEffect(callback, dependencies.map(useDeepCompareMemoize));
      }
    const ref = useRef(null);
    const [map, setMap] = useState();

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