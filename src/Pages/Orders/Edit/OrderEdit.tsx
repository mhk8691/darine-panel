import {useEffect, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Orders, OrdersType} from '../Orders'
import {DataProvider} from '../../../Core/DataProvider'
import {Order} from '../Detail/OrderDetail'

const RESOURCE = 'shop/orders'
export function OrderEdit() {
    const orderId = useParams().id
    const [order, setOrder] = useState<Order>({} as Order)
    const [initialData, setInitialData] = useState<Order>({} as Order)
    useEffect(() => {   
        const getOrder = async () => {
            try {
                let response = await DataProvider.get<Order>(`shop/orders/${orderId}/`)
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
            resource={RESOURCE}
            title="جزئیات سفارش"
            formDetails={order}
            initialData={initialData}
            redirect={'orders'}
        >
            <Orders order={order} setOrder={setOrder} />
        </EditPage>
    )
}
