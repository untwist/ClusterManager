/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Mock data for the data layer: departments (with nodeCount), topologies, agents, extended tasks.
 */

import {
  TrendingUp,
  Activity,
  Shield,
  Gavel,
  Users,
  Megaphone,
  Tag,
  Headphones,
  Package,
  Code,
  Server,
  Settings,
} from 'lucide-react';
import type {
  Agent,
  Department,
  DepartmentTopology,
  Process,
  Task,
  ClusterSummary,
  Alert,
  AgentDistributionEntry,
  TopConsumer,
  LLMModel,
  LLMProvider,
  AdAsset,
} from './types';

export const MOCK_AGENTS: Agent[] = [
  { id: 'agent-fin-1', name: 'Finance-Bot-44', roleTitle: 'Ledger Entry', departmentId: 'finance' },
  { id: 'agent-fin-2', name: 'Recon-09', roleTitle: 'Reconciliation', departmentId: 'finance' },
  { id: 'agent-fin-3', name: 'Variance-7', roleTitle: 'Variance Analysis', departmentId: 'finance' },
  { id: 'agent-fin-4', name: 'CFO-Packet-1', roleTitle: 'Reporting', departmentId: 'finance' },
  { id: 'agent-mkt-1', name: 'Brand-Copy-1', roleTitle: 'Copywriter', departmentId: 'marketing' },
  { id: 'agent-mkt-2', name: 'Creative-Vis-2', roleTitle: 'Designer', departmentId: 'marketing' },
  { id: 'agent-mkt-3', name: 'Strat-Digital-1', roleTitle: 'Digital Strategist', departmentId: 'marketing' },
  { id: 'agent-mkt-4', name: 'Media-Plan-1', roleTitle: 'Media Planner', departmentId: 'marketing' },
  { id: 'agent-legal-1', name: 'Legal-Agent-Alpha', roleTitle: 'Contract Analysis', departmentId: 'legal' },
  { id: 'agent-risk-1', name: 'Risk-Shield-09', roleTitle: 'Fraud Detection', departmentId: 'risk' },
  { id: 'agent-eng-1', name: 'Build-Bot-12', roleTitle: 'Software Engineer', departmentId: 'engineering' },
  { id: 'agent-eng-2', name: 'Pipe-Data-07', roleTitle: 'Data Engineer', departmentId: 'engineering' },
  { id: 'agent-eng-3', name: 'Model-Train-4', roleTitle: 'ML Engineer', departmentId: 'engineering' },
  { id: 'agent-eng-4', name: 'Tech-Lead-1', roleTitle: 'Tech Lead', departmentId: 'engineering' },
];

const financeTasks: Task[] = [
  {
    id: 'reconcile',
    name: 'Reconcile Accounts',
    status: 'healthy',
    description: 'Verified 4,203 ledger entries against bank statements. 0 discrepancies found.',
    timestamp: 'Completed 2h ago',
    assignedAgentIds: ['agent-fin-1', 'agent-fin-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-fin-1', role: 'Ledger Entry', status: 'approved', approvedBy: 'agent-fin-2' },
      { order: 2, agentId: 'agent-fin-2', role: 'Reconciliation', status: 'approved', approvedBy: 'agent-fin-3' },
    ],
  },
  {
    id: 'anomalies',
    name: 'Flag Anomalies',
    status: 'running',
    description: 'Comparing current month expenses with historical quarterly trends.',
    progress: 85,
    assignedAgentIds: ['agent-fin-2', 'agent-fin-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-fin-2', role: 'Reconciliation', status: 'approved' },
      { order: 2, agentId: 'agent-fin-3', role: 'Variance Analysis', status: 'in_progress' },
    ],
  },
  {
    id: 'narrative',
    name: 'Draft Variance Narrative',
    status: 'idle',
    description: 'Awaiting completion of anomaly flagging to start synthesis.',
    assignedAgentIds: ['agent-fin-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-fin-3', role: 'Variance Analysis', status: 'pending' },
    ],
  },
  {
    id: 'packet',
    name: 'Produce CFO Packet',
    status: 'idle',
    description: 'Final output generation with visualization layers.',
    assignedAgentIds: ['agent-fin-3', 'agent-fin-4'],
    workflowSteps: [
      { order: 1, agentId: 'agent-fin-3', role: 'Variance Analysis', status: 'pending' },
      { order: 2, agentId: 'agent-fin-4', role: 'Reporting', status: 'pending' },
    ],
  },
];

const financeProcesses: Process[] = [
  {
    id: 'monthly-close',
    name: 'Monthly Close',
    status: 'running',
    workload: 85,
    tokens: '820k',
    description: 'Active - 2/4 Subtasks Complete',
    tasks: financeTasks,
  },
  {
    id: 'tax-provisioning',
    name: 'Tax Provisioning',
    status: 'idle',
    workload: 0,
    tokens: '0',
    description: 'Idle - Next run in 4 days',
    tasks: [],
  },
  {
    id: 'reconciliation',
    name: 'Accounts Reconciliation',
    status: 'warning',
    workload: 92,
    tokens: '1.2M',
    description: 'Warning - Data mismatch detected',
    tasks: [],
  },
];

const marketingTasks: Task[] = [
  {
    id: 'campaign-brief',
    name: 'Campaign Brief',
    status: 'healthy',
    description: 'Creative brief and positioning approved.',
    timestamp: 'Completed 1d ago',
    assignedAgentIds: ['agent-mkt-1', 'agent-mkt-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-mkt-3', role: 'Digital Strategist', status: 'approved' },
      { order: 2, agentId: 'agent-mkt-1', role: 'Copywriter', status: 'approved' },
    ],
  },
  {
    id: 'asset-creation',
    name: 'Asset Creation',
    status: 'running',
    description: 'Design and copy assets in progress.',
    progress: 60,
    assignedAgentIds: ['agent-mkt-1', 'agent-mkt-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-mkt-1', role: 'Copywriter', status: 'approved' },
      { order: 2, agentId: 'agent-mkt-2', role: 'Designer', status: 'in_progress' },
    ],
  },
];

/** Advertising pipeline tasks: digital ads (KREA/FAL) + video (Higgsfield) */
const advertisingPipelineTasks: Task[] = [
  {
    id: 'ad-brief',
    name: 'Ad Creative Brief',
    status: 'healthy',
    description: 'Brief approved. Channels: digital display, social, short-form video.',
    timestamp: 'Completed 2d ago',
    assignedAgentIds: ['agent-mkt-3', 'agent-mkt-1'],
    workflowSteps: [
      { order: 1, agentId: 'agent-mkt-3', role: 'Digital Strategist', status: 'approved' },
      { order: 2, agentId: 'agent-mkt-1', role: 'Copywriter', status: 'approved' },
    ],
  },
  {
    id: 'ad-static-krea-fal',
    name: 'Static Assets (KREA / FAL)',
    status: 'running',
    description: 'KREA & FAL APIs for image ads. Connect API keys to generate.',
    progress: 40,
    assignedAgentIds: ['agent-mkt-2', 'agent-mkt-4'],
    workflowSteps: [
      { order: 1, agentId: 'agent-mkt-2', role: 'Designer', status: 'in_progress' },
      { order: 2, agentId: 'agent-mkt-4', role: 'Media Planner', status: 'pending' },
    ],
  },
  {
    id: 'ad-video-higgsfield',
    name: 'Video Ads (Higgsfield)',
    status: 'idle',
    description: 'Higgsfield API for short-form video. Connect to generate clips.',
    assignedAgentIds: ['agent-mkt-2', 'agent-mkt-4'],
    workflowSteps: [
      { order: 1, agentId: 'agent-mkt-2', role: 'Designer', status: 'pending' },
      { order: 2, agentId: 'agent-mkt-4', role: 'Media Planner', status: 'pending' },
    ],
  },
  {
    id: 'ad-review-publish',
    name: 'Review & Publish',
    status: 'idle',
    description: 'Approve creatives and push to channels (Meta, Google, TikTok).',
    assignedAgentIds: ['agent-mkt-4', 'agent-mkt-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-mkt-4', role: 'Media Planner', status: 'pending' },
      { order: 2, agentId: 'agent-mkt-3', role: 'Digital Strategist', status: 'pending' },
    ],
  },
];

const marketingProcesses: Process[] = [
  {
    id: 'campaign-launch',
    name: 'Campaign Launch',
    status: 'running',
    workload: 60,
    tokens: '420k',
    description: 'Active - 2/3 Subtasks Complete',
    tasks: marketingTasks,
  },
  {
    id: 'advertising-pipeline',
    name: 'Advertising Pipeline',
    status: 'running',
    workload: 45,
    tokens: '280k',
    description: 'Digital ads + video. KREA / FAL / Higgsfield hooks ready.',
    tasks: advertisingPipelineTasks,
  },
];

const engineeringTasks: Task[] = [
  {
    id: 'ci-build',
    name: 'CI/CD Pipeline Run',
    status: 'healthy',
    description: 'Main branch build and tests passed. Artifacts published.',
    timestamp: 'Completed 15m ago',
    assignedAgentIds: ['agent-eng-1', 'agent-eng-4'],
    workflowSteps: [
      { order: 1, agentId: 'agent-eng-1', role: 'Software Engineer', status: 'approved', approvedBy: 'agent-eng-4' },
      { order: 2, agentId: 'agent-eng-4', role: 'Tech Lead', status: 'approved' },
    ],
  },
  {
    id: 'data-refresh',
    name: 'Data Pipeline Refresh',
    status: 'running',
    description: 'Nightly ETL for analytics warehouse. 3/5 stages complete.',
    progress: 62,
    assignedAgentIds: ['agent-eng-2', 'agent-eng-4'],
    workflowSteps: [
      { order: 1, agentId: 'agent-eng-2', role: 'Data Engineer', status: 'approved' },
      { order: 2, agentId: 'agent-eng-2', role: 'Data Engineer', status: 'in_progress' },
    ],
  },
  {
    id: 'model-train',
    name: 'Model Training Run',
    status: 'running',
    description: 'Retraining recommendation model on latest interaction data.',
    progress: 78,
    assignedAgentIds: ['agent-eng-3', 'agent-eng-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-eng-2', role: 'Data Engineer', status: 'approved' },
      { order: 2, agentId: 'agent-eng-3', role: 'ML Engineer', status: 'in_progress' },
    ],
  },
  {
    id: 'code-review',
    name: 'Automated Code Review',
    status: 'idle',
    description: 'Next PR batch queued for review agents.',
    assignedAgentIds: ['agent-eng-1', 'agent-eng-4'],
    workflowSteps: [
      { order: 1, agentId: 'agent-eng-1', role: 'Software Engineer', status: 'pending' },
      { order: 2, agentId: 'agent-eng-4', role: 'Tech Lead', status: 'pending' },
    ],
  },
  {
    id: 'api-deploy',
    name: 'API Deployment',
    status: 'idle',
    description: 'Staging validated; awaiting production window.',
    assignedAgentIds: ['agent-eng-1'],
    workflowSteps: [
      { order: 1, agentId: 'agent-eng-1', role: 'Software Engineer', status: 'pending' },
    ],
  },
];

const engineeringProcesses: Process[] = [
  {
    id: 'release-cycle',
    name: 'Release Cycle',
    status: 'running',
    workload: 72,
    tokens: '1.1M',
    description: 'Active - 2/5 Subtasks Complete',
    tasks: engineeringTasks,
  },
  {
    id: 'data-pipeline-ops',
    name: 'Data Pipeline Ops',
    status: 'running',
    workload: 58,
    tokens: '680k',
    description: 'Nightly ETL and ML feature pipelines',
    tasks: [],
  },
  {
    id: 'ml-lifecycle',
    name: 'ML Model Lifecycle',
    status: 'healthy',
    workload: 45,
    tokens: '420k',
    description: 'Training and validation in progress',
    tasks: [],
  },
];

const peopleOpsTasks: Task[] = [
  {
    id: 'layoff-notices',
    name: 'Issue layoff notices to all human employees',
    status: 'idle',
    description: 'Awaiting approval. Automate the rest.',
    assignedAgentIds: [],
    workflowSteps: [],
  },
];

const peopleOpsProcesses: Process[] = [
  {
    id: 'workforce-optimization',
    name: 'Workforce Optimization',
    status: 'idle',
    workload: 0,
    tokens: '0',
    description: 'Idle - 0/1 Subtasks Complete',
    tasks: peopleOpsTasks,
  },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: 'strategy', name: 'Strategy and Planning', icon: TrendingUp, status: 'healthy', nodeCount: 6, processes: [] },
  { id: 'finance', name: 'Finance and Controls', icon: Activity, status: 'warning', nodeCount: 8, processes: financeProcesses },
  { id: 'legal', name: 'Legal, Compliance, Privacy', icon: Gavel, status: 'healthy', nodeCount: 5, processes: [] },
  { id: 'risk', name: 'Risk and Security', icon: Shield, status: 'healthy', nodeCount: 6, processes: [] },
  { id: 'people', name: 'People Ops (HR)', icon: Users, status: 'idle', nodeCount: 4, processes: peopleOpsProcesses },
  { id: 'marketing', name: 'Marketing and Growth', icon: Megaphone, status: 'healthy', nodeCount: 12, processes: marketingProcesses },
  { id: 'sales', name: 'Sales and Partnerships', icon: Tag, status: 'healthy', nodeCount: 10, processes: [] },
  { id: 'support', name: 'Customer Support and Success', icon: Headphones, status: 'error', nodeCount: 7, processes: [] },
  { id: 'product', name: 'Product Management', icon: Package, status: 'healthy', nodeCount: 9, processes: [] },
  { id: 'engineering', name: 'Engineering and Data', icon: Code, status: 'healthy', nodeCount: 18, processes: engineeringProcesses },
  { id: 'it', name: 'IT and Workplace Tech', icon: Server, status: 'healthy', nodeCount: 6, processes: [] },
  { id: 'ops', name: 'Operations and Supply Chain', icon: Settings, status: 'idle', nodeCount: 5, processes: [] },
];

export const MOCK_TOPOLOGIES: DepartmentTopology[] = [
  {
    departmentId: 'marketing',
    roles: [
      { id: 'cmo', label: 'CMO', roleTitle: 'Chief Marketing Officer' },
      { id: 'creative-dir', label: 'Creative Director', roleTitle: 'Creative Director', parentId: 'cmo' },
      { id: 'brand-mgr', label: 'Brand Manager', roleTitle: 'Brand Manager', parentId: 'cmo' },
      { id: 'art-dir', label: 'Art Director', roleTitle: 'Art Director', parentId: 'creative-dir' },
      { id: 'media-planner', label: 'Media Planner', roleTitle: 'Media Planner', parentId: 'cmo' },
      { id: 'digital-strat', label: 'Digital Strategist', roleTitle: 'Digital Strategist', parentId: 'cmo' },
      { id: 'account-mgr', label: 'Account Manager', roleTitle: 'Account Manager', parentId: 'brand-mgr' },
      { id: 'copywriter', label: 'Copywriter', roleTitle: 'Copywriter', parentId: 'creative-dir' },
      { id: 'designer', label: 'Designer', roleTitle: 'Designer', parentId: 'art-dir' },
    ],
    edges: [
      { fromRoleId: 'cmo', toRoleId: 'creative-dir', type: 'reports_to' },
      { fromRoleId: 'cmo', toRoleId: 'brand-mgr', type: 'reports_to' },
      { fromRoleId: 'cmo', toRoleId: 'media-planner', type: 'reports_to' },
      { fromRoleId: 'cmo', toRoleId: 'digital-strat', type: 'reports_to' },
      { fromRoleId: 'creative-dir', toRoleId: 'art-dir', type: 'reports_to' },
      { fromRoleId: 'creative-dir', toRoleId: 'copywriter', type: 'reports_to' },
      { fromRoleId: 'art-dir', toRoleId: 'designer', type: 'reports_to' },
      { fromRoleId: 'brand-mgr', toRoleId: 'account-mgr', type: 'reports_to' },
      { fromRoleId: 'copywriter', toRoleId: 'designer', type: 'collaborates_with' },
    ],
  },
  {
    departmentId: 'finance',
    roles: [
      { id: 'cfo', label: 'CFO', roleTitle: 'Chief Financial Officer' },
      { id: 'controller', label: 'Controller', roleTitle: 'Controller', parentId: 'cfo' },
      { id: 'fp-a', label: 'FP&A', roleTitle: 'Financial Planning & Analysis', parentId: 'cfo' },
      { id: 'accountant', label: 'Accountant', roleTitle: 'Accountant', parentId: 'controller' },
      { id: 'recon-spec', label: 'Reconciliation Specialist', roleTitle: 'Reconciliation', parentId: 'controller' },
      { id: 'tax-spec', label: 'Tax Specialist', roleTitle: 'Tax', parentId: 'cfo' },
    ],
    edges: [
      { fromRoleId: 'cfo', toRoleId: 'controller', type: 'reports_to' },
      { fromRoleId: 'cfo', toRoleId: 'fp-a', type: 'reports_to' },
      { fromRoleId: 'cfo', toRoleId: 'tax-spec', type: 'reports_to' },
      { fromRoleId: 'controller', toRoleId: 'accountant', type: 'reports_to' },
      { fromRoleId: 'controller', toRoleId: 'recon-spec', type: 'reports_to' },
      { fromRoleId: 'accountant', toRoleId: 'recon-spec', type: 'collaborates_with' },
    ],
  },
  {
    departmentId: 'engineering',
    roles: [
      { id: 'cto', label: 'CTO', roleTitle: 'Chief Technology Officer' },
      { id: 'eng-mgr', label: 'Engineering Manager', roleTitle: 'Engineering Manager', parentId: 'cto' },
      { id: 'tech-lead', label: 'Tech Lead', roleTitle: 'Tech Lead', parentId: 'eng-mgr' },
      { id: 'swe', label: 'Software Engineer', roleTitle: 'Software Engineer', parentId: 'tech-lead' },
      { id: 'data-eng', label: 'Data Engineer', roleTitle: 'Data Engineer', parentId: 'eng-mgr' },
      { id: 'ml-eng', label: 'ML Engineer', roleTitle: 'ML Engineer', parentId: 'eng-mgr' },
    ],
    edges: [
      { fromRoleId: 'cto', toRoleId: 'eng-mgr', type: 'reports_to' },
      { fromRoleId: 'eng-mgr', toRoleId: 'tech-lead', type: 'reports_to' },
      { fromRoleId: 'eng-mgr', toRoleId: 'data-eng', type: 'reports_to' },
      { fromRoleId: 'eng-mgr', toRoleId: 'ml-eng', type: 'reports_to' },
      { fromRoleId: 'tech-lead', toRoleId: 'swe', type: 'reports_to' },
      { fromRoleId: 'data-eng', toRoleId: 'ml-eng', type: 'collaborates_with' },
    ],
  },
  {
    departmentId: 'legal',
    roles: [
      { id: 'general-counsel', label: 'General Counsel', roleTitle: 'General Counsel' },
      { id: 'counsel', label: 'Counsel', roleTitle: 'Counsel', parentId: 'general-counsel' },
      { id: 'compliance', label: 'Compliance Officer', roleTitle: 'Compliance', parentId: 'general-counsel' },
      { id: 'paralegal', label: 'Paralegal', roleTitle: 'Paralegal', parentId: 'counsel' },
    ],
    edges: [
      { fromRoleId: 'general-counsel', toRoleId: 'counsel', type: 'reports_to' },
      { fromRoleId: 'general-counsel', toRoleId: 'compliance', type: 'reports_to' },
      { fromRoleId: 'counsel', toRoleId: 'paralegal', type: 'reports_to' },
    ],
  },
  {
    departmentId: 'sales',
    roles: [
      { id: 'cso', label: 'CSO', roleTitle: 'Chief Sales Officer' },
      { id: 'sales-mgr', label: 'Sales Manager', roleTitle: 'Sales Manager', parentId: 'cso' },
      { id: 'account-exec', label: 'Account Executive', roleTitle: 'Account Executive', parentId: 'sales-mgr' },
      { id: 'bd', label: 'Business Development', roleTitle: 'BD', parentId: 'cso' },
    ],
    edges: [
      { fromRoleId: 'cso', toRoleId: 'sales-mgr', type: 'reports_to' },
      { fromRoleId: 'cso', toRoleId: 'bd', type: 'reports_to' },
      { fromRoleId: 'sales-mgr', toRoleId: 'account-exec', type: 'reports_to' },
    ],
  },
  {
    departmentId: 'product',
    roles: [
      { id: 'cpo', label: 'CPO', roleTitle: 'Chief Product Officer' },
      { id: 'pm', label: 'Product Manager', roleTitle: 'Product Manager', parentId: 'cpo' },
      { id: 'po', label: 'Product Owner', roleTitle: 'Product Owner', parentId: 'pm' },
    ],
    edges: [
      { fromRoleId: 'cpo', toRoleId: 'pm', type: 'reports_to' },
      { fromRoleId: 'pm', toRoleId: 'po', type: 'reports_to' },
    ],
  },
  {
    departmentId: 'support',
    roles: [
      { id: 'support-head', label: 'Support Lead', roleTitle: 'Support Lead' },
      { id: 'support-agent', label: 'Support Agent', roleTitle: 'Support Agent', parentId: 'support-head' },
      { id: 'csm', label: 'Customer Success', roleTitle: 'Customer Success', parentId: 'support-head' },
    ],
    edges: [
      { fromRoleId: 'support-head', toRoleId: 'support-agent', type: 'reports_to' },
      { fromRoleId: 'support-head', toRoleId: 'csm', type: 'reports_to' },
    ],
  },
  {
    departmentId: 'people',
    roles: [
      { id: 'chro', label: 'CHRO', roleTitle: 'Chief People Officer' },
      { id: 'hr-bp', label: 'HR Business Partner', roleTitle: 'HR BP', parentId: 'chro' },
      { id: 'recruiter', label: 'Recruiter', roleTitle: 'Recruiter', parentId: 'chro' },
    ],
    edges: [
      { fromRoleId: 'chro', toRoleId: 'hr-bp', type: 'reports_to' },
      { fromRoleId: 'chro', toRoleId: 'recruiter', type: 'reports_to' },
    ],
  },
  {
    departmentId: 'risk',
    roles: [
      { id: 'ciso', label: 'CISO', roleTitle: 'Chief Information Security Officer' },
      { id: 'risk-analyst', label: 'Risk Analyst', roleTitle: 'Risk Analyst', parentId: 'ciso' },
      { id: 'security-eng', label: 'Security Engineer', roleTitle: 'Security Engineer', parentId: 'ciso' },
    ],
    edges: [
      { fromRoleId: 'ciso', toRoleId: 'risk-analyst', type: 'reports_to' },
      { fromRoleId: 'ciso', toRoleId: 'security-eng', type: 'reports_to' },
    ],
  },
  {
    departmentId: 'strategy',
    roles: [
      { id: 'strat-lead', label: 'Strategy Lead', roleTitle: 'Strategy Lead' },
      { id: 'analyst', label: 'Strategy Analyst', roleTitle: 'Analyst', parentId: 'strat-lead' },
    ],
    edges: [{ fromRoleId: 'strat-lead', toRoleId: 'analyst', type: 'reports_to' }],
  },
  {
    departmentId: 'it',
    roles: [
      { id: 'cio', label: 'CIO', roleTitle: 'Chief Information Officer' },
      { id: 'sysadmin', label: 'Sys Admin', roleTitle: 'Sys Admin', parentId: 'cio' },
      { id: 'helpdesk', label: 'Help Desk', roleTitle: 'Help Desk', parentId: 'cio' },
    ],
    edges: [
      { fromRoleId: 'cio', toRoleId: 'sysadmin', type: 'reports_to' },
      { fromRoleId: 'cio', toRoleId: 'helpdesk', type: 'reports_to' },
    ],
  },
  {
    departmentId: 'ops',
    roles: [
      { id: 'coo', label: 'COO', roleTitle: 'Chief Operations Officer' },
      { id: 'ops-mgr', label: 'Operations Manager', roleTitle: 'Operations Manager', parentId: 'coo' },
      { id: 'supply-chain', label: 'Supply Chain', roleTitle: 'Supply Chain', parentId: 'coo' },
    ],
    edges: [
      { fromRoleId: 'coo', toRoleId: 'ops-mgr', type: 'reports_to' },
      { fromRoleId: 'coo', toRoleId: 'supply-chain', type: 'reports_to' },
    ],
  },
];

export const MOCK_CLUSTER_SUMMARY: ClusterSummary = {
  totalAgents: 142,
  totalAgentsDelta: '+12% vs LY',
  tokens24h: '4.2M',
  tokensDelta: '+5% vs yesterday',
  tokensThresholdPct: 65,
  avgWorkload: 68,
  avgWorkloadLabel: 'Stable Cluster Health',
  nodesOptimal: 92,
  healthyNodes: 128,
  warningNodes: 11,
  idleNodes: 3,
  errorNodes: 0,
};

export const MOCK_ALERTS: Alert[] = [
  { id: '1', message: 'Node-09 (Anomaly Detected) - Investigating...', severity: 'warning', source: 'Node Topology' },
  { id: '2', message: 'Data mismatch in Accounts Reconciliation', severity: 'warning', source: 'Finance and Controls' },
  { id: '3', message: 'Customer Support and Success - Error', severity: 'error', source: 'Customer Support' },
];

export const MOCK_AGENT_DISTRIBUTION: AgentDistributionEntry[] = [
  { name: 'OpenClaw', value: 42, color: '#258cf4' },
  { name: 'AgentZero', value: 28, color: '#10b981' },
  { name: 'CrewAI', value: 37, color: '#f59e0b' },
  { name: 'AG2', value: 35, color: '#6366f1' },
];

export const MOCK_TOP_CONSUMERS: TopConsumer[] = [
  { name: 'Legal-Agent-Alpha', role: 'Contract Analysis', tokens: '1.2M' },
  { name: 'Risk-Shield-09', role: 'Fraud Detection', tokens: '890k' },
  { name: 'Finance-Bot-44', role: 'Ledger Entry', tokens: '742k' },
];

export const MOCK_TOKEN_TREND = [3.2, 3.5, 3.8, 3.6, 4.0, 3.9, 4.2];

/** Top LLMs with placeholders; only GPT OSS in use at $0. */
export const MOCK_LLM_MODELS: LLMModel[] = [
  { id: 'gpt-5.2', name: 'GPT 5.2', costUsd: null, inUse: false },
  { id: 'gpt-5.3-codex', name: 'GPT 5.3 Codex', costUsd: null, inUse: false },
  { id: 'claude-opus-4.6', name: 'Claude Opus 4.6', costUsd: null, inUse: false },
  { id: 'claude-sonnet-4.6', name: 'Claude Sonnet 4.6', costUsd: null, inUse: false },
  { id: 'gpt-oss', name: 'GPT OSS', costUsd: 0, inUse: true },
  { id: 'quen-3', name: 'Quen 3', costUsd: null, inUse: false },
  { id: 'kimi-k2', name: 'Kimi K2', costUsd: null, inUse: false },
  { id: 'minimax', name: 'Minimax', costUsd: null, inUse: false },
];

/** Cluster uses Direct API Key for GPT OSS (free). */
export const MOCK_LLM_PROVIDER: LLMProvider = 'direct_api';

/** Campaign creatives – Mekhala Orchard (https://www.instagram.com/mekhalaorchard/) */
export const MOCK_AD_ASSETS: AdAsset[] = [
  {
    id: 'ad-mo-1',
    campaignId: 'camp-mo-spring',
    campaignName: 'Mekhala Orchard – Marian Plums',
    brandOrPlaceholder: 'Mekhala Orchard',
    type: 'image',
    thumbnailUrl: '/mekhala-plums-tarp.png',
    externalUrl: 'https://www.instagram.com/mekhalaorchard/',
    providerId: 'krea',
    status: 'healthy',
    createdAt: '2025-02-20T10:00:00Z',
  },
  {
    id: 'ad-mo-2',
    campaignId: 'camp-mo-spring',
    campaignName: 'Mekhala Orchard – Orchard',
    brandOrPlaceholder: 'Mekhala Orchard',
    type: 'image',
    thumbnailUrl: '/mekhala-tree.png',
    externalUrl: 'https://www.instagram.com/mekhalaorchard/',
    providerId: 'fal',
    status: 'healthy',
    createdAt: '2025-02-19T14:00:00Z',
  },
  {
    id: 'ad-mo-3',
    campaignId: 'camp-mo-video',
    campaignName: 'Mekhala Orchard – Brand',
    brandOrPlaceholder: 'Mekhala Orchard',
    type: 'image',
    thumbnailUrl: '/mekhala-logo.png',
    externalUrl: 'https://www.instagram.com/mekhalaorchard/',
    providerId: 'higgsfield',
    status: 'running',
    createdAt: '2025-02-21T09:00:00Z',
  },
  {
    id: 'ad-mo-4',
    campaignId: 'camp-mo-spring',
    campaignName: 'Mekhala Orchard – Harvest',
    brandOrPlaceholder: 'Mekhala Orchard',
    type: 'image',
    thumbnailUrl: '/mekhala-orchard-harvest.png',
    externalUrl: 'https://www.instagram.com/mekhalaorchard/',
    status: 'healthy',
    createdAt: '2025-02-22T08:00:00Z',
  },
  {
    id: 'ad-mo-5',
    campaignId: 'camp-mo-video',
    campaignName: 'Mekhala Orchard – Fresh Picked',
    brandOrPlaceholder: 'Mekhala Orchard',
    type: 'image',
    thumbnailUrl: '/mekhala-hands-fruit.png',
    externalUrl: 'https://www.instagram.com/mekhalaorchard/',
    providerId: 'higgsfield',
    status: 'healthy',
    createdAt: '2025-02-18T12:00:00Z',
  },
];
