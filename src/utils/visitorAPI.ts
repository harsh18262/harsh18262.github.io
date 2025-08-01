export const triggerVisitorAPI = async (projectId: string) => {
  try {
    const VisitorAPI = require("visitorapi");
    const data = await VisitorAPI(projectId);
    
    // Do whatever you need with the data
    // analytics.track('visitor_detected', data);
    // sendToBackend(data);
    
    return data;
  } catch (error) {
    console.error('VisitorAPI Error:', error);
    throw error;
  }
};