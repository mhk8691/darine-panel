import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import { OrdersType } from '../../Orders/Orders'
import { SilverOrders } from '../SilverOrders'
// import {Order} from '../Detail/OrderDetail'

const RESOURCE = 'silver-orders'
export function SilverOrderEdit() {
    const orderId = useParams().id
    const [order, setOrder] = useState<OrdersType>({} as OrdersType)
    const [initialData, setInitialData] = useState<OrdersType>({} as OrdersType)
    useEffect(() => {
        const getOrder = async () => {
            try {
                let response = await DataProvider.get<OrdersType>(`${RESOURCE}/${orderId}/`)
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
            <SilverOrders order={order} setOrder={setOrder} />
        </EditPage>
    )
}
