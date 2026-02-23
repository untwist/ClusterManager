/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Data service interface. Implement with mock (mock.ts) or API (api.ts) later.
 */

import type {
  Department,
  DepartmentTopology,
  Process,
  Task,
  Agent,
  ClusterSummary,
  Alert,
  AgentDistributionEntry,
  TopConsumer,
  LLMModel,
  LLMProvider,
  AdAsset,
} from './types';

export interface DataService {
  getDepartments(): Promise<Department[]>;
  getDepartmentById(id: string): Promise<Department | null>;
  getDepartmentNodes(deptId: string): Promise<{ nodeCount: number }>;
  getDepartmentTopology(deptId: string): Promise<DepartmentTopology | null>;
  getProcessesByDepartment(deptId: string): Promise<Process[]>;
  getTasksByProcess(processId: string, departmentId: string): Promise<Task[]>;
  getClusterSummary(): Promise<ClusterSummary>;
  getAlerts(): Promise<Alert[]>;
  getAgentDistribution(): Promise<AgentDistributionEntry[]>;
  getTopConsumers(): Promise<TopConsumer[]>;
  getTokenTrend(): Promise<number[]>;
  getAgentsByDepartment(deptId: string): Promise<Agent[]>;
  getAgent(id: string): Promise<Agent | null>;
  getAgents(): Promise<Agent[]>;
  getLLMModels(): Promise<LLMModel[]>;
  getLLMProvider(): Promise<LLMProvider>;
  getAdAssets(limit?: number): Promise<AdAsset[]>;
}
