import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'

export type TicketCategoriesType = {
    "id": number,
    "name": string,
    "slug": string,
    "description": string,
    "is_active": boolean,
    "ticket_count": number,
    "created_at": string

}
const RESOURCE = 'ticket-categories'

export function TicketCategories({
    ticketCategories,
    setTicketCategories,
}: {
    ticketCategories: TicketCategoriesType
    setTicketCategories: React.Dispatch<React.SetStateAction<TicketCategoriesType>>
}) {


    return (
        <Stack>
            {ticketCategories && (
                <GridProducer
                    sx={{marginBottom: '16px'}}
                    data={[

                        <CustomTextField
                            name="name"
                            setData={setTicketCategories}
                            resource={RESOURCE}
                            label={'نام'}
                            defaultValue={ticketCategories.name}
                        />,
                         <CustomTextField
                            name="slug"
                            setData={setTicketCategories}
                            resource={RESOURCE}
                            label={'نام لاتین'}
                            defaultValue={ticketCategories.slug}
                        />,
                         <CustomTextField
                            name="description"
                            setData={setTicketCategories}
                            resource={RESOURCE}
                            label={'توضیحات'}
                            defaultValue={ticketCategories.description}
                        />,
          <FormControl fullWidth>
            <InputLabel>وضعیت</InputLabel>

            <Select
            key={ticketCategories.id}
              value={ticketCategories.is_active ? 'true' : 'false'}
              label="وضعیت"
              onChange={(e: SelectChangeEvent) => {
                const value = e.target.value === 'true';
                setTicketCategories((prev) => ({
                  ...prev,
                  is_active: value,
                }));
              }}
            >
              <MenuItem value="true">فعال</MenuItem>
              <MenuItem value="false">غیرفعال</MenuItem>
            </Select>
          </FormControl>
                       
                       
                   
                       
                    ]}
                />
            )}
          
        </Stack>
    )
}
