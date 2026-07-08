import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import { OrdersTransactions, OrdersTransactionsType } from '../OrdersTransactions'

export function OrdersTransactionsEdit({resource}:{resource:string}) {
    const orderId = useParams().id
    const [order, setOrder] = useState<OrdersTransactionsType>({} as OrdersTransactionsType)
    const [initialData, setInitialData] = useState<OrdersTransactionsType>({} as OrdersTransactionsType)
    useEffect(() => {
        const getOrder = async () => {
            try {
                let response = await DataProvider.get<OrdersTransactionsType>(`${resource}/${orderId}/`)
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
            <OrdersTransactions order={order} setOrder={setOrder} />
        </EditPage>
    )
}
