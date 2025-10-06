import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Banners, BannersType} from '../Banners'
import { CustomTextField } from '../../../Components/Input/CustomTextField'

const RESOURCE = 'banners'
export function BannerEdit() {
    const state = useLocation().state as {row: BannersType}
    const [banner, setBanner] = useState(state.row)
   const element = (
       <CustomTextField
           name="id"
           resource={RESOURCE}
           disabled
           label={'آیدی'}
           defaultValue={banner.id}
       />
   )
    return (
        <EditPage
            resource={RESOURCE}
            title="جزئیات بنر"
            formDetails={banner}
            initialData={state.row}
            isFormData={true}
            redirect={'banners'}
        >
            <Banners banner={banner} setBanner={setBanner} children={element} />
        </EditPage>
    )
}
