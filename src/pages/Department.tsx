/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Download,
  Plus,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCw,
  Network,
} from 'lucide-react';
import {
  useDepartment,
  useDepartmentNodes,
  useDepartmentTopology,
  useClusterSummary,
  useAgentDistribution,
  useAgents,
  useAdAssets,
} from '../hooks/useData';
import { StatusBadge, KpiCard, ClusterDistribution, DepartmentNodeTopology, TaskWorkflowCard, CreativeProviderHooks, AdCreativeThumbnails } from '../components';

export function Department() {
  const { deptId } = useParams<{ deptId: string }>();
  const navigate = useNavigate();
  const [activeProcessId, setActiveProcessId] = useState<string | null>(null);

  const { department: activeDept, loading: deptLoading } = useDepartment(deptId);
  const { nodeCount } = useDepartmentNodes(deptId);
  const { topology } = useDepartmentTopology(deptId);
  const { summary: CLUSTER_SUMMARY } = useClusterSummary();
  const AGENT_DISTRIBUTION = useAgentDistribution();
  const allAgents = useAgents();
  const { assets: adAssets, loading: adAssetsLoading } = useAdAssets(10);

  const agentsMap = useMemo(
    () => Object.fromEntries(allAgents.map((a) => [a.id, a])),
    [allAgents]
  );

  const activeProcess = useMemo(
    () =>
      activeDept && activeProcessId
        ? activeDept.processes.find((p) => p.id === activeProcessId) ?? activeDept.processes[0]
        : activeDept?.processes[0],
    [activeDept, activeProcessId]
  );

  React.useEffect(() => {
    if (activeDept?.processes.length && !activeProcessId) {
      setActiveProcessId(activeDept.processes[0].id);
    }
  }, [activeDept, activeProcessId]);

  if (!deptId) {
    navigate('/', { replace: true });
    return null;
  }
  if (!deptLoading && !activeDept) {
    navigate('/', { replace: true });
    return null;
  }
  if (!activeDept) {
    return (
      <main className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-10 flex items-center justify-center">
        <p className="text-slate-500">Loading department…</p>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <Link to="/" className="hover:text-primary cursor-pointer">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-primary cursor-pointer">{activeDept.name}</span>
            {activeProcess && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-100">{activeProcess.name}</span>
              </>
            )}
          </nav>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold tracking-tight">
              {activeProcess ? activeProcess.name : activeDept.name}
            </h2>
            <StatusBadge status={activeProcess?.status ?? activeDept.status} />
          </div>
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

      {/* KPI Cards: Nodes allocated first, then cluster summary */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard title={`Nodes allocated to ${activeDept.name.split(' (')[0]}`}>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-black">{nodeCount}</h3>
              <p className="text-xs font-semibold text-emerald-500 mt-1">department nodes</p>
            </div>
            <Network className="w-10 h-10 text-primary/20" />
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">Role topology below</p>
        </KpiCard>

        <KpiCard title="Total Agents">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-black">{CLUSTER_SUMMARY?.totalAgents ?? 0}</h3>
              <p className="text-xs font-semibold text-emerald-500 mt-1">{CLUSTER_SUMMARY?.totalAgentsDelta ?? '—'}</p>
            </div>
            <div className="flex gap-1.5 mb-1 items-end h-8">
              {(AGENT_DISTRIBUTION ?? []).slice(0, 4).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-primary rounded-full"
                  style={{ height: `${[3, 6, 4, 8][i] * 4}px`, opacity: 0.4 + i * 0.2 }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
            {(AGENT_DISTRIBUTION ?? []).map((a) => (
              <span key={a.name} className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-bold whitespace-nowrap">
                {a.name}: {a.value}
              </span>
            ))}
          </div>
        </KpiCard>

        <KpiCard title="Total Tokens (24h)">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-black">{CLUSTER_SUMMARY?.tokens24h ?? '—'}</h3>
              <p className="text-xs font-semibold text-emerald-500 mt-1">{CLUSTER_SUMMARY?.tokensDelta ?? '—'}</p>
            </div>
          </div>
          <div className="mt-4 bg-slate-800 h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: `${CLUSTER_SUMMARY?.tokensThresholdPct ?? 0}%` }} />
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">{CLUSTER_SUMMARY?.tokensThresholdPct ?? 0}% of daily threshold</p>
        </KpiCard>

        <KpiCard title="Cluster Status">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Healthy</span>
              <span className="text-xs font-bold text-emerald-500">{CLUSTER_SUMMARY?.healthyNodes ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Warning</span>
              <span className="text-xs font-bold text-amber-500">{CLUSTER_SUMMARY?.warningNodes ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Idle/Sleep</span>
              <span className="text-xs font-bold text-slate-500">{CLUSTER_SUMMARY?.idleNodes ?? 0}</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-10 gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full ${i < 7 ? 'bg-emerald-500' : i < 9 ? 'bg-amber-500' : 'bg-rose-500'}`} />
            ))}
          </div>
        </KpiCard>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Process List */}
          <div className="bg-card-dark rounded-xl border border-border-dark overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-border-dark flex items-center justify-between bg-slate-800/30">
              <h4 className="text-sm font-bold uppercase tracking-wide">{activeDept.name} Cluster</h4>
              <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded">
                {activeDept.processes.length} Active Processes
              </span>
            </div>
            <div className="divide-y divide-border-dark/50">
              {activeDept.processes.map((process) => {
                const isActive = activeProcess?.id === process.id;
                return (
                  <button
                    key={process.id}
                    onClick={() => setActiveProcessId(process.id)}
                    className={`w-full flex items-center p-6 transition-colors text-left group ${
                      isActive ? 'bg-primary/5' : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-all ${
                        process.status === 'healthy'
                          ? 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white'
                          : process.status === 'warning'
                            ? 'bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white'
                            : process.status === 'running'
                              ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                              : 'bg-slate-500/10 text-slate-500 group-hover:bg-slate-500 group-hover:text-white'
                      }`}
                    >
                      {process.status === 'healthy' && <CheckCircle2 className="w-5 h-5" />}
                      {process.status === 'warning' && <AlertCircle className="w-5 h-5" />}
                      {process.status === 'running' && <RotateCw className="w-5 h-5 animate-spin" />}
                      {(process.status === 'idle' || process.status === 'error') && <Clock className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold">{process.name}</h5>
                      <p className="text-[11px] text-slate-500 font-medium">{process.description}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs font-bold">{process.workload}% Workload</p>
                        <p className={`text-[10px] ${process.status === 'warning' ? 'text-amber-500' : 'text-slate-500'}`}>
                          {process.tokens} Tokens
                        </p>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'text-primary' : 'text-slate-600'}`} />
                    </div>
                  </button>
                );
              })}
              {activeDept.processes.length === 0 && (
                <div className="p-10 text-center text-slate-500 text-sm italic">
                  No active processes in this department.
                </div>
              )}
            </div>
          </div>

          {/* Task Flow with assigned agents and workflow */}
          {activeProcess && activeProcess.tasks.length > 0 && (
            <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wide">{activeProcess.name}: Task Flow</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">Assigned agents and workflow steps</p>
                </div>
              </div>

              <div className="space-y-6 relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-800 z-0" />
                {activeProcess.tasks.map((task) => (
                  <div key={task.id} className="relative z-10 pl-0">
                    <TaskWorkflowCard
                      task={task}
                      agents={(task.assignedAgentIds ?? []).map((id) => agentsMap[id] ?? null)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeDept.id === 'marketing' && (
            <AdCreativeThumbnails
              assets={adAssets}
              loading={adAssetsLoading}
              title="Campaign creatives"
              subtitle="Advertising pipeline – digital ads & video (Mekhala Orchard)"
            />
          )}
        </div>

        <div className="space-y-6">
          <DepartmentNodeTopology
            roles={topology?.roles ?? []}
            edges={topology?.edges ?? []}
            title={`${activeDept.name.split(' (')[0]} – Role Topology`}
          />
          {activeDept.id === 'marketing' && <CreativeProviderHooks />}
          <ClusterDistribution />
        </div>
      </div>
    </main>
  );
}
