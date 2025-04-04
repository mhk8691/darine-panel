import {useEffect, useState} from 'react'
import {EditPage} from '../../Components/Table/EditPage'
import {useAppSelector} from '../../redux/store'
import {Users, UsersType} from '../Users/Users'
import axios from 'axios'
const RESOURCE = 'auth/profile/'

export default function Profile() {
    const [profile, setProfile] = useState<UsersType>({} as UsersType)
    const [initialData, setInitialData] = useState<UsersType>({} as UsersType)
    const token = useAppSelector((state) => state.user.token)
    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get<{
                    data: UsersType
                }>(`http://localhost:8000/api/auth/profile/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
                setProfile(response.data.data)
                setInitialData(response.data.data)
            } catch (error: any) {
                console.log(error)
            }
        }
        getProfile()
    }, [])
    return (
        <EditPage
            resource={RESOURCE}
            title="حساب کاربری"
            formDetails={profile}
            initialData={initialData}
            noId={true}
            reload={true}
        >
            <Users user={profile} setUser={setProfile} editMode isProfile />
        </EditPage>
    )
}
