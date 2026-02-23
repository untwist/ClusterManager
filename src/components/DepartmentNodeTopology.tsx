/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Department-specific node topology: roles and relationships as a graph.
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { NodeRole, TopologyEdge } from '../data';

const NODE_RADIUS = 28;
const CRITIQUE_RADIUS = 6;
const LEVEL_HEIGHT = 72;
const NODE_GAP = 24;
const MAIN_CIRCLE_R = NODE_RADIUS - 2;
const CRITIQUE_OFFSET = (MAIN_CIRCLE_R + CRITIQUE_RADIUS) * 0.85;

interface DepartmentNodeTopologyProps {
  roles: NodeRole[];
  edges: TopologyEdge[];
  title?: string;
}

function buildLevels(roles: NodeRole[], edges: TopologyEdge[]): NodeRole[][] {
  const byId = new Map(roles.map((r) => [r.id, r]));
  const children = new Map<string, string[]>();
  const hasIncoming = new Set<string>();
  for (const e of edges) {
    hasIncoming.add(e.toRoleId);
    if (!children.has(e.fromRoleId)) children.set(e.fromRoleId, []);
    children.get(e.fromRoleId)!.push(e.toRoleId);
  }
  const roots = roles.filter((r) => !hasIncoming.has(r.id));
  const levels: NodeRole[][] = [];
  const added = new Set<string>();
  let current = roots.filter((r) => byId.has(r.id));
  while (current.length > 0) {
    levels.push(current);
    current.forEach((r) => added.add(r.id));
    const nextIds = new Set<string>();
    current.forEach((r) => {
      (children.get(r.id) ?? []).forEach((id) => nextIds.add(id));
    });
    current = [...nextIds]
      .filter((id) => !added.has(id) && byId.has(id))
      .map((id) => byId.get(id)!);
  }
  const remaining = roles.filter((r) => !added.has(r.id));
  if (remaining.length > 0) levels.push(remaining);
  return levels;
}

function layoutNodes(roles: NodeRole[], edges: TopologyEdge[]) {
  const levels = buildLevels(roles, edges);
  const positions = new Map<string, { x: number; y: number }>();
  let maxWidth = 0;
  levels.forEach((level, li) => {
    const y = li * LEVEL_HEIGHT + NODE_RADIUS + 8;
    const totalW = (level.length - 1) * (NODE_RADIUS * 2 + NODE_GAP) + NODE_RADIUS * 2;
    const startX = totalW / 2 - (level.length - 1) * (NODE_RADIUS * 2 + NODE_GAP) / 2 - NODE_RADIUS;
    level.forEach((node, i) => {
      const x = startX + i * (NODE_RADIUS * 2 + NODE_GAP) + NODE_RADIUS;
      positions.set(node.id, { x, y });
    });
    maxWidth = Math.max(maxWidth, totalW);
  });
  const width = Math.max(maxWidth + 32, 280);
  const height = levels.length * LEVEL_HEIGHT + 24;
  return { positions, levels, width, height };
}

export function DepartmentNodeTopology({ roles, edges, title = 'Node Topology' }: DepartmentNodeTopologyProps) {
  const { positions, levels, width, height } = useMemo(
    () => layoutNodes(roles, edges),
    [roles, edges]
  );

  if (roles.length === 0) {
    return (
      <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
        <h4 className="text-sm font-bold uppercase tracking-wide mb-4">{title}</h4>
        <div className="aspect-[4/3] flex items-center justify-center rounded-lg bg-slate-800/30 border border-border-dark">
          <p className="text-slate-500 text-sm">No role topology for this department.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm overflow-hidden">
      <h4 className="text-sm font-bold uppercase tracking-wide mb-4">{title}</h4>
      <div className="rounded-lg bg-slate-800/20 border border-border-dark overflow-hidden" style={{ height: 320 }}>
        <TransformWrapper minScale={0.5} maxScale={4} limitToBounds>
          <TransformComponent
            wrapperStyle={{ width: '100%', height: '100%' }}
            contentStyle={{ width: '100%', height: '100%', minWidth: width, minHeight: height }}
          >
            <svg
              width={width}
              height={height}
              className="overflow-visible"
              style={{ minWidth: '100%' }}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="8"
                  markerHeight="6"
                  refX="7"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="rgb(100 116 139)" />
                </marker>
              </defs>
              {edges.map((edge) => {
            const from = positions.get(edge.fromRoleId);
            const to = positions.get(edge.toRoleId);
            if (!from || !to) return null;
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.hypot(dx, dy);
            const offset = NODE_RADIUS + 4;
            const startX = from.x + (dx / len) * offset;
            const startY = from.y + (dy / len) * offset;
            const endX = to.x - (dx / len) * offset;
            const endY = to.y - (dy / len) * offset;
            return (
              <line
                key={`${edge.fromRoleId}-${edge.toRoleId}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="rgb(100 116 139)"
                strokeWidth={1.5}
                strokeDasharray={edge.type === 'collaborates_with' ? '4 4' : undefined}
                markerEnd="url(#arrowhead)"
              />
            );
              })}
              {roles.map((node) => {
            const pos = positions.get(node.id);
            if (!pos) return null;
            return (
              <g key={node.id}>
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.02 * roles.indexOf(node) }}
                  r={MAIN_CIRCLE_R}
                  cx={pos.x}
                  cy={pos.y}
                  fill="rgb(30 41 59)"
                  stroke="rgb(37 99 235)"
                  strokeWidth={2}
                  className="cursor-default"
                />
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.02 * roles.indexOf(node) + 0.05 }}
                  r={CRITIQUE_RADIUS}
                  cx={pos.x + CRITIQUE_OFFSET}
                  cy={pos.y - CRITIQUE_OFFSET}
                  fill="none"
                  stroke="rgb(239 68 68)"
                  strokeWidth={1.5}
                  className="cursor-default"
                  title="Critique / review step"
                />
                <text
                  x={pos.x}
                  y={pos.y - 6}
                  textAnchor="middle"
                  className="fill-slate-200 text-[10px] font-bold"
                >
                  {node.label}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 8}
                  textAnchor="middle"
                  className="fill-slate-500 text-[9px]"
                >
                  {node.roleTitle.length > 14 ? node.roleTitle.slice(0, 12) + '…' : node.roleTitle}
                </text>
              </g>
            );
              })}
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 border-t border-slate-500" /> Reports to
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 border-t border-dashed border-slate-500" /> Collaborates with
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full border-2 border-red-500 border-solid" /> Critique/Review
        </span>
      </div>
    </div>
  );
}
