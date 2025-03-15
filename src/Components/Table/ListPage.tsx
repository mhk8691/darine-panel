import {Button, Stack, Typography} from '@mui/material'
import {Box, padding} from '@mui/system'
import React, {useState} from 'react'
import AddButton from '../Buttons/add'
import {Searchbar} from '../Input/Searchbar'
import {BaseModal} from '../Modal/BaseModal'
import {DataProvider} from '../../Core/DataProvider'
import {setUtil} from '../../redux/UtilSlice'
import {useAppDispatch} from '../../redux/store'
export function ListPage({
    header,
    searchText,
    searchField,
    setParams,
    params,
    filtersData,
    createModal,
    resource,
    defaultState,
    getList,
    noCreate,
    children,
    href,
}: {
    header: string
    searchText: string
    searchField: string
    setParams: any
    params: any
    filtersData: any
    createModal?: any
    resource: string
    defaultState?: any
    getList: () => void
    href: string
    noCreate?: boolean
    children: React.ReactNode
}) {
    const CreaterModal = createModal
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(defaultState)
    const dispatch = useAppDispatch()
    async function create() {
        dispatch(setUtil({loading: true}))
        // let result = await DataProvider.post(`${resource}`, {data: data})
        // if (result) {
        //     setData(result)
        //     setOpen(true)
        // }
        // dispatch(setUtil({loading: false}))
    }
    async function update() {
        if (data._id) {
            let result = await DataProvider.patch(`${resource}/${data._id}`, {data: data})
            if (result) {
                setOpen(false)
                getList()
            }
        }
    }
    async function cancel() {
        if (data._id) {
            let result = await DataProvider.delete(`${resource}/${data._id}`)
        }
        setOpen(false)
    }

    // useEffect(() => {
    //     if (open) {
    //         create()
    //     }
    // }, [open])
    return (
        <Box>
            {open && (
                <BaseModal
                    open={open}
                    setOpen={setOpen}
                    title={'Add to ' + header}
                    onClose={cancel}
                >
                    <CreaterModal open={open} setOpen={setOpen} data={data} setData={setData} />
                    <Stack direction="row" margin={'10px 0px'} spacing={2}>
                        <Button
                            variant="contained"
                            onClick={update}
                            size="large"
                            sx={{fontSize: '20px'}}
                        >
                            Add
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={cancel}
                            size="large"
                            color="secondary"
                            sx={{fontSize: '20px'}}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </BaseModal>
            )}
            <Stack alignItems={'center'} padding="10px">
                <Stack
                    direction="row"
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={noCreate ? 1: 0}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: {
                                xs: '15px !important',
                                sm: '18px !important',
                            },
                            '@media (max-width: 350px)': {
                                fontSize: '14px !important',
                            },
                            fontWeight: 600,
                        }}
                    >
                        {header}
                    </Typography>

                    {noCreate ? null : (
                        <AddButton
                            href={href}
                            text={'جدید'}
                            style={{
                                fontSize: {
                                    xs: '14px',
                                    sm: '16px',
                                },
                                padding: '7px 13px',
                            }}
                        />
                    )}
                </Stack>

                <Searchbar
                    searchField={searchField}
                    placeholder={`جستجو بر اساس ${searchText} ...`}
                    setParams={setParams}
                    filtersData={filtersData ?? []}
                    noFilters={filtersData ? false : true}
                    params={params}
                />
            </Stack>
            <Stack minHeight={'60vh'}>{children}</Stack>
        </Box>
    )
}
