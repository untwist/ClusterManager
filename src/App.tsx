/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Activity, Network, LayoutDashboard, Settings, GripVertical } from 'lucide-react';
import { useDepartments } from './hooks/useData';
import { Home } from './pages/Home';
import { Department } from './pages/Department';

const SIDEBAR_MIN = 220;
const SIDEBAR_MAX = 480;
const SIDEBAR_DEFAULT = 320;

function Sidebar() {
  const { departments, loading } = useDepartments();
  const [width, setWidth] = useState(SIDEBAR_DEFAULT);
  const [resizing, setResizing] = useState(false);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!resizing) return;
      const next = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, e.clientX));
      setWidth(next);
    },
    [resizing]
  );
  const onMouseUp = useCallback(() => setResizing(false), []);

  useEffect(() => {
    if (!resizing) return;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [resizing, onMouseMove, onMouseUp]);

  return (
    <aside
      style={{ width: `${width}px` }}
      className="border-r border-border-dark flex flex-col bg-background-dark/50 overflow-y-auto no-scrollbar shrink-0 relative"
    >
      <div
        role="separator"
        aria-label="Resize sidebar"
        onMouseDown={() => setResizing(true)}
        className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-primary/30 active:bg-primary/50 transition-colors z-10 flex items-center justify-center group"
      >
        <GripVertical className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
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
        {loading ? (
          <div className="px-3 py-2 text-slate-500 text-xs">Loading...</div>
        ) : (
          departments.map((dept) => {
            const Icon = (dept.icon as React.ComponentType<{ className?: string }>) ?? Activity;
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
                <span className="text-sm font-medium flex-1 min-w-0 break-words">{dept.name.split(' (')[0]}</span>
                <span className="text-[10px] font-bold text-slate-500 shrink-0">{dept.nodeCount}</span>
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${
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
          })
        )}
      </nav>

      <div className="p-4 border-t border-border-dark">
        <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">JD</span>
          </div>
          <div className="flex-1 overflow-hidden min-w-0">
            <p className="text-xs font-semibold truncate">Toddles</p>
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
