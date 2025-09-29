import React, { useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  Legend,
} from "recharts";

/** simple slugify for filename */
const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const formatDateLabel = (d) =>
  new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });

const PriceHistory = ({ product = {} }) => {
  const totalPrice = Number(product?.price ?? 0);

  const data = useMemo(() => {
    const historyRaw = Array.isArray(product.priceHistory) ? product.priceHistory : [];

    const normalized = historyRaw
      .map((p) => {
        const price = Number(p.price ?? 0);
        const date = p.date ? new Date(p.date) : new Date();
        if (Number.isNaN(price)) return null;
        return { date, price };
      })
      .filter(Boolean)
      .sort((a, b) => a.date - b.date);

    const lastPoint = normalized[normalized.length - 1];
    const lastPriceNum = lastPoint ? Number(lastPoint.price) : null;

    if (!Number.isNaN(totalPrice)) {
      if (!lastPoint || lastPriceNum !== totalPrice) {
        normalized.push({
          date: product.updatedAt ? new Date(product.updatedAt) : new Date(),
          price: totalPrice,
        });
      }
    }

    return normalized.map((p) => ({
      date: p.date.toISOString(),
      label: formatDateLabel(p.date),
      price: Number(p.price),
      ts: p.date.getTime(),
    }));
  }, [product, totalPrice]);

  const generateCSVString = useCallback(() => {
    if (!data || data.length === 0) return "";

    const headers = ["Date", "Price"];
    const rows = data.map((d) => [new Date(d.date).toISOString(), d.price.toFixed(2)]);
    const csvLines = [headers.join(","), ...rows.map((r) => r.join(","))];
    return "\uFEFF" + csvLines.join("\n");
  }, [data]);

  const downloadCSV = useCallback(() => {
    const csv = generateCSVString();
    if (!csv) return;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const filename = `${slugify(product.name || "product")}-price-history-${Date.now()}.csv`;
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
      return;
    }
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }, [generateCSVString, product.name]);

  const copyCSVToClipboard = useCallback(async () => {
    const csv = generateCSVString();
    if (!csv) return;
    try {
      await navigator.clipboard.writeText(csv);
      toast.success("Copied to clipboard!");
    } catch (err) {
      const ta = document.createElement("textarea");
      ta.value = csv;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      toast.error( err.message||"Failed to copy to clipboard!");
    }
  }, [generateCSVString]);

  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-offwhite rounded-lg border">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-emerald-700">Price history</h3>
            <p className="text-sm text-gray-500">No price history available for this product.</p>
          </div>
        </div>
      </div>
    );
  }

  const firstPrice = data[0].price;
  const lastPrice = data[data.length - 1].price;
  const change = firstPrice === 0 ? 0 : ((lastPrice - firstPrice) / firstPrice) * 100;
  const changeRounded = Math.round(change * 100) / 100;

  const prices = data.map((d) => d.price);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const yPadding = Math.max(1, (maxP - minP) * 0.12);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const point = payload[0].payload;
    return (
      <div className="bg-white p-2 rounded-lg shadow text-sm border">
        <div className="font-medium text-gray-800">{formatDateLabel(point.date)}</div>
        <div className="text-gray-600">${point.price.toFixed(2)}</div>
      </div>
    );
  };

  return (
    <section className="p-4 bg-offwhite rounded-lg border">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-emerald-700">Price history</h3>
          <p className="text-sm text-gray-500">Last {data.length} point{data.length>1? "s":""}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyCSVToClipboard}
            type="button"
            className="px-3 py-1 rounded-md border text-sm bg-beige hover:bg-beige/80 shadow hover:scale-102 transition-transform"
            aria-label="Copy CSV to clipboard"
            title="Copy CSV"
          >
            Copy CSV
          </button>

          <button
            onClick={downloadCSV}
            type="button"
            className="px-3 py-1 rounded-md bg-emerald-600 text-beige text-sm shadow hover:scale-102 transition-transform"
            aria-label="Download price history CSV"
            title="Download CSV"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-lg font-bold text-charcoal">${lastPrice.toFixed(2)}</div>
          <div
            className={`text-sm font-medium ${
              changeRounded > 0 ? "text-emerald-600" : changeRounded < 0 ? "text-red-600" : "text-gray-600"
            }`}
          >
            {changeRounded > 0 ? "+" : ""}
            {changeRounded}% since first
          </div>
        </div>
      </div>

      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 6 }}>
            <CartesianGrid strokeDasharray="3 6" stroke="#e6e6e6" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} interval={Math.max(0, Math.floor(data.length / 6))} />
            <YAxis domain={[Math.max(0, minP - yPadding), maxP + yPadding]} tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" align="left" />
            <Area type="monotone" dataKey="price" fill="rgba(16,185,129,0.12)" stroke="transparent" activeDot={false} />
            <Line type="monotone" dataKey="price" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default PriceHistory;
