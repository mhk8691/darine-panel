import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
export type CardType = {
    id: number
    full_name: string
    card_name: string
    card_number: string
    iban: string
    created_at: string
    updated_at: string
}
const RESOURCE = 'card'

export function Card({
    card,
    setCard,
}: {
    card: CardType
    setCard: React.Dispatch<React.SetStateAction<CardType>>
}) {
    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        key={card.id}
                        name="full_name"
                        setData={setCard}
                        resource={RESOURCE}
                        label={'نام و نام خانوادگی'}
                        defaultValue={card.full_name}
                    />,
                    // <CustomTextField
                    //     key={card.id}
                    //     name="card_name"
                    //     resource={RESOURCE}
                    //     setData={setCard}
                    //     label={'نام بانک'}
                    //     defaultValue={card.card_name}
                    // />,

                    <CustomTextField
                        key={card.id}
                        name="card_number"
                        resource={RESOURCE}
                        setData={setCard}
                        label={'شماره کارت'}
                        defaultValue={card.card_number}
                        sx={{
                            '& .MuiInputBase-input.Mui-disabled': {
                                bgcolor: 'background.light',
                            },
                        }}
                    />,
                    <CustomTextField
                        key={card.id}
                        name="iban"
                        resource={RESOURCE}
                        setData={setCard}
                        label={'شماره شبا'}
                        defaultValue={card.iban}
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
