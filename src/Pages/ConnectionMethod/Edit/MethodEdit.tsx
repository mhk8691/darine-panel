import {useEffect, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {ConnectionMethod, MethodType} from '../Method'
import {DataProvider} from '../../../Core/DataProvider'
import {useDispatch} from 'react-redux'
import {setUtil} from '../../../redux/UtilSlice'

const RESOURCE = 'account/base-accounts'
export function MethodEdit() {
    const dispatch = useDispatch()
    const methodId = useParams().id
    const [method, setMethod] = useState({} as MethodType)
    const [initialData, setInitialData] = useState({} as MethodType)
    const getMethod = async () => {
        try {
            const res = await DataProvider.get<MethodType>(`${RESOURCE}/${methodId}/`)
            setMethod(res.data)
            setInitialData(res.data)
        } catch (error: any) {
            console.log(error)
        }
        dispatch(setUtil({loading: false}))
    }
    useEffect(() => {
        getMethod()
    }, [methodId])
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش روش اتصال"
            formDetails={method}
            initialData={initialData}
            redirect={'base-accounts'}
        >
            <ConnectionMethod
                method={method}
                setMethod={setMethod}
                editMode={true}
                getMethod={getMethod}
            />
        </EditPage>
    )
}
