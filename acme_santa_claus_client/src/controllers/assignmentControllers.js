import { filePost, get } from "../apiServices/apiServices";

export const uploadEmployeeFileController = async (file) => {
  try {
    // Validate and sanitize input data
    if (!file || typeof file !== "object") {
      throw new Error("Invalid file data");
    }
    const formData = new FormData();
    formData.append("file", file);
    // Send the POST request to the user API endpoint
    const response = await filePost("/gift/upload", formData);
    // Return the response data
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAvailableYearsController = async () => {
  try {
    // Send the POST request to the user API endpoint
    const response = await get("/gift/availableYears");
    // Return the response data
    return response;
  } catch (error) {
    throw error;
  }
};

export const getYearlyDataController = async (year) => {
  try {    
    // Send the POST request to the user API endpoint
    const response = await get(`/gift/${year}`);
    // Return the response data
    return response;
  } catch (error) {
    throw error;
  }
};
