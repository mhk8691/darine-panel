import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import {Users, UsersType} from '../Users'

const RESOURCE = 'users'
export function UserEdit() {
    const userId = useParams().id
    const [user, setUser] = useState<UsersType>({} as UsersType)
    const [initialData, setInitialData] = useState<UsersType>({} as UsersType)
    const getUser = async () => {
        try {
            let response = await DataProvider.get<UsersType>(`users/${userId}/`)
            if (response) {
                setUser(response.data)
                setInitialData(response.data)
            }
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUser()
    }, [userId])
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش کاربر"
            formDetails={user}
            initialData={initialData}
            isFormData
        >
            <Users user={user} setUser={setUser} editMode={true} />
        </EditPage>
    )
}
