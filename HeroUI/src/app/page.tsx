"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
} from "@heroui/react";
import {
  ArrowDownIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChartBarIcon,
  HeartIcon,
  MoonIcon,
  PencilSquareIcon,
  PlusIcon,
  ShareIcon,
  SparklesIcon,
  SunIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";

type SortDirection = "desc" | "asc";

type Point = {
  id: number;
  avatar: string;
  author: string;
  body: string;
  time: string;
  likes: number;
  comments: number;
};

const navItems = ["我的持仓", "操作记录", "观点广场", "个人中心"];

const metricCards = [
  {
    label: "总资产",
    value: "¥186,420.50",
    note: "较上月 +¥8,320.40",
    icon: WalletIcon,
    tone: "text-emerald-600 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-500/15",
  },
  {
    label: "累计定投本金",
    value: "¥152,000.00",
    note: "已坚持 38 期",
    icon: BanknotesIcon,
    tone: "text-sky-600 bg-sky-50 dark:text-sky-300 dark:bg-sky-500/15",
  },
  {
    label: "累计收益",
    value: "+¥34,420.50",
    note: "+22.64%",
    icon: ArrowTrendingUpIcon,
    tone: "text-rose-600 bg-rose-50 dark:text-rose-300 dark:bg-rose-500/15",
  },
  {
    label: "最近定投日金额",
    value: "¥3,000.00",
    note: "2024-06-18 购入",
    icon: CalendarDaysIcon,
    tone: "text-amber-600 bg-amber-50 dark:text-amber-300 dark:bg-amber-500/15",
  },
];

const recentOperations = [
  { time: "2024-06-18", amount: "¥3,000", fund: "沪深300增强A" },
  { time: "2024-06-05", amount: "¥2,000", fund: "中证红利低波" },
  { time: "2024-05-22", amount: "¥1,500", fund: "纳斯达克100ETF联接" },
];

const holdings = [
  {
    name: "沪深300增强A",
    cost: "3.1280",
    price: "3.4560",
    shares: "18,230.45",
    profit: 10.49,
  },
  {
    name: "中证红利低波",
    cost: "1.0620",
    price: "1.1180",
    shares: "42,800.10",
    profit: 5.27,
  },
  {
    name: "纳斯达克100ETF联接",
    cost: "1.7340",
    price: "1.6880",
    shares: "9,520.00",
    profit: -2.65,
  },
];

const profitTrend = [
  { month: "1月", value: 18800 },
  { month: "2月", value: 21300 },
  { month: "3月", value: 24600 },
  { month: "4月", value: 22900 },
  { month: "5月", value: 30100 },
  { month: "6月", value: 34420 },
];

const historyRecords = [
  {
    date: "2024-06-18",
    type: "定投买入",
    amount: "¥3,000.00",
    shares: "867.36",
    price: "3.4590",
  },
  {
    date: "2024-06-05",
    type: "定投买入",
    amount: "¥2,000.00",
    shares: "1,790.51",
    price: "1.1170",
  },
  {
    date: "2024-05-22",
    type: "定投买入",
    amount: "¥1,500.00",
    shares: "884.43",
    price: "1.6960",
  },
  {
    date: "2024-05-08",
    type: "手动加仓",
    amount: "¥4,000.00",
    shares: "1,168.22",
    price: "3.4240",
  },
  {
    date: "2024-04-17",
    type: "定投买入",
    amount: "¥2,500.00",
    shares: "2,366.86",
    price: "1.0560",
  },
  {
    date: "2024-03-20",
    type: "定投买入",
    amount: "¥3,000.00",
    shares: "1,763.67",
    price: "1.7010",
  },
];

const initialPoints: Point[] = [
  {
    id: 1,
    avatar: "林",
    author: "林夕定投",
    body: "本周继续按计划买入红利低波，组合波动比上个月更舒服。定投节奏不变，仓位只做小幅校准。",
    time: "今天 09:42",
    likes: 128,
    comments: 18,
  },
  {
    id: 2,
    avatar: "许",
    author: "许愿池",
    body: "把本月新资金拆成两笔，先买宽基，剩余等月底再确认。记录下来以后，临时起意少了很多。",
    time: "昨天 21:10",
    likes: 96,
    comments: 12,
  },
  {
    id: 3,
    avatar: "周",
    author: "周末复盘",
    body: "收益创新高时更要看本金纪律，最近准备把单只基金上限设为组合的 35%。",
    time: "2024-06-17",
    likes: 76,
    comments: 9,
  },
];

function formatCurrency(value: number) {
  return `¥${value.toLocaleString("zh-CN", {
    maximumFractionDigits: 0,
  })}`;
}

function ProfitLineChart() {
  const width = 640;
  const height = 240;
  const padding = 34;
  const values = profitTrend.map((item) => item.value);
  const minValue = Math.min(...values) * 0.92;
  const maxValue = Math.max(...values) * 1.06;
  const span = maxValue - minValue;
  const points = profitTrend.map((item, index) => {
    const x =
      padding +
      (index * (width - padding * 2)) / Math.max(profitTrend.length - 1, 1);
    const y =
      height - padding - ((item.value - minValue) / span) * (height - padding * 2);

    return { ...item, x, y };
  });

  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${path} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="h-full min-h-[250px] w-full">
      <svg
        aria-label="近6个月累计收益走势"
        className="h-full min-h-[250px] w-full overflow-visible"
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id="profitArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => {
          const y = padding + (line * (height - padding * 2)) / 3;

          return (
            <line
              key={line}
              stroke="currentColor"
              strokeOpacity="0.12"
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
            />
          );
        })}
        <path d={areaPath} fill="url(#profitArea)" />
        <path
          d={path}
          fill="none"
          stroke="#10b981"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        {points.map((point) => (
          <g key={point.month}>
            <circle cx={point.x} cy={point.y} fill="#ffffff" r="6" />
            <circle cx={point.x} cy={point.y} fill="#10b981" r="4" />
            <text
              className="fill-slate-500 text-[13px] dark:fill-zinc-400"
              textAnchor="middle"
              x={point.x}
              y={height - 10}
            >
              {point.month}
            </text>
          </g>
        ))}
        <text
          className="fill-emerald-600 text-[20px] font-semibold dark:fill-emerald-300"
          textAnchor="end"
          x={width - padding}
          y={points[points.length - 1].y - 16}
        >
          {formatCurrency(points[points.length - 1].value)}
        </text>
      </svg>
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [pointTitle, setPointTitle] = useState("");
  const [pointBody, setPointBody] = useState("");
  const [points, setPoints] = useState<Point[]>(initialPoints);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  const sortedHistory = useMemo(() => {
    return [...historyRecords].sort((a, b) => {
      const result = new Date(a.date).getTime() - new Date(b.date).getTime();

      return sortDirection === "asc" ? result : -result;
    });
  }, [sortDirection]);

  const handleThemeToggle = () => {
    const nextTheme = !isDark;

    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("theme", nextTheme ? "dark" : "light");
    setIsDark(nextTheme);
  };

  const handlePublish = () => {
    const content = pointBody.trim();

    if (!content) {
      return;
    }

    const nextPoint: Point = {
      id: Date.now(),
      avatar: "我",
      author: pointTitle.trim() || "我的定投笔记",
      body: content,
      time: "刚刚",
      likes: 0,
      comments: 0,
    };

    setPoints((current) => [nextPoint, ...current]);
    setPointTitle("");
    setPointBody("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar
        className="border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/85"
        classNames={{
          wrapper: "max-w-7xl px-4 sm:px-6",
          menu: "bg-white/95 pt-6 dark:bg-zinc-950/95",
        }}
        isBordered
        isMenuOpen={isMenuOpen}
        maxWidth="full"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="gap-3" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
            className="sm:hidden"
          />
          <NavbarBrand className="gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
              <ChartBarIcon className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold tracking-normal">定投笔记</span>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-7 sm:flex" justify="center">
          {navItems.map((item) => (
            <NavbarItem key={item}>
              <Link
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-300"
                href={`#${item}`}
              >
                {item}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Tooltip content={isDark ? "切换浅色模式" : "切换暗色模式"}>
              <Button
                isIconOnly
                aria-label={isDark ? "切换浅色模式" : "切换暗色模式"}
                className="text-slate-700 dark:text-zinc-200"
                radius="sm"
                variant="light"
                onPress={handleThemeToggle}
              >
                {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
            </Tooltip>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Button
              color="primary"
              radius="sm"
              startContent={<PlusIcon className="h-4 w-4" />}
            >
              新建记录
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {navItems.map((item) => (
            <NavbarMenuItem key={item}>
              <Link
                className="w-full text-base font-medium text-slate-700 dark:text-zinc-200"
                href={`#${item}`}
                onPress={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Button
              className="mt-2 w-full"
              color="primary"
              radius="sm"
              startContent={<PlusIcon className="h-4 w-4" />}
            >
              新建记录
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:py-8">
        <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="flex flex-col justify-between gap-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <Chip
                  className="mb-4 border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300"
                  radius="sm"
                  variant="flat"
                >
                  2024 年 6 月投资仪表盘
                </Chip>
                <h1 className="text-3xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-4xl">
                  定投笔记
                </h1>
                <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-zinc-300">
                  用一张清晰的投资看板记录每次买入、持仓变化和阶段观点，让长期计划保持可回看、可复盘。
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  color="primary"
                  radius="sm"
                  size="lg"
                  startContent={<PencilSquareIcon className="h-5 w-5" />}
                >
                  记一笔操作
                </Button>
                <Button
                  className="border-slate-300 dark:border-zinc-700"
                  radius="sm"
                  size="lg"
                  startContent={<ChatBubbleLeftRightIcon className="h-5 w-5" />}
                  variant="bordered"
                >
                  发一条观点
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metricCards.map((metric) => {
                const Icon = metric.icon;

                return (
                  <Card
                    key={metric.label}
                    className="rounded-lg border border-slate-200 bg-slate-50 shadow-none dark:border-zinc-800 dark:bg-zinc-950/70"
                  >
                    <CardBody className="gap-4 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm text-slate-500 dark:text-zinc-400">
                          {metric.label}
                        </span>
                        <span className={`rounded-lg p-2 ${metric.tone}`}>
                          <Icon className="h-5 w-5" />
                        </span>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold tracking-normal text-slate-950 dark:text-white">
                          {metric.value}
                        </p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                          {metric.note}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">组合健康度</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-normal">稳健上行</h2>
              </div>
              <Chip color="success" radius="sm" variant="flat">
                +22.64%
              </Chip>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-100 p-4 dark:bg-zinc-800">
                <p className="text-sm text-slate-500 dark:text-zinc-400">基金数量</p>
                <p className="mt-2 text-2xl font-semibold">6</p>
              </div>
              <div className="rounded-lg bg-slate-100 p-4 dark:bg-zinc-800">
                <p className="text-sm text-slate-500 dark:text-zinc-400">盈利持仓</p>
                <p className="mt-2 text-2xl font-semibold">4/6</p>
              </div>
            </div>
            <Divider className="my-6" />
            <div className="space-y-4">
              {[
                { label: "宽基指数", value: "52%" },
                { label: "红利策略", value: "31%" },
                { label: "海外资产", value: "17%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-zinc-300">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-zinc-800">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: item.value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <Card
            className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            id="操作记录"
          >
            <CardHeader className="flex items-center justify-between gap-3 px-5 pt-5">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">记录操作</p>
                <h2 className="text-xl font-semibold tracking-normal">最近 3 条操作记录</h2>
              </div>
              <PencilSquareIcon className="h-6 w-6 text-emerald-500" />
            </CardHeader>
            <CardBody className="gap-4 px-5 pb-5">
              <div className="space-y-3">
                {recentOperations.map((record) => (
                  <div
                    key={`${record.time}-${record.fund}`}
                    className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-3 dark:border-zinc-800"
                  >
                    <div>
                      <p className="text-sm font-medium">{record.fund}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                        {record.time}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                      {record.amount}
                    </span>
                  </div>
                ))}
              </div>
              <Link className="text-sm font-medium text-emerald-600 dark:text-emerald-300" href="#历史记录">
                查看全部
              </Link>
            </CardBody>
          </Card>

          <Card
            className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            id="我的持仓"
          >
            <CardHeader className="flex items-center justify-between gap-3 px-5 pt-5">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">持仓明细</p>
                <h2 className="text-xl font-semibold tracking-normal">当前基金表现</h2>
              </div>
              <WalletIcon className="h-6 w-6 text-sky-500" />
            </CardHeader>
            <CardBody className="px-5 pb-5">
              <div className="overflow-x-auto">
                <Table
                  aria-label="持仓明细"
                  className="min-w-[620px]"
                  classNames={{ wrapper: "shadow-none border border-slate-200 dark:border-zinc-800 rounded-lg" }}
                >
                  <TableHeader>
                    <TableColumn>名称</TableColumn>
                    <TableColumn>成本价</TableColumn>
                    <TableColumn>现价</TableColumn>
                    <TableColumn>持仓份额</TableColumn>
                    <TableColumn>盈亏%</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {holdings.map((holding) => (
                      <TableRow key={holding.name}>
                        <TableCell className="font-medium">{holding.name}</TableCell>
                        <TableCell>{holding.cost}</TableCell>
                        <TableCell>{holding.price}</TableCell>
                        <TableCell>{holding.shares}</TableCell>
                        <TableCell>
                          <span
                            className={
                              holding.profit >= 0
                                ? "font-semibold text-emerald-600 dark:text-emerald-300"
                                : "font-semibold text-rose-600 dark:text-rose-300"
                            }
                          >
                            {holding.profit >= 0 ? "+" : ""}
                            {holding.profit.toFixed(2)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>

          <Card className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader className="flex items-center justify-between gap-3 px-5 pt-5">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">收益走势</p>
                <h2 className="text-xl font-semibold tracking-normal">近 6 个月累计收益</h2>
              </div>
              <ArrowTrendingUpIcon className="h-6 w-6 text-emerald-500" />
            </CardHeader>
            <CardBody className="px-5 pb-5">
              <ProfitLineChart />
            </CardBody>
          </Card>

          <Card
            className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            id="观点广场"
          >
            <CardHeader className="flex items-center justify-between gap-3 px-5 pt-5">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">最新观点</p>
                <h2 className="text-xl font-semibold tracking-normal">投资者正在讨论</h2>
              </div>
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-amber-500" />
            </CardHeader>
            <CardBody className="gap-4 px-5 pb-5">
              {points.slice(0, 2).map((point) => (
                <div
                  key={point.id}
                  className="rounded-lg border border-slate-200 p-4 dark:border-zinc-800"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <Avatar className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200" name={point.avatar} size="sm" />
                    <div>
                      <p className="text-sm font-semibold">{point.author}</p>
                      <p className="text-xs text-slate-500 dark:text-zinc-400">{point.time}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-slate-700 dark:text-zinc-300">
                    {point.body}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
                    <HeartIcon className="h-4 w-4" />
                    {point.likes}
                  </div>
                </div>
              ))}
              <Link className="text-sm font-medium text-emerald-600 dark:text-emerald-300" href="#观点分享">
                去观点广场
              </Link>
            </CardBody>
          </Card>
        </section>

        <section id="历史记录">
          <Card className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader className="flex flex-col gap-4 px-5 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">完整记录</p>
                <h2 className="text-xl font-semibold tracking-normal">历史定投记录列表</h2>
              </div>
              <Button
                radius="sm"
                startContent={
                  sortDirection === "desc" ? (
                    <ArrowDownIcon className="h-4 w-4" />
                  ) : (
                    <ArrowPathIcon className="h-4 w-4" />
                  )
                }
                variant="flat"
                onPress={() => setSortDirection((current) => (current === "desc" ? "asc" : "desc"))}
              >
                时间{sortDirection === "desc" ? "降序" : "升序"}
              </Button>
            </CardHeader>
            <CardBody className="px-5 pb-5">
              <div className="overflow-x-auto">
                <Table
                  aria-label="历史定投记录"
                  className="min-w-[720px]"
                  classNames={{ wrapper: "shadow-none border border-slate-200 dark:border-zinc-800 rounded-lg" }}
                >
                  <TableHeader>
                    <TableColumn>日期</TableColumn>
                    <TableColumn>操作类型</TableColumn>
                    <TableColumn>金额</TableColumn>
                    <TableColumn>份额</TableColumn>
                    <TableColumn>成交价</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {sortedHistory.map((record) => (
                      <TableRow key={`${record.date}-${record.type}-${record.amount}`}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>
                          <Chip
                            color={record.type === "手动加仓" ? "warning" : "success"}
                            radius="sm"
                            size="sm"
                            variant="flat"
                          >
                            {record.type}
                          </Chip>
                        </TableCell>
                        <TableCell className="font-semibold">{record.amount}</TableCell>
                        <TableCell>{record.shares}</TableCell>
                        <TableCell>{record.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]" id="观点分享">
          <Card className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader className="px-5 pt-5">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">观点分享</p>
                <h2 className="text-xl font-semibold tracking-normal">写下这次复盘</h2>
              </div>
            </CardHeader>
            <CardBody className="gap-4 px-5 pb-5">
              <Input
                label="观点标题"
                radius="sm"
                value={pointTitle}
                variant="bordered"
                onValueChange={setPointTitle}
              />
              <div className="rounded-lg border border-slate-200 dark:border-zinc-800">
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 p-2 dark:border-zinc-800">
                  {["B", "I", "•", "H"].map((label) => (
                    <Tooltip content={`${label} 格式`} key={label}>
                      <Button
                        isIconOnly
                        aria-label={`${label} 格式`}
                        className="font-semibold"
                        radius="sm"
                        size="sm"
                        variant="light"
                      >
                        {label}
                      </Button>
                    </Tooltip>
                  ))}
                </div>
                <Textarea
                  minRows={7}
                  placeholder="记录今天的买入理由、仓位变化或需要提醒未来自己的判断。"
                  radius="none"
                  value={pointBody}
                  variant="flat"
                  onValueChange={setPointBody}
                />
              </div>
              <Button
                color="primary"
                isDisabled={!pointBody.trim()}
                radius="sm"
                startContent={<SparklesIcon className="h-4 w-4" />}
                onPress={handlePublish}
              >
                发布观点
              </Button>
            </CardBody>
          </Card>

          <Card className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader className="px-5 pt-5">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">已发布观点</p>
                <h2 className="text-xl font-semibold tracking-normal">观点广场精选</h2>
              </div>
            </CardHeader>
            <CardBody className="gap-4 px-5 pb-5">
              {points.slice(0, 4).map((point) => (
                <div
                  className="rounded-lg border border-slate-200 p-4 dark:border-zinc-800"
                  key={point.id}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar
                        className="bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-100"
                        name={point.avatar}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{point.author}</p>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">{point.time}</p>
                      </div>
                    </div>
                    <Button
                      radius="sm"
                      size="sm"
                      startContent={<HeartIcon className="h-4 w-4" />}
                      variant="flat"
                    >
                      {point.likes}
                    </Button>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-zinc-300">
                    {point.body}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1">
                      <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4" />
                      {point.comments} 条评论
                    </span>
                    <span className="flex items-center gap-1">
                      <HeartIcon className="h-4 w-4" />
                      {point.likes} 个赞
                    </span>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </section>

        <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-500/30 dark:bg-emerald-500/10 sm:p-8">
          <p className="text-2xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-3xl">
            坚持定投，时间会给你答案
          </p>
          <Button
            className="mt-5"
            color="primary"
            radius="sm"
            size="lg"
            startContent={<ShareIcon className="h-5 w-5" />}
          >
            分享我的定投成绩
          </Button>
        </section>
      </main>

      <footer
        className="border-t border-slate-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950"
        id="个人中心"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 dark:text-zinc-400 sm:flex-row">
          <span>© 2024 定投笔记</span>
          <div className="flex items-center gap-3">
            {["Twitter", "Discord", "GitHub"].map((item) => (
              <Tooltip content={item} key={item}>
                <Button
                  isIconOnly
                  aria-label={item}
                  className="border-slate-200 text-slate-600 dark:border-zinc-800 dark:text-zinc-300"
                  radius="sm"
                  size="sm"
                  variant="bordered"
                >
                  {item.slice(0, 1)}
                </Button>
              </Tooltip>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
