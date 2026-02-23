/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAgentDistribution, useTopConsumers } from '../hooks/useData';

export function ClusterDistribution() {
  const AGENT_DISTRIBUTION = useAgentDistribution();
  const TOP_CONSUMERS = useTopConsumers();

  return (
    <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
      <h4 className="text-sm font-bold uppercase tracking-wide mb-6">Cluster Distribution</h4>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={AGENT_DISTRIBUTION}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {(AGENT_DISTRIBUTION ?? []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a232c',
                border: '1px solid #2d3748',
                borderRadius: '8px',
              }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-3">
        {(AGENT_DISTRIBUTION ?? []).map((agent) => (
          <div key={agent.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: agent.color }}
              />
              <span className="text-xs font-semibold">{agent.name}</span>
            </div>
            <span className="text-xs font-bold">{agent.value} Agents</span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-border-dark">
        <h4 className="text-xs font-bold uppercase tracking-wide mb-4">Top Token Consumers</h4>
        <div className="space-y-3">
          {(TOP_CONSUMERS ?? []).map((consumer) => (
            <div
              key={consumer.name}
              className="bg-slate-900/50 p-3 rounded-lg flex items-center justify-between border border-border-dark"
            >
              <div>
                <p className="text-[11px] font-bold">{consumer.name}</p>
                <p className="text-[10px] text-slate-500">{consumer.role}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-primary">{consumer.tokens}</p>
                <p className="text-[9px] font-bold text-slate-500">TOKENS</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
