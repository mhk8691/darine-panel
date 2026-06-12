import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {CustomTextField} from '../../../Components/Input/CustomTextField'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import {formatDate} from '../../../Core/FormatDate'
import { BankCard, CardType } from '../BankCard'

export function BankCardEdit({resource}:{resource:string}) {
    const cardId = useParams().id
    const [card, setCard] = useState<CardType>({} as CardType)
    const [initialData, setInitialData] = useState<CardType>({} as CardType)
    const getCard = async () => {
        try {
            let response = await DataProvider.get<CardType>(`${resource}/${cardId}/`)
            if (response) {
                setCard(response.data)
                setInitialData(response.data)
            }
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCard()
    }, [cardId])
    const element = [
        <CustomTextField
            key={card.id}
            name="id"
            disabled={true}
            resource={resource}
            label={'آیدی'}
            defaultValue={card.id}
        />,
        <CustomTextField
            key={card.id}
            name="created_at"
            disabled={true}
            resource={resource}
            label={'تاریخ ایجاد'}
            defaultValue={formatDate(card.created_at)}
        />,
      
    ]
    return (
        <EditPage
            resource={resource}
            title="جزئیات کارت"
            formDetails={card}
            initialData={initialData}
            isFormData
        >
            <BankCard card={card} setCard={setCard} children={element} resource={resource} />
        </EditPage>
    )
}
