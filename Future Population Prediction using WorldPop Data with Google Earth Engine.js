// Future Population Prediction using WorldPop Data with Google Earth Engine
var worldPop: ImageCollection "WorldPop Global Project Population Data: Estimated Residential Population per 100x100m Grid Square" // Import WoldPop data
var roi: Table "projects/ee-scholarhasnain5/assets/Gaza-Strip"  // Import Study area 

// Population data visualization
var popVis = { min: 0, max: 100, palette: ['white', 'blue', 'green', 'yellow', 'red'] };

// population data from worldpop
var gazaPop = worldPop.filterBounds(roi).filter(ee.Filter.eq('country', 'PSE')).map(function(feat){
  return feat.clip(roi); // Clip data to only study area
});
print(gazaPop); // Print all the population data
Map.addLayer(gazaPop.sort('system:time_start', false).first(), popVis, 'Gaza-Strip Population 2020'); // Show 2020 data
Map.centerObject(roi, 10);
// Year band
var popYearBand = gazaPop.map(function(image){
  var yearBand = ee.Image(ee.Number(image.get('year'))).rename('year');
  return image.addBands(yearBand).select(['year', 'population']).toUint32();
});

// Linear regression
var regression = popYearBand.reduce(ee.Reducer.linearFit());

// Predict 2030
var pop2030 = regression.select('scale').multiply(2030).add(regression.select('offset'));
Map.addLayer(pop2030, popVis, 'Gaza-Strip Population 2030 Prediction'); // Show 2030 data

// Predict 2040
var pop2040 = regression.select('scale').multiply(2040).add(regression.select('offset'));
Map.addLayer(pop2040, popVis, 'Gaza-Strip Population 2040 Prediction'); // Show 2040 data

// Export the population data to Google Drive
Export.image.toDrive({
  image: pop2030,
  description: 'WorldPop_Population_2030',
  folder: 'GEE_Exports', // Change this to your desired folder
  scale: 100, // Resolution in meters
  region: roi,
  fileFormat: 'GeoTIFF',
  maxPixels: 1e13 // Adjust for larger areas
});
 Export.image.toDrive({
  image: pop2040,
  description: 'WorldPop_Population_2040',
  folder: 'GEE_Exports', // Change this to your desired folder
  scale: 100, // Resolution in meters
  region: roi,
  fileFormat: 'GeoTIFF',
  maxPixels: 1e13 // Adjust for larger areas
});
