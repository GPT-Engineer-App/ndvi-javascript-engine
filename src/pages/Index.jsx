import { useEffect } from "react";
import { Container, Text, VStack } from "@chakra-ui/react";

const Index = () => {
  useEffect(() => {
    // Load the Google Earth Engine API
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      window.gapi.load("client", initializeGEE);
    };
    document.body.appendChild(script);

    const initializeGEE = () => {
      window.gapi.client
        .init({
          apiKey: "YOUR_API_KEY", // Replace with your actual API key
          discoveryDocs: ["https://earthengine.googleapis.com/$discovery/rest?version=v1"],
        })
        .then(() => {
          window.ee = window.gapi.client;
          calculateNDVI();
        })
        .catch((error) => {
          console.error("Error initializing Google Earth Engine", error);
        });
    };

    const calculateNDVI = () => {
      // Example NDVI calculation script
      const image = window.ee.Image("LANDSAT/LC08/C01/T1_SR/LC08_044034_20140318");
      const ndvi = image.normalizedDifference(["B5", "B4"]).rename("NDVI");
      console.log("NDVI Image:", ndvi);
    };
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