import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {DataProvider} from '../../../Core/DataProvider'
import {setUtil} from '../../../redux/UtilSlice'
import {ConnectionMethod, MethodType} from '../Method'

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
