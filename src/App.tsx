/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
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
  Network,
  LayoutDashboard,
} from 'lucide-react';
import { DEPARTMENTS } from './constants';
import { Home } from './pages/Home';
import { Department } from './pages/Department';

const deptIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  strategy: TrendingUp,
  finance: Activity,
  legal: Gavel,
  risk: Shield,
  people: Users,
  marketing: Megaphone,
  sales: Tag,
  support: Headphones,
  product: Package,
  engineering: Code,
  it: Server,
  ops: Settings,
};

function Sidebar() {
  return (
    <aside className="w-64 border-r border-border-dark flex flex-col bg-background-dark/50 overflow-y-auto no-scrollbar shrink-0">
      <div className="p-6 border-b border-border-dark flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <Network className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight font-raleway leading-none">Pecu.ai</h1>
          <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase font-raleway">
            cluster manager
          </p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${
              isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:text-primary hover:bg-slate-800/50'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-sm font-medium">Dashboard</span>
        </NavLink>

        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2 mt-4">
          Departments
        </div>
        {DEPARTMENTS.map((dept) => {
          const Icon = deptIcons[dept.id] ?? Activity;
          return (
            <NavLink
              key={dept.id}
              to={`/department/${dept.id}`}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-slate-400 hover:text-primary hover:bg-slate-800/50'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{dept.name.split(' (')[0]}</span>
              <div
                className={`ml-auto w-2 h-2 rounded-full shrink-0 ${
                  dept.status === 'healthy'
                    ? 'bg-emerald-500'
                    : dept.status === 'warning'
                      ? 'bg-amber-500'
                      : dept.status === 'error'
                        ? 'bg-rose-500'
                        : 'bg-slate-500'
                }`}
              />
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border-dark">
        <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">JD</span>
          </div>
          <div className="flex-1 overflow-hidden min-w-0">
            <p className="text-xs font-semibold truncate">Jane Doe</p>
            <p className="text-[10px] text-slate-500 truncate italic">Cluster Lead</p>
          </div>
          <Settings className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white transition-colors shrink-0" />
        </div>
      </div>
    </aside>
  );
}

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/department/:deptId" element={<Department />} />
      </Routes>
    </div>
  );
}
