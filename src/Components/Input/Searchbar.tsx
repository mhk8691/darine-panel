import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import SearchIcon from '@mui/icons-material/Search'
import {Box, Button, Collapse, Divider, IconButton, InputBase, Stack} from '@mui/material'
import {useState} from 'react'
import {CustomFilter} from '../Filter/CustomFilter'

export function Searchbar(props) {
    const {filtersData, setParams, searchField, placeholder, noFilters, params} = props
    const [filterIn, setFilterIn] = useState(params.filter)
    const [textFieldData, setTextfieldData] = useState('')
    const handleFilterIn = () => {
        setFilterIn(!filterIn)
    }
    const handleChange = (event) => {
        const value = event.target.value
        setTextfieldData(value)
        setParams((filter) => {
            const newFilter = {...filter}

            if (value === null) {
                delete newFilter.search
            } else {
                newFilter.search = value
            }

            if (!newFilter.ordering) {
                delete newFilter.ordering
            }

            return newFilter
        })
    }
    return (
        <Box width="100%" mt={3}>
            <Stack
                direction="row"
                width="100%"
                border="1px solid #3f3f3f"
                px={{
                    xs: '5px',
                    sm: '10px',
                }}
                py={'10px'}
                borderRadius="8px"
                mb={'16px'}
                gap={{
                    xs: 0.7,
                    sm: 1,
                }}
            >
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <InputBase
                    style={{flexGrow: 1}}
                    value={textFieldData}
                    onChange={handleChange}
                    placeholder={placeholder}
                    sx={{
                        fontSize: {
                            xs: '12px',
                            sm: '14px',
                        },
                        fontWeight: '600',
                    }}
                />
                {!noFilters && (
                    <>
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                mx: {
                                    xs: 0,
                                    sm: 1,
                                },
                            }}
                        />
                        <Button
                            startIcon={
                                filterIn ? (
                                    <FilterAltIcon
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                sm: 'block',
                                                mr: '0',
                                            },
                                        }}
                                    />
                                ) : (
                                    <FilterAltOutlinedIcon
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                sm: 'block',
                                                mr: 0,
                                            },
                                        }}
                                    />
                                )
                            }
                            onClick={handleFilterIn}
                            sx={{
                                fontSize: {
                                    xs: '14px',
                                    sm: '16px',
                                },
                                whiteSpace: 'nowrap',
                            }}
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
