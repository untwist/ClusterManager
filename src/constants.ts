import { 
  TrendingUp, 
  TrendingDown, 
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
  LayoutDashboard,
  Database,
  CheckCircle2,
  AlertCircle,
  Clock,
  PlayCircle,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Download,
  Search,
  Bell,
  Zap,
  Cpu,
  Network
} from 'lucide-react';

export type Status = 'healthy' | 'warning' | 'error' | 'idle' | 'running';

export interface Task {
  id: string;
  name: string;
  status: Status;
  description: string;
  progress?: number;
  timestamp?: string;
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
  icon: any;
  status: Status;
  processes: Process[];
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'strategy',
    name: 'Strategy and Planning',
    icon: TrendingUp,
    status: 'healthy',
    processes: []
  },
  {
    id: 'finance',
    name: 'Finance and Controls',
    icon: Activity,
    status: 'warning',
    processes: [
      {
        id: 'monthly-close',
        name: 'Monthly Close',
        status: 'running',
        workload: 85,
        tokens: '820k',
        description: 'Active - 2/4 Subtasks Complete',
        tasks: [
          {
            id: 'reconcile',
            name: 'Reconcile Accounts',
            status: 'healthy',
            description: 'Verified 4,203 ledger entries against bank statements. 0 discrepancies found.',
            timestamp: 'Completed 2h ago'
          },
          {
            id: 'anomalies',
            name: 'Flag Anomalies',
            status: 'running',
            description: 'Comparing current month expenses with historical quarterly trends.',
            progress: 85
          },
          {
            id: 'narrative',
            name: 'Draft Variance Narrative',
            status: 'idle',
            description: 'Awaiting completion of anomaly flagging to start synthesis.'
          },
          {
            id: 'packet',
            name: 'Produce CFO Packet',
            status: 'idle',
            description: 'Final output generation with visualization layers.'
          }
        ]
      },
      {
        id: 'tax-provisioning',
        name: 'Tax Provisioning',
        status: 'idle',
        workload: 0,
        tokens: '0',
        description: 'Idle - Next run in 4 days',
        tasks: []
      },
      {
        id: 'reconciliation',
        name: 'Accounts Reconciliation',
        status: 'warning',
        workload: 92,
        tokens: '1.2M',
        description: 'Warning - Data mismatch detected',
        tasks: []
      }
    ]
  },
  {
    id: 'legal',
    name: 'Legal, Compliance, Privacy',
    icon: Gavel,
    status: 'idle',
    processes: []
  },
  {
    id: 'risk',
    name: 'Risk and Security',
    icon: Shield,
    status: 'healthy',
    processes: [
      {
        id: 'ai-infra-security',
        name: 'AI & Infrastructure Security',
        status: 'running',
        workload: 68,
        tokens: '890k',
        description: 'Active - 5/8 tasks in progress or complete',
        tasks: [
          {
            id: 'prompt-injection-detection',
            name: 'Prompt Injection Detection',
            status: 'running',
            description: 'Scanning LLM inputs/outputs for injection patterns; 3 suspicious payloads flagged in last 24h.',
            progress: 72
          },
          {
            id: 'firewall-monitoring',
            name: 'Firewall Monitoring',
            status: 'healthy',
            description: 'All edge and WAF rules nominal. Block list updated; no anomalous egress.',
            timestamp: 'Completed 1h ago'
          },
          {
            id: 'threat-intel-feed',
            name: 'Threat Intelligence Feed',
            status: 'running',
            description: 'Ingesting OSINT and vendor feeds; correlating IOCs with agent traffic.',
            progress: 45
          },
          {
            id: 'access-identity-audit',
            name: 'Access & Identity Audit',
            status: 'healthy',
            description: 'SSO and IDP events reviewed. No privilege escalation or suspicious logins.',
            timestamp: 'Completed 4h ago'
          },
          {
            id: 'vulnerability-scanning',
            name: 'Vulnerability Scanning',
            status: 'warning',
            description: '2 low-severity CVEs on agent API endpoints; remediation scheduled.'
          },
          {
            id: 'dlp-monitoring',
            name: 'Data Loss Prevention (DLP)',
            status: 'healthy',
            description: 'Sensitive data checks on agent I/O and storage; no policy violations.',
            timestamp: 'Completed 6h ago'
          },
          {
            id: 'incident-triage',
            name: 'Incident Triage',
            status: 'idle',
            description: 'Classify and route security alerts; escalate critical events to CISO.'
          },
          {
            id: 'compliance-checks',
            name: 'Compliance Checks',
            status: 'idle',
            description: 'SOC2 and GDPR policy checks on agent behavior and data handling.'
          }
        ]
      }
    ]
  },
  {
    id: 'people',
    name: 'People Ops (HR)',
    icon: Users,
    status: 'idle',
    processes: []
  },
  {
    id: 'marketing',
    name: 'Marketing and Growth',
    icon: Megaphone,
    status: 'healthy',
    processes: []
  },
  {
    id: 'sales',
    name: 'Sales and Partnerships',
    icon: Tag,
    status: 'idle',
    processes: []
  },
  {
    id: 'support',
    name: 'Customer Support and Success',
    icon: Headphones,
    status: 'error',
    processes: []
  },
  {
    id: 'product',
    name: 'Product Management',
    icon: Package,
    status: 'healthy',
    processes: []
  },
  {
    id: 'engineering',
    name: 'Engineering and Data',
    icon: Code,
    status: 'healthy',
    processes: []
  },
  {
    id: 'it',
    name: 'IT and Workplace Tech',
    icon: Server,
    status: 'healthy',
    processes: [
      {
        id: 'agent-lifecycle-ops',
        name: 'Agent Lifecycle & Operations',
        status: 'running',
        workload: 58,
        tokens: '310k',
        description: 'Active - 4/6 tasks in progress or complete',
        tasks: [
          {
            id: 'deploy-agents-cloud',
            name: 'Deploy Agents to Cloud',
            status: 'running',
            description: 'Rolling out new agent runtimes to AWS and GCP; Azure staging next. 12/18 nodes provisioned.',
            progress: 68
          },
          {
            id: 'manage-runtimes',
            name: 'Manage Agent Runtimes',
            status: 'healthy',
            description: 'Scale, health checks, and failover for all agent clusters. All runtimes nominal.',
            timestamp: 'Completed 30m ago'
          },
          {
            id: 'upgrade-agents',
            name: 'Upgrade Agents (Model / Runtime)',
            status: 'running',
            description: 'Model and dependency upgrades for Finance and Risk clusters; rollout in phases.',
            progress: 40
          },
          {
            id: 'repurpose-agents',
            name: 'Repurpose Agents',
            status: 'idle',
            description: 'Reassign or reconfigure idle agents to new departments or use cases. Queue: 3 candidates.'
          },
          {
            id: 'capacity-cost-tracking',
            name: 'Capacity & Cost Tracking',
            status: 'healthy',
            description: 'Token usage by cloud and department; budget alerts and right-sizing recommendations.',
            timestamp: 'Completed 2h ago'
          },
          {
            id: 'governance-change-control',
            name: 'Governance & Change Control',
            status: 'healthy',
            description: 'Approval workflows for new agent rollouts; no outstanding change requests.',
            timestamp: 'Completed 1d ago'
          }
        ]
      }
    ]
  },
  {
    id: 'ops',
    name: 'Operations and Supply Chain',
    icon: Settings,
    status: 'idle',
    processes: []
  }
];

export const AGENT_DISTRIBUTION = [
  { name: 'OpenClaw', value: 42, color: '#258cf4' },
  { name: 'AgentZero', value: 28, color: '#10b981' },
  { name: 'CrewAI', value: 37, color: '#f59e0b' },
  { name: 'AG2', value: 35, color: '#6366f1' },
];

export const TOP_CONSUMERS = [
  { name: 'Legal-Agent-Alpha', role: 'Contract Analysis', tokens: '1.2M' },
  { name: 'Risk-Shield-09', role: 'Fraud Detection', tokens: '890k' },
  { name: 'Finance-Bot-44', role: 'Ledger Entry', tokens: '742k' },
];

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

export const CLUSTER_SUMMARY: ClusterSummary = {
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

export interface Alert {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  source?: string;
}

export const ALERTS: Alert[] = [
  { id: '1', message: 'Node-09 (Anomaly Detected) - Investigating...', severity: 'warning', source: 'Node Topology' },
  { id: '2', message: 'Data mismatch in Accounts Reconciliation', severity: 'warning', source: 'Finance and Controls' },
  { id: '3', message: 'Customer Support and Success - Error', severity: 'error', source: 'Customer Support' },
];

/** Token/workload trend for sparkline (last 7 days). */
export const TOKEN_TREND = [3.2, 3.5, 3.8, 3.6, 4.0, 3.9, 4.2];
