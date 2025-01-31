const POST_API_URL = process.env.POST_API_URL
const STRAPI_KEY = process.env.STRAPI_KEY

export const postFields = async (url ="", data = {}) => {
    try {
       const response = await fetch(url, {
         method: "POST",
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${STRAPI_KEY}`
           },
           
          body: JSON.stringify(data)
          })

        const data = await response.json()

        return data
      }
      
     catch (error) {
      console.error('Error posting form fields:', error);
    }
  };