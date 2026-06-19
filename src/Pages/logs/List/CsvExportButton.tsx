import { useState } from "react";
import { downloadCsv } from "./CsvExport";
import { Button } from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';
const OPTIONS = [5, 10, 25, 50, 100];

interface Props<T extends Record<string, unknown>> {
  data: T[];
  fileName?: string;
}

export default function CsvExportButton<
  T extends Record<string, unknown>
>({
  data,
  fileName = "export.csv",
}: Props<T>) {
  const [open, setOpen] = useState(false);

  const handleExport = (count: number) => {
    downloadCsv({
      data: data.slice(0, count),
      fileName,
    });

    setOpen(false);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <Button
      variant="outlined"
      color="primary"
      startIcon={<IosShareIcon/>}
        onClick={() => setOpen((prev) => !prev)}
        type="button" 
      >
        خروجی CSV
      </Button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            minWidth: "150px",
            background: "#1E1E1E",
            border: "1px solid #3f3f3f",
            borderRadius: "8px",
            marginTop: "4px",
            zIndex: 1000,
          }}
        >
          {OPTIONS.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => handleExport(count)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                textAlign: "right",
                display: "block",
                color:'white'
              }}
            >
              {count} ردیف
            </button>
          ))}
        </div>
      )}
    </div>
  );
}