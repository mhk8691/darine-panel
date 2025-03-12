import React, {useEffect} from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {Accounts} from '../Accounts'

export function AccountCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
   
    return (
        <CreatePage title={'افزودن اکانت بازی'} resource={'accounts'} formDetails={data}>
            <Accounts account={data} setAccount={setData} />
        </CreatePage>
    )
}
