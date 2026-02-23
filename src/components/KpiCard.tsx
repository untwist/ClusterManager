/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface KpiCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function KpiCard({ title, children, className = '' }: KpiCardProps) {
  return (
    <div
      className={`bg-card-dark p-6 rounded-xl border border-border-dark shadow-sm ${className}`}
    >
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{title}</p>
      {children}
    </div>
  );
}
