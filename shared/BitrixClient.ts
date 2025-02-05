import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

// Определяем типы данных, используемых в запросах к Bitrix
interface BitrixContact {
  fields: Record<string, any>
}

interface BitrixDeal {
  fields: Record<string, any>
}

interface BitrixDealComment {
  fields: Record<string, any>
}

interface BitrixResponse<T> {
  result: T
}

// Bitrix API методы
export const createBitrix = () => {
  const client: AxiosInstance = axios.create({
    baseURL: process.env.BITRIX_HOOK_URL,
  })

  /**
   * Добавление контакта в Bitrix24
   * @param params Параметры контакта
   * @returns ID созданного контакта или 0 в случае ошибки
   */
  const addContact = async (params: Partial<BitrixContact>): Promise<number> => {
    try {
      const { data }: AxiosResponse<BitrixResponse<number>> = await client.post('/crm.contact.add.json?', params)
      return data.result
    } catch (error) {
      handleError(error, 'Bitrix Add Contact Error')
      return 0
    }
  }

  /**
   * Добавление сделки в Bitrix24
   * @param params Параметры сделки
   * @returns ID созданной сделки или 0 в случае ошибки
   */
  const addDeal = async (params: Partial<BitrixDeal>): Promise<number> => {
    try {
      const { data }: AxiosResponse<BitrixResponse<number>> = await client.post('/crm.deal.add.json?', params)
      return data.result
    } catch (error) {
      handleError(error, 'Bitrix Add Deal Error')
      return 0
    }
  }

  /**
   * Добавление комментария к сделке
   * @param params Параметры комментария
   * @returns ID комментария или 0 в случае ошибки
   */
  const addCommentToDeal = async (params: Partial<BitrixDealComment>): Promise<number> => {
    try {
      const { data }: AxiosResponse<BitrixResponse<number>> = await client.post(
        '/crm.timeline.comment.add.json?',
        params
      )
      return data.result
    } catch (error) {
      handleError(error, 'Bitrix Add Comment to Deal Error')
      return 0
    }
  }

  /**
   * Изменение сделки по ID
   * @param dealId ID сделки
   * @param fields Поля для обновления
   * @returns ID обновленной сделки или 0 в случае ошибки
   */
  const changeDealById = async (dealId: string | number, fields: Partial<BitrixDeal['fields']>): Promise<number> => {
    try {
      const { data }: AxiosResponse<BitrixResponse<number>> = await client.post(`/crm.deal.update.json?ID=${dealId}`, {
        fields,
      })
      return data.result
    } catch (error) {
      handleError(error, 'Bitrix Change Deal by ID Error')
      return 0
    }
  }

  /**
   * Универсальный обработчик ошибок
   * @param error Ошибка Axios
   * @param message Сообщение ошибки
   */
  const handleError = (error: unknown, message: string): void => {
    if (error instanceof AxiosError) {
      console.error(`${message}:`)
      console.error(error.response?.data)
    } else {
      console.error(error)
    }
  }

  return {
    addContact,
    addDeal,
    addCommentToDeal,
    changeDealById,
  }
}
