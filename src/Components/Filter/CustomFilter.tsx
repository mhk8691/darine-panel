import {Grid, Stack} from '@mui/material'
import {Box} from '@mui/system'
import React from 'react'
import {CustomAutocomplete} from '../Input/CustomAutoComplete'
import {CustomTextField} from '../Input/CustomTextField'

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
            console.log(item)
            let filters = params.filter
            return {
                ...params,
                [item.field]: event.target.value,
            }
        })
    }
    const handleChangeAutocomplete = (value: any, item: any) => {
        console.log(item)
        setParams((params) => {
            return {
                ...params,

                [item.field]: value,
            }
        })
    }
    return (
        <Stack mb={2}>
            <Grid container spacing={1.5}>
                {filtersData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} xl={3} key={item.field}>
                        {item.type === 'choice' ? (
                            <CustomAutocomplete
                                options={item.choice}
                                value={params?.filter ? params.filter[item.field] : null}
                                onChange={(e, value) => {
                                    handleChangeAutocomplete(value, item)
                                }}
                                label={item.label}
                            />
                        ) : (
                            // <DateFilter
                            //     label={item.label}
                            //     field={item.field}
                            //     setParams={setParams}
                            // />
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
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}
