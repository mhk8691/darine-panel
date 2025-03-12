import React, {useEffect} from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {AccountCategory} from '../AccountCategory'

export function AccountCategoryCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
  
    return (
        <CreatePage
            title={'افزودن دسته بندی'}
            resource={'account-category'}
            formDetails={data}
        >
            <AccountCategory category={data} setCategory={setData} />
        </CreatePage>
    )
}
