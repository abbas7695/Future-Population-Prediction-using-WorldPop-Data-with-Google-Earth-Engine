
# Future Population Prediction Using WorldPop Data in Google Earth Engine

## Author

**Hasnain Abbas**
PhD Scholar | Research Interest: SDG 11, Cartography, GIS&RS, GeoAI & its Applications in Land Changes

## Overview

This repository presents a **Google Earth Engine (GEE)–based workflow** for **future population prediction** using **WorldPop gridded population data**. The script demonstrates how to model historical population trends and generate **pixel-level population projections** for future years using **linear regression**.

The methodology is applied to the **Gaza Strip** as a case study, but the workflow is fully transferable to any region supported by WorldPop data.

---

## Objectives

* Extract historical population counts from **WorldPop (100 m resolution)**
* Perform **pixel-wise temporal trend analysis**
* Predict future population distributions for **2030 and 2040**
* Export predicted population rasters for further analysis in GIS or Python

---

## Dataset

**WorldPop Global Population Dataset**

* Source: `WorldPop/GP/100m/pop`
* Spatial resolution: **~100 meters**
* Data type: **Population counts per pixel**
* Temporal coverage: Annual population estimates

**Study Area**

* Gaza Strip (imported as a FeatureCollection asset)

---

## Methodology

1. **Data Import**

   * Load WorldPop population ImageCollection
   * Import study area boundary (ROI)

2. **Preprocessing**

   * Filter population data by spatial extent and country code
   * Clip population rasters to the study area

3. **Temporal Feature Engineering**

   * Extract year information from image metadata
   * Add year as a numeric band to each population image

4. **Trend Modeling**

   * Apply **linear regression** (`ee.Reducer.linearFit`) at the pixel level
   * Model population growth trends over time

5. **Future Population Prediction**

   * Generate population projections for:

     * **2030**
     * **2040**

6. **Export**

   * Export predicted population rasters as **GeoTIFF**
   * Native resolution preserved (100 m)

---

## Script Description

The script performs the following key operations:

* Visualizes historical population distribution
* Computes a linear population growth model
* Predicts future population counts
* Displays and exports predicted rasters

Predicted outputs:

* `WorldPop_Population_2030.tif`
* `WorldPop_Population_2040.tif`

---

## Visualization

Population layers are visualized using a multi-color gradient:

* White → Blue → Green → Yellow → Red
  Representing increasing population counts per pixel.

---

## Export Settings

* Format: **GeoTIFF**
* Spatial resolution: **100 meters**
* Projection: Native WorldPop projection
* Export destination: Google Drive (`GEE_Exports` folder)

---

## Applications

This workflow is suitable for:

* Urban growth analysis
* Post-conflict population assessment
* Accessibility and service-demand modeling
* SDG 11 (Sustainable Cities and Communities)
* GeoAI-driven spatial forecasting

---

## Requirements

* Google Earth Engine account
* Access to WorldPop datasets
* ROI uploaded as a GEE asset (or replaced with any boundary dataset)

---

## How to Use

1. Copy the script into the **Google Earth Engine Code Editor**
2. Replace the ROI with your own study area if needed
3. Run the script
4. Export predicted rasters from the Tasks tab

---

## Citation

If you use this workflow in academic work, please cite:

> WorldPop ([www.worldpop.org](http://www.worldpop.org)), School of Geography and Environmental Science, University of Southampton.

---


