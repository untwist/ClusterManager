/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import type { Status } from '../data';

const config: Record<Status, { color: string; text: string; label: string }> = {
  healthy: { color: 'bg-emerald-500', text: 'text-emerald-500', label: 'Healthy' },
  warning: { color: 'bg-amber-500', text: 'text-amber-500', label: 'Warning' },
  error: { color: 'bg-rose-500', text: 'text-rose-500', label: 'Error' },
  idle: { color: 'bg-slate-500', text: 'text-slate-500', label: 'Idle' },
  running: { color: 'bg-primary', text: 'text-primary', label: 'Running' },
};

export function StatusBadge({ status }: { status: Status }) {
  const { color, text, label } = config[status];

  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-opacity-10 ${color.replace('bg-', 'bg-')} border border-opacity-20 ${color.replace('bg-', 'border-')} ${text} text-[10px] font-bold uppercase tracking-wider`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${color} ${status === 'running' ? 'animate-pulse' : ''}`} />
      {label}
    </div>
  );
}
