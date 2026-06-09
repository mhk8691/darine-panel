import 'react-multi-date-picker/styles/colors/yellow.css'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'


import { useEffect, useState, useRef } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'

import { FormControl, InputLabel } from '@mui/material'

import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'
import gregorian_en from 'react-date-object/locales/gregorian_en'

import { ParamType } from './CustomFilter'
import './datePicker.css'

export default function DatePickerFilter({
    setParams,
    item,
    initialValue
}: {
    setParams: React.Dispatch<React.SetStateAction<ParamType>>
    item: any
    initialValue?: string
}) {
    const [value, setValue] = useState<DateObject | null>(null)
    const [focused, setFocused] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (initialValue) {
            setValue(
                new DateObject({
                    date: initialValue,
                    format: "YYYY-MM-DD",
                })
            )
        }
    }, [initialValue])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setFocused(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleChange = (date: DateObject | null) => {
        setValue(date)

        if (date) {
            const gregorianDate = date
                .convert(gregorian, gregorian_en)
                .format('YYYY-MM-DD')

            setParams((params) => ({
                ...params,
                [item.field]: gregorianDate,
            }))
        }
    }

    const active = focused || !!value

    return (
        <FormControl fullWidth sx={{ width: '100%' }}>

            <InputLabel
                shrink={active}
                sx={{
                    color: '#B0B0B0',
                    fontSize: 15,
                    '&.Mui-focused': {
                        color: '#E2E7DF',
                    },
                }}
            >
                {item.label}
            </InputLabel>

            <div
                ref={wrapperRef}
                onClick={() => setFocused(true)}
                style={{
                    width: '100%',
                    display: 'block',
                }}
            >
                <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={value}
                    onChange={handleChange}
                    className="yellow bg-dark"
                    style={{
                        width: '100%',
                        display: 'block',
                        boxSizing: 'border-box',
                        height: '54px',

                        backgroundColor: '#1E1E1E',
                        border: '1px solid #525252',
                        borderRadius: '5px',

                        fontSize: '15px',
                        color: '#E2E7DF',
                        fontFamily: 'samim',

                    }}
                />
            </div>
        </FormControl>
    )
}
