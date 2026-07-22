import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container as MuiContainer,
  Typography,
  Stack,
  Paper,
  TextField,
  IconButton,
  Button,
  Skeleton,
} from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import AttachmentPicker from './AttachmentPicker';
import { PriorityType, TikcetStatusType } from './Ticket';
import { DataProvider } from '../../Core/DataProvider';
import { setUtil } from '../../redux/UtilSlice';
import { useDispatch } from 'react-redux';

function formatTime(iso?: string) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

interface TicketDetailPageProps {
  ticketId: string;
}

interface TicketMessageType {
  id: number;
  user_name?: string;
  message: string;
  is_admin: boolean;
  attachment_url?: string;
  attachment_name?: string;
  created_at?: string;
}

interface TicketType {
  id: number;
  tracking_code: string;
  title: string;
  description?: string;
  category_name?: string;
  status: TikcetStatusType;
  priority: PriorityType;
  created_at?: string;
  last_activity_at?: string;
  unread_messages_count?: number;
  last_message_user_type?: 'user' | 'admin';
  can_edit?: boolean;
  can_close?: boolean;
  messages?: TicketMessageType[];
}

interface SendTicketMessagePayload {
  message: string;
  attachment?: File | null;
}

export default function ChatDetail({ ticketId }: TicketDetailPageProps) {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketType | null>(null);
  const [messages, setMessages] = useState<TicketMessageType[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const [reply, setReply] = useState('');
  const [replyAttachment, setReplyAttachment] = useState<File | null>(null);
  const [sending, setSending] = useState(false);

  // ۱. متد دریافت اطلاعات اصلی تیکت (با پشتیبانی از خروجی تکی یا لیست)
  const getTicket = async (id: number | string): Promise<TicketType | null> => {
    try {
      const res = await DataProvider.get<TicketType | { results: TicketType[] }>(
        `tickets/${id}`
      );
      
      const responseData = res.data;

      // بررسی اینکه آیا پاسخ در قالب results است یا شیء مستقیم TicketType
      if (responseData && 'results' in responseData && Array.isArray(responseData.results)) {
        return responseData.results[0] || null;
      }

      return (responseData as TicketType) || null;
    } catch (error: any) {
      dispatch(
        setUtil({
          open: true,
          message: error?.message || 'خطا در دریافت اطلاعات تیکت',
          severity: 'error',
        })
      );
      return null;
    }
  };

  // ۲. دریافت پیام‌های تیکت
  const getTicketMessages = async (id: number | string) => {
    try {
      const res = await DataProvider.get<TicketMessageType[] | { results: TicketMessageType[] }>(
        `ticket-messages/?ticket=${id}`
      );

      const responseData = res.data;

      if (responseData && 'results' in responseData && Array.isArray(responseData.results)) {
        return responseData.results;
      }

      return (responseData as TicketMessageType[]) || [];
    } catch (error: any) {
      dispatch(
        setUtil({
          open: true,
          message: error?.message || 'خطا در دریافت پیام‌ها',
          severity: 'error',
        })
      );
      return [];
    }
  };

  // ۳. ارسال پیام جدید در تیکت هماهنگ با ساختار DataProvider
  const sendTicketMessage = async (
    id: number | string,
    payload: SendTicketMessagePayload
  ) => {
    try {
      let bodyData: FormData | { ticket: number | string; message: string };

      if (payload.attachment) {
        const formData = new FormData();
        formData.append('ticket', String(id));
        if (payload.message) formData.append('message', payload.message);
        formData.append('attachment', payload.attachment);
        bodyData = formData;
      } else {
        bodyData = {
          ticket: id,
          message: payload.message,
        };
      }

      const res = await DataProvider.post<TicketMessageType>(`ticket-messages/`, {
        data: bodyData,
      });

      dispatch(
        setUtil({
          open: true,
          message: res.message || 'پیام با موفقیت ارسال شد',
          severity: 'success',
        })
      );
      return res.data;
    } catch (error: any) {
      dispatch(
        setUtil({
          open: true,
          message: error?.message || 'خطا در ارسال پیام',
          severity: 'error',
        })
      );
    }
  };

  // رفرنس کانتینر چت برای اسکرول داخلی
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (smooth = true) => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  };

  // دریافت اطلاعات هم‌زمان
  const loadData = useCallback(async () => {
    setLoading(true);
    const [ticketData, messagesData] = await Promise.all([
      getTicket(ticketId),
      getTicketMessages(ticketId),
    ]);

    setTicket(ticketData);

    const finalMessages = messagesData && messagesData.length > 0 
      ? messagesData 
      : ticketData?.messages ?? [];
      
    setMessages(finalMessages);
    setLoading(false);
  }, [ticketId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // اسکرول هوشمند
  useEffect(() => {
    if (!loading && messages.length > 0) {
      scrollToBottom(true);
    }
  }, [messages.length, loading]);

  const isClosed = ticket?.status === 'closed';

  const handleSend = async () => {
    if ((!reply.trim() && !replyAttachment) || isClosed) return;
    setSending(true);
    const newMessage = await sendTicketMessage(ticketId, {
      message: reply.trim(),
      attachment: replyAttachment,
    });
    setSending(false);

    if (newMessage) {
      setMessages((prev) => [...prev, newMessage]);
      setReply('');
      setReplyAttachment(null);
    }
  };

  if (loading) {
    return (
      <MuiContainer maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Skeleton variant="rounded" height={70} sx={{ borderRadius: '16px', mb: 2 }} />
        <Skeleton variant="rounded" height={480} sx={{ borderRadius: '16px' }} />
      </MuiContainer>
    );
  }

  if (!ticket) {
    return (
      <MuiContainer maxWidth="md" sx={{ py: 5, textAlign: 'center' }}>
        <Typography color="text.secondary" variant="h6">
          تیکت مورد نظر یافت نشد
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, borderRadius: '10px' }}
          onClick={() => navigate('/tickets')}
        >
          بازگشت به تیکت‌ها
        </Button>
      </MuiContainer>
    );
  }

  return (
    <MuiContainer maxWidth="xl" sx={{mt:5}}>
      {/* Container اصلی چت به سبک پیام‌رسان */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: { xs: '12px', sm: '20px' },
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: { xs: '85vh', sm: '80vh' },
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* بدنه گفتگو (Chat Messages List) */}
        <Box
          ref={chatContainerRef}
          sx={{
            flex: 1,
            p: { xs: 1.5, sm: 2.5 },
            overflowY: 'auto',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#0f172a' : '#f1f5f9',
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 0)`,
            backgroundSize: '16px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {/* شرح اولیه تیکت */}
          {ticket.description && (
            <Box
              sx={{
                alignSelf: 'center',
                maxWidth: '85%',
                bgcolor: 'action.hover',
                p: 1.5,
                borderRadius: '12px',
                textAlign: 'center',
                mb: 1,
                border: '1px dashed',
                borderColor: 'divider',
              }}
            >
              <Typography variant="caption" color="text.secondary" fontWeight={700} display="block">
                توضیحات اولیه تیکت:
              </Typography>
              <Typography variant="body2" color="text.primary">
                {ticket.description}
              </Typography>
            </Box>
          )}

          {messages.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', my: 'auto' }}>
              هیچ پیامی ارسال نشده است. اولین پیام را شما بفرستید!
            </Typography>
          ) : (
            messages.map((msg) => {
              const isMe = !msg.is_admin;
              return (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 1.5,
                      px: 2,
                      maxWidth: { xs: '85%', sm: '65%' },
                      borderRadius: isMe
                        ? '16px 16px 2px 16px'
                        : '16px 16px 16px 2px',
                      bgcolor: isMe ? 'primary.main' : 'background.paper',
                      color: isMe ? 'primary.contrastText' : 'text.primary',
                      position: 'relative',
                      wordBreak: 'break-word',
                    }}
                  >
                    {!isMe && (
                      <Typography
                        variant="caption"
                        fontWeight={700}
                        color="primary.main"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        {msg.user_name || 'پشتیبانی'}
                      </Typography>
                    )}

                    {msg.message && (
                      <Typography variant="body2" sx={{ lineHeight: 1.6, whitespace: 'pre-line' }}>
                        {msg.message}
                      </Typography>
                    )}

                    {/* فایل پیوست */}
                    {msg.attachment_url && (
                      <Paper
                        variant="outlined"
                        component="a"
                        href={msg.attachment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mt: msg.message ? 1 : 0,
                          p: 1,
                          borderRadius: '8px',
                          bgcolor: isMe ? 'rgba(255,255,255,0.15)' : 'action.hover',
                          color: 'inherit',
                          textDecoration: 'none',
                          transition: '0.2s',
                          '&:hover': { opacity: 0.8 },
                        }}
                      >
                        <InsertDriveFileOutlinedIcon fontSize="small" />
                        <Typography variant="caption" noWrap sx={{ maxWidth: 180 }}>
                          {msg.attachment_name || 'دانلود فایل پیوست'}
                        </Typography>
                      </Paper>
                    )}

                    {/* زمان و آیکون تیک */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 0.5,
                        mt: 0.5,
                        opacity: 0.75,
                      }}
                    >
                      <Typography variant="caption" sx={{ fontSize: '0.68rem' }}>
                        {formatTime(msg.created_at)}
                      </Typography>
                      {isMe && <DoneAllIcon sx={{ fontSize: 14 }} />}
                    </Box>
                  </Paper>
                </Box>
              );
            })
          )}
        </Box>

        {/* بخش ارسال پیام (Input Area) */}
        <Box
          sx={{
            p: 1.5,
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {isClosed ? (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ py: 1, color: 'text.secondary' }}
            >
              <LockOutlinedIcon fontSize="small" />
              <Typography variant="body2">
                این تیکت بسته شده است و امکان ارسال پیام جدید وجود ندارد.
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={1}>
              {/* نمایش فایل پیوست پیش از ارسال */}
              {replyAttachment && (
                <Box sx={{ px: 1 }}>
                  <AttachmentPicker
                    file={replyAttachment}
                    onChange={setReplyAttachment}
                    disabled={sending}
                  />
                </Box>
              )}

              <Stack direction="row" spacing={1} alignItems="center">
                {!replyAttachment && (
                  <AttachmentPicker
                    file={replyAttachment}
                    onChange={setReplyAttachment}
                    disabled={sending}
                  />
                )}

                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  size="small"
                  placeholder="پیام خود را بنویسید..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={sending}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '24px',
                      bgcolor: 'action.hover',
                      '& fieldset': { borderColor: 'transparent' },
                      '&:hover fieldset': { borderColor: 'divider' },
                      '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                    },
                  }}
                />

                <IconButton
                  color="primary"
                  onClick={handleSend}
                  disabled={(!reply.trim() && !replyAttachment) || sending}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    boxShadow: 2,
                    '&:hover': { bgcolor: 'primary.dark' },
                    '&.Mui-disabled': { bgcolor: 'action.disabledBackground' },
                  }}
                >
                  <SendRoundedIcon sx={{ transform: 'scaleX(-1)', fontSize: 20 }} />
                </IconButton>
              </Stack>
            </Stack>
          )}
        </Box>
      </Paper>
    </MuiContainer>
  );
}