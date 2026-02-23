/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Mock implementation of DataService. Uses mockData.
 */

import type { DataService } from './service';
import type { Department, Process, Task } from './types';
import {
  MOCK_DEPARTMENTS,
  MOCK_TOPOLOGIES,
  MOCK_AGENTS,
  MOCK_CLUSTER_SUMMARY,
  MOCK_ALERTS,
  MOCK_AGENT_DISTRIBUTION,
  MOCK_TOP_CONSUMERS,
  MOCK_TOKEN_TREND,
  MOCK_LLM_MODELS,
  MOCK_LLM_PROVIDER,
  MOCK_AD_ASSETS,
} from './mockData';

function delay<T>(value: T, ms = 0): Promise<T> {
  return ms ? new Promise((r) => setTimeout(() => r(value), ms)) : Promise.resolve(value);
}

export const mockDataService: DataService = {
  async getDepartments() {
    return delay([...MOCK_DEPARTMENTS]);
  },

  async getDepartmentById(id: string) {
    const dept = MOCK_DEPARTMENTS.find((d) => d.id === id) ?? null;
    return delay(dept ? { ...dept } : null);
  },

  async getDepartmentNodes(deptId: string) {
    const dept = MOCK_DEPARTMENTS.find((d) => d.id === deptId);
    return delay({ nodeCount: dept?.nodeCount ?? 0 });
  },

  async getDepartmentTopology(deptId: string) {
    const topo = MOCK_TOPOLOGIES.find((t) => t.departmentId === deptId) ?? null;
    return delay(topo ? { ...topo, roles: [...topo.roles], edges: [...topo.edges] } : null);
  },

  async getProcessesByDepartment(deptId: string) {
    const dept = MOCK_DEPARTMENTS.find((d) => d.id === deptId);
    return delay(dept ? [...dept.processes] : []);
  },

  async getTasksByProcess(processId: string, departmentId: string) {
    const dept = MOCK_DEPARTMENTS.find((d) => d.id === departmentId);
    const process = dept?.processes.find((p) => p.id === processId);
    return delay(process ? [...process.tasks] : []);
  },

  async getClusterSummary() {
    return delay({ ...MOCK_CLUSTER_SUMMARY });
  },

  async getAlerts() {
    return delay([...MOCK_ALERTS]);
  },

  async getAgentDistribution() {
    return delay([...MOCK_AGENT_DISTRIBUTION]);
  },

  async getTopConsumers() {
    return delay([...MOCK_TOP_CONSUMERS]);
  },

  async getTokenTrend() {
    return delay([...MOCK_TOKEN_TREND]);
  },

  async getAgentsByDepartment(deptId: string) {
    const agents = MOCK_AGENTS.filter((a) => a.departmentId === deptId);
    return delay([...agents]);
  },

  async getAgent(id: string) {
    const agent = MOCK_AGENTS.find((a) => a.id === id) ?? null;
    return delay(agent ? { ...agent } : null);
  },

  async getAgents() {
    return delay([...MOCK_AGENTS]);
  },

  async getLLMModels() {
    return delay([...MOCK_LLM_MODELS]);
  },

  async getLLMProvider() {
    return delay(MOCK_LLM_PROVIDER);
  },

  async getAdAssets(limit = 12) {
    const list = [...MOCK_AD_ASSETS].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return delay(list.slice(0, limit));
  },
};
