import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import { TicketCategories, TicketCategoriesType } from '../TicketCategories'

const RESOURCE = 'ticket-categories'
export function TicketCategoriesEdit() {
    const state = useLocation().state as {row: TicketCategoriesType}
    const [ticketCategories, setTicketCategories] = useState(state.row)
   
    return (
        <EditPage
            resource={RESOURCE}
            title="جزئیات دسته بندی تیکت ها"
            formDetails={ticketCategories}
            initialData={state.row}
            isFormData={true}
        >
            <TicketCategories ticketCategories={ticketCategories} setTicketCategories={setTicketCategories}  />
        </EditPage>
    )
}
