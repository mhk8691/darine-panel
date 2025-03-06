import {Grid, Stack} from '@mui/material'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {ImageUploader} from '../../Components/Input/ImageUploader'

export type AccountsType = {
    id: number
    name: string
    introduction: string
    connectionMethod: string
    description: string
    price: number
    category: string
    image: any
}

const RESOURCE = 'accounts'

export function Accounts({
    account,
    setAccount,
}: {
    account: AccountsType
    setAccount: React.Dispatch<React.SetStateAction<AccountsType>>
}) {
    return (
        <Stack sx={{marginBottom: '16px'}}>
            <Grid container spacing={2} rowSpacing={2.5}>
                <Grid item xs={12} sx={{px: 2}}>
                    <ImageUploader
                        resource={RESOURCE}
                        setData={setAccount}
                        field={'image'}
                        defaultValue={account.image}
                        style={{
                            width: '100%',
                            height: '250px',
                            borderRadius: '12px',
                            objectFit: 'fill',
                        }}
                    />
                </Grid>
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
        </Stack>
    )
}
