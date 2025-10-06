import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import {Card, CardType} from '../Card'
import { CustomTextField } from '../../../Components/Input/CustomTextField'
import { Grid } from '@mui/material'

const RESOURCE = 'card'
export function CardEdit() {
    const cardId = useParams().id
    const [card, setCard] = useState<CardType>({} as CardType)
    const [initialData, setInitialData] = useState<CardType>({} as CardType)
    const getCard = async () => {
        try {
            let response = await DataProvider.get<CardType>(`card/${cardId}/`)
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
            resource={RESOURCE}
            label={'آیدی'}
            defaultValue={card.id}
        />,
        <CustomTextField
            key={card.id}
            name="created_at"
            disabled={true}
            resource={RESOURCE}
            label={'تاریخ ایجاد'}
            defaultValue={card.created_at}
        />,
        <CustomTextField
            key={card.id}
            name="updated_at"
            disabled={true}
            resource={RESOURCE}
            label={'تاریخ ویرایش'}
            defaultValue={card.updated_at}
        />,
    ]
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش کارت"
            formDetails={card}
            initialData={initialData}
            isFormData
        >
            <Card card={card} setCard={setCard} children={element} />
        </EditPage>
    )
}
