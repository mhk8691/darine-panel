import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { CustomTextField } from '../../Components/Input/CustomTextField'
import { GridProducer } from '../../Components/Table/GridProducer'
import { formatDate } from '../../Core/FormatDate'
import { formatPrice } from '../../Core/FormatPrice'

export type GiftCardType = {
    "id": number,
    "created_by_name": string,
    "activated_by_name": string,
    "serial_number": string,
    "weight": string,
    "status": "USED" | 'ACTIVE',
    "is_used": boolean,
    "created_at": string,
}

export function GiftCards({
    giftCard,
    setGiftCard,
}: {
    giftCard: GiftCardType
    setGiftCard: React.Dispatch<React.SetStateAction<GiftCardType>>
}) {
    const [isOpen, setIsOpen] = useState<number | null>(null)

   

   const data = useMemo(
  () => [
    <CustomTextField
      key={giftCard.id}
      name="id"
      disabled
      label="آیدی"
      defaultValue={giftCard.id}
    />,

    <CustomTextField
      key={giftCard.id}
      name="serial_number"
      disabled
      label="شماره سریال"
      defaultValue={giftCard.serial_number}
    />,

    <CustomTextField
      key={giftCard.id}
      name="weight"
      disabled
      label="وزن"
      defaultValue={`${giftCard.weight} گرم`}
    />,

    <CustomTextField
      key={giftCard.id}
      name="created_by_name"
      disabled
      label="ایجاد کننده"
      defaultValue={giftCard.created_by_name}
    />,

    <CustomTextField
      key={giftCard.id}
      name="activated_by_name"
      disabled
      label="فعال کننده"
      defaultValue={giftCard.activated_by_name || '—'}
    />,

    <CustomTextField
      key={giftCard.id}
      name="is_used"
      disabled
      label="استفاده شده"
      defaultValue={giftCard.is_used ? 'بله' : 'خیر'}
    />,

    <CustomTextField
      key={giftCard.id}
      name="created_at"
      disabled
      label="تاریخ ایجاد"
      defaultValue={formatDate(giftCard.created_at)}
    />,

    <Grid item xs={12} key={`status-${giftCard.id}`}>
      <FormControl fullWidth>
        <InputLabel>وضعیت</InputLabel>

        <Select
          value={giftCard.status}
          label="وضعیت"
          onChange={(event: SelectChangeEvent) =>
            setGiftCard((prev) => ({
              ...prev,
              status: event.target.value as GiftCardType['status'],
            }))
          }
        >
          <MenuItem value="ACTIVE">
            فعال
          </MenuItem>

          <MenuItem value="USED">
            استفاده شده
          </MenuItem>
        </Select>
      </FormControl>
    </Grid>,
  ],
  [giftCard]
)

    return (
        <Stack>
            <GridProducer sx={{ mb: 2 }} data={data} />
        </Stack>
    )
}