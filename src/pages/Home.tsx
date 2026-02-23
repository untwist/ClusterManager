/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { TrendingUp, Database, Download, Plus, AlertTriangle, Building2, Activity } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import {
  useClusterSummary,
  useAgentDistribution,
  useDepartments,
  useAlerts,
  useTokenTrend,
  useLLMModels,
  useLLMProvider,
  useAdAssets,
} from '../hooks/useData';
import { KpiCard, NodeTopology, ClusterDistribution, TokenCostLLMPanel, AdCreativeThumbnails } from '../components';

export function Home() {
  const { summary: CLUSTER_SUMMARY } = useClusterSummary();
  const AGENT_DISTRIBUTION = useAgentDistribution();
  const { departments } = useDepartments();
  const ALERTS = useAlerts();
  const TOKEN_TREND = useTokenTrend();
  const llmModels = useLLMModels();
  const llmProvider = useLLMProvider();
  const { assets: adAssets, loading: adAssetsLoading } = useAdAssets(10);

  const activeProcesses = useMemo(
    () =>
      departments.reduce(
        (acc, dept) =>
          acc + dept.processes.filter((p) => p.status === 'running').length,
        0
      ),
    [departments]
  );
  const totalProcesses = useMemo(
    () => departments.reduce((acc, dept) => acc + dept.processes.length, 0),
    [departments]
  );
  const tokenTrendData = useMemo(() => {
    if (!TOKEN_TREND.length) return [];
    const today = new Date();
    return TOKEN_TREND.map((value, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      const dateLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return { date: d, dateLabel, tokens: value };
    });
  }, [TOKEN_TREND]);

  return (
    <main className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <span className="text-slate-100">Home</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-slate-800 border border-border-dark text-sm font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            New Agent
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard title="Total Agents">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-black">{CLUSTER_SUMMARY?.totalAgents ?? 0}</h3>
              <p className="text-xs font-semibold text-emerald-500 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {CLUSTER_SUMMARY?.totalAgentsDelta ?? '—'}
              </p>
            </div>
            <div className="flex gap-1.5 mb-1 items-end h-8">
              {[3, 6, 4, 8].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-primary rounded-full"
                  style={{ height: `${h * 4}px`, opacity: 0.4 + i * 0.2 }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
            {(AGENT_DISTRIBUTION ?? []).map((a) => (
              <span
                key={a.name}
                className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-bold whitespace-nowrap"
              >
                {a.name}: {a.value}
              </span>
            ))}
          </div>
        </KpiCard>

        <KpiCard title="Total Tokens (24h)">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-black">{CLUSTER_SUMMARY?.tokens24h ?? '—'}</h3>
              <p className="text-xs font-semibold text-emerald-500 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {CLUSTER_SUMMARY?.tokensDelta ?? '—'}
              </p>
            </div>
            <Database className="w-10 h-10 text-primary/20" />
          </div>
          <div className="mt-4 bg-slate-800 h-1 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full"
              style={{ width: `${CLUSTER_SUMMARY?.tokensThresholdPct ?? 0}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">
            {CLUSTER_SUMMARY?.tokensThresholdPct ?? 0}% of daily threshold reached
          </p>
        </KpiCard>

        <KpiCard title="Avg Workload">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-black">{CLUSTER_SUMMARY?.avgWorkload ?? 0}%</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                {CLUSTER_SUMMARY?.avgWorkloadLabel ?? '—'}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500">
              <span className="text-[10px] font-bold">HIGH</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-primary border-2 border-card-dark"
                  style={{ opacity: 0.2 * i }}
                />
              ))}
            </div>
            <span className="text-[10px] font-medium text-slate-500">
              {CLUSTER_SUMMARY?.nodesOptimal ?? 0} nodes optimal
            </span>
          </div>
        </KpiCard>

        <KpiCard title="Cluster Status">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Healthy Nodes</span>
              <span className="text-xs font-bold text-emerald-500">
                {CLUSTER_SUMMARY?.healthyNodes ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Warning State</span>
              <span className="text-xs font-bold text-amber-500">
                {CLUSTER_SUMMARY?.warningNodes ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Idle/Sleep</span>
              <span className="text-xs font-bold text-slate-500">
                {CLUSTER_SUMMARY?.idleNodes ?? 0}
              </span>
            </div>
            {(CLUSTER_SUMMARY?.errorNodes ?? 0) > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Error</span>
                <span className="text-xs font-bold text-rose-500">
                  {CLUSTER_SUMMARY?.errorNodes ?? 0}
                </span>
              </div>
            )}
          </div>
          <div className="mt-4 grid grid-cols-10 gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${
                  i < 7 ? 'bg-emerald-500' : i < 9 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
              />
            ))}
          </div>
        </KpiCard>
      </section>

      {/* Alerts + Department Health + Active Processes */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Recent Alerts
          </h4>
          <div className="space-y-3">
            {(ALERTS ?? []).map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border text-xs ${
                  alert.severity === 'error'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                }`}
              >
                <p className="font-semibold">{alert.message}</p>
                {alert.source && (
                  <p className="text-[10px] opacity-80 mt-1">{alert.source}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            Department Health
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {(departments ?? []).map((dept) => (
              <div
                key={dept.id}
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 border border-border-dark"
              >
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    dept.status === 'healthy'
                      ? 'bg-emerald-500'
                      : dept.status === 'warning'
                        ? 'bg-amber-500'
                        : dept.status === 'error'
                          ? 'bg-rose-500'
                          : 'bg-slate-500'
                  }`}
                />
                <span className="text-[11px] font-medium truncate" title={dept.name}>
                  {dept.name.split(' (')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Active Processes
          </h4>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-primary">{activeProcesses}</span>
            <span className="text-sm text-slate-500 font-medium">
              of {totalProcesses} processes running
            </span>
          </div>
          <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{
                width: totalProcesses ? `${(activeProcesses / totalProcesses) * 100}%` : '0%',
              }}
            />
          </div>
        </div>
      </section>

      {/* Token Cost & LLM */}
      <section className="mb-8">
        <TokenCostLLMPanel models={llmModels} provider={llmProvider} />
      </section>

      {/* Token trend sparkline */}
      <section className="mb-8">
        <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Token usage (7 days)</h4>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tokenTrendData} margin={{ top: 8, right: 8, left: 48, bottom: 24 }}>
                <defs>
                  <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#258cf4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#258cf4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="dateLabel"
                  stroke="currentColor"
                  className="text-slate-500 text-[11px]"
                  tick={{ fill: 'currentColor' }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  dataKey="tokens"
                  tickFormatter={(v) => `${v}M`}
                  width={44}
                  stroke="currentColor"
                  className="text-slate-500 text-[11px]"
                  tick={{ fill: 'currentColor' }}
                  domain={['dataMin - 0.2', 'dataMax + 0.2']}
                  tickCount={5}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}M tokens`, 'Tokens']}
                  labelFormatter={(label, payload) => {
                    const p = payload?.[0]?.payload as { date?: Date } | undefined;
                    return p?.date ? p.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : label;
                  }}
                  contentStyle={{ backgroundColor: 'rgb(30 41 59)', border: '1px solid rgb(51 65 85)', borderRadius: '8px' }}
                  labelStyle={{ color: 'rgb(203 213 225)' }}
                />
                <Area
                  type="monotone"
                  dataKey="tokens"
                  stroke="#258cf4"
                  strokeWidth={2}
                  fill="url(#tokenGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Main grid: Cluster Distribution + Node Topology */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        <div className="xl:col-span-2">
          <ClusterDistribution />
        </div>
        <div>
          <NodeTopology />
        </div>
      </div>

      {/* Lower section: Campaign creatives – Mekhala Orchard / advertising pipeline */}
      <AdCreativeThumbnails
        assets={adAssets}
        loading={adAssetsLoading}
        title="Campaign creatives"
        subtitle="Advertising pipeline – digital ads & video (Mekhala Orchard)"
      />
    </main>
  );
}
