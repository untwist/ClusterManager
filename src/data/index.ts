/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Data layer entry. Exports the active implementation (mock) and types.
 * Swap to apiDataService when backend is ready.
 */

export type { DataService } from './service';
export { mockDataService as dataService } from './mock';
export type {
  Status,
  WorkflowStep,
  WorkflowStepStatus,
  Agent,
  NodeRole,
  TopologyEdge,
  Task,
  Process,
  Department,
  DepartmentTopology,
  ClusterSummary,
  Alert,
  AgentDistributionEntry,
  TopConsumer,
  LLMProvider,
  LLMModel,
  CreativeProviderId,
  CreativeProvider,
  AdAsset,
} from './types';
export { MOCK_AGENTS, MOCK_DEPARTMENTS, MOCK_TOPOLOGIES } from './mockData';
export {
  CREATIVE_PROVIDERS,
  getCreativeProvider,
  higgsfieldGenerateVideo,
  kreaGenerateImage,
  falGenerate,
} from './adPipeline';
