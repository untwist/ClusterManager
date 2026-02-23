/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Central domain types for the data layer. Shared by mock and future API.
 */

export type Status = 'healthy' | 'warning' | 'error' | 'idle' | 'running';

export type WorkflowStepStatus = 'pending' | 'in_progress' | 'approved' | 'rejected';

export interface WorkflowStep {
  order: number;
  agentId: string;
  role?: string;
  status: WorkflowStepStatus;
  approvedBy?: string;
}

export interface Agent {
  id: string;
  name: string;
  roleTitle: string;
  departmentId?: string;
}

export interface NodeRole {
  id: string;
  label: string;
  roleTitle: string;
  parentId?: string;
}

export interface TopologyEdge {
  fromRoleId: string;
  toRoleId: string;
  type?: 'reports_to' | 'collaborates_with';
}

export interface Task {
  id: string;
  name: string;
  status: Status;
  description: string;
  progress?: number;
  timestamp?: string;
  assignedAgentIds: string[];
  workflowSteps?: WorkflowStep[];
}

export interface Process {
  id: string;
  name: string;
  status: Status;
  workload: number;
  tokens: string;
  description: string;
  tasks: Task[];
}

export interface Department {
  id: string;
  name: string;
  icon: unknown;
  status: Status;
  nodeCount: number;
  processes: Process[];
}

export interface DepartmentTopology {
  departmentId: string;
  roles: NodeRole[];
  edges: TopologyEdge[];
}

export interface ClusterSummary {
  totalAgents: number;
  totalAgentsDelta: string;
  tokens24h: string;
  tokensDelta: string;
  tokensThresholdPct: number;
  avgWorkload: number;
  avgWorkloadLabel: string;
  nodesOptimal: number;
  healthyNodes: number;
  warningNodes: number;
  idleNodes: number;
  errorNodes: number;
}

export interface Alert {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  source?: string;
}

export interface AgentDistributionEntry {
  name: string;
  value: number;
  color: string;
}

export interface TopConsumer {
  name: string;
  role: string;
  tokens: string;
}

/** How the cluster reaches LLM APIs: Open Router or Direct API Key */
export type LLMProvider = 'open_router' | 'direct_api';

export interface LLMModel {
  id: string;
  name: string;
  /** Cost in USD for current period (e.g. 24h); null = placeholder / not in use */
  costUsd: number | null;
  /** Currently selected for this cluster */
  inUse: boolean;
}

/** Creative/Gen AI providers used in the advertising pipeline */
export type CreativeProviderId = 'higgsfield' | 'krea' | 'fal';

export interface CreativeProvider {
  id: CreativeProviderId;
  name: string;
  description: string;
  /** Image and/or video */
  capabilities: ('image' | 'video')[];
  /** Placeholder: API connected in future */
  connected: boolean;
}

/** Asset produced by the ad pipeline (digital ad image or video thumbnail) */
export interface AdAsset {
  id: string;
  campaignId: string;
  campaignName: string;
  /** e.g. "Mekhala Orchard" */
  brandOrPlaceholder: string;
  type: 'image' | 'video';
  /** Thumbnail or preview URL; placeholder if no asset yet */
  thumbnailUrl: string | null;
  /** Optional link (e.g. Instagram) */
  externalUrl?: string;
  providerId?: CreativeProviderId;
  status: Status;
  createdAt: string;
}
