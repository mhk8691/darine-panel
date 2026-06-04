import {Stack} from '@mui/material'
import {getBankInfoWithCardNumber, getBankInfoWithSheba} from 'ir-banks-info'
import 'iranianbanklogos/dist/ibl.css'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'

export type CardType = {
    "id": number,
    "card_number": string,
    "full_name": string,
    "sheba": string,
    "is_active": true,
    "created_at": string
}

const RESOURCE = 'gold-card'

export function GoldCard({
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
                ]}
            />
        </Stack>
    )
}
