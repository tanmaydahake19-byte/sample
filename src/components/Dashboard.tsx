import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Layers,
  ArrowRightLeft,
  Plus,
  Trash2,
  Eye,
  RefreshCw,
  FileText,
  Download,
  Bell,
  CheckCircle2,
  Search
} from 'lucide-react';
import { WaterLinkedList } from '../utils/linkedList';
import { WaterSource } from '../types/waterGrid';

interface DashboardProps {
  onBackToHero: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBackToHero }) => {
  const [waterList] = useState(() => new WaterLinkedList());
  const [, setTick] = useState(0);
  const [selectedSource, setSelectedSource] = useState<WaterSource | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [swapId1, setSwapId1] = useState('');
  const [swapId2, setSwapId2] = useState('');

  // Form State for Add Node
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newLoc, setNewLoc] = useState('');
  const [newCap, setNewCap] = useState('');
  const [newLvl, setNewLvl] = useState('');
  const [newUsage, setNewUsage] = useState('');

  const triggerUpdate = () => setTick((t) => t + 1);

  const sourcesList = waterList.toArray();
  const totalWater = waterList.getTotalWater();
  const totalCap = waterList.getTotalCapacity();
  const reservePct = waterList.getReservePercentage();
  const onlineCount = waterList.getOnlineCount();
  const totalCount = waterList.getNodeCount();

  const filteredSources = sourcesList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(s.id).includes(searchQuery)
  );

  const handleSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!swapId1 || !swapId2) return;
    const ok = waterList.swapNodes(Number(swapId1), Number(swapId2));
    if (ok) {
      setSwapId1('');
      setSwapId2('');
      triggerUpdate();
    } else {
      alert('Could not swap. Please verify that both Node IDs exist.');
    }
  };

  const handleDelete = (id: number) => {
    if (confirm(`Unlink Water Source Node #${id} from linked pipeline?`)) {
      waterList.deleteSource(id);
      triggerUpdate();
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    waterList.addSource(
      Number(newId),
      newName,
      newLoc,
      Number(newCap),
      Number(newLvl),
      Number(newUsage)
    );
    setShowAddModal(false);
    setNewId('');
    setNewName('');
    setNewLoc('');
    setNewCap('');
    setNewLvl('');
    setNewUsage('');
    triggerUpdate();
  };

  const handleResetData = () => {
    waterList.initDefaultDataset();
    triggerUpdate();
  };

  const getNodeBorderColor = (health: string) => {
    switch (health) {
      case 'Critical':
        return 'border-l-4 border-l-[#DC2626]';
      case 'Low':
        return 'border-l-4 border-l-[#D97706]';
      default:
        return 'border-l-4 border-l-[#7342E2]';
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#192837] pb-16 pt-24">
      
      {/* 5. Section Header Anchor: SCADA TELEMETRY STREAM */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 mb-8">
        <div className="bg-[#192837] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[rgba(25,40,55,0.12)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#7342E2] uppercase tracking-widest mb-1.5">
                <Activity size={16} /> SCADA TELEMETRY STREAM
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Talegaon Dabhade Control Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-[#4B5563] text-gray-300 mt-1 max-w-[620px]">
                Active Singly Linked List pipeline topology and real-time municipal reservoir telemetry.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleResetData}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 transition-colors border-none cursor-pointer"
              >
                <RefreshCw size={14} /> Reset Grid
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#7342E2] hover:bg-[#7342E2]/90 text-white text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md transition-all border-none cursor-pointer"
              >
                <Plus size={14} /> Add Source Node
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">

        {/* 3. High-Contrast KPI Cards – Pure White Background, Dark Big Numbers, Accent only on Reserve & Alerts */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          
          <div className="bg-white p-5 rounded-2xl border border-[rgba(25,40,55,0.08)] shadow-[0_4px_20px_rgba(25,40,55,0.06)]">
            <div className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1">
              Available Water
            </div>
            <div className="font-heading text-2xl sm:text-3xl text-[#192837] font-bold">
              {totalWater.toLocaleString()} L
            </div>
            <div className="text-[11px] font-medium text-[#059669] mt-1.5 flex items-center gap-1">
              ▲ 2.4% vs avg
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[rgba(25,40,55,0.08)] shadow-[0_4px_20px_rgba(25,40,55,0.06)]">
            <div className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1">
              System Capacity
            </div>
            <div className="font-heading text-2xl sm:text-3xl text-[#192837] font-bold">
              {totalCap.toLocaleString()} L
            </div>
            <div className="text-[11px] font-medium text-[#4B5563] mt-1.5">
              {totalCount} Active Reservoirs
            </div>
          </div>

          {/* Accent Purple ON Reserve % */}
          <div className="bg-white p-5 rounded-2xl border border-[rgba(25,40,55,0.08)] shadow-[0_4px_20px_rgba(25,40,55,0.06)]">
            <div className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1">
              Town Reserve %
            </div>
            <div className="font-heading text-2xl sm:text-3xl text-[#7342E2] font-bold">
              {reservePct}%
            </div>
            <div className="text-[11px] font-medium text-[#4B5563] mt-1.5">
              Moderate Status
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[rgba(25,40,55,0.08)] shadow-[0_4px_20px_rgba(25,40,55,0.06)]">
            <div className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1">
              Sources Online
            </div>
            <div className="font-heading text-2xl sm:text-3xl text-[#192837] font-bold">
              {onlineCount} / {totalCount}
            </div>
            <div className="text-[11px] font-medium text-[#059669] mt-1.5 flex items-center gap-1">
              <CheckCircle2 size={13} /> 100% Operational
            </div>
          </div>

          {/* Accent Color ON Alerts */}
          <div className="col-span-2 md:col-span-1 bg-white p-5 rounded-2xl border border-[rgba(25,40,55,0.08)] shadow-[0_4px_20px_rgba(25,40,55,0.06)]">
            <div className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1">
              Active SCADA Alerts
            </div>
            <div className="font-heading text-2xl sm:text-3xl text-[#D97706] font-bold">
              {waterList.alerts.length} Warnings
            </div>
            <div className="text-[11px] font-medium text-[#D97706] mt-1.5 flex items-center gap-1">
              <AlertTriangle size={13} /> Priority Review
            </div>
          </div>

        </div>

        {/* 5. Section Header Anchor: DATA STRUCTURE PIPELINE CANVAS */}
        <div className="bg-white rounded-3xl p-6 border border-[rgba(25,40,55,0.08)] shadow-[0_4px_24px_rgba(25,40,55,0.06)] mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[rgba(25,40,55,0.08)]">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#7342E2] uppercase tracking-widest mb-1">
                <Layers size={16} /> DATA STRUCTURE PIPELINE CANVAS
              </div>
              <h2 className="font-heading text-xl font-bold text-[#192837]">
                Singly Linked List Grid Topology
              </h2>
            </div>

            {/* Swap Form */}
            <form onSubmit={handleSwap} className="flex items-center gap-2">
              <input
                type="number"
                placeholder="ID 1"
                value={swapId1}
                onChange={(e) => setSwapId1(e.target.value)}
                className="w-16 px-3 py-1.5 bg-[#F4F5F7] border border-[rgba(25,40,55,0.12)] rounded-lg text-xs outline-none focus:border-[#7342E2] text-[#192837]"
              />
              <input
                type="number"
                placeholder="ID 2"
                value={swapId2}
                onChange={(e) => setSwapId2(e.target.value)}
                className="w-16 px-3 py-1.5 bg-[#F4F5F7] border border-[rgba(25,40,55,0.12)] rounded-lg text-xs outline-none focus:border-[#7342E2] text-[#192837]"
              />
              <button
                type="submit"
                className="bg-[#192837] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-[#7342E2] transition-colors border-none cursor-pointer"
              >
                <ArrowRightLeft size={12} /> Swap Nodes
              </button>
            </form>
          </div>

          {/* 4. Linked List Nodes – Pure White Background, Clear Left Accent Border, High Contrast Badge */}
          <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-2 min-h-[150px] scrollbar-thin">
            <div className="px-3.5 py-2.5 bg-[#7342E2]/15 text-[#7342E2] rounded-xl text-xs font-extrabold uppercase tracking-wider flex-shrink-0 border border-[#7342E2]/20">
              HEAD POINTER ➔
            </div>

            {sourcesList.map((node) => (
              <React.Fragment key={node.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedSource(node)}
                  className={`bg-white hover:shadow-md border border-[rgba(25,40,55,0.1)] ${getNodeBorderColor(
                    node.healthStatus
                  )} rounded-2xl p-4 min-w-[230px] max-w-[250px] flex-shrink-0 transition-all cursor-pointer shadow-sm`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold text-[#7342E2] uppercase tracking-wider">
                      Node #{node.id}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#7342E2]/15 text-[#7342E2] border border-[#7342E2]/20">
                      {node.percentage}% Full
                    </span>
                  </div>
                  <div className="font-heading text-sm font-bold text-[#192837] truncate">
                    {node.name}
                  </div>
                  <div className="text-xs text-[#4B5563] truncate mt-1">
                    📍 {node.location}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[rgba(25,40,55,0.08)] flex justify-between items-center text-[11px] font-medium">
                    <span className="text-[#192837] font-semibold">
                      {node.currentLevel.toLocaleString()} L
                    </span>
                    <span className="text-[#059669] font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#059669]" />
                      Online
                    </span>
                  </div>
                </motion.div>

                {node.hasNext ? (
                  <div className="text-[#7342E2] font-bold text-xl flex-shrink-0">➔</div>
                ) : (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[#7342E2] font-bold text-xl">➔</span>
                    <span className="px-3 py-2 bg-[rgba(25,40,55,0.08)] text-[#192837] rounded-xl text-xs font-mono font-bold">
                      NULL
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 3. Main Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Columns: Data Table & Mobile Card Stack */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[rgba(25,40,55,0.08)] shadow-[0_4px_24px_rgba(25,40,55,0.06)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#192837]">
                    Municipal Water Sources Data Feed
                  </h3>
                  <p className="text-xs text-[#4B5563]">
                    Live SCADA status for connected intake stations & storage towers.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B5563]" />
                  <input
                    type="text"
                    placeholder="Search sources or wards..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[#F4F5F7] border border-[rgba(25,40,55,0.12)] rounded-xl text-xs outline-none focus:border-[#7342E2] text-[#192837]"
                  />
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[rgba(25,40,55,0.12)] text-[#4B5563] font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3 px-3">Source Name</th>
                      <th className="py-3 px-3">Location / Ward</th>
                      <th className="py-3 px-3 text-right">Capacity (L)</th>
                      <th className="py-3 px-3 text-right">Level (L)</th>
                      <th className="py-3 px-3">Reserve %</th>
                      <th className="py-3 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSources.map((s) => (
                      <tr
                        key={s.id}
                        className="border-b border-[rgba(25,40,55,0.06)] hover:bg-[#F4F5F7] transition-colors"
                      >
                        <td className="py-3.5 px-3 font-mono font-bold text-[#7342E2]">
                          #{s.id}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-[#192837]">
                          {s.name}
                        </td>
                        <td className="py-3.5 px-3 text-[#4B5563]">
                          {s.location}
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono text-[#192837]">
                          {s.capacity.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono text-[#192837]">
                          {s.currentLevel.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2.5 bg-[#F4F5F7] rounded-full overflow-hidden border border-[rgba(25,40,55,0.08)]">
                              <div
                                className="h-full bg-[#7342E2] rounded-full"
                                style={{ width: `${s.percentage}%` }}
                              />
                            </div>
                            <span className="font-mono text-[11px] font-bold text-[#192837]">
                              {s.percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setSelectedSource(s)}
                              className="p-1.5 text-[#7342E2] hover:bg-[#7342E2]/10 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                              title="View Node Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(s.id)}
                              className="p-1.5 text-[#DC2626] hover:bg-[#DC2626]/10 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                              title="Unlink Node"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Stack View */}
              <div className="sm:hidden flex flex-col gap-3">
                {filteredSources.map((s) => (
                  <div
                    key={s.id}
                    className="bg-[#F4F5F7] p-4 rounded-2xl border border-[rgba(25,40,55,0.12)]"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-xs font-bold text-[#7342E2]">
                        Node #{s.id}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#7342E2]/15 text-[#7342E2]">
                        {s.percentage}% Full
                      </span>
                    </div>
                    <div className="font-heading text-sm font-bold text-[#192837] mb-1">
                      {s.name}
                    </div>
                    <div className="text-xs text-[#4B5563] mb-3">
                      📍 {s.location}
                    </div>
                    <div className="flex justify-between text-xs font-mono mb-3 text-[#192837]">
                      <span>Cap: {s.capacity.toLocaleString()} L</span>
                      <span>Level: {s.currentLevel.toLocaleString()} L</span>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-[rgba(25,40,55,0.12)]">
                      <button
                        onClick={() => setSelectedSource(s)}
                        className="flex-1 bg-white text-[#7342E2] text-xs font-semibold py-2 rounded-xl border border-[rgba(25,40,55,0.12)]"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="px-3 bg-red-50 text-[#DC2626] text-xs font-semibold py-2 rounded-xl border border-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Telemetry Alerts & Quick Actions */}
          <div className="flex flex-col gap-6">
            
            {/* Live Alerts Panel */}
            <div className="bg-white rounded-3xl p-6 border border-[rgba(25,40,55,0.08)] shadow-[0_4px_24px_rgba(25,40,55,0.06)]">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(25,40,55,0.08)]">
                <div className="flex items-center gap-2">
                  <Bell size={18} className="text-[#D97706]" />
                  <h3 className="font-heading text-base font-bold text-[#192837]">
                    Live Telemetry Alerts
                  </h3>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-0.5 bg-[#D97706]/15 text-[#D97706] rounded-full">
                  {waterList.alerts.length} Logged
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {waterList.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3.5 bg-[#F4F5F7] rounded-2xl border border-[rgba(25,40,55,0.08)] flex gap-3 items-start"
                  >
                    <AlertTriangle
                      size={18}
                      className={
                        alert.type === 'Critical'
                          ? 'text-[#DC2626] flex-shrink-0 mt-0.5'
                          : 'text-[#D97706] flex-shrink-0 mt-0.5'
                      }
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#192837]">
                        {alert.message}
                      </div>
                      <div className="text-[10px] font-mono text-[#4B5563] mt-1">
                        {alert.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Quick Actions Panel */}
            <div className="bg-white rounded-3xl p-6 border border-[rgba(25,40,55,0.08)] shadow-[0_4px_24px_rgba(25,40,55,0.06)]">
              <h3 className="font-heading text-base font-bold text-[#192837] mb-4">
                Operational Quick Actions
              </h3>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => alert(`Municipal Grid Report generated at ${new Date().toLocaleTimeString()}`)}
                  className="w-full bg-[#F4F5F7] hover:bg-[#7342E2] hover:text-white text-[#192837] text-xs font-semibold py-3 px-4 rounded-xl flex items-center gap-3 transition-colors border border-[rgba(25,40,55,0.08)] cursor-pointer"
                >
                  <FileText size={16} /> Generate Daily Municipal Report
                </button>
                <button
                  onClick={() => alert("Downloading Telemetry SCADA Dataset CSV...")}
                  className="w-full bg-[#F4F5F7] hover:bg-[#7342E2] hover:text-white text-[#192837] text-xs font-semibold py-3 px-4 rounded-xl flex items-center gap-3 transition-colors border border-[rgba(25,40,55,0.08)] cursor-pointer"
                >
                  <Download size={16} /> Export SCADA Telemetry CSV
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Node Detail Drawer Modal */}
      <AnimatePresence>
        {selectedSource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSource(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="relative z-10 w-full max-w-[480px] bg-white rounded-3xl p-6 shadow-2xl border border-[rgba(25,40,55,0.12)] pointer-events-auto"
            >
              <div className="flex justify-between items-start mb-4 pb-3 border-b border-[rgba(25,40,55,0.12)]">
                <div>
                  <span className="font-mono text-xs font-bold text-[#7342E2]">
                    NODE ID #{selectedSource.id}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-[#192837] mt-0.5">
                    {selectedSource.name}
                  </h3>
                  <div className="text-xs text-[#4B5563]">
                    📍 {selectedSource.location}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSource(null)}
                  className="w-8 h-8 rounded-full bg-[#F4F5F7] flex items-center justify-center text-[#192837] border-none cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#F4F5F7] p-4 rounded-2xl">
                  <div className="text-xs font-semibold text-[#4B5563] uppercase">
                    Storage Capacity
                  </div>
                  <div className="font-heading text-xl font-bold text-[#192837] mt-1">
                    {selectedSource.capacity.toLocaleString()} L
                  </div>
                </div>
                <div className="bg-[#F4F5F7] p-4 rounded-2xl">
                  <div className="text-xs font-semibold text-[#4B5563] uppercase">
                    Current Level
                  </div>
                  <div className="font-heading text-xl font-bold text-[#7342E2] mt-1">
                    {selectedSource.currentLevel.toLocaleString()} L
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#192837] leading-relaxed bg-[#F4F5F7] p-4 rounded-2xl border border-[rgba(25,40,55,0.08)]">
                <strong>SCADA Operational Log:</strong> Pressure sensors nominal at 4.2 bar.<br />
                <strong>Last Updated:</strong> <span className="font-mono">{selectedSource.lastUpdated}</span>
              </div>

              <button
                onClick={() => setSelectedSource(null)}
                className="w-full mt-6 bg-[#7342E2] text-white text-xs font-semibold py-3 rounded-full border-none cursor-pointer"
              >
                Close Detail View
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Source Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="relative z-10 w-full max-w-[440px] bg-white rounded-3xl p-6 shadow-2xl border border-[rgba(25,40,55,0.12)] pointer-events-auto"
            >
              <h3 className="font-heading text-lg font-bold text-[#192837] mb-4 pb-3 border-b border-[rgba(25,40,55,0.12)]">
                Add Water Source Node
              </h3>
              <form onSubmit={handleAddSubmit} className="flex flex-col gap-3">
                <input
                  type="number"
                  placeholder="Node ID (e.g. 106)"
                  required
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F4F5F7] border border-[rgba(25,40,55,0.12)] rounded-xl text-xs outline-none focus:border-[#7342E2] text-[#192837]"
                />
                <input
                  type="text"
                  placeholder="Station Name"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F4F5F7] border border-[rgba(25,40,55,0.12)] rounded-xl text-xs outline-none focus:border-[#7342E2] text-[#192837]"
                />
                <input
                  type="text"
                  placeholder="Location / Ward"
                  required
                  value={newLoc}
                  onChange={(e) => setNewLoc(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F4F5F7] border border-[rgba(25,40,55,0.12)] rounded-xl text-xs outline-none focus:border-[#7342E2] text-[#192837]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Capacity (L)"
                    required
                    value={newCap}
                    onChange={(e) => setNewCap(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#F4F5F7] border border-[rgba(25,40,55,0.12)] rounded-xl text-xs outline-none focus:border-[#7342E2] text-[#192837]"
                  />
                  <input
                    type="number"
                    placeholder="Current Level (L)"
                    required
                    value={newLvl}
                    onChange={(e) => setNewLvl(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#F4F5F7] border border-[rgba(25,40,55,0.12)] rounded-xl text-xs outline-none focus:border-[#7342E2] text-[#192837]"
                  />
                </div>
                <input
                  type="number"
                  placeholder="Daily Outflow Usage (L)"
                  required
                  value={newUsage}
                  onChange={(e) => setNewUsage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F4F5F7] border border-[rgba(25,40,55,0.12)] rounded-xl text-xs outline-none focus:border-[#7342E2] text-[#192837]"
                />
                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-[#F4F5F7] text-[#192837] text-xs font-semibold py-3 rounded-full border-none cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#7342E2] text-white text-xs font-semibold py-3 rounded-full border-none cursor-pointer"
                  >
                    Insert Node
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
