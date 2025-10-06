import {Stack} from '@mui/material'
import {getBankInfoWithCardNumber, getBankInfoWithSheba} from 'ir-banks-info'
import 'iranianbanklogos/dist/ibl.css'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'

export type CardType = {
    id: number
    full_name: string
    card_number: string
    iban: string
    created_at: string
    updated_at: string
}

const RESOURCE = 'card'

export function Card({
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
                        key={card.id + '-full_name'}
                        name="full_name"
                        setData={setCard}
                        resource={RESOURCE}
                        label={'نام و نام خانوادگی'}
                        defaultValue={card.full_name}
                    />,
                    <CustomTextField
                        key={card.id + '-card_number'}
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
                        key={card.id + '-iban'}
                        name="iban"
                        resource={RESOURCE}
                        setData={setCard}
                        label={'شماره شبا'}
                        defaultValue={card.iban}
                        endIcon={
                            card.iban && card.iban.length === 24 ? (
                                <img
                                    style={{width: '32px', height: '32px'}}
                                    src={getBankInfoWithSheba(card.iban)?.logo}
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
