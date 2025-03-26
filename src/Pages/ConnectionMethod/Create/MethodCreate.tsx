import React from 'react'
import {CreatePage} from '../../../Components/Table/CreatePage'
import {ConnectionMethod} from '../Method'

export function MethodCreate({
    data,
    setData,
}: {
    data: any
    setData: React.Dispatch<React.SetStateAction<any>>
}) {
    return (
        <CreatePage
            title={'افزودن روش اتصال'}
            resource={'account/base-accounts/'}
            redirect={'base-accounts'}
            formDetails={{
                title: data.title,
                fields: data?.fields?.map((item)=>{
                    return  {
                        title: item.title,
                        description: item.description,
                        type: item.type,
                        choices: item?.choices?.map((choice)=>{
                            return choice.title
                        }),
                    }
                })
            }}
        >
            <ConnectionMethod method={data} setMethod={setData} editMode={false} />
        </CreatePage>
    )
}
