/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Marketing: API hooks for Higgsfield, KREA, FAL.
 */

import React from 'react';
import { Video, ImageIcon, Zap } from 'lucide-react';
import { CREATIVE_PROVIDERS } from '../data';
import type { CreativeProvider } from '../data';

function ProviderCard({ p }: { p: CreativeProvider }) {
  const Icon = p.capabilities.includes('video') ? Video : ImageIcon;
  return (
    <div className="p-4 rounded-lg border border-border-dark bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-200">{p.name}</span>
            {!p.connected && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-600/50 text-slate-400 border border-border-dark">
                Connect API key
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">{p.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {p.capabilities.map((c) => (
              <span
                key={c}
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-700 text-slate-400"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreativeProviderHooks() {
  return (
    <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
      <h4 className="text-sm font-bold uppercase tracking-wide mb-2 flex items-center gap-2">
        <Zap className="w-4 h-4 text-primary" />
        Advertising pipeline APIs
      </h4>
      <p className="text-[11px] text-slate-500 font-medium mb-4">
        Connect API keys in env to enable image and video generation.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CREATIVE_PROVIDERS.map((p) => (
          <ProviderCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
