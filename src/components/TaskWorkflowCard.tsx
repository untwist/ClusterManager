/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Task card with assigned agents and workflow/approval chain.
 */

import React from 'react';
import { CheckCircle2, Clock, RotateCw, XCircle, ChevronRight, Cpu } from 'lucide-react';
import type { Task, Agent, WorkflowStep } from '../data';

interface TaskWorkflowCardProps {
  task: Task;
  agents: (Agent | null)[];
  workflowSteps?: WorkflowStep[];
}

function StepStatusIcon({ status }: { status: WorkflowStep['status'] }) {
  switch (status) {
    case 'approved':
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case 'rejected':
      return <XCircle className="w-4 h-4 text-rose-500" />;
    case 'in_progress':
      return <RotateCw className="w-4 h-4 text-primary animate-spin" />;
    default:
      return <Clock className="w-4 h-4 text-slate-500" />;
  }
}

export function TaskWorkflowCard({ task, agents, workflowSteps = task.workflowSteps }: TaskWorkflowCardProps) {
  const steps = (workflowSteps ?? []).slice().sort((a, b) => a.order - b.order);
  const hasWorkflow = steps.length > 0;
  const hasAgents = (task.assignedAgentIds?.length ?? 0) > 0;

  return (
    <div className="relative flex gap-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg shrink-0 ${
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
        ) : (
          <Clock className="w-4 h-4" />
        )}
      </div>
      <div className={`flex-1 pt-0 min-w-0 ${task.status === 'idle' ? 'opacity-70' : ''}`}>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h6 className="text-sm font-bold">{task.name}</h6>
          <span className="text-[10px] font-bold uppercase text-slate-500">
            {task.timestamp ?? (task.status === 'running' ? 'Running...' : 'Pending')}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">{task.description}</p>

        {hasAgents && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Assigned</span>
            <div className="flex -space-x-2">
              {agents.filter(Boolean).map((agent) => (
                <div
                  key={agent!.id}
                  className="w-7 h-7 rounded-full bg-slate-800 border-2 border-card-dark flex items-center justify-center"
                  title={agent!.name}
                >
                  <Cpu className="w-3.5 h-3.5 text-primary" />
                </div>
              ))}
            </div>
            <span className="text-[11px] text-slate-400">
              {agents.filter(Boolean).map((a) => a!.name).join(', ')}
            </span>
          </div>
        )}

        {hasWorkflow && (
          <div className="mt-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Workflow</span>
            <div className="mt-1.5 flex flex-wrap items-center gap-1">
              {steps.map((step, i) => {
                const agent = agents.find((a) => a?.id === step.agentId);
                const name = agent?.name ?? step.role ?? step.agentId;
                return (
                  <React.Fragment key={step.order}>
                    {i > 0 && (
                      <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-800/80 border border-border-dark">
                      <StepStatusIcon status={step.status} />
                      <span className="text-[11px] font-medium text-slate-300">{name}</span>
                      <span className="text-[10px] text-slate-500 capitalize">{step.status.replace('_', ' ')}</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {task.progress != null && (
          <div className="mt-3 bg-slate-800 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] font-bold text-slate-500">PROGRESS</span>
              <span className="text-[10px] font-bold text-primary">{task.progress}%</span>
            </div>
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
