import {Button, Stack} from '@mui/material'
import {useEffect, useState} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import ImageUploader from '../../Components/Input/ImageUploader'
import {GridProducer} from '../../Components/Table/GridProducer'
import {DataProvider} from '../../Core/DataProvider'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'

export type CategoriesType = {
    id: number
    name: string
    slug: string
}
const RESOURCE = 'categories'

export function Categories({
    category,
    setCategory,
}: {
    category: CategoriesType
    setCategory: React.Dispatch<React.SetStateAction<CategoriesType>>
}) {

    // async function getCategory() {
    //     try {
    //         const response = await DataProvider.get<{
    //             results: CategoriesType[]
    //         }>(`${RESOURCE}/`)
    //         setCategory(response.data.results)
    //     } catch (error: any) {
    //         console.log(error)
    //     }
    // }
    // useEffect(() => {
    //     getCategory()
    // }, [])
   
    return (
        <Stack>
            {category && (
                <GridProducer
                    sx={{marginBottom: '16px'}}
                    data={[

                        <CustomTextField
                            name="name"
                            setData={setCategory}
                            resource={RESOURCE}
                            label={'نام'}
                            defaultValue={category.name}
                        />,
<CustomTextField
                            name="slug"
                            setData={setCategory}
                            resource={RESOURCE}
                            label={'نام لاتین'}
                            defaultValue={category.slug}
                        />,
                   
                       
                    ]}
                />
            )}
          
        </Stack>
    )
}
