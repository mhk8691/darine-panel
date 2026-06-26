import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from '@mui/material'
import 'iranianbanklogos/dist/ibl.css'
import {GridProducer} from '../../Components/Table/GridProducer'
import { CustomTextField } from '../../Components/Input/CustomTextField'

export type OffsetType = {
      "id": number,
    "offset_amount": string,
    "is_active": boolean,
    "set_by_mobile": string,
    "created_at": string,
    "updated_at": string
}


export function Offset({
    offset,
    setOffset,
    resource
}: {
    offset: OffsetType
    setOffset: React.Dispatch<React.SetStateAction<OffsetType>>
    children?: React.ReactNode[]
    resource:string
}) {
    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                          <CustomTextField
                        key={offset.id}
                        name="offset_amount"
                        setData={setOffset}
                        resource={resource}
                        label={'قیمت'}
                        defaultValue={offset.offset_amount}
                    />,
      <FormControl fullWidth>
        <InputLabel>وضعیت</InputLabel>

        <Select
            value={String(offset.is_active)}
          label="وضعیت"
          onChange={(event: SelectChangeEvent) =>
            setOffset((prev) => ({
              ...prev,
              is_active: event.target.value === 'true' ? true :false,
            }))
          }
        >
          <MenuItem value="true">
            فعال
          </MenuItem>

          <MenuItem value="false">
           غیر فعال
          </MenuItem>
        </Select>
      </FormControl>
                ]}
            />
        </Stack>
    )
}
