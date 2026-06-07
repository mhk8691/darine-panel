import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from '@mui/material'
import {getBankInfoWithCardNumber, getBankInfoWithSheba} from 'ir-banks-info'
import 'iranianbanklogos/dist/ibl.css'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import { CardType } from '../GoldCard/GoldCard'


const RESOURCE = 'silver-card'

export function SilverCard({
    card,
    setCard,
    children,
}: {
    card: CardType
    setCard: React.Dispatch<React.SetStateAction<CardType>>
    children?: React.ReactNode[]
}) {
    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    ...(children ?? []),
                    <CustomTextField
                        key={card.id}
                        name="full_name"
                        setData={setCard}
                        resource={RESOURCE}
                        label={'نام و نام خانوادگی'}
                        defaultValue={card.full_name}
                    />,
                    <CustomTextField
                       key={card.id}
                        name="card_number"
                        resource={RESOURCE}
                        setData={setCard}
                        label={'شماره کارت'}
                        defaultValue={card.card_number}
                        endIcon={
                            card.card_number && card.card_number.length >= 6 ? (
                                <img
                                    style={{width: '32px', height: '32px'}}
                                    src={getBankInfoWithCardNumber(card.card_number)?.logo}
                                    alt=""
                                />
                            ) : null
                        }
                        sx={{
                            '& .MuiInputBase-input.Mui-disabled': {
                                bgcolor: 'background.light',
                            },
                        }}
                    />,
                    <CustomTextField
                      key={card.id}
                        name="sheba"
                        resource={RESOURCE}
                        setData={setCard}
                        label={'شماره شبا'}
                        defaultValue={card.sheba}
                        endIcon={
                            card.sheba && card.sheba.length === 24 ? (
                                <img
                                    style={{width: '32px', height: '32px'}}
                                    src={getBankInfoWithSheba(card.sheba)?.logo}
                                    alt=""
                                />
                            ) : null
                        }
                        sx={{
                            '& .MuiInputBase-input.Mui-disabled': {
                                bgcolor: 'background.light',
                            },
                        }}
                    />,
                    <FormControl fullWidth>
        <InputLabel>وضعیت</InputLabel>

        <Select
            value={String(card.is_active)}
          label="وضعیت"
          onChange={(event: SelectChangeEvent) =>
            setCard((prev) => ({
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
