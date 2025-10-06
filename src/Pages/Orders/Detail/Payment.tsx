import {Box, Divider, Stack, Typography} from '@mui/material'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {formatDate} from '../../../Core/FormatDate'
import {Order} from './OrderDetail'
import './style.css'
export default function Payment({order}: {order: Order}) {
    return (
        <Stack direction="column" spacing={1.5}>
            <Typography variant="body1" sx={{fontWeight: '600', fontSize: '17px'}}>
                پرداخت‌ها:
            </Typography>

            {order?.payments?.length > 0 ? (
                order?.payments?.map((payment, index) => (
                    <Box
                        key={payment.id}
                        sx={{
                            p: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                        }}
                    >
                        <Stack direction="column" spacing={1}>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    sx={{fontWeight: 600, fontSize: '15px'}}
                                >
                                    روش پرداخت:
                                </Typography>
                                <Typography variant="body2" sx={{fontSize: '15px'}}>
                                    {payment.payment_method_display}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    sx={{fontWeight: 600, fontSize: '15px'}}
                                >
                                    وضعیت:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color={
                                        payment.status === 'pending'
                                            ? '#FFA726'
                                            : payment.status === 'confirmed'
                                            ? '#66BB6A'
                                            : '#d32f2f'
                                    }
                                    sx={{
                                        fontSize: '15px',

                                        fontWeight: 500,
                                    }}
                                >
                                    {payment.status === 'pending'
                                        ? 'در انتظار'
                                        : payment.status === 'confirmed'
                                        ? 'تکمیل شده'
                                        : 'لغو شده'}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    sx={{fontWeight: 600, fontSize: '15px'}}
                                >
                                    شناسه تراکنش:
                                </Typography>
                                <Typography variant="body2" sx={{fontSize: '15px'}}>
                                    {payment.transaction_id || '-'}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    sx={{fontWeight: 600, fontSize: '15px'}}
                                >
                                    Ref ID:
                                </Typography>
                                <Typography variant="body2" sx={{fontSize: '15px'}}>
                                    {payment.ref_id || '-'}
                                </Typography>
                            </Stack>

                            {payment.error && (
                                <Stack direction="row" spacing={1}>
                                    <Typography
                                        variant="body2"
                                        sx={{fontWeight: 600, fontSize: '15px'}}
                                    >
                                        خطا:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{fontSize: '15px', color: 'error.main'}}
                                    >
                                        {payment.error}
                                    </Typography>
                                </Stack>
                            )}

                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    sx={{fontWeight: 600, fontSize: '15px'}}
                                >
                                    تاریخ پرداخت:
                                </Typography>
                                <Typography variant="body2" sx={{fontSize: '15px'}}>
                                    {formatDate(payment.created_at)}
                                </Typography>
                            </Stack>

                            {payment.receipt_image_url && (
                                <Stack direction="column" spacing={1} mt={1}>
                                    <Typography
                                        variant="body2"
                                        sx={{fontWeight: 600, fontSize: '15px'}}
                                    >
                                        رسید پرداخت:
                                    </Typography>
                                    <Zoom>
                                        <Box
                                            component="img"
                                            src={payment.receipt_image_url}
                                            alt="رسید پرداخت"
                                            sx={{
                                                height: 220,
                                                width: 220,
                                                objectFit: 'fill',
                                                borderRadius: 2,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                            }}
                                        />
                                    </Zoom>
                                </Stack>
                            )}
                        </Stack>

                        {/* خط جداکننده بین پرداخت‌ها (آخرین پرداخت خط نداره) */}
                        {index !== order.payments.length - 1 && <Divider sx={{mt: 2}} />}
                    </Box>
                ))
            ) : (
                <Typography variant="body2" sx={{fontSize: '14px', color: 'text.secondary'}}>
                    هیچ پرداختی ثبت نشده است.
                </Typography>
            )}
        </Stack>
    )
}
