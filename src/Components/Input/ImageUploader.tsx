import React, {useEffect, useRef, useState} from 'react'
import {Box, Button, LinearProgress, Stack} from '@mui/material'
import {DropzoneArea} from 'mui-file-dropzone'
import {DataProvider} from '../../Core/DataProvider'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import {APP_URL} from '../../Core/APP_URL'
export function ImageUploader(props) {
    const {resource, setData, field, defaultValue, style} = props
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState(defaultValue ? APP_URL + defaultValue : null)

    async function dropAccepted(files) {
        console.log(files)
        if (!files[0]) {
            return
        }
        let form_data = new FormData()
        setImage(URL.createObjectURL(files[0]))
        form_data.append(resource, files[0])
        let data = await DataProvider.post<{link: string}>(`util/upload`, {
            data: form_data,
            onUploadProgress: (p) => {
                setProgress((p.loaded * 100) / p.total)
            },
        })
        setData((prev) => {
            return {...prev, [field]: data.data.link}
        })
    }

    return (
        <Box>
            <Stack
                display={'flex'}
                sx={{
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                    gap:2
                }}
                
            >
                <Box
                    sx={{
                        width: {
                            xs: '100%',
                            sm: '50%',
                        },
                    }}
                >
                    <DropzoneArea
                        fileObjects={[]}
                        Icon={CloudUploadOutlinedIcon}
                        dropzoneText={'بارگذاری تصویر'}
                        onChange={dropAccepted}
                        filesLimit={1}
                        showPreviewsInDropzone={false}
                        showAlerts={false}
                    />
                </Box>
                {image && (
                    <Stack
                        spacing={2}
                        sx={{
                            width: {
                                xs: '100%',
                                sm: '50%',
                            },
                        }}
                    >
                        <img src={image} style={{width: '100%', height: '100%', ...style}} />
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            style={{display: progress === 0 || progress === 100 ? 'none' : 'block'}}
                        />
                    </Stack>
                )}
            </Stack>
        </Box>
    )
}
