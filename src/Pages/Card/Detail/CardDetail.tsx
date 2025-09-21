import {Stack, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataProvider} from '../../../Core/DataProvider'
import {CardType} from '../Card'
import {formatDate} from '../../../Core/FormatDate'
import {getBankInfoWithCardNumber} from 'ir-banks-info'

const RECOURCE = 'card'

export function CardDetail() {
    const id = useParams().id
    const [loading, setLoading] = useState(false)
    const [card, setCard] = useState<CardType | null>({} as CardType)
    const getCard = async () => {
        setLoading(true)
        let response = await DataProvider.get<CardType>(`${RECOURCE}/${id}/`)
        if (response) {
            setCard(response.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        getCard()
    }, [])

    return (
        <Stack p={4} direction={'column'}>
            <Typography variant="h6" fontWeight="600" sx={{fontSize: '18px !important', mb: 1}}>
                جزئیات کارت
            </Typography>
            <Stack
                direction={{
                    xs: 'column-reverse',
                    sm: 'row',
                }}
                alignItems={'center'}
                justifyContent={{
                    xs: 'center',
                    sm: 'space-between',
                }}
                mt={2.5}
                gap={2}
            >
                <Stack spacing={2.5} alignSelf={'flex-start'}>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                            آیدی:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {card?.id}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                            نام و نام خانوادگی:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {card?.full_name}
                        </Typography>
                    </Stack>
                    {card?.card_number && (
                        <Stack
                            direction={{xs: 'column', sm: 'row'}}
                            spacing={{
                                xs: 1,
                                sm: 0.5,
                            }}
                        >
                            <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                                نام بانک:
                            </Typography>

                            <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                                {getBankInfoWithCardNumber(card?.card_number)?.name}
                            </Typography>
                        </Stack>
                    )}

                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                            شماره کارت:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {card?.card_number}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                            شماره شبا:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {card?.iban}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                            تاریخ ایجاد:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {formatDate(card?.created_at)}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{
                            xs: 1,
                            sm: 0.5,
                        }}
                    >
                        <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                            تاریخ ویرایش:
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: '400', fontSize: '16px'}}>
                            {formatDate(card?.updated_at)}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
