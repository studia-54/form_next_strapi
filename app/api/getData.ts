const API_URL = process.env.API_URL
const STRAPI_KEY = process.env.STRAPI_KEY

export const fetchFields = async () => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${STRAPI_KEY}`
          },
      })

      const data = await response.json();

      

      const resData = data.data[0]

      return resData
      
    } catch (error) {
      console.error('Error fetching form fields:', error);
    }
  };