import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import { MarginTrade, MarginTradeType } from '../MarginTrade'

export function MarginTradeEdit({resource}:{resource:string}) {
    const orderId = useParams().id
    const [order, setOrder] = useState<MarginTradeType>({} as MarginTradeType)
    const [initialData, setInitialData] = useState<MarginTradeType>({} as MarginTradeType)
    useEffect(() => {
        const getOrder = async () => {
            try {
                let response = await DataProvider.get<MarginTradeType>(`${resource}/${orderId}/`)
                if (response) {
                    setOrder(response.data)
                    setInitialData(response.data)
                }
            } catch (error: any) {
                console.log(error)
            }
        }
        getOrder()
    }, [orderId])
    return (
        <EditPage
            resource={resource}
            title="جزئیات سفارش"
            formDetails={order}
            initialData={initialData}
        >
            <MarginTrade order={order} setOrder={setOrder} />
        </EditPage>
    )
}
