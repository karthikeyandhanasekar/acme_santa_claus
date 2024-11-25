import { post } from "../apiServices/apiServices";

export const loginController = async (formData) => {
  try {
    // Validate and sanitize input data
    if (!formData || typeof formData !== "object") {
      throw new Error("Invalid form data");
    }
    const { email, password } = formData;
    // Prepare the body object with sanitized data
    const body = {
      mail: email.trim(),
      password: password.trim(),
    };
    // Send the POST request to the user API endpoint
    const response = await post("/auth/login", body);
    // Return the response data
    return response;
  } catch (error) {
    throw error;
  }
};

export const employeeRegistrationController = async (formData) => {
  try {
    // Validate and sanitize input data
    if (!formData || typeof formData !== "object") {
      throw new Error("Invalid form data");
    }
    const { name, email, mobile, password } = formData;
    // Prepare the body object with sanitized data
    const body = {
      name: name.trim(),
      mail: email.trim(),
      phone: Number(mobile.trim()),
      password: password.trim(),
    };
    
    // Send the POST request to the user API endpoint
    const response = await post("/employees", body);
    // Return the response data
    return response;
  } catch (error) {
    throw error;
  }
};
