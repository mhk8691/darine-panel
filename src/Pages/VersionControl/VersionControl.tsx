import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from '@mui/material'
import {useEffect, useState} from 'react'
import {CustomTextField} from '../../Components/Input/CustomTextField'
import ImageUploader from '../../Components/Input/ImageUploader'
import {GridProducer} from '../../Components/Table/GridProducer'
import {DataProvider} from '../../Core/DataProvider'
import {CustomAutocomplete} from '../../Components/Input/CustomAutoComplete'
import { formatDate } from '../../Core/FormatDate'

export type VersionControlContainerType = {
    id?: number
    version_code: number
    version_name: string
    min_required_version_code: number
    update_message: string
    release_notes: string
    store_url: string
    is_force_update: boolean
    release_date?: string
    created_at?: string
    updated_at?: string
}

const RESOURCE = 'panel/version-control'

export function VersionControl({
    version,
    setVersion,
    editMode=false
}: {
    version: VersionControlContainerType
    setVersion: React.Dispatch<React.SetStateAction<VersionControlContainerType>>
    editMode?:boolean
}) {
    const fieldList = [
        <CustomTextField
            name="store_url"
            key={`store_url_${version.id}`}
            setData={setVersion}
            resource={RESOURCE}
            label={'لینک استور'}
            defaultValue={version.store_url}
            disabled
        />,
        <CustomTextField
            name="release_date"
            key={`release_date_${version.id}`}
            setData={setVersion}
            resource={RESOURCE}
            label={'تاریخ انتشار'}
            defaultValue={formatDate(version.release_date)}
            disabled
        />,
        <CustomTextField
            name="created_at"
            key={`created_at_${version.id}`}
            setData={setVersion}
            resource={RESOURCE}
            label={'تاریخ ساخت'}
            defaultValue={formatDate(version.created_at)}
            disabled
        />,
        <CustomTextField
            name="updated_at"
            key={`updated_at_${version.id}`}
            setData={setVersion}
            resource={RESOURCE}
            label={'تاریخ آپدیت'}
            defaultValue={formatDate(version.updated_at)}
            disabled
        />,
    ]

    const handleChange = (event: SelectChangeEvent) => {
        setVersion((prev) => ({
            ...prev,
            is_force_update: event.target.value === "true",
        }));
    };

    return (
        <Stack>
            {version && (
                <GridProducer
                    sx={{marginBottom: '16px'}}
                    data={[
                        <CustomTextField
                            name="version_code"
                            key={`version_code_${version.id}`}
                            setData={setVersion}
                            resource={RESOURCE}
                            label={'کد ورژن'}
                            defaultValue={version.version_code}
                        />,
                        <CustomTextField
                            name="version_name"
                            key={`version_name_${version.id}`}
                            setData={setVersion}
                            resource={RESOURCE}
                            label={'نام ورژن'}
                            defaultValue={version.version_name}
                        />,
                        <CustomTextField
                            name="min_required_version_code"
                            key={`min_required_${version.id}`}
                            setData={setVersion}
                            resource={RESOURCE}
                            label={'حداقل کد ورژن مورد نیاز'}
                            defaultValue={version.min_required_version_code}
                        />,
                        <CustomTextField
                            name="update_message"
                            key={`update_message_${version.id}`}
                            setData={setVersion}
                            resource={RESOURCE}
                            label={'پیام بروزرسانی'}
                            defaultValue={version.update_message}
                        />,
                        <CustomTextField
                            name="release_notes"
                            key={`release_notes_${version.id}`}
                            setData={setVersion}
                            resource={RESOURCE}
                            label={'یادداشت‌های انتشار'}
                            defaultValue={version.release_notes}
                        />,
                        <CustomTextField
                            name="store_url"
                            key={`main_store_url_${version.id}`}
                            setData={setVersion}
                            resource={RESOURCE}
                            label={'لینک استور'}
                            defaultValue={version.store_url}
                        />,
                        <FormControl fullWidth key={`force_update_${version.id}`}>
                            <InputLabel id="force-update-label">
                                آپدیت اجباری
                            </InputLabel>
                            <Select
                                labelId="force-update-label"
                                value={String(version.is_force_update)}
                                label="آپدیت اجباری"
                                onChange={handleChange}
                            >
                                <MenuItem value="true">بله</MenuItem>
                                <MenuItem value="false">خیر</MenuItem>
                            </Select>
                        </FormControl>,
                        ...(editMode ? fieldList : [])
                    ]}
                />
            )}
        </Stack>
    )
}