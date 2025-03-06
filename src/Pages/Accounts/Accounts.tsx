import {Box, Button, Grid, Stack} from '@mui/material'
import {ChangeEvent, useState} from 'react'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {BaseModal} from '../../Components/Modal/BaseModal'

export type AccountsType = {
    id: number
    name: string
    introduction: string
    connectionMethod: string
    description: string
    price: number
    category: string
    images: string[] | File[] | null
}

const RESOURCE = 'accounts'

export function Accounts({
    account,
    setAccount,
}: {
    account: AccountsType
    setAccount: React.Dispatch<React.SetStateAction<AccountsType>>
}) {
    const [open, setOpen] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = Array.from(event.target.files || [])
        if (file) {
            setFiles(file)
        }
    }
    const handleDelete = () => {
        setOpen(false)
        setFiles([])
    }
    return (
        <Stack sx={{marginBottom: '16px'}}>
            <Grid container spacing={2} rowSpacing={2.5}>
                <Grid item xs={12} sx={{px: 2}}></Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="name"
                        setData={setAccount}
                        resource={RESOURCE}
                        label={'نام'}
                        defaultValue={account.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomAutocomplete
                        options={[
                            {label: 'کلش آف کلنز', id: 'clash_of_clans'},
                            {label: 'کالاف دیوتی موبایل', id: 'codm'},
                        ]}
                        name="category"
                        setData={setAccount}
                        defaultValue={account.category}
                        label={'دسته بندی'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomAutocomplete
                        options={[
                            {label: 'فیسبوک', id: 'facebook'},
                            {label: 'اکتیویژن', id: 'activision'},
                        ]}
                        name="connection_method"
                        setData={setAccount}
                        defaultValue={account.connectionMethod}
                        label={'روش اتصال'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="description"
                        resource={RESOURCE}
                        setData={setAccount}
                        label={'توضیحات'}
                        defaultValue={account.description}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="price"
                        resource={RESOURCE}
                        setData={setAccount}
                        label={'قیمت'}
                        defaultValue={account.price}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setOpen(true)}
                        size="large"
                        fullWidth
                        sx={{height: '53px', borderRadius: '4px !important'}}
                    >
                        {account.images ? 'ویرایش تصویر' : 'انتخاب تصویر'}
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <CustomTextField
                        name="introduction"
                        resource={RESOURCE}
                        setData={setAccount}
                        label={'معرفی محصول'}
                        defaultValue={account.introduction}
                        multiline={true}
                        rows={7}
                    />
                </Grid>
            </Grid>

            <BaseModal
                open={open}
                setOpen={setOpen}
                title="انتخاب تصویر"
                onClose={handleDelete}
                style={{maxWidth: 700}}
            >
                <input
                    name="name"
                    type="file"
                    onChange={handleChange}
                    multiple
                    style={{
                        marginBottom: '16px',
                        border: '1px solid #525252',
                        width: '100%',
                        padding: '12px',
                        borderRadius: '4px',
                    }}
                />

                <Grid container spacing={2}>
                    {files.length > 0 &&
                        files &&
                        files.map((file) => (
                            <Grid item xs={3}>
                                <Box
                                    component={'img'}
                                    src={URL.createObjectURL(file)}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 2,
                                    }}
                                />
                            </Grid>
                        ))}
                    {account.images &&
                        files.length === 0 &&
                        account?.images?.map(
                            (image) =>
                                    <Grid item xs={3}>
                                        <Box
                                            component={'img'}
                                            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 2,
                                            }}
                                        />
                                    </Grid>
                        )}
                </Grid>

                <Stack direction={'row'} spacing={2} mt={2}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => {
                            setAccount((prev) => ({...prev, images: files}))
                            setOpen(false)
                        }}
                        disabled={!files}
                    >
                        تایید
                    </Button>
                    <Button variant="outlined" color="primary" size="large" onClick={handleDelete}>
                        لغو
                    </Button>
                </Stack>
            </BaseModal>
        </Stack>
    )
}
