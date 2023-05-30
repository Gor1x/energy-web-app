import React, { useRef, useEffect, useState } from 'react';
import { Box } from "@mui/material";

import mapboxgl from 'mapbox-gl'; 

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FydG9kYmluYyIsImEiOiJja202bHN2OXMwcGYzMnFrbmNkMzVwMG5rIn0.Zb3J4JTdJS-oYNXlR3nvnQ';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const lng = 37.537650;
const lat = 55.651165;
const zoom = 16;

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

export default function Map(props) {
    const mapContainer = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
      const container = mapContainer.current;
      if (typeof window === "undefined" || container == null) return;

      const mapboxMap = new mapboxgl.Map({
          container: container,
          style: 'mapbox://styles/mapbox/streets-v12',
          bearing: 330,
          center: [lng, lat],
          zoom: zoom,      
          pitch: 60,
      });

      let idFeatureState = [null, null];
      for(let i=1;i<=2;++i) {
        mapboxMap.on('load', () => {
            mapboxMap.addSource(i+'story-floorplan', {
                'type': 'geojson',
                'data': {
                  "id": i,
                  "type": "Feature",
                  "properties": {
                    "level": 1,
                    "name": "outer-walls",
                    "base_height": 0 + (i-1)*10,
                    "height": 10 + (i-1)*10
                  },
                  "geometry": {
                    "coordinates": [
                      cords
                    ],
                    "type": "Polygon"
                  }
                }
            });
            mapboxMap.addLayer({
                'id': i+'story-room-extrusion',
                'type': 'fill-extrusion',
                'source': i+'story-floorplan',
                'paint': {
                    'fill-extrusion-height': ['get', 'height'],
                    'fill-extrusion-base': ['get', 'base_height'],
                    'fill-extrusion-opacity': 1.0,
                    'fill-extrusion-color': [
                      'case',
                      ['boolean', ['feature-state', 'hover'], false],
                      `rgb(${100+i*10},${100+i*10},${100+i*10})`,
                      `rgb(${200+i*10},${200+i*10},${200+i*10})`,
                    ]
                }
            });
        });

        mapboxMap.on('click', i+'story-room-extrusion', () => {
          props.onClick(i)
        });

        mapboxMap.on('mousemove', i+'story-room-extrusion', (event) => {
          mapboxMap.getCanvas().style.cursor = 'pointer';

          if (idFeatureState[i]) {
            mapboxMap.removeFeatureState({
              source: i+'story-floorplan',
              id: idFeatureState[i],
            });
          }

          idFeatureState[i] = event.features[0].id;
            
          mapboxMap.setFeatureState({
            source: i+'story-floorplan',
            id: idFeatureState[i],
          }, {
            hover: true
          });

        });

        mapboxMap.on('mouseleave', i+'story-room-extrusion', () => {
          if (idFeatureState[i]) {
            mapboxMap.setFeatureState({
              source: i+'story-floorplan',
              id: idFeatureState[i]
            }, {
              hover: false
            });
          }
          idFeatureState[i] = null
          mapboxMap.getCanvas().style.cursor = '';
        });
      }

      setMap(mapboxMap)

      return () => {
        mapboxMap.remove();
      };
    }, []);
      

    return (
        <Box {...props}>
            <div ref={mapContainer} style={{"height": "100%"}} className="map-container" />
        </Box>
    );
}