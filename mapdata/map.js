var Main;

// Assuming you're using a bundler or ES module-compatible environment

import Map from "https://js.arcgis.com/4.33/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.33/@arcgis/core/views/MapView.js";
import Graphic from "https://js.arcgis.com/4.33/@arcgis/core/Graphic.js";
import GraphicsLayer from "https://js.arcgis.com/4.33/@arcgis/core/layers/GraphicsLayer.js";
import BasemapGallery from "https://js.arcgis.com/4.33/@arcgis/core/widgets/BasemapGallery.js";
import LayerList from "https://js.arcgis.com/4.33/@arcgis/core/widgets/LayerList.js";


const parksLayer = new GraphicsLayer({ title: "Wyoming State Parks" });
const airLayer = new GraphicsLayer({ title: "Air Quality Stations" });


const map = new Map({
  basemap: "streets-navigation-vector",
  layers: [parksLayer, airLayer]
});


const view = new MapView({
  container: "map",
  map: map,
  center: [-107.5, 42.9], 
  zoom: 7
});


parksData.forEach(park => {
  const point = {
    type: "point",
    longitude: park.longitude,
    latitude: park.latitude
  };

  const attributes = {
    featureType: "Park",
    name: park.name,
    acres: park.acres,
    established: park.established
  };

  const symbol = {
    type: "simple-marker",
    color: "green",
    size: "10px"
  };

  const popupTemplate = {
    title: "{name}",
    content: `
      <b>Type:</b> {featureType}<br>
      <b>Acres:</b> {acres}<br>
      <b>Established:</b> {established}<br>
      <b>Longitude:</b> {longitude}<br>
      <b>Latitude:</b> {latitude}
    `
  };

  const graphic = new Graphic({
    geometry: point,
    symbol: symbol,
    attributes: {...attributes, longitude: park.longitude, latitude: park.latitude},
    popupTemplate: popupTemplate
  });

  parksLayer.add(graphic);
});


airQualityData.forEach(station => {
  const point = {
    type: "point",
    longitude: station.longitude,
    latitude: station.latitude
  };

  const attributes = {
    featureType: "Air Quality Station",
    name: station.name,
    AQI: station.AQI,
    PM25: station.PM25
  };

  const symbol = {
    type: "simple-marker",
    color: "red",
    size: "10px"
  };

  const popupTemplate = {
    title: "{name}",
    content: `
      <b>Type:</b> {featureType}<br>
      <b>AQI:</b> {AQI}<br>
      <b>PM2.5:</b> {PM25}<br>
      <b>Longitude:</b> {longitude}<br>
      <b>Latitude:</b> {latitude}
    `
  };

  const graphic = new Graphic({
    geometry: point,
    symbol: symbol,
    attributes: {...attributes, longitude: station.longitude, latitude: station.latitude},
    popupTemplate: popupTemplate
  });

  airLayer.add(graphic);
});


const layerList = new LayerList({ view });
view.ui.add(layerList, "top-right");

const basemapGallery = new BasemapGallery({ view });
view.ui.add(basemapGallery, "bottom-right");

