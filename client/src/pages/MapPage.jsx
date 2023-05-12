import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from 'mapbox-gl'; 

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FydG9kYmluYyIsImEiOiJja202bHN2OXMwcGYzMnFrbmNkMzVwMG5rIn0.Zb3J4JTdJS-oYNXlR3nvnQ';

export default function MapPage() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const lng = 37.537650;
    const lat = 55.651165;
    const zoom = 17;
  
    const cords = [
      [
        37.5378111,
        55.6513470
      ],
      [
        37.5379416,
        55.6514120
      ],
      [
        37.5397964,
        55.6518706
      ],
      [
        37.5399066,
        55.6517194
      ],
      [
        37.5380907,
        55.6512715
      ],
      [
        37.5380343,
        55.6512417
      ],
      [
        37.5370955,
        55.6503833
      ],
      [
        37.5368470,
        55.6504658
      ],
      [
        37.5378111,
        55.6513470
      ],
    ]

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            bearing: 330,
             center: [lng, lat],
            zoom: zoom,      
            pitch: 60,
        });


        map.current.on('load', () => {
            map.current.addSource('floorplan', {
                'type': 'geojson',
                'data': {
                    "features": [
                      {
                        "type": "Feature",
                        "properties": {
                          "level": 1,
                          "name": "outer-walls",
                          "base_height": 0,
                          "height": 20,
                          "color": "grey"
                        },
                        "geometry": {
                          "coordinates": [
                            cords
                          ],
                          "type": "Polygon"
                        }
                      },
                      {
                        "type": "Feature",
                        "properties": {
                          "level": 1,
                          "name": "inner-floor",
                          "base_height": 0,
                          "height": 0,
                          "color": "orange"
                        },
                        "geometry": {
                          "coordinates": [
                            [
                              [
                                lng,
                                lat-0.0004
                              ]
                            ]
                          ],
                          "type": "Polygon"
                        }
                      }
                    ],
                    "type": "FeatureCollection"
                  }
            });
            map.current.addLayer({
                'id': 'room-extrusion',
                'type': 'fill-extrusion',
                'source': 'floorplan',
                'paint': {
                    'fill-extrusion-color': ['get', 'color'],
                    'fill-extrusion-height': ['get', 'height'],
                    'fill-extrusion-base': ['get', 'base_height'],
                    'fill-extrusion-opacity': 1.0
                }
            });
        });
    });

    return (
        <div ref={mapContainer} className="map_container" />
    );
}