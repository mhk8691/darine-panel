import {
    Badge,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Stack,
    Typography,
} from '@mui/material'
import React from 'react'
import {BaseModal} from '../../../Components/Modal/BaseModal'
import AccountDetail from './AccountDetail'
import {OrdersType} from '../Orders'
interface Props {
    order: OrdersType
    isOpen: number | null
    setIsOpen: React.Dispatch<React.SetStateAction<number | null>>
}
export default function Products({order,isOpen,setIsOpen}: Props) {
    return (
        <Grid container spacing={2}>
            {order?.products.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.5}>
                    <Card sx={{boxShadow: 5, borderRadius: 3}}>
                        <Stack p={2} pb={0}>
                            <Badge badgeContent={`${item.count}x`} color="primary">
                                <Box
                                    component={'img'}
                                    sx={{height: '100%', width: '100%'}}
                                    src={item.image}
                                    borderRadius={2}
                                />
                            </Badge>
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
                                {item.name}
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
                        title="مشخصات اکانت"
                        style={{maxWidth: 700}}
                    >
                        <AccountDetail item={item} />
                    </BaseModal>
                </Grid>
            ))}
        </Grid>
    )
}
