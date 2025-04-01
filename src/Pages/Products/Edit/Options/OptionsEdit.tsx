import {Grid} from '@mui/material'
import {useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {CustomTextField} from '../../../../Components/Input/CustomTextField'
import {EditPage} from '../../../../Components/Table/EditPage'
import {OptionType} from '../../../../Core/types'

export function OptionsEdit() {
    const id = useParams().productId
    const RESOURCE = `product/${id}/options`
    const state = useLocation().state as {row: OptionType}
    const [option, setOption] = useState(state.row)

    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش آپشن"
            formDetails={option}
            initialData={state.row}
            redirect={`product/${id}`}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="title"
                        setData={setOption}
                        resource={RESOURCE}
                        value={option?.title}
                        label={'عنوان'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="price"
                        setData={setOption}
                        resource={RESOURCE}
                        value={option?.price}
                        label={'قیمت'}
                    />
                </Grid>
            </Grid>
        </EditPage>
    )
}
