import ee from "@google/earthengine";

export const loadEarthEngine = async () => {
  return new Promise((resolve, reject) => {
    ee.data.authenticateViaOauth(() => {
      ee.initialize(null, null, resolve, reject);
    }, reject);
  });
};