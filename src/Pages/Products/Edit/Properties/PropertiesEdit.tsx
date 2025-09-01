import {Grid} from '@mui/material'
import {useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {CustomTextField} from '../../../../Components/Input/CustomTextField'
import {EditPage} from '../../../../Components/Table/EditPage'
import {PropertyType} from '../../../../Core/types'

export function PropertiesEdit() {
    const id = useParams().productId
    const RESOURCE = `product/${id}/properties`
    const state = useLocation().state as {row: PropertyType}
    const [property, setProperty] = useState(state.row)

    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش properties"
            formDetails={property}
            initialData={state.row}
            redirect={`product/${id}`}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="name"
                        setData={setProperty}
                        resource={RESOURCE}
                        value={property?.name}
                        label={'نام'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={3}>
                    <CustomTextField
                        name="value"
                        setData={setProperty}
                        resource={RESOURCE}
                        value={property?.value}
                        label={'مقدار'}
                    />
                </Grid>
            </Grid>
        </EditPage>
    )
}
