import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Banners, BannersType} from '../Banners'
import { CustomTextField } from '../../../Components/Input/CustomTextField'

export function BannerEdit({resource}:{resource:string}) {
    const state = useLocation().state as {row: BannersType}
    const [banner, setBanner] = useState(state.row)
   const element = (
       <CustomTextField
           name="id"
           resource={resource}
           disabled
           label={'آیدی'}
           defaultValue={banner.id}
       />
   )
    return (
        <EditPage
            resource={resource}
            title="جزئیات بنر"
            formDetails={banner}
            initialData={state.row}
            isFormData={true}
        >
            <Banners banner={banner} setBanner={setBanner} children={element} />
        </EditPage>
    )
}
