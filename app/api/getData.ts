const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const NEXT_PUBLIC_STRAPI_KEY = process.env.NEXT_PUBLIC_STRAPI_KEY

export const fetchFields = async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/forms?filters[slug][$eq]=form&fields[0]=title&fields[1]=slug&populate[questions][populate][options][populate][image][fields][0]=url&populate[questions][populate][options][populate][image][fields][1]=alternativeText`, {
        method: "GET",
        headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${NEXT_PUBLIC_STRAPI_KEY}`
          },
      })

      const data = await response.json();

      const resData = data.data[0]

      return resData
      
    } catch (error) {
      console.error('Error fetching form fields:', error);
    }
  };