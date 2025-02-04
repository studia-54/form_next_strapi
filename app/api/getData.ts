const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const NEXT_PUBLIC_STRAPI_KEY = process.env.NEXT_PUBLIC_STRAPI_KEY

export const fetchFields = async (slug: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/forms?filters[slug][$eq]=${slug}&fields[0]=title&fields[1]=slug&fields[2]=submitButton&fields[3]=successfullyMessage&populate[questions][fields][0]=title&populate[questions][fields][1]=placeholder&populate[questions][fields][2]=type&populate[questions][fields][3]=required&populate[questions][populate][options][populate][image][fields][0]=url&populate[questions][populate][options][populate][image][fields][1]=alternativeText&status=published`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NEXT_PUBLIC_STRAPI_KEY}`
      },
    });

    const data = await response.json();

    const resData = data.data[0];

    return resData;

  } catch (error) {
    console.error('Error fetching form fields:', error);
  }
};