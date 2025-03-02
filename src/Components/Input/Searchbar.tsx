import {Box, Button, Collapse, Divider, IconButton, InputBase, Stack} from '@mui/material'
import React, {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {CustomFilter} from '../Filter/CustomFilter'

export function Searchbar(props) {
    const {filtersData, setParams, searchField, placeholder, noFilters, params} = props
    const [filterIn, setFilterIn] = useState(params.filter)
    const [textFieldData, setTextfieldData] = useState('')
    const handleFilterIn = () => {
        setFilterIn(!filterIn)
    }
    const handleChange = (event) => {
        setParams((filter) => {
            return {
                ...filter,
                regex: {
                    [searchField]: event.target.value,
                },
            }
        })
        setTextfieldData(event.target.value)
    }
    return (
        <Box width="100%" mt={3}>
            <Stack
                direction="row"
                width="100%"
                border="1px solid #3f3f3f"
                p="10px"
                borderRadius="8px"
                mb={'16px'}
                gap={1}
            >
                <IconButton >
                    <SearchIcon />
                </IconButton>
                <InputBase
                    style={{flexGrow: 1}}
                    value={textFieldData}
                    onChange={handleChange}
                    placeholder={placeholder}
                    sx={{
                        fontSize: '16px',
                    }}
                />
                {!noFilters && (
                    <>
                        <Divider orientation="vertical" flexItem sx={{mx: 1}} />
                        <Button
                            startIcon={
                                filterIn ? (
                                    <FilterAltIcon style={{marginLeft: '0'}} />
                                ) : (
                                    <FilterAltOutlinedIcon style={{marginLeft: '0'}} />
                                )
                            }
                            onClick={handleFilterIn}
                            sx={{fontSize: '16px'}}
                        >
                            فیلتر ها
                        </Button>
                    </>
                )}
            </Stack>
            {!noFilters && (
                <Collapse in={filterIn} style={{width: '100%'}}>
                    <CustomFilter filtersData={filtersData} setParams={setParams} params={params} />
                </Collapse>
            )}
        </Box>
    )
}
