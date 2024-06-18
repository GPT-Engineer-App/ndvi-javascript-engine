import { useEffect } from "react";
import { Container, Text, VStack } from "@chakra-ui/react";
import ee from "@google/earthengine";

const Index = () => {
  useEffect(() => {
    // Initialize the Earth Engine API
    ee.initialize();

    // Define a function to calculate NDVI
    const calculateNDVI = () => {
      // Load a Landsat 8 image
      const image = ee.Image("LANDSAT/LC08/C01/T1_SR/LC08_044034_20140318");

      // Select the bands for calculating NDVI
      const nir = image.select("B5");
      const red = image.select("B4");

      // Calculate NDVI
      const ndvi = nir.subtract(red).divide(nir.add(red)).rename("NDVI");

      // Print the result to the console
      ndvi.getInfo((info) => {
        console.log("NDVI Info:", info);
      });
    };

    // Call the function to calculate NDVI
    calculateNDVI();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">NDVI Calculation with Google Earth Engine</Text>
        <Text>Check the console for NDVI calculation results.</Text>
      </VStack>
    </Container>
  );
};

export default Index;