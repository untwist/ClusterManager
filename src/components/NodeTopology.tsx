/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const nodes = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  status: (i % 8 === 0 ? 'warning' : i % 12 === 0 ? 'error' : i % 15 === 0 ? 'idle' : 'healthy') as 'healthy' | 'warning' | 'error' | 'idle',
}));

export function NodeTopology() {
  return (
    <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm overflow-hidden">
      <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Node Topology</h4>
      <div className="aspect-square relative rounded-lg overflow-hidden min-h-[200px]">
        <TransformWrapper minScale={0.5} maxScale={4} limitToBounds>
          <TransformComponent
            wrapperStyle={{ width: '100%', height: '100%' }}
            contentStyle={{ width: '100%', height: '100%' }}
          >
            <div className="w-full h-full min-h-[200px] relative flex items-center justify-center bg-[radial-gradient(circle,#258cf4_1px,transparent_1px)] bg-[size:20px_20px]">
              <div className="w-full h-full flex flex-wrap gap-2 items-center justify-center p-4 opacity-80">
                {nodes.map((node) => (
                  <motion.div
                    key={node.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: node.id * 0.02 }}
                    className={`w-4 h-4 rounded-full ${
                      node.status === 'healthy'
                        ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        : node.status === 'warning'
                          ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                          : node.status === 'error'
                            ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                            : 'bg-slate-500'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur px-4 py-2 rounded-lg border border-slate-700 text-[10px] whitespace-nowrap">
                Node-09 (Anomaly Detected) - Investigating...
              </div>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-slate-500">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500" /> Healthy
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-amber-500" /> Warning
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-500" /> Error
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-500" /> Idle
        </div>
      </div>
    </div>
  );
}
