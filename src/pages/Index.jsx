import { useEffect } from "react";
import { Container, Text, VStack } from "@chakra-ui/react";
// Import the Earth Engine API
import { loadEarthEngine } from "../utils/earthEngine";

const Index = () => {
  useEffect(() => {
    const initializeEE = async () => {
      try {
        await loadEarthEngine();

        // Import the satellite image
        const image = ee.Image("LANDSAT/LC08/C01/T1_SR/LC08_044034_20140318");

        // Select the NIR and Red bands
        const nir = image.select("B5");
        const red = image.select("B4");

        // Calculate the NDVI
        const ndvi = nir.subtract(red).divide(nir.add(red)).rename("NDVI");

        // Define visualization parameters
        const ndviParams = {
          min: -1,
          max: 1,
          palette: ["blue", "white", "green"],
        };

        // Add the NDVI layer to the map
        const map = new ee.Map();
        map.centerObject(image, 9);
        map.addLayer(ndvi, ndviParams, "NDVI");

        // Render the map
        map.render(document.getElementById("map"));
      } catch (error) {
        console.error("Error initializing Earth Engine", error);
      }
    };

    initializeEE();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">NDVI Calculation with Google Earth Engine</Text>
        <Text>Visualize the NDVI result on the map below.</Text>
        <div id="map" style={{ width: "100%", height: "500px" }}></div>
      </VStack>
    </Container>
  );
};

export default Index;