import {Box, Button, Card, CardActions, CardContent, Grid, Stack, Typography} from '@mui/material'
import React from 'react'
import ImageZoom from '../../../Components/ImageZoom/ImageZoom'
import {BaseModal} from '../../../Components/Modal/BaseModal'
import {Order} from '../Detail/OrderDetail'
import AccountDetail from './AccountDetail'
interface Props {
    order: Order
    isOpen: number | null
    setIsOpen: React.Dispatch<React.SetStateAction<number | null>>
}
export default function Products({order, isOpen, setIsOpen}: Props) {
    return (
        <Grid container spacing={2}>
            {order?.items?.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.5}>
                    <Card sx={{boxShadow: 5, borderRadius: 3}}>
                        <Stack p={2} pb={0}>
                            <ImageZoom>
                                <Box
                                    component={'img'}
                                    sx={{height: '100%', width: '100%'}}
                                    src={item.product_image_url}
                                    borderRadius={2}
                                />
                            </ImageZoom>
                        </Stack>
                        <CardContent
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{fontWeight: '400', fontSize: '16px !important'}}
                            >
                                {item.product_name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{fontWeight: '400', fontSize: '14px !important'}}
                                color={'primary'}
                            >
                                {item.price} تومان
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                sx={{fontSize: '12px !important'}}
                                onClick={() => setIsOpen(item.id)}
                            >
                                نمایش بیشتر
                            </Button>
                        </CardActions>
                    </Card>
                    <BaseModal
                        open={Boolean(isOpen === item.id)}
                        setOpen={setIsOpen}
                        title={item.account_details.account_title}
                        style={{maxWidth: 700}}
                    >
                        <AccountDetail item={item.account_details} />
                    </BaseModal>
                </Grid>
            ))}
        </Grid>
    )
}
