import {useEffect, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {EditPage} from '../../../Components/Table/EditPage'
import {Requests, RequestsType} from '../Requests'
import {DataProvider} from '../../../Core/DataProvider'

const RESOURCE = 'requests'
export function RequestsEdit() {
    const requestId = useParams().id
    const [requests, setRequests] = useState({} as RequestsType)
    const [initialData, setInitialData] = useState({} as RequestsType)
  
    useEffect(() => {
          const getRequest = async () => {
              try {
                  const res = await DataProvider.get<RequestsType>(`${RESOURCE}/${requestId}/`)
                  setRequests(res.data)
                  setInitialData(res.data)
              } catch (error: any) {
                  console.log(error)
              }
          }
        getRequest()
    }, [requestId])
    return (
        <EditPage
            resource={RESOURCE}
            title="ویرایش درخواست"
            formDetails={requests}
            initialData={initialData}
            isFormData={true}
        >
            <Requests requests={requests} setRequests={setRequests} />
        </EditPage>
    )
}
