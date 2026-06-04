import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import { GiftCards, GiftCardType } from '../GiftCards'

const RESOURCE = 'gift-cards'
export function GiftCardEdit() {
    const giftCardId = useParams().id
    const [giftCard, setGiftCard] = useState<GiftCardType>({} as GiftCardType)
    const [initialData, setInitialData] = useState<GiftCardType>({} as GiftCardType)
    useEffect(() => {
        const getGiftCard = async () => {
            try {
                let response = await DataProvider.get<GiftCardType>(`${RESOURCE}/${giftCardId}/`)
                if (response) {
                    setGiftCard(response.data)
                    setInitialData(response.data)
                }
            } catch (error: any) {
                console.log(error)
            }
        }
        getGiftCard()
    }, [giftCardId])
    return (
        <EditPage
            resource={RESOURCE}
            title="جزئیات کارت هدیه"
            formDetails={giftCard}
            initialData={initialData}
        >
            <GiftCards giftCard={giftCard} setGiftCard={setGiftCard} />
        </EditPage>
    )
}
