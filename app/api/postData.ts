const POST_API_URL = process.env.POST_API_URL
const STRAPI_KEY = process.env.STRAPI_KEY

export const postFields = async (data) => {
    try {
       const response = await fetch(`${POST_API_URL}`, {
         method: "POST",
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${STRAPI_KEY}`
           },
           
          body: JSON.stringify(
            data
          )
        })

        const responseData = await response.json()

        return responseData
      }
      
     catch (error) {
      console.error(error);
    }
  };