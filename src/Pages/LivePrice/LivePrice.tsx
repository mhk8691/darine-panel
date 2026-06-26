import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PaidIcon from "@mui/icons-material/Paid";
import { useDispatch } from "react-redux";
import { DataProvider } from "../../Core/DataProvider";
import { setUtil } from "../../redux/UtilSlice";


interface GoldType {
  buy_price: number;
  sell_price: number;
  bubble_amount: number;
  bubble_percent: number;
  is_positive: boolean;
}

interface SilverType {
  silver_price: number;
  intrinsic_price: number;
  bubble_percent: number;
  is_positive: boolean;
}

type ApiResponse<T> = {
  results: T;
};

/* ---------------- SAFE ROW ---------------- */

const StatRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: number | null;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 0.8,
        px: 1.2,
        borderRadius: 2,
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {icon}
        <Typography sx={{ opacity: 0.8, fontSize: 14 }}>{label}</Typography>
      </Box>

      <Typography sx={{ fontWeight: 600 }}>
        {value?.toLocaleString?.("fa-IR") ?? "-"}
      </Typography>
    </Box>
  );
};

/* ---------------- CARD ---------------- */

const PriceCard = ({
  title,
  data,
}: {
  title: string;
  data?: GoldType | SilverType;
}) => {
  const isPositive = data?.is_positive ?? false;

  return (
    <Card
      sx={{
        borderRadius: 3,
        color: "#fff",
        background: "linear-gradient(145deg, #0e0e0e, #1b1b1b)",
        flex: 1,
        minWidth: 300,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* glow */}
      <Box
        sx={{
          position: "absolute",
          width: 200,
          height: 200,
          top: -60,
          right: -60,
          background: isPositive
            ? "rgba(76,175,80,0.15)"
            : "rgba(244,67,54,0.15)",
          filter: "blur(40px)",
          borderRadius: "50%",
        }}
      />

      <CardContent sx={{ position: "relative" }}>
        {/* هدر */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {title}
          </Typography>

          <Chip
            icon={isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
            label={isPositive ? "صعودی" : "نزولی"}
            size="small"
            sx={{
              color: "#fff",
              backgroundColor: isPositive
                ? "rgba(76,175,80,0.2)"
                : "rgba(244,67,54,0.2)",
            }}
          />
        </Stack>

        {/* اطلاعات */}
        <Stack spacing={1.2} mt={2}>
          {"buy_price" in (data ?? {}) && (
            <StatRow
              icon={<PaidIcon fontSize="small" />}
              label="قیمت خرید"
              value={(data as GoldType)?.buy_price}
            />
          )}

          {"sell_price" in (data ?? {}) && (
            <StatRow
              icon={<PaidIcon fontSize="small" />}
              label="قیمت فروش"
              value={(data as GoldType)?.sell_price}
            />
          )}

          {"silver_price" in (data ?? {}) && (
            <StatRow
              icon={<PaidIcon fontSize="small" />}
              label="قیمت نقره"
              value={(data as SilverType)?.silver_price}
            />
          )}

          {"intrinsic_price" in (data ?? {}) && (
            <StatRow
              icon={<PaidIcon fontSize="small" />}
              label="قیمت ذاتی"
              value={(data as SilverType)?.intrinsic_price}
            />
          )}
        </Stack>

        {/* حباب */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1.5,
            borderRadius: 2,
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <Typography sx={{ opacity: 0.7 }}>درصد حباب</Typography>

          <Typography
            sx={{
              fontWeight: 700,
              color: isPositive ? "#4caf50" : "#f44336",
            }}
          >
            {data?.bubble_percent ?? 0}٪
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

/* ---------------- MAIN ---------------- */

export default function LivePrice() {
  const [goldData, setGoldData] = useState<ApiResponse<GoldType> | null>(null);
  const [silverData, setSilverData] = useState<ApiResponse<SilverType> | null>(
    null
  );

  const dispatch = useDispatch();

 useEffect(() => {
  const fetchData = async () => {
    try {
      const [goldResponse, silverResponse] = await Promise.all([
        DataProvider.get<ApiResponse<GoldType>>("market/gold/"),
        DataProvider.get<ApiResponse<SilverType>>("market/silver/"),
      ]);

      setGoldData(goldResponse.data);
      setSilverData(silverResponse.data);
    } catch (error: any) {
      dispatch(
        setUtil({
          open: true,
          message: error?.message ?? "خطا در دریافت اطلاعات",
          severity: "error",
        })
      );
    }
  };

  fetchData();

  const interval = setInterval(fetchData, 60 * 1000);

  return () => clearInterval(interval);
}, [dispatch]);

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 2 }}>
      <PriceCard
        title="تحلیل طلا"
        data={goldData?.results ?? undefined}
      />
      <PriceCard
        title="تحلیل نقره"
        data={silverData?.results ?? undefined}
      />
    </Box>
  );
}