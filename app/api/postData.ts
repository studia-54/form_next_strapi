import { Form } from "@/types/types";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const NEXT_PUBLIC_STRAPI_KEY = process.env.NEXT_PUBLIC_STRAPI_KEY

export const postFields = async (data: Form ) => {
    try {
       const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/get-forms-data`, {
         method: "POST",
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${NEXT_PUBLIC_STRAPI_KEY}`
           },
          body: JSON.stringify({
            data: {
              json: {data}
            }
          }
          )
        })

        const resData = await response
        console.log(resData)

        return resData
        
      }
      
     catch (error) {
      console.error(error);
    }
  };