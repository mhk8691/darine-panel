import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
// import {Order} from '../Detail/OrderDetail'
import {Orders, OrdersType} from '../Orders'

export function OrderEdit({resource}:{resource:string}) {
    const orderId = useParams().id
    const [order, setOrder] = useState<OrdersType>({} as OrdersType)
    const [initialData, setInitialData] = useState<OrdersType>({} as OrdersType)
    useEffect(() => {
        const getOrder = async () => {
            try {
                let response = await DataProvider.get<OrdersType>(`${resource}/${orderId}/`)
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
            <Orders order={order} setOrder={setOrder} />
        </EditPage>
    )
}
