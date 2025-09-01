import {useState} from 'react'
import DatePicker from 'react-multi-date-picker'
import 'react-multi-date-picker/styles/colors/red.css'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'

import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import {ParamType} from './CustomFilter'
import './datePicker.css'
export default function DatePickerFilter({
    setParams,
    item,
}: {
    setParams: React.Dispatch<React.SetStateAction<ParamType>>
    item: any
}) {
    const [value, setValue] = useState(null)
    const [gregorianValue, setGregorianValue] = useState(null)

    const handleChange = (date) => {
        setValue(date)

        if (date) {
            const gregorianDate = date.convert(gregorian, gregorian_en).format('YYYY-MM-DD')
            setGregorianValue(gregorianDate)
            setParams((params) => {
                return {
                    ...params,

                    [item.field]: gregorianDate,
                }
            })
        }
    }

    return (
        <div className="w-full">
            <DatePicker
                id="start-date"
                calendar={persian}
                locale={persian_fa}
                className="red bg-dark "
                value={value}
                onChange={handleChange}
                placeholder={item.label}
                style={{
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #525252',
                    borderRadius: '5px',
                    height: '54.55px',
                    fontSize: '15px',
                    width: '100%',
                    color: '#E2E7DF',
                    fontFamily: 'samim',
                    padding: '9px',
                    fontWeight: 'bold',
                }}
            />
        </div>
    )
}
