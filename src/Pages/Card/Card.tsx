import {Stack} from '@mui/material'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {GridProducer} from '../../Components/Table/GridProducer'
import {useEffect, useState} from 'react'
import 'iranianbanklogos/dist/ibl.css'

export type CardType = {
    id: number
    full_name: string
    card_name: string
    card_number: string
    iban: string
    created_at: string
    updated_at: string
}
interface BankCard {
    bin: string
    bank: string
    logo?: React.ReactNode // لوگو به صورت ReactNode
}

const bankCards: BankCard[] = [
    {bin: '207177', bank: 'توسعه صادرات ایران', logo: <i className="ibl64 ibl-bsi"></i>},
    {bin: '502206', bank: 'شهر', logo: <i className="ibl64 ibl-shahr"></i>},
    {bin: '502229', bank: 'پاسارگاد', logo: <i className="ibl64 ibl-bpi"></i>},
    {bin: '502908', bank: 'توسعه تعاون', logo: <i className="ibl64 ibl-tt"></i>},
    {bin: '502910', bank: 'کارآفرین', logo: <i className="ibl64 ibl-kar"></i>},
    {bin: '502938', bank: 'دی', logo: <i className="ibl64 ibl-day"></i>},
    {bin: '505416', bank: 'گردشگری', logo: <i className="ibl64 ibl-tourism"></i>},
    {bin: '505785', bank: 'ایران زمین', logo: <i className="ibl64 ibl-iz"></i>},
    // {bin: '505801', bank: 'موسسه اعتباری کوثر (سپه)', logo: <i className="ibl64 ibl-bki"></i>},
    {bin: '589210', bank: 'سپه', logo: <i className="ibl64 ibl-sepah"></i>},
    {bin: '589463', bank: 'رفاه کارگران', logo: <i className="ibl64 ibl-rb"></i>},
    {bin: '603769', bank: 'صادرات ایران', logo: <i className="ibl64 ibl-bsi"></i>},
    {bin: '603770', bank: 'کشاورزی', logo: <i className="ibl64 ibl-bki"></i>},
    {bin: '603799', bank: 'ملی ایران', logo: <i className="ibl64 ibl-bmi"></i>},
    {bin: '606373', bank: 'مهر ایران', logo: <i className="ibl64 ibl-miran"></i>},
    {bin: '610433', bank: 'ملت', logo: <i className="ibl64 ibl-mellat"></i>},
    {bin: '621986', bank: 'سامان', logo: <i className="ibl64 ibl-sb"></i>},
    {bin: '622106', bank: 'پارسیان', logo: <i className="ibl64 ibl-parsian"></i>},
    {bin: '627353', bank: 'تجارت', logo: <i className="ibl64 ibl-tejarat"></i>},
    {bin: '627381', bank: 'انصار', logo: <i className="ibl64 ibl-ansar"></i>},
    {bin: '627412', bank: 'اقتصاد نوین', logo: <i className="ibl64 ibl-en"></i>},
    {bin: '627488', bank: 'کار آفرین', logo: <i className="ibl64 ibl-kar"></i>},
    {bin: '627648', bank: 'توسعه صادرات ایران', logo: <i className="ibl64 ibl-edbi"></i>},
    {bin: '627760', bank: 'پست ایران', logo: <i className="ibl64 ibl-post"></i>},
    {bin: '627961', bank: 'صنعت و معدن', logo: <i className="ibl64 ibl-bim"></i>},
    {bin: '628023', bank: 'مسکن', logo: <i className="ibl64 ibl-maskan"></i>},
    {bin: '636214', bank: 'آینده', logo: <i className="ibl64 ibl-ba"></i>},
    {bin: '636949', bank: 'حکمت ایرانیان', logo: <i className="ibl64 ibl-hi"></i>},
    {bin: '639217', bank: 'کشاورزی', logo: <i className="ibl64 ibl-bki"></i>},
    {bin: '639346', bank: 'سینا', logo: <i className="ibl64 ibl-sina"></i>},
    // {bin: '639370', bank: 'مهر اقتصاد (سپه)', logo: <i className="ibl64 ibl-me"></i>},
    {bin: '639599', bank: 'قوامین', logo: <i className="ibl64 ibl-ghbi"></i>},
    {bin: '639607', bank: 'سرمایه', logo: <i className="ibl64 ibl-sarmayeh"></i>},
]
const RESOURCE = 'card'

export function Card({
    card,
    setCard,
}: {
    card: CardType
    setCard: React.Dispatch<React.SetStateAction<CardType>>
}) {
    const [cardIndex, setCardIndex] = useState<number | null>(null)
    // useEffect(() => {
    //     if (card?.card_number?.length >= 6) {
    //         const newCardIndex = bankCards.findIndex(
    //             (item) => item.bin === card.card_number.slice(0, 6),
    //         )
    //         console.log(bankCards[newCardIndex])
    //         setCardIndex(newCardIndex)
    //     }
    // }, [card.card_number, cardIndex])
    const getBankLogo = () => {
        if (card?.card_number?.length >= 6) {
            const index = bankCards.findIndex((item) => item.bin === card.card_number.slice(0, 6))
            console.log(index)
            if (index >= 0) return bankCards[index].logo
        }
        return <></>
    }

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
                        endIcon={getBankLogo()}
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
                    <h1>{getBankLogo()}</h1>,
                ]}
            />
        </Stack>
    )
}
