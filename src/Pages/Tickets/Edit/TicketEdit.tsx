import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import { Ticket, TicketType } from '../Ticket'

const RESOURCE = 'tickets'
export function TicketEdit() {
    const state = useLocation().state as {row: TicketType}
    const [ticket, setTicket] = useState(state.row)
   
    return (
        <EditPage
            resource={RESOURCE}
            title="جزئیات تیکت"
            formDetails={ticket}
            initialData={state.row}
            isFormData={true}
        >
            <Ticket ticket={ticket} setTicket={setTicket}  />
        </EditPage>
    )
}
