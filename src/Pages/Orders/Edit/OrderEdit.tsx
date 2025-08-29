import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Orders, OrdersType} from '../Orders'

const RESOURCE = 'shop/orders'
export function OrderEdit() {
    const state = useLocation().state as {row: OrdersType}
    const [order, setOrder] = useState(state.row)
    return (
        <EditPage
            resource={RESOURCE}
            title="تغییر وضعیت"
            formDetails={order}
            initialData={state.row}
            redirect={'orders'}
        >
            <Orders order={order} setOrder={setOrder} />
        </EditPage>
    )
}
