import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import {Card, CardType} from '../Card'

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
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش کارت"
            formDetails={card}
            initialData={initialData}
            isFormData
        >
            <Card card={card} setCard={setCard} />
        </EditPage>
    )
}
