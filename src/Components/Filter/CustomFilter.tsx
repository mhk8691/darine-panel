import {Box} from '@mui/system'
import React, {useState} from 'react'
import {Stack, TextField} from '@mui/material'
import { DateFilter } from '../Input/DateFilter'
import { CustomTextField } from '../Input/CustomTextField'

export interface FilterType {
    date?: {}
}

export interface ParamType {
    filter: FilterType
    date?: {}
}

interface CustomFilterProps {
    filtersData: any
    params: ParamType
    setParams: React.Dispatch<React.SetStateAction<ParamType>>
}
export function CustomFilter({filtersData, setParams, params}: CustomFilterProps) {
    // const {filtersData, setParams, params} = props
    const handleChange = (event, item) => {
        setParams((params) => {
            let filters = params.filter
            return {
                ...params,
                filter: {
                    ...filters,
                    [item.field]: event.target.value,
                },
            }
        })
    }
    return (
        <Stack direction={'row'}>
            {filtersData.map((item, index) => (
                <>
                    {item.type === 'date' ? (
                        <DateFilter
                            label={item.label}
                            field={item.field}
                            setParams={setParams}
                        />
                    ) : (
                        <CustomTextField
                            value={params?.filter ? params?.filter[item.field] : null}
                            onChange={(e) => handleChange(e, item)}
                            label={item.label}
                            sx={{
                                flexGrow: 1,
                            }}
                        />
                    )}
                    {filtersData.length - 1 !== index && <Box width="8px" />}
                </>
            ))}
        </Stack>
    )
}

