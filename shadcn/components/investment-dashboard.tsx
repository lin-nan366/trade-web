"use client";

import * as React from "react";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  FileDown,
  Menu,
  Moon,
  MoreVertical,
  Pencil,
  Plus,
  Sun,
  Trash,
  Wallet,
} from "@/components/icons";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuContextTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type TrendPoint = {
  month: string;
  value: number;
};

type Operation = {
  id: string;
  time: string;
  type: "买入" | "卖出" | "调仓";
  amount: number;
  shares: number;
};

type Holding = {
  id: string;
  name: string;
  code: string;
  marketValue: number;
  returnRate: number;
  costPrice: number;
  currentPrice: number;
  shares: number;
  dayProfit: number;
  trend: TrendPoint[];
  records: Operation[];
};

type OperationForm = {
  type: Operation["type"];
  amount: string;
  shares: string;
};

const initialHoldings: Holding[] = [
  {
    id: "hs300",
    name: "沪深300指数增强",
    code: "基金 001300",
    marketValue: 126580,
    returnRate: 12.8,
    costPrice: 3.18,
    currentPrice: 3.59,
    shares: 35259.05,
    dayProfit: 1180,
    trend: [
      { month: "1月", value: 109000 },
      { month: "2月", value: 113800 },
      { month: "3月", value: 111200 },
      { month: "4月", value: 119600 },
      { month: "5月", value: 122300 },
      { month: "6月", value: 126580 },
    ],
    records: [
      { id: "hs-r1", time: "2026-06-21", type: "买入", amount: 3000, shares: 835.65 },
      { id: "hs-r2", time: "2026-05-20", type: "买入", amount: 3000, shares: 862.12 },
      { id: "hs-r3", time: "2026-04-18", type: "调仓", amount: 5200, shares: 1494.25 },
      { id: "hs-r4", time: "2026-03-20", type: "买入", amount: 3000, shares: 921.37 },
      { id: "hs-r5", time: "2026-02-19", type: "买入", amount: 3000, shares: 947.89 },
    ],
  },
  {
    id: "nasdaq",
    name: "纳斯达克100ETF",
    code: "ETF 513100",
    marketValue: 87420,
    returnRate: 6.4,
    costPrice: 1.47,
    currentPrice: 1.56,
    shares: 56038.46,
    dayProfit: 326,
    trend: [
      { month: "1月", value: 81200 },
      { month: "2月", value: 78900 },
      { month: "3月", value: 83500 },
      { month: "4月", value: 85800 },
      { month: "5月", value: 84950 },
      { month: "6月", value: 87420 },
    ],
    records: [
      { id: "nd-r1", time: "2026-06-18", type: "买入", amount: 2500, shares: 1602.56 },
      { id: "nd-r2", time: "2026-05-18", type: "买入", amount: 2500, shares: 1644.74 },
      { id: "nd-r3", time: "2026-04-15", type: "卖出", amount: 1800, shares: 1200 },
      { id: "nd-r4", time: "2026-03-15", type: "买入", amount: 2500, shares: 1712.33 },
      { id: "nd-r5", time: "2026-02-15", type: "买入", amount: 2500, shares: 1758.62 },
    ],
  },
  {
    id: "maotai",
    name: "贵州茅台",
    code: "股票 600519",
    marketValue: 54280,
    returnRate: -3.2,
    costPrice: 1810,
    currentPrice: 1752.6,
    shares: 30.97,
    dayProfit: -418,
    trend: [
      { month: "1月", value: 59600 },
      { month: "2月", value: 57200 },
      { month: "3月", value: 58850 },
      { month: "4月", value: 56100 },
      { month: "5月", value: 55040 },
      { month: "6月", value: 54280 },
    ],
    records: [
      { id: "mt-r1", time: "2026-06-10", type: "调仓", amount: 9200, shares: 5.25 },
      { id: "mt-r2", time: "2026-05-08", type: "买入", amount: 10000, shares: 5.64 },
      { id: "mt-r3", time: "2026-04-08", type: "买入", amount: 10000, shares: 5.51 },
      { id: "mt-r4", time: "2026-03-06", type: "卖出", amount: 5200, shares: 2.86 },
      { id: "mt-r5", time: "2026-02-06", type: "买入", amount: 10000, shares: 5.42 },
    ],
  },
  {
    id: "gold",
    name: "黄金ETF",
    code: "ETF 518880",
    marketValue: 41690,
    returnRate: 4.9,
    costPrice: 5.21,
    currentPrice: 5.47,
    shares: 7621.57,
    dayProfit: 95,
    trend: [
      { month: "1月", value: 38500 },
      { month: "2月", value: 39420 },
      { month: "3月", value: 40180 },
      { month: "4月", value: 39950 },
      { month: "5月", value: 40980 },
      { month: "6月", value: 41690 },
    ],
    records: [
      { id: "gd-r1", time: "2026-06-12", type: "买入", amount: 1800, shares: 329.07 },
      { id: "gd-r2", time: "2026-05-12", type: "买入", amount: 1800, shares: 336.45 },
      { id: "gd-r3", time: "2026-04-12", type: "买入", amount: 1800, shares: 348.84 },
      { id: "gd-r4", time: "2026-03-12", type: "买入", amount: 1800, shares: 352.25 },
      { id: "gd-r5", time: "2026-02-12", type: "买入", amount: 1800, shares: 360.72 },
    ],
  },
];

const currencyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0,
});

const decimalCurrencyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("zh-CN", {
  maximumFractionDigits: 2,
});

function formatPercent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function TodayProfit({ value }: { value: number }) {
  const positive = value >= 0;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium",
        positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
      )}
    >
      {positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
      {positive ? "+" : ""}
      {currencyFormatter.format(value)}
    </span>
  );
}

function ReturnText({ value }: { value: number }) {
  return (
    <span
      className={cn(
        "font-semibold tabular-nums",
        value >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
      )}
    >
      {formatPercent(value)}
    </span>
  );
}

function InvestmentDashboardInner() {
  const [holdings, setHoldings] = React.useState(initialHoldings);
  const [selectedId, setSelectedId] = React.useState(initialHoldings[0].id);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [recordOpen, setRecordOpen] = React.useState(false);
  const [form, setForm] = React.useState<OperationForm>({
    type: "买入",
    amount: "",
    shares: "",
  });

  const selectedHolding =
    holdings.find((holding) => holding.id === selectedId) ?? holdings[0];
  const totalAssets = holdings.reduce((sum, holding) => sum + holding.marketValue, 0);
  const dayProfit = holdings.reduce((sum, holding) => sum + holding.dayProfit, 0);

  const selectHolding = (id: string) => {
    setSelectedId(id);
    setSheetOpen(false);
  };

  const addHolding = () => {
    const nextIndex = holdings.length + 1;
    const newHolding: Holding = {
      id: `custom-${Date.now()}`,
      name: `定投组合 ${nextIndex}`,
      code: "自定义持仓",
      marketValue: 10000,
      returnRate: 0,
      costPrice: 1,
      currentPrice: 1,
      shares: 10000,
      dayProfit: 0,
      trend: [
        { month: "1月", value: 0 },
        { month: "2月", value: 2500 },
        { month: "3月", value: 5000 },
        { month: "4月", value: 7500 },
        { month: "5月", value: 9000 },
        { month: "6月", value: 10000 },
      ],
      records: [
        {
          id: `custom-r-${Date.now()}`,
          time: new Date().toISOString().slice(0, 10),
          type: "买入",
          amount: 10000,
          shares: 10000,
        },
      ],
    };

    setHoldings((current) => [newHolding, ...current]);
    setSelectedId(newHolding.id);
    setSheetOpen(false);
  };

  const editHolding = (id: string) => {
    setHoldings((current) =>
      current.map((holding) =>
        holding.id === id
          ? {
              ...holding,
              name: holding.name.endsWith("（已编辑）")
                ? holding.name
                : `${holding.name}（已编辑）`,
            }
          : holding,
      ),
    );
  };

  const clearHolding = (id: string) => {
    setHoldings((current) =>
      current.map((holding) =>
        holding.id === id
          ? {
              ...holding,
              marketValue: 0,
              shares: 0,
              dayProfit: 0,
              returnRate: 0,
              records: [
                {
                  id: `${id}-clear-${Date.now()}`,
                  time: new Date().toISOString().slice(0, 10),
                  type: "卖出" as Operation["type"],
                  amount: holding.marketValue,
                  shares: holding.shares,
                },
                ...holding.records,
              ].slice(0, 5),
              trend: holding.trend.map((point, index, array) =>
                index === array.length - 1 ? { ...point, value: 0 } : point,
              ),
            }
          : holding,
      ),
    );
  };

  const submitRecord = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number(form.amount);
    const shares = Number(form.shares);

    if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(shares) || shares <= 0) {
      return;
    }

    const direction = form.type === "卖出" ? -1 : 1;

    setHoldings((current) =>
      current.map((holding) => {
        if (holding.id !== selectedHolding.id) {
          return holding;
        }

        const nextShares = Math.max(holding.shares + direction * shares, 0);
        const nextMarketValue = Math.max(
          holding.marketValue + direction * amount,
          0,
        );
        const nextCostPrice =
          nextShares > 0
            ? form.type === "买入"
              ? (holding.costPrice * holding.shares + amount) / Math.max(nextShares, 1)
              : holding.costPrice
            : holding.costPrice;
        const nextCurrentPrice =
          nextShares > 0 ? nextMarketValue / nextShares : holding.currentPrice;
        const nextReturnRate =
          nextCostPrice > 0 ? ((nextCurrentPrice - nextCostPrice) / nextCostPrice) * 100 : 0;
        const newRecord: Operation = {
          id: `${holding.id}-${Date.now()}`,
          time: new Date().toISOString().slice(0, 10),
          type: form.type,
          amount,
          shares,
        };

        return {
          ...holding,
          marketValue: nextMarketValue,
          shares: nextShares,
          costPrice: nextCostPrice,
          currentPrice: nextCurrentPrice,
          returnRate: nextReturnRate,
          dayProfit: form.type === "卖出" ? holding.dayProfit - amount * 0.004 : holding.dayProfit + amount * 0.006,
          records: [newRecord, ...holding.records].slice(0, 5),
          trend: holding.trend.map((point, index, array) =>
            index === array.length - 1 ? { ...point, value: nextMarketValue } : point,
          ),
        };
      }),
    );

    setForm({ type: "买入", amount: "", shares: "" });
    setRecordOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <aside className="hidden w-[280px] shrink-0 border-r bg-card md:block">
          <Sidebar
            holdings={holdings}
            selectedId={selectedId}
            onSelect={selectHolding}
            onAddHolding={addHolding}
            onEditHolding={editHolding}
            onClearHolding={clearHolding}
          />
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <Toolbar
            holdings={holdings}
            selectedHolding={selectedHolding}
            selectedId={selectedId}
            totalAssets={totalAssets}
            dayProfit={dayProfit}
            sheetOpen={sheetOpen}
            setSheetOpen={setSheetOpen}
            onSelect={selectHolding}
            onAddHolding={addHolding}
            onEditHolding={editHolding}
            onClearHolding={clearHolding}
            onOpenRecord={() => setRecordOpen(true)}
          />

          <section className="flex-1 overflow-auto p-4 sm:p-5 lg:p-6">
            <HoldingDetail holding={selectedHolding} />
          </section>
        </main>
      </div>

      <RecordDialog
        open={recordOpen}
        onOpenChange={setRecordOpen}
        holding={selectedHolding}
        form={form}
        onFormChange={setForm}
        onSubmit={submitRecord}
      />
    </div>
  );
}

function Sidebar({
  holdings,
  selectedId,
  onSelect,
  onAddHolding,
  onEditHolding,
  onClearHolding,
}: {
  holdings: Holding[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAddHolding: () => void;
  onEditHolding: (id: string) => void;
  onClearHolding: (id: string) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <Button className="h-11 w-full justify-start text-base" onClick={onAddHolding}>
          <Plus className="h-5 w-5" />
          新建持仓
        </Button>
      </div>

      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <div>
          <p className="text-sm font-semibold">持仓列表</p>
          <p className="text-xs text-muted-foreground">右键持仓可快速操作</p>
        </div>
        <Badge variant="secondary">{holdings.length}</Badge>
      </div>

      <div className="scrollbar-thin flex-1 space-y-2 overflow-y-auto px-3 pb-4">
        {holdings.map((holding) => (
          <HoldingNavItem
            key={holding.id}
            holding={holding}
            selected={holding.id === selectedId}
            onSelect={() => onSelect(holding.id)}
            onEdit={() => onEditHolding(holding.id)}
            onClear={() => onClearHolding(holding.id)}
          />
        ))}
      </div>
    </div>
  );
}

function HoldingNavItem({
  holding,
  selected,
  onSelect,
  onEdit,
  onClear,
}: {
  holding: Holding;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onClear: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuContextTrigger asChild>
        <div
          className={cn(
            "group rounded-lg border p-3 transition-colors",
            selected
              ? "border-primary/35 bg-accent text-accent-foreground shadow-sm"
              : "border-transparent hover:border-border hover:bg-muted/60",
          )}
        >
          <button type="button" className="w-full text-left" onClick={onSelect}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{holding.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{holding.code}</p>
              </div>
              <ReturnText value={holding.returnRate} />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground">当前市值</span>
              <span className="font-medium tabular-nums">
                {currencyFormatter.format(holding.marketValue)}
              </span>
            </div>
          </button>
        </div>
      </DropdownMenuContextTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          编辑持仓
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive hover:text-destructive"
          onSelect={onClear}
        >
          <Trash className="mr-2 h-4 w-4" />
          清仓
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Toolbar({
  holdings,
  selectedHolding,
  selectedId,
  totalAssets,
  dayProfit,
  sheetOpen,
  setSheetOpen,
  onSelect,
  onAddHolding,
  onEditHolding,
  onClearHolding,
  onOpenRecord,
}: {
  holdings: Holding[];
  selectedHolding: Holding;
  selectedId: string;
  totalAssets: number;
  dayProfit: number;
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
  onSelect: (id: string) => void;
  onAddHolding: () => void;
  onEditHolding: (id: string) => void;
  onClearHolding: (id: string) => void;
  onOpenRecord: () => void;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
      <div className="flex min-h-[72px] flex-col gap-3 px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="打开导航">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <SheetHeader className="border-b">
                <SheetTitle>定投持仓</SheetTitle>
              </SheetHeader>
              <Sidebar
                holdings={holdings}
                selectedId={selectedId}
                onSelect={onSelect}
                onAddHolding={onAddHolding}
                onEditHolding={onEditHolding}
                onClearHolding={onClearHolding}
              />
            </SheetContent>
          </Sheet>

          <div className="min-w-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto max-w-full justify-start px-0 py-0 text-left hover:bg-transparent"
                >
                  <span className="min-w-0 truncate text-lg font-semibold sm:text-xl">
                    {selectedHolding.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                {holdings.map((holding) => (
                  <DropdownMenuItem key={holding.id} onSelect={() => onSelect(holding.id)}>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{holding.name}</p>
                      <p className="text-xs text-muted-foreground">{holding.code}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Wallet className="h-4 w-4" />
                总资产 {currencyFormatter.format(totalAssets)}
              </span>
              <span>当日盈亏 <TodayProfit value={dayProfit} /></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 lg:pb-0">
          <Button className="h-10 shrink-0" onClick={onOpenRecord}>
            <Activity className="h-4 w-4" />
            记录操作
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 shrink-0">
                <FileDown className="h-4 w-4" />
                导出报告
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => undefined}>导出 CSV</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => undefined}>导出 PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 shrink-0"
            onClick={toggleTheme}
            aria-label="切换主题"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}

function HoldingDetail({ holding }: { holding: Holding }) {
  const profit = (holding.currentPrice - holding.costPrice) * holding.shares;

  return (
    <Tabs defaultValue="detail" className="mx-auto w-full max-w-7xl">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">当前持仓</p>
          <h1 className="text-2xl font-semibold tracking-normal">{holding.name}</h1>
        </div>
        <TabsList>
          <TabsTrigger value="detail">详情</TabsTrigger>
          <TabsTrigger value="records">记录</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="detail" className="mt-0">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.05fr]">
          <Card>
            <CardHeader>
              <CardTitle>持仓明细</CardTitle>
              <CardDescription>成本、现价、份额与盈亏率</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>成本价</TableHead>
                    <TableHead>现价</TableHead>
                    <TableHead>份额</TableHead>
                    <TableHead className="text-right">盈亏率</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      {decimalCurrencyFormatter.format(holding.costPrice)}
                    </TableCell>
                    <TableCell>
                      {decimalCurrencyFormatter.format(holding.currentPrice)}
                    </TableCell>
                    <TableCell>{numberFormatter.format(holding.shares)}</TableCell>
                    <TableCell className="text-right">
                      <ReturnText value={holding.returnRate} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Metric label="当前市值" value={currencyFormatter.format(holding.marketValue)} />
                <Metric label="浮动盈亏" value={currencyFormatter.format(profit)} accent={profit >= 0 ? "up" : "down"} />
                <Metric label="当日盈亏" value={`${holding.dayProfit >= 0 ? "+" : ""}${currencyFormatter.format(holding.dayProfit)}`} accent={holding.dayProfit >= 0 ? "up" : "down"} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>近6个月收益走势</CardTitle>
              <CardDescription>使用静态示例数据展示持仓市值变化</CardDescription>
            </CardHeader>
            <CardContent>
              <TrendChart data={holding.trend} />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>最近5条操作记录</CardTitle>
            <CardDescription>买入、卖出和调仓记录</CardDescription>
          </CardHeader>
          <CardContent>
            <RecordsTable records={holding.records} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="records" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>操作流水</CardTitle>
            <CardDescription>最近5条本地模拟记录</CardDescription>
          </CardHeader>
          <CardContent>
            <RecordsTable records={holding.records} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "up" | "down";
}) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 text-base font-semibold tabular-nums",
          accent === "up" && "text-emerald-600 dark:text-emerald-400",
          accent === "down" && "text-rose-600 dark:text-rose-400",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function TrendChart({ data }: { data: TrendPoint[] }) {
  const width = 680;
  const height = 260;
  const padding = { top: 20, right: 24, bottom: 38, left: 58 };
  const values = data.map((point) => point.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = Math.max(maxValue - minValue, 1);
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = data.map((point, index) => {
    const x = padding.left + (index / Math.max(data.length - 1, 1)) * chartWidth;
    const y = padding.top + ((maxValue - point.value) / range) * chartHeight;
    return { ...point, x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

  return (
    <div className="h-[280px] w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="近6个月收益走势图"
      >
        <defs>
          <linearGradient id="trend-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => {
          const y = padding.top + (line / 3) * chartHeight;
          const labelValue = maxValue - (line / 3) * range;
          return (
            <g key={line}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="hsl(var(--border))"
                strokeDasharray="4 5"
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-muted-foreground text-[11px]"
              >
                {Math.round(labelValue / 1000)}k
              </text>
            </g>
          );
        })}
        <path d={areaPath} fill="url(#trend-area)" />
        <path d={linePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
        {points.map((point) => (
          <g key={point.month}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="hsl(var(--background))"
              stroke="hsl(var(--primary))"
              strokeWidth="2.5"
            />
            <text
              x={point.x}
              y={height - 12}
              textAnchor="middle"
              className="fill-muted-foreground text-[12px]"
            >
              {point.month}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function RecordsTable({ records }: { records: Operation[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>时间</TableHead>
          <TableHead>类型</TableHead>
          <TableHead>金额</TableHead>
          <TableHead className="text-right">份额</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="font-medium">{record.time}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={cn(
                  record.type === "买入" && "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
                  record.type === "卖出" && "bg-rose-500/12 text-rose-700 dark:text-rose-300",
                  record.type === "调仓" && "bg-sky-500/12 text-sky-700 dark:text-sky-300",
                )}
              >
                {record.type}
              </Badge>
            </TableCell>
            <TableCell>{currencyFormatter.format(record.amount)}</TableCell>
            <TableCell className="text-right tabular-nums">
              {numberFormatter.format(record.shares)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function RecordDialog({
  open,
  onOpenChange,
  holding,
  form,
  onFormChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  holding: Holding;
  form: OperationForm;
  onFormChange: React.Dispatch<React.SetStateAction<OperationForm>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>记录操作</DialogTitle>
          <DialogDescription>
            为 {holding.name} 添加一条买入、卖出或调仓记录。
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="operation-type">操作类型</Label>
              <Select
                id="operation-type"
                value={form.type}
                onChange={(event) =>
                  onFormChange((current) => ({
                    ...current,
                    type: event.target.value as Operation["type"],
                  }))
                }
              >
                <option value="买入">买入</option>
                <option value="卖出">卖出</option>
                <option value="调仓">调仓</option>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="operation-amount">金额</Label>
              <Input
                id="operation-amount"
                inputMode="decimal"
                type="number"
                min="0"
                step="0.01"
                placeholder="例如 3000"
                value={form.amount}
                onChange={(event) =>
                  onFormChange((current) => ({
                    ...current,
                    amount: event.target.value,
                  }))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="operation-shares">份额</Label>
              <Input
                id="operation-shares"
                inputMode="decimal"
                type="number"
                min="0"
                step="0.01"
                placeholder="例如 835.65"
                value={form.shares}
                onChange={(event) =>
                  onFormChange((current) => ({
                    ...current,
                    shares: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">保存记录</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function InvestmentDashboard() {
  return (
    <ThemeProvider>
      <InvestmentDashboardInner />
    </ThemeProvider>
  );
}
