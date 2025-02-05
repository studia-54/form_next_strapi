import { DynamicForm } from '@/components/dynamic-form/DynamicForm'
import { Form } from '@/types/types'
import { fetchFields } from '@/app/api/getData'
import { notFound } from 'next/navigation'
import { createBitrix } from '@/shared/BitrixClient'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
type Params = Promise<{ slug: string }>

export default async function ({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { slug } = await params
  const fields: Form = await fetchFields(slug).catch((error) => {
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

        await bitrixClient.changeDealById(bitrix_deal_id, computed_data)
        await bitrixClient.addCommentToDeal({
          fields: {
            ENTITY_TYPE: 'deal',
            ENTITY_ID: bitrix_deal_id,
            COMMENT: `[b][color=red][Маркетинг NPS][/color][/b] [color=green]✅ Клиент отправил отзыв! ✅[/color]`,
          },
        })
      }
    })
  }

  return (
    <>
      <DynamicForm fields={fields} afterSubmit={handleSubmit} />
    </>
  )
}
