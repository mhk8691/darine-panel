import { useRef } from 'react';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { setUtil } from '../../redux/UtilSlice';
import { useDispatch } from 'react-redux';

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = '.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.zip,.rar';

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} بایت`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} کیلوبایت`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} مگابایت`;
}

interface AttachmentPickerProps {
  file: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

export default function AttachmentPicker({
  file,
  onChange,
  disabled,
  size = 'medium',
}: AttachmentPickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
const dispatch = useDispatch()
  const handlePick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    e.target.value = '';

    if (!selected) return;

    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
       dispatch(setUtil({open: true, message: `حجم فایل نباید بیشتر از ${MAX_FILE_SIZE_MB} مگابایت باشد`, severity: 'error'}))
      return;
    }

    onChange(selected);
  };

  return (
    <Box>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        hidden
        onChange={handleFileSelected}
      />

      {file ? (
        <Chip
          icon={<InsertDriveFileOutlinedIcon fontSize="small" />}
          label={
            <Typography variant="caption" component="span">
              {file.name}
              <Typography
                variant="caption"
                component="span"
                color="text.subtitle"
                sx={{ mr: 0.5 }}
              >
                {' '}
                · {formatFileSize(file.size)}
              </Typography>
            </Typography>
          }
          onDelete={disabled ? undefined : () => onChange(null)}
          deleteIcon={<CloseIcon fontSize="small" />}
          sx={{
            borderRadius: '8px',
            maxWidth: '100%',
            bgcolor: 'background.default',
            '& .MuiChip-label': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
        />
      ) : (
        <IconButton
          onClick={handlePick}
          disabled={disabled}
          size={size}
          sx={{ color: 'text.subtitle' }}
          aria-label="پیوست فایل"
        >
          <AttachFileIcon fontSize={size} />
        </IconButton>
      )}
    </Box>
  );
}