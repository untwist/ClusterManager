/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Download,
  Plus,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCw,
  FileText,
  Cpu,
} from 'lucide-react';
import { DEPARTMENTS } from '../constants';
import { StatusBadge, KpiCard, NodeTopology, ClusterDistribution } from '../components';
import { CLUSTER_SUMMARY, AGENT_DISTRIBUTION } from '../constants';

export function Department() {
  const { deptId } = useParams<{ deptId: string }>();
  const navigate = useNavigate();
  const [activeProcessId, setActiveProcessId] = useState<string | null>(null);

  const activeDept = useMemo(
    () => DEPARTMENTS.find((d) => d.id === deptId) ?? DEPARTMENTS[1],
    [deptId]
  );

  const activeProcess = useMemo(
    () =>
      activeProcessId
        ? activeDept.processes.find((p) => p.id === activeProcessId) ?? activeDept.processes[0]
        : activeDept.processes[0],
    [activeDept, activeProcessId]
  );

  // If dept has processes and none selected, set first process
  React.useEffect(() => {
    if (activeDept.processes.length > 0 && !activeProcessId) {
      setActiveProcessId(activeDept.processes[0].id);
    }
  }, [activeDept, activeProcessId]);

  // Redirect to home if invalid dept
  if (!DEPARTMENTS.some((d) => d.id === deptId)) {
    navigate('/', { replace: true });
    return null;
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

      {/* KPI Cards (same as Home for consistency) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard title="Total Agents">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-black">{CLUSTER_SUMMARY.totalAgents}</h3>
              <p className="text-xs font-semibold text-emerald-500 mt-1">{CLUSTER_SUMMARY.totalAgentsDelta}</p>
            </div>
            <div className="flex gap-1.5 mb-1 items-end h-8">
              {AGENT_DISTRIBUTION.slice(0, 4).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-primary rounded-full"
                  style={{ height: `${[3, 6, 4, 8][i] * 4}px`, opacity: 0.4 + i * 0.2 }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
            {AGENT_DISTRIBUTION.map((a) => (
              <span key={a.name} className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-bold whitespace-nowrap">
                {a.name}: {a.value}
              </span>
            ))}
          </div>
        </KpiCard>

        <KpiCard title="Total Tokens (24h)">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-black">{CLUSTER_SUMMARY.tokens24h}</h3>
              <p className="text-xs font-semibold text-emerald-500 mt-1">{CLUSTER_SUMMARY.tokensDelta}</p>
            </div>
          </div>
          <div className="mt-4 bg-slate-800 h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: `${CLUSTER_SUMMARY.tokensThresholdPct}%` }} />
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">{CLUSTER_SUMMARY.tokensThresholdPct}% of daily threshold</p>
        </KpiCard>

        <KpiCard title="Avg Workload">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-black">{CLUSTER_SUMMARY.avgWorkload}%</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">{CLUSTER_SUMMARY.avgWorkloadLabel}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500">
              <span className="text-[10px] font-bold">HIGH</span>
            </div>
          </div>
          <span className="text-[10px] font-medium text-slate-500">{CLUSTER_SUMMARY.nodesOptimal} nodes optimal</span>
        </KpiCard>

        <KpiCard title="Cluster Status">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Healthy</span>
              <span className="text-xs font-bold text-emerald-500">{CLUSTER_SUMMARY.healthyNodes}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Warning</span>
              <span className="text-xs font-bold text-amber-500">{CLUSTER_SUMMARY.warningNodes}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Idle/Sleep</span>
              <span className="text-xs font-bold text-slate-500">{CLUSTER_SUMMARY.idleNodes}</span>
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

          {/* Task Flow */}
          {activeProcess && activeProcess.tasks.length > 0 && (
            <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wide">{activeProcess.name}: Task Flow</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">Real-time execution log (Agent: AG2-Cluster-04)</p>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-card-dark flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-primary" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-800 z-0" />
                {activeProcess.tasks.map((task) => (
                  <div key={task.id} className="relative z-10 flex gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        task.status === 'healthy'
                          ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                          : task.status === 'running'
                            ? 'bg-primary text-white shadow-primary/20'
                            : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {task.status === 'healthy' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : task.status === 'running' ? (
                        <RotateCw className="w-4 h-4 animate-spin" />
                      ) : task.id === 'packet' ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>
                    <div className={`flex-1 pt-1 ${task.status === 'idle' ? 'opacity-50' : ''}`}>
                      <div className="flex items-center justify-between">
                        <h6 className="text-sm font-bold">{task.name}</h6>
                        <span
                          className={`text-[10px] font-bold uppercase ${task.status === 'running' ? 'text-primary' : 'text-slate-500'}`}
                        >
                          {task.timestamp ?? (task.status === 'running' ? 'Running...' : 'Pending')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{task.description}</p>
                      {task.progress != null && (
                        <div className="mt-3 bg-slate-800 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-bold text-slate-500">PROGRESS</span>
                            <span className="text-[10px] font-bold text-primary">{task.progress}%</span>
                          </div>
                          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${task.progress}%` }}
                              className="h-full bg-primary"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <ClusterDistribution />
          <NodeTopology />
        </div>
      </div>
    </main>
  );
}
