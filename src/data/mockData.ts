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
  { id: 'agent-strat-1', name: 'Strat-Lead-01', roleTitle: 'Strategy Lead', departmentId: 'strategy' },
  { id: 'agent-strat-2', name: 'Plan-Analyst-3', roleTitle: 'Strategy Analyst', departmentId: 'strategy' },
  { id: 'agent-strat-3', name: 'OKR-Track-2', roleTitle: 'Planning & OKR', departmentId: 'strategy' },
  { id: 'agent-risk-1', name: 'Risk-Shield-09', roleTitle: 'Fraud Detection', departmentId: 'risk' },
  { id: 'agent-risk-2', name: 'Guard-LLM-3', roleTitle: 'Security Engineer', departmentId: 'risk' },
  { id: 'agent-risk-3', name: 'Threat-Scan-7', roleTitle: 'Risk Analyst', departmentId: 'risk' },
  { id: 'agent-eng-1', name: 'Build-Bot-12', roleTitle: 'Software Engineer', departmentId: 'engineering' },
  { id: 'agent-eng-2', name: 'Pipe-Data-07', roleTitle: 'Data Engineer', departmentId: 'engineering' },
  { id: 'agent-eng-3', name: 'Model-Train-4', roleTitle: 'ML Engineer', departmentId: 'engineering' },
  { id: 'agent-eng-4', name: 'Tech-Lead-1', roleTitle: 'Tech Lead', departmentId: 'engineering' },
  { id: 'agent-it-1', name: 'Infra-Node-7', roleTitle: 'Sys Admin', departmentId: 'it' },
  { id: 'agent-it-2', name: 'Ops-Govern-2', roleTitle: 'Help Desk', departmentId: 'it' },
  { id: 'agent-prod-1', name: 'OpenClaw-Research-1', roleTitle: 'Product Manager', departmentId: 'product' },
  { id: 'agent-prod-2', name: 'AgentZero-Orchestrator-1', roleTitle: 'Product Owner', departmentId: 'product' },
  { id: 'agent-prod-3', name: 'CrewAI-Lead-1', roleTitle: 'Product Manager', departmentId: 'product' },
  { id: 'agent-prod-4', name: 'Agentic-Platform-PM', roleTitle: 'Chief Product Officer', departmentId: 'product' },
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

/** Strategy and Planning: strategic planning cycle, OKRs, initiative prioritization */
const strategyTasks: Task[] = [
  {
    id: 'env-scan',
    name: 'Environmental Scan',
    status: 'healthy',
    description: 'PESTEL and competitive landscape summary completed. Key risks and opportunities documented.',
    timestamp: 'Completed 1d ago',
    assignedAgentIds: ['agent-strat-2', 'agent-strat-1'],
    workflowSteps: [
      { order: 1, agentId: 'agent-strat-2', role: 'Strategy Analyst', status: 'approved', approvedBy: 'agent-strat-1' },
      { order: 2, agentId: 'agent-strat-1', role: 'Strategy Lead', status: 'approved' },
    ],
  },
  {
    id: 'okr-draft',
    name: 'Draft OKRs & Targets',
    status: 'running',
    description: 'Q2 OKRs aligned to board priorities. 3/5 pillars have measurable key results.',
    progress: 72,
    assignedAgentIds: ['agent-strat-1', 'agent-strat-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-strat-1', role: 'Strategy Lead', status: 'approved' },
      { order: 2, agentId: 'agent-strat-3', role: 'Planning & OKR', status: 'in_progress' },
    ],
  },
  {
    id: 'scenario-model',
    name: 'Scenario Modeling',
    status: 'running',
    description: 'Base / upside / downside cases for revenue and capacity. Sensitivity runs in progress.',
    progress: 55,
    assignedAgentIds: ['agent-strat-2', 'agent-strat-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-strat-2', role: 'Strategy Analyst', status: 'approved' },
      { order: 2, agentId: 'agent-strat-3', role: 'Planning & OKR', status: 'in_progress' },
    ],
  },
  {
    id: 'exec-review-pack',
    name: 'Exec Review Pack',
    status: 'idle',
    description: 'Slides and narrative for leadership offsite. Blocked on OKR sign-off.',
    assignedAgentIds: ['agent-strat-1', 'agent-strat-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-strat-1', role: 'Strategy Lead', status: 'pending' },
      { order: 2, agentId: 'agent-strat-2', role: 'Strategy Analyst', status: 'pending' },
    ],
  },
];

const strategyInitiativeTasks: Task[] = [
  {
    id: 'initiative-intake',
    name: 'Initiative Intake',
    status: 'healthy',
    description: 'Backlog triaged. 12 initiatives logged with owners and rough scope.',
    timestamp: 'Completed 4h ago',
    assignedAgentIds: ['agent-strat-2', 'agent-strat-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-strat-2', role: 'Strategy Analyst', status: 'approved' },
      { order: 2, agentId: 'agent-strat-3', role: 'Planning & OKR', status: 'approved' },
    ],
  },
  {
    id: 'scoring-prioritization',
    name: 'Scoring & Prioritization',
    status: 'running',
    description: 'RICE and strategic fit scoring. Top 5 initiatives shortlisted for roadmap.',
    progress: 80,
    assignedAgentIds: ['agent-strat-1', 'agent-strat-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-strat-2', role: 'Strategy Analyst', status: 'approved' },
      { order: 2, agentId: 'agent-strat-1', role: 'Strategy Lead', status: 'in_progress' },
    ],
  },
  {
    id: 'roadmap-alignment',
    name: 'Roadmap Alignment',
    status: 'idle',
    description: 'Map initiatives to product and eng roadmaps; flag dependencies.',
    assignedAgentIds: ['agent-strat-3', 'agent-strat-1'],
    workflowSteps: [
      { order: 1, agentId: 'agent-strat-3', role: 'Planning & OKR', status: 'pending' },
      { order: 2, agentId: 'agent-strat-1', role: 'Strategy Lead', status: 'pending' },
    ],
  },
];

const strategyOKRTasks: Task[] = [
  {
    id: 'target-setting',
    name: 'Target Setting',
    status: 'healthy',
    description: 'Annual and quarterly targets locked. Cascaded to department leads.',
    timestamp: 'Completed 3d ago',
    assignedAgentIds: ['agent-strat-1', 'agent-strat-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-strat-1', role: 'Strategy Lead', status: 'approved' },
      { order: 2, agentId: 'agent-strat-3', role: 'Planning & OKR', status: 'approved' },
    ],
  },
  {
    id: 'progress-rollup',
    name: 'Progress Rollup',
    status: 'running',
    description: 'Weekly OKR progress aggregation from departments. 4/6 departments reported.',
    progress: 68,
    assignedAgentIds: ['agent-strat-3', 'agent-strat-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-strat-3', role: 'Planning & OKR', status: 'in_progress' },
      { order: 2, agentId: 'agent-strat-2', role: 'Strategy Analyst', status: 'in_progress' },
    ],
  },
  {
    id: 'variance-commentary',
    name: 'Variance Commentary',
    status: 'idle',
    description: 'Narrative for at-risk and ahead-of-plan KPIs for board report.',
    assignedAgentIds: ['agent-strat-2', 'agent-strat-1'],
    workflowSteps: [
      { order: 1, agentId: 'agent-strat-2', role: 'Strategy Analyst', status: 'pending' },
      { order: 2, agentId: 'agent-strat-1', role: 'Strategy Lead', status: 'pending' },
    ],
  },
];

const strategyProcesses: Process[] = [
  {
    id: 'strategic-planning-cycle',
    name: 'Strategic Planning Cycle',
    status: 'running',
    workload: 68,
    tokens: '520k',
    description: 'Active - 3/4 Subtasks in progress or complete',
    tasks: strategyTasks,
  },
  {
    id: 'initiative-prioritization',
    name: 'Initiative Prioritization',
    status: 'running',
    workload: 58,
    tokens: '310k',
    description: 'Active - 2/3 Subtasks complete',
    tasks: strategyInitiativeTasks,
  },
  {
    id: 'okr-kpi-tracking',
    name: 'OKR & KPI Tracking',
    status: 'running',
    workload: 72,
    tokens: '390k',
    description: 'Weekly rollup and variance analysis in progress',
    tasks: strategyOKRTasks,
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

/** Risk and Security: AI security, infra monitoring, incident response */
const riskSecurityTasks: Task[] = [
  {
    id: 'prompt-injection-detection',
    name: 'Prompt Injection Detection',
    status: 'running',
    description: 'Scanning LLM inputs/outputs for injection patterns; 3 suspicious payloads flagged in last 24h.',
    progress: 72,
    assignedAgentIds: ['agent-risk-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-risk-2', role: 'Security Engineer', status: 'in_progress' },
    ],
  },
  {
    id: 'firewall-monitoring',
    name: 'Firewall Monitoring',
    status: 'healthy',
    description: 'All edge and WAF rules nominal. Block list updated; no anomalous egress.',
    timestamp: 'Completed 1h ago',
    assignedAgentIds: ['agent-risk-2', 'agent-risk-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-risk-2', role: 'Security Engineer', status: 'approved' },
      { order: 2, agentId: 'agent-risk-3', role: 'Risk Analyst', status: 'approved', approvedBy: 'agent-risk-2' },
    ],
  },
  {
    id: 'threat-intel-feed',
    name: 'Threat Intelligence Feed',
    status: 'running',
    description: 'Ingesting OSINT and vendor feeds; correlating IOCs with agent traffic.',
    progress: 45,
    assignedAgentIds: ['agent-risk-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-risk-3', role: 'Risk Analyst', status: 'in_progress' },
    ],
  },
  {
    id: 'access-identity-audit',
    name: 'Access & Identity Audit',
    status: 'healthy',
    description: 'SSO and IDP events reviewed. No privilege escalation or suspicious logins.',
    timestamp: 'Completed 4h ago',
    assignedAgentIds: ['agent-risk-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-risk-2', role: 'Security Engineer', status: 'approved' },
    ],
  },
  {
    id: 'vulnerability-scanning',
    name: 'Vulnerability Scanning',
    status: 'warning',
    description: '2 low-severity CVEs on agent API endpoints; remediation scheduled.',
    assignedAgentIds: ['agent-risk-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-risk-2', role: 'Security Engineer', status: 'in_progress' },
    ],
  },
  {
    id: 'dlp-monitoring',
    name: 'Data Loss Prevention (DLP)',
    status: 'healthy',
    description: 'Sensitive data checks on agent I/O and storage; no policy violations.',
    timestamp: 'Completed 6h ago',
    assignedAgentIds: ['agent-risk-1', 'agent-risk-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-risk-1', role: 'Fraud Detection', status: 'approved' },
      { order: 2, agentId: 'agent-risk-3', role: 'Risk Analyst', status: 'approved', approvedBy: 'agent-risk-2' },
    ],
  },
  {
    id: 'incident-triage',
    name: 'Incident Triage',
    status: 'idle',
    description: 'Classify and route security alerts; escalate critical events to CISO.',
    assignedAgentIds: ['agent-risk-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-risk-3', role: 'Risk Analyst', status: 'pending' },
    ],
  },
  {
    id: 'compliance-checks',
    name: 'Compliance Checks',
    status: 'idle',
    description: 'SOC2 and GDPR policy checks on agent behavior and data handling.',
    assignedAgentIds: ['agent-risk-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-risk-3', role: 'Risk Analyst', status: 'pending' },
    ],
  },
];

const riskSecurityProcesses: Process[] = [
  {
    id: 'ai-infra-security',
    name: 'AI & Infrastructure Security',
    status: 'running',
    workload: 68,
    tokens: '890k',
    description: 'Active - 5/8 tasks in progress or complete',
    tasks: riskSecurityTasks,
  },
];

/** IT and Workplace Tech: deploy, manage, upgrade, repurpose agents across clouds; capacity and governance */
const itTasks: Task[] = [
  {
    id: 'deploy-agents-cloud',
    name: 'Deploy Agents to Cloud',
    status: 'running',
    description: 'Rolling out new agent runtimes to AWS and GCP; Azure staging next. 12/18 nodes provisioned.',
    progress: 68,
    assignedAgentIds: ['agent-it-1'],
    workflowSteps: [
      { order: 1, agentId: 'agent-it-1', role: 'Sys Admin', status: 'in_progress' },
    ],
  },
  {
    id: 'manage-runtimes',
    name: 'Manage Agent Runtimes',
    status: 'healthy',
    description: 'Scale, health checks, and failover for all agent clusters. All runtimes nominal.',
    timestamp: 'Completed 30m ago',
    assignedAgentIds: ['agent-it-1', 'agent-it-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-it-1', role: 'Sys Admin', status: 'approved', approvedBy: 'agent-it-2' },
      { order: 2, agentId: 'agent-it-2', role: 'Help Desk', status: 'approved' },
    ],
  },
  {
    id: 'upgrade-agents',
    name: 'Upgrade Agents (Model / Runtime)',
    status: 'running',
    description: 'Model and dependency upgrades for Finance and Risk clusters; rollout in phases.',
    progress: 40,
    assignedAgentIds: ['agent-it-1'],
    workflowSteps: [
      { order: 1, agentId: 'agent-it-1', role: 'Sys Admin', status: 'in_progress' },
    ],
  },
  {
    id: 'repurpose-agents',
    name: 'Repurpose Agents',
    status: 'idle',
    description: 'Reassign or reconfigure idle agents to new departments or use cases. Queue: 3 candidates.',
    assignedAgentIds: ['agent-it-1', 'agent-it-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-it-1', role: 'Sys Admin', status: 'pending' },
      { order: 2, agentId: 'agent-it-2', role: 'Help Desk', status: 'pending' },
    ],
  },
  {
    id: 'capacity-cost-tracking',
    name: 'Capacity & Cost Tracking',
    status: 'healthy',
    description: 'Token usage by cloud and department; budget alerts and right-sizing recommendations.',
    timestamp: 'Completed 2h ago',
    assignedAgentIds: ['agent-it-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-it-2', role: 'Help Desk', status: 'approved' },
    ],
  },
  {
    id: 'governance-change-control',
    name: 'Governance & Change Control',
    status: 'healthy',
    description: 'Approval workflows for new agent rollouts; no outstanding change requests.',
    timestamp: 'Completed 1d ago',
    assignedAgentIds: ['agent-it-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-it-2', role: 'Help Desk', status: 'approved' },
    ],
  },
];

const itProcesses: Process[] = [
  {
    id: 'agent-lifecycle-ops',
    name: 'Agent Lifecycle & Operations',
    status: 'running',
    workload: 58,
    tokens: '310k',
    description: 'Active - 4/6 tasks in progress or complete',
    tasks: itTasks,
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

const productTasksOpenClaw: Task[] = [
  {
    id: 'openclaw-tool-pipeline',
    name: 'OpenClaw tool-use pipeline',
    status: 'running',
    description: 'Integrate tool-calling and code execution into OpenClaw research workflows.',
    progress: 60,
    assignedAgentIds: ['agent-prod-1', 'agent-prod-4'],
    workflowSteps: [
      { order: 1, agentId: 'agent-prod-4', role: 'Chief Product Officer', status: 'approved' },
      { order: 2, agentId: 'agent-prod-1', role: 'Product Manager', status: 'in_progress' },
    ],
  },
  {
    id: 'openclaw-research-agents',
    name: 'OpenClaw research agent rollout',
    status: 'idle',
    description: 'Deploy and scale OpenClaw research agents across product discovery and competitive intel.',
    assignedAgentIds: ['agent-prod-1'],
    workflowSteps: [
      { order: 1, agentId: 'agent-prod-1', role: 'Product Manager', status: 'pending' },
    ],
  },
];

const productTasksAgentZero: Task[] = [
  {
    id: 'agentzero-orchestration',
    name: 'AgentZero multi-agent orchestration',
    status: 'healthy',
    description: 'Multi-agent debate and orchestration layer deployed; 3 agent pools live.',
    timestamp: 'Completed 1d ago',
    assignedAgentIds: ['agent-prod-2', 'agent-prod-4'],
    workflowSteps: [
      { order: 1, agentId: 'agent-prod-4', role: 'Chief Product Officer', status: 'approved' },
      { order: 2, agentId: 'agent-prod-2', role: 'Product Owner', status: 'approved' },
    ],
  },
  {
    id: 'agentzero-code-gen',
    name: 'AgentZero code-gen agent templates',
    status: 'running',
    description: 'Standardize code-generation and review agent templates for engineering handoff.',
    progress: 40,
    assignedAgentIds: ['agent-prod-2'],
    workflowSteps: [
      { order: 1, agentId: 'agent-prod-2', role: 'Product Owner', status: 'in_progress' },
    ],
  },
];

const productTasksCrewAI: Task[] = [
  {
    id: 'crewai-templates',
    name: 'CrewAI crew template library',
    status: 'running',
    description: 'Build reusable crew templates (roles, tasks, handoffs) for PM and support workflows.',
    progress: 55,
    assignedAgentIds: ['agent-prod-3', 'agent-prod-4'],
    workflowSteps: [
      { order: 1, agentId: 'agent-prod-4', role: 'Chief Product Officer', status: 'approved' },
      { order: 2, agentId: 'agent-prod-3', role: 'Product Manager', status: 'in_progress' },
    ],
  },
  {
    id: 'crewai-rollout',
    name: 'CrewAI instance rollout',
    status: 'idle',
    description: 'Roll out CrewAI-based crews for backlog grooming and customer insight synthesis.',
    assignedAgentIds: ['agent-prod-3'],
    workflowSteps: [
      { order: 1, agentId: 'agent-prod-3', role: 'Product Manager', status: 'pending' },
    ],
  },
];

const productProcesses: Process[] = [
  {
    id: 'openclaw-development',
    name: 'OpenClaw development',
    status: 'running',
    workload: 60,
    tokens: '310k',
    description: 'Active - Tool pipeline and research agents in progress',
    tasks: productTasksOpenClaw,
  },
  {
    id: 'agentzero-development',
    name: 'AgentZero (Agent0) development',
    status: 'running',
    workload: 70,
    tokens: '440k',
    description: 'Active - Orchestration live; code-gen templates in progress',
    tasks: productTasksAgentZero,
  },
  {
    id: 'crewai-development',
    name: 'CrewAI development',
    status: 'running',
    workload: 55,
    tokens: '280k',
    description: 'Active - Crew template library and rollout planning',
    tasks: productTasksCrewAI,
  },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: 'strategy', name: 'Strategy and Planning', icon: TrendingUp, status: 'healthy', nodeCount: 6, processes: strategyProcesses },
  { id: 'finance', name: 'Finance and Controls', icon: Activity, status: 'warning', nodeCount: 8, processes: financeProcesses },
  { id: 'legal', name: 'Legal, Compliance, Privacy', icon: Gavel, status: 'idle', nodeCount: 5, processes: [] },
  { id: 'risk', name: 'Risk and Security', icon: Shield, status: 'healthy', nodeCount: 6, processes: riskSecurityProcesses },
  { id: 'people', name: 'People Ops (HR)', icon: Users, status: 'idle', nodeCount: 4, processes: peopleOpsProcesses },
  { id: 'marketing', name: 'Marketing and Growth', icon: Megaphone, status: 'healthy', nodeCount: 12, processes: marketingProcesses },
  { id: 'sales', name: 'Sales and Partnerships', icon: Tag, status: 'idle', nodeCount: 10, processes: [] },
  { id: 'support', name: 'Customer Support and Success', icon: Headphones, status: 'error', nodeCount: 7, processes: [] },
  { id: 'product', name: 'Product Management', icon: Package, status: 'healthy', nodeCount: 9, processes: productProcesses },
  { id: 'engineering', name: 'Engineering and Data', icon: Code, status: 'healthy', nodeCount: 18, processes: engineeringProcesses },
  { id: 'it', name: 'IT and Workplace Tech', icon: Server, status: 'healthy', nodeCount: 6, processes: itProcesses },
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
  healthyNodes: 27,
  warningNodes: 11,
  idleNodes: 104,
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
