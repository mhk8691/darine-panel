import { FormControl,InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import { priorityLabel } from './List/TicketList'
import ChatDetail from './ChatDetail'

export type TikcetStatusType = 'answered' | 'resolved' | 'closed' | 'in_progress' | 'pending' | 'open'
export type PriorityType = 'low' | 'medium' | 'high' | 'urgent'
export type TicketType = {
    "id": number,
    "tracking_code": string,
    description:string
    "title": string,
    "category_name": string,
    "user_full_name": string,
    "user_mobile": string,
    "status": TikcetStatusType,
    "priority": PriorityType,
    "last_message_user_type": string,
    "unread_admin_count": number,
    "last_activity_at": string


}
const RESOURCE = 'tickets'

export function Ticket({
    ticket,
    setTicket,
}: {
    ticket: TicketType
    setTicket: React.Dispatch<React.SetStateAction<TicketType>>
}) {


    return (
        <Stack>
            {ticket && (
                <GridProducer
                    sx={{marginBottom: '16px'}}
                    data={[
                          <CustomTextField
                                name="id"
                                setData={setTicket}
                                resource={RESOURCE}
                                label={'آیدی'}
                                defaultValue={ticket.id}
                                disabled
                            />, 
                             <CustomTextField
                                name="tracking_code"
                                setData={setTicket}
                                resource={RESOURCE}
                                label={'کد پیگیری'}
                                defaultValue={ticket.tracking_code}
                                disabled
                            />, 
                             <CustomTextField
                                name="title"
                                setData={setTicket}
                                resource={RESOURCE}
                                label={'عنوان'}
                                defaultValue={ticket.title}
                                disabled
                            />, 
                             <CustomTextField
                                name="description"
                                setData={setTicket}
                                resource={RESOURCE}
                                label={'توضیحات'}
                                defaultValue={ticket.description}
                                disabled
                            />, 
                              <CustomTextField
                                name="priority"
                                setData={setTicket}
                                resource={RESOURCE}
                                label={'اولویت'}
                                defaultValue={priorityLabel[ticket.priority]}
                                disabled
                            />, 
                       
                  
      <FormControl fullWidth>
  <InputLabel>وضعیت</InputLabel>

  <Select
    key={ticket.id}
    value={ticket.status}
    label="وضعیت"
    onChange={(e: SelectChangeEvent<TikcetStatusType>) => {
      setTicket((prev) => ({
        ...prev,
        status: e.target.value as TikcetStatusType,
      }));
    }}
  >
    <MenuItem value="in_progress">در حال بررسی</MenuItem>
    <MenuItem value="answered">پاسخ داده شده</MenuItem>
    <MenuItem value="resolved">حل شده</MenuItem>
    <MenuItem value="closed">بسته شده</MenuItem>
  </Select>
</FormControl>
                       
                       
                   
                       
                    ]}
                />
            )}
            <ChatDetail ticketId={ticket.id.toString()} />
          
        </Stack>
    )
}
