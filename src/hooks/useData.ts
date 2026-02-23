/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Hooks for the data layer. All data flows through dataService.
 */

import { useState, useEffect, useCallback } from 'react';
import { dataService } from '../data';
import type { Department, Process, Task, DepartmentTopology, Agent, ClusterSummary, Alert, AgentDistributionEntry, TopConsumer, LLMModel, LLMProvider, AdAsset } from '../data';

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    dataService
      .getDepartments()
      .then((data) => {
        if (!cancelled) setDepartments(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { departments, loading, error };
}

export function useDepartment(deptId: string | undefined) {
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!deptId) {
      setDepartment(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    dataService
      .getDepartmentById(deptId)
      .then((data) => {
        if (!cancelled) setDepartment(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [deptId]);

  return { department, loading, error };
}

export function useDepartmentNodes(deptId: string | undefined) {
  const [nodeCount, setNodeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!deptId) {
      setNodeCount(0);
      setLoading(false);
      return;
    }
    let cancelled = false;
    dataService
      .getDepartmentNodes(deptId)
      .then(({ nodeCount: n }) => {
        if (!cancelled) setNodeCount(n);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [deptId]);

  return { nodeCount, loading };
}

export function useDepartmentTopology(deptId: string | undefined) {
  const [topology, setTopology] = useState<DepartmentTopology | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!deptId) {
      setTopology(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    dataService
      .getDepartmentTopology(deptId)
      .then((data) => {
        if (!cancelled) setTopology(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [deptId]);

  return { topology, loading };
}

export function useClusterSummary() {
  const [summary, setSummary] = useState<ClusterSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    dataService
      .getClusterSummary()
      .then((data) => {
        if (!cancelled) setSummary(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { summary, loading };
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    let cancelled = false;
    dataService.getAlerts().then((data) => {
      if (!cancelled) setAlerts(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return alerts;
}

export function useAgentDistribution() {
  const [distribution, setDistribution] = useState<AgentDistributionEntry[]>([]);

  useEffect(() => {
    let cancelled = false;
    dataService.getAgentDistribution().then((data) => {
      if (!cancelled) setDistribution(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return distribution;
}

export function useTopConsumers() {
  const [consumers, setConsumers] = useState<TopConsumer[]>([]);

  useEffect(() => {
    let cancelled = false;
    dataService.getTopConsumers().then((data) => {
      if (!cancelled) setConsumers(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return consumers;
}

export function useTokenTrend() {
  const [trend, setTrend] = useState<number[]>([]);

  useEffect(() => {
    let cancelled = false;
    dataService.getTokenTrend().then((data) => {
      if (!cancelled) setTrend(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return trend;
}

export function useAgent(agentId: string | undefined) {
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    if (!agentId) {
      setAgent(null);
      return;
    }
    let cancelled = false;
    dataService.getAgent(agentId).then((data) => {
      if (!cancelled) setAgent(data);
    });
    return () => {
      cancelled = true;
    };
  }, [agentId]);

  return agent;
}

export function useAgentsByDepartment(deptId: string | undefined) {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    if (!deptId) {
      setAgents([]);
      return;
    }
    let cancelled = false;
    dataService.getAgentsByDepartment(deptId).then((data) => {
      if (!cancelled) setAgents(data);
    });
    return () => {
      cancelled = true;
    };
  }, [deptId]);

  return agents;
}

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    let cancelled = false;
    dataService.getAgents().then((data) => {
      if (!cancelled) setAgents(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return agents;
}

export function useLLMModels() {
  const [models, setModels] = useState<LLMModel[]>([]);

  useEffect(() => {
    let cancelled = false;
    dataService.getLLMModels().then((data) => {
      if (!cancelled) setModels(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return models;
}

export function useLLMProvider() {
  const [provider, setProvider] = useState<LLMProvider | null>(null);

  useEffect(() => {
    let cancelled = false;
    dataService.getLLMProvider().then((data) => {
      if (!cancelled) setProvider(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return provider;
}

export function useAdAssets(limit?: number) {
  const [assets, setAssets] = useState<AdAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    dataService
      .getAdAssets(limit)
      .then((data) => {
        if (!cancelled) setAssets(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { assets, loading };
}
