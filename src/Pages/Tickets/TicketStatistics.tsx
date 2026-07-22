

import React, { useEffect, useMemo, useState, type ComponentType } from 'react';
import { ThemeProvider, alpha } from '@mui/material/styles';
import {
  Box,
  Stack,
  Typography,
  Paper,
  Chip,
  Tooltip,
  IconButton,
  Skeleton,
  CssBaseline,
  Fade,
  type SvgIconProps,
} from '@mui/material';

import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { AppTheme } from '../../Theme';
import { DataProvider } from '../../Core/DataProvider';
import { setUtil } from '../../redux/UtilSlice';
import { useDispatch } from 'react-redux';

export type TicketStatusKey =
  | 'open'
  | 'pending'
  | 'in_progress'
  | 'answered'
  | 'resolved'
  | 'closed';

export interface TicketStatisticsData {
  total: number;
  open: number;
  pending: number;
  answered: number;
  in_progress: number;
  resolved: number;
  closed: number;
  unread_admin: number;
}




interface StatusMeta {
  label: string;
  color: string;
  icon: ComponentType<SvgIconProps>;
  hint: string;
}

function buildStatusMeta(): Record<TicketStatusKey, StatusMeta> {
  return {
    open: {
      label: 'باز',
      color: '#42A5F5',
      icon: MailRoundedIcon,
      hint: 'تیکت‌های جدید که هنوز پاسخی برایشان ثبت نشده',
    },
    pending: {
      label: 'در انتظار',
      color: '#FFB300',
      icon: HourglassEmptyRoundedIcon,
      hint: 'در صف بررسی، منتظر نوبت پاسخ‌گویی',
    },
    in_progress: {
      label: 'در حال بررسی',
      color: '#AB47BC',
      icon: AutorenewRoundedIcon,
      hint: 'یک پشتیبان در حال رسیدگی به آن است',
    },
    answered: {
      label: 'پاسخ داده‌شده',
      color: AppTheme.palette.secondary.main,
      icon: ForumRoundedIcon,
      hint: 'پاسخ ارسال شده، منتظر واکنش کاربر',
    },
    resolved: {
      label: 'حل‌شده',
      color: '#66BB6A',
      icon: CheckCircleRoundedIcon,
      hint: 'مشکل کاربر برطرف شده است',
    },
    closed: {
      label: 'بسته‌شده',
      color: AppTheme.palette.text.disabled, 
      icon: ArchiveRoundedIcon,
      hint: 'تیکت بایگانی و بسته شده است',
    },
  };
}

const STATUS_ORDER: TicketStatusKey[] = [
  'open',
  'pending',
  'in_progress',
  'answered',
  'resolved',
  'closed',
];



interface FlowBarProps {
  data: TicketStatisticsData;
  total: number;
  statusMeta: Record<TicketStatusKey, StatusMeta>;
}

function FlowBar({ data, total, statusMeta }: FlowBarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: { xs: 10, md: 14 },
        borderRadius: 999,
        overflow: 'hidden',
        bgcolor: alpha(AppTheme.palette.common.white, 0.08),
        direction: 'ltr', // ترتیب چپ‌به‌راستِ نوار به‌عمد ثابت نگه داشته می‌شود
      }}
    >
      {STATUS_ORDER.map((key) => {
        const meta = statusMeta[key];
        const count = data[key] ?? 0;
        const pct = total > 0 ? (count / total) * 100 : 0;
        if (pct === 0) return null;
        return (
          <Tooltip key={key} title={`${meta.label}: ${count} (${pct.toFixed(0)}٪)`} arrow>
            <Box
              sx={{
                width: mounted ? `${pct}%` : 0,
                bgcolor: meta.color,
                transition: 'width 0.7s cubic-bezier(.4,0,.2,1)',
                '&:hover': { filter: 'brightness(1.1)' },
              }}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* کارت هر وضعیت                                                        */
/* ------------------------------------------------------------------ */

interface StatusCardProps {
  statusKey: TicketStatusKey;
  count: number;
  total: number;
  meta: StatusMeta;
}

function StatusCard({ statusKey, count, total, meta }: StatusCardProps) {
  const Icon = meta.icon;
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        p: 2.25,
        bgcolor: (t) => t.palette.background.light,
        border: (t) => `1px solid ${alpha(t.palette.common.white, 0.08)}`,
        borderRadius: '0.75rem',
        height: '100%',
        overflow: 'hidden',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 20px ${alpha(meta.color, 0.22)}`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          width: 4,
          bgcolor: meta.color,
        },
      }}
      data-status={statusKey}
    >
      <Stack spacing={1.25}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '0.6rem',
              display: 'grid',
              placeItems: 'center',
              bgcolor: alpha(meta.color, 0.16),
              color: meta.color,
            }}
          >
            <Icon fontSize="small" />
          </Box>
          <Chip
            label={`${pct}٪`}
            size="small"
            sx={{
              bgcolor: alpha(meta.color, 0.14),
              color: meta.color,
              '& .MuiChip-label': { px: 1 },
            }}
          />
        </Stack>

        <Typography
          variant="headLineSm"
          sx={{ color: 'text.primary', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}
        >
          {count}
        </Typography>

        <Tooltip title={meta.hint} arrow placement="bottom-start">
          <Typography variant="labelMd" sx={{ color: 'text.secondary', cursor: 'default' }}>
            {meta.label}
          </Typography>
        </Tooltip>
      </Stack>
    </Paper>
  );
}


function LoadingSkeleton() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" height={90} sx={{ borderRadius: '0.75rem' }} />
      <Skeleton variant="rounded" height={14} sx={{ borderRadius: 999 }} />
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            mdl: 'repeat(3, 1fr)',
            lg: 'repeat(6, 1fr)',
          },
        }}
      >
        {STATUS_ORDER.map((k) => (
          <Skeleton key={k} variant="rounded" height={120} sx={{ borderRadius: '0.75rem' }} />
        ))}
      </Box>
    </Stack>
  );
}

export default function TicketStatistics() {
  const [data, setData] = useState<TicketStatisticsData | null>( null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshTick, setRefreshTick] = useState<number>(0);
  const dispatch = useDispatch()
  const statusMeta = useMemo(() => buildStatusMeta(), []);

const getStatistics = async () => {

    setLoading(true)
    try {
        let response = await DataProvider.get<TicketStatisticsData>(`tickets/statistics/`)
        if (response) {
            setData(response.data)
        }
    } catch (error: any) {
        dispatch(setUtil({open: true, message: error.message, severity: 'error'}))
    }
    setLoading(false)
}

useEffect(() => {
    getStatistics()
}, [refreshTick])



  const total = data?.total ?? 0;
  const unread = data?.unread_admin ?? 0;

  const cards = useMemo(() => {
    if (!data) return [];
    return STATUS_ORDER.map((key) => ({ key, count: data[key] ?? 0 }));
  }, [data]);

  return (
      <Box
        dir="rtl"
        sx={{
          minHeight: '100%',
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            border: (t) => `1px solid ${alpha(t.palette.common.white, 0.08)}`,
            borderRadius: '1rem',
            p: { xs: 2.5, sm: 3, md: 4 },
          }}
        >
          {/* هدر */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '0.75rem',
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.16),
                  color: 'primary.main',
                }}
              >
                <ConfirmationNumberRoundedIcon />
              </Box>
              <Box>
                <Typography variant="titleLg" sx={{ color: 'text.primary' }}>
                  آمار تیکت‌ها
                </Typography>
               
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1.5}>
              {unread > 0 && (
                <Fade in>
                  <Chip
                    icon={<MarkEmailUnreadRoundedIcon sx={{ fontSize: 18 }} />}
                    label={
                      <Typography variant="badge" component="span">
                        {unread} پیام خوانده‌نشده
                      </Typography>
                    }
                    sx={{
                      bgcolor: (t) => alpha(t.palette.error.main, 0.16),
                      color: 'error.main',
                      '& .MuiChip-icon': { color: 'error.main' },
                    }}
                  />
                </Fade>
              )}
              <Tooltip title="بروزرسانی">
                <IconButton
                  size="small"
                  onClick={() => setRefreshTick((n) => n + 1)}
                  sx={{
                    p: 1,
                    border: (t) => `1px solid ${alpha(t.palette.common.white, 0.12)}`,
                    borderRadius: '0.5rem',
                    color: 'text.secondary',
                    animation: loading ? 'spin 0.9s linear infinite' : 'none',
                    '@keyframes spin': {
                      from: { transform: 'rotate(0deg)' },
                      to: { transform: 'rotate(-360deg)' },
                    },
                  }}
                >
                  <RefreshRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {loading || !data ? (
            <LoadingSkeleton />
          ) : (
            <Stack spacing={3}>
              {/* مجموع + نوار جریان */}
              <Stack spacing={1.25}>
                <Stack direction="row" alignItems="baseline" justifyContent="space-between">
                  <Stack direction="row" alignItems="baseline" spacing={1}>
                    <Typography
                      variant="displaySm"
                      sx={{ color: 'text.primary', fontVariantNumeric: 'tabular-nums' }}
                    >
                      {total}
                    </Typography>
                    <Typography variant="labelLg" sx={{ color: 'text.secondary' }}>
                      تیکت ثبت‌شده
                    </Typography>
                  </Stack>
          
                </Stack>

                <FlowBar data={data} total={total} statusMeta={statusMeta} />

                {/* راهنمای رنگ‌ها */}
                <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ pt: 0.5 }}>
                  {STATUS_ORDER.map((key) => (
                    <Stack key={key} direction="row" alignItems="center" spacing={0.75}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: statusMeta[key].color,
                        }}
                      />
                      <Typography variant="xSmall" sx={{ color: 'text.secondary' }}>
                        {statusMeta[key].label}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>

              {/* کارت‌های وضعیت — ریسپانسیو بر اساس breakpoint های خودِ تم:
                  موبایل (xs): ۲ ستون
                  لپ‌تاپ (mdl): ۳ ستون
                  دسکتاپ (lg و بالاتر): ۶ ستون در یک ردیف */}
              <Box
                sx={{
                  display: 'grid',
                  gap: { xs: 1.5, sm: 2 },
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    mdl: 'repeat(3, 1fr)',
                    lg: 'repeat(6, 1fr)',
                  },
                }}
              >
                {cards.map(({ key, count }) => (
                  <StatusCard
                    key={key}
                    statusKey={key}
                    count={count}
                    total={total}
                    meta={statusMeta[key]}
                  />
                ))}
              </Box>
            </Stack>
          )}
        </Paper>
      </Box>
  );
}
