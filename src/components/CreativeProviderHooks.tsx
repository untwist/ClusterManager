/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Marketing: API hooks for Higgsfield, KREA, FAL.
 */

import React from 'react';
import { Video, ImageIcon, KeyRound } from 'lucide-react';
import { CREATIVE_PROVIDERS } from '../data';
import type { CreativeProvider } from '../data';

function providerSummary(p: CreativeProvider): string {
  if (p.capabilities.includes('video') && p.capabilities.includes('image')) return 'Image & video';
  if (p.capabilities.includes('video')) return 'Short-form video ads';
  return 'Static and concept art';
}

function ProviderRow({ p }: { p: CreativeProvider }) {
  const Icon = p.capabilities.includes('video') ? Video : ImageIcon;
  return (
    <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 border-b border-border-dark/60 last:border-0">
      <div className="w-9 h-9 rounded-lg bg-slate-800/80 flex items-center justify-center shrink-0 border border-border-dark/60">
        <Icon className="w-4 h-4 text-slate-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-200">{p.name}</p>
        <p className="text-xs text-slate-500">{providerSummary(p)}</p>
      </div>
      <div className="shrink-0">
        {p.connected ? (
          <span className="text-[10px] font-medium text-emerald-500/90 uppercase tracking-wide">Connected</span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-slate-700/60 text-slate-400 border border-border-dark">
            <KeyRound className="w-3 h-3" />
            Add key
          </span>
        )}
      </div>
    </div>
  );
}

export function CreativeProviderHooks() {
  return (
    <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-200 tracking-tight">
          Advertising pipeline
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          Image and video generation for campaigns. Add API keys in env to enable.
        </p>
      </div>
      <div className="space-y-0">
        {CREATIVE_PROVIDERS.map((p) => (
          <ProviderRow key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
