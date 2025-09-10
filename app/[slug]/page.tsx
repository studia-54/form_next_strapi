import { DynamicForm } from '@/components/dynamic-form/DynamicForm'
import { Form, Locale } from '@/types/types'
import { fetchFields } from '@/app/api/getData'
import { notFound } from 'next/navigation'
import { createBitrix } from '@/shared/BitrixClient'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
type Params = Promise<{ slug: string }>

const bitrixLocaleIdMap: Record<string, number> = {
  ru: 5402,
  en: 5405,
}

export default async function ({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const resolvedParams = await params

  const { slug } = resolvedParams

  const locale = (await searchParams.then((params) => params.locale as Locale)) || 'ru'

  const fields: Form = await fetchFields(slug, locale).catch((error) => {
    alert(`Ошибка получения полей формы: ${error}`)
  })

  if (!slug || !fields) return notFound()

  const handleSubmit = async (data: Record<string, any>, params: Record<string, string>, fields: Form) => {
    'use server'

    const bitrixClient = createBitrix()

    fields.actions.forEach(async (action) => {
      if (action.__component === 'bitrix-actions.save-in-deal') {
        const { deal_id_property_name, fields: action_fields } = action

        const bitrix_deal_id = params[deal_id_property_name]

        if (!bitrix_deal_id) {
          return
        }

        const computed_data = Object.fromEntries(
          action_fields.map(({ bitrix_field_key, form_option_key }) => [bitrix_field_key, data[form_option_key]])
        )

        computed_data['UF_CRM_1757074629'] = new Date().toISOString()
        computed_data['UF_CRM_1757074784'] = bitrixLocaleIdMap[params['locale']]

        await bitrixClient.changeDealById(bitrix_deal_id, computed_data)
      }

      if (action.__component === 'bitrix-actions.add-comment-to-deal') {
        const { deal_id_property_name, comment } = action
        const bitrix_deal_id = params[deal_id_property_name]

        if (!bitrix_deal_id) {
          return
        }

        await bitrixClient.addCommentToDeal({
          fields: {
            ENTITY_TYPE: 'deal',
            ENTITY_ID: bitrix_deal_id,
            COMMENT: comment,
          },
        })
      }

      if (action.__component === 'bitrix-actions.sent-to-google-sheets') {
        const { google_sheet_url } = action

        await fetch(google_sheet_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, ...params }),
        }).catch((err) => {
          console.error(err)
        })
      }
    })
  }

  return (
    <>
      <DynamicForm fields={fields} afterSubmit={handleSubmit} locale={locale} />
    </>
  )
}
