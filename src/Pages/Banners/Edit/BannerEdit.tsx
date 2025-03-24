import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Banners, BannersType} from '../Banners'

const RESOURCE = 'banners'
export function BannerEdit() {
    const state = useLocation().state as {row: BannersType}
    const [banner, setBanner] = useState(state.row)

    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش بنر"
            formDetails={banner}
            initialData={state.row}
            isFormData={true}
            redirect={'/banners'}
        >
            <Banners banner={banner} setBanner={setBanner} />
        </EditPage>
    )
}
