import {Button, Grid, Typography} from '@mui/material'
import React from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import {PropertyType} from '../../Core/types'
interface Props {
    newProperty: PropertyType
    setNewProperty: React.Dispatch<React.SetStateAction<PropertyType>>
    addProperty: () => Promise<void>
}
const RESOURCE = 'product'
export default function Properties({newProperty, setNewProperty, addProperty}: Props) {
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="body2" fontSize={'15px'} sx={{fontWeight: '600'}}>
                    افزودن properties
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
                <CustomTextField
                    key={newProperty.id}
                    name="name"
                    resource={RESOURCE}
                    value={newProperty.name}
                    onChange={(e) => setNewProperty({...newProperty, name: e.target.value})}
                    label={'نام'}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
                <CustomTextField
                    key={newProperty.id}
                    name="label"
                    setData={setNewProperty}
                    resource={RESOURCE}
                    value={newProperty.value}
                    onChange={(e) => setNewProperty({...newProperty, value: e.target.value})}
                    label={'مقدار'}
                />
            </Grid>
            <Grid xs={12} sm={6} md={4} xl={3} item>
                <Button
                    variant="outlined"
                    onClick={addProperty}
                    size="large"
                    sx={{height: '53px', borderRadius: '4px !important'}}
                    fullWidth
                >
                    {'تایید'}
                </Button>
            </Grid>
        </>
    )
}
