/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Token Cost & LLM panel: provider indicator (Open Router / Direct API Key)
 * and cost-by-LLM graph. Only GPT OSS in use at $0.
 */

import React, { useMemo } from 'react';
import { DollarSign, Key, Globe } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { LLMModel, LLMProvider } from '../data';

interface TokenCostLLMPanelProps {
  models: LLMModel[];
  provider: LLMProvider | null;
}

const providerLabel: Record<LLMProvider, string> = {
  open_router: 'Open Router',
  direct_api: 'Direct API Key',
};

export function TokenCostLLMPanel({ models, provider }: TokenCostLLMPanelProps) {
  const chartData = useMemo(
    () =>
      models.map((m) => ({
        name: m.name,
        costUsd: m.costUsd ?? 0,
        inUse: m.inUse,
      })),
    [models]
  );

  const totalCost = useMemo(
    () => models.reduce((sum, m) => sum + (m.costUsd ?? 0), 0),
    [models]
  );

  return (
    <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
      <h4 className="text-sm font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-primary" />
        Token Cost & LLM
      </h4>

      {/* Provider indicator */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Provider
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
          title={provider ? providerLabel[provider] : '—'}
        >
          {provider === 'open_router' ? (
            <Globe className="w-3.5 h-3.5" />
          ) : (
            <Key className="w-3.5 h-3.5" />
          )}
          {provider ? providerLabel[provider] : '—'}
        </span>
      </div>

      {/* Total cost */}
      <div className="mb-6">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
          Total token cost (current period)
        </p>
        <p className="text-2xl font-black text-primary">${totalCost.toFixed(2)}</p>
        <p className="text-[10px] text-slate-500 mt-1">
          Only GPT OSS in use — free tier
        </p>
      </div>

      {/* Cost by LLM bar chart */}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
          >
            <XAxis
              type="number"
              domain={[0, (dataMax: number) => Math.max(0.5, dataMax)]}
              tickFormatter={(v) => (v === 0 ? '$0' : `$${v}`)}
              stroke="currentColor"
              className="text-slate-500 text-[10px]"
              tick={{ fill: 'currentColor' }}
              tickCount={4}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              stroke="currentColor"
              className="text-slate-500 text-[10px]"
              tick={{ fill: 'currentColor', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a232c',
                border: '1px solid #2d3748',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e2e8f0' }}
              formatter={(value: number, _name: string, item: { payload?: { inUse?: boolean } }) => [
                value === 0 ? '$0.00 (free)' : `$${Number(value).toFixed(2)}`,
                item.payload?.inUse ? 'In use' : 'Not in use',
              ]}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="costUsd" radius={[0, 4, 4, 0]} minPointSize={2}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.inUse ? '#258cf4' : 'rgba(51, 65, 72, 0.6)'}
                  stroke={entry.inUse ? '#258cf4' : 'transparent'}
                  strokeWidth={entry.inUse ? 1 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* In-use label */}
      <div className="mt-3 flex flex-wrap gap-2">
        {models.filter((m) => m.inUse).map((m) => (
          <span
            key={m.id}
            className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
          >
            {m.name} (in use)
          </span>
        ))}
      </div>
    </div>
  );
}
