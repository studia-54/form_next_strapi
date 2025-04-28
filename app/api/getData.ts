import { fields } from '@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js'
import qs from 'qs'
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const NEXT_PUBLIC_STRAPI_KEY = process.env.NEXT_PUBLIC_STRAPI_KEY
import { Locale } from '@/types/types'

export const fetchFields = async (slug: string, locale: Locale) => {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: `${slug}`,
        },
      },
      locale: locale,
      fields: ['title', 'subtitle', 'slug', 'submitButton', 'markdownSubmitMessage'],
      populate: {
        questions: {
          fields: ['title', 'placeholder', 'type', 'required'],
          populate: {
            options: {
              populate: {
                image: {
                  fields: ['url', 'alternativeText'],
                },
              },
            },
          },
        },
        actions: {
          on: {
            'bitrix-actions.save-in-deal': {
              /**
               * todo:
               * Не использовать * в запросе.
               * Добавить fields и токлько необходимые поля в populate
               */
              populate: '*',
            },
            'bitrix-actions.add-comment-to-deal': {
              populate: '*',
            },
            'bitrix-actions.sent-to-google-sheets': {
              populate: '*',
            },
          },
        },
      },
      status: 'published',
    },
    { encodeValuesOnly: true }
  )

  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/forms?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NEXT_PUBLIC_STRAPI_KEY}`,
      },
    })

    const data = await response.json()

    const resData = data.data[0]

    return resData
  } catch (error) {
    console.error('Error fetching form fields:', error)
  }
}
