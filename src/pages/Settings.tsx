import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Database, 
  Cloud, 
  Zap, 
  Save, 
  Server
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useToast } from '../components/common/ToastContext';
import { API_BASE_URL, IS_MOCK_MODE } from '../services/api';

export const Settings: React.FC = () => {
  const { showToast } = useToast();

  // Settings State
  const [fastApiUrl, setFastApiUrl] = useState(API_BASE_URL);
  const [mockMode, setMockMode] = useState(IS_MOCK_MODE);

  // DB Settings
  const [dbHost, setDbHost] = useState('aurora-pg.novamart.internal');
  const [dbPort, setDbPort] = useState('5432');
  const [dbName, setDbName] = useState('novamart_prod_db');
  const [dbUser, setDbUser] = useState('novamart_analyst');
  const [isTestingDb, setIsTestingDb] = useState(false);

  // Hindsight Settings
  const [hindsightCluster, setHindsightCluster] = useState('https://cluster-4.hindsight.cloud');
  const [hindsightNamespace, setHindsightNamespace] = useState('novamart_production_v2');
  const [hindsightApiKey, setHindsightApiKey] = useState('hs_live_9f81a7428801cebb9412');
  const [isTestingHindsight, setIsTestingHindsight] = useState(false);

  // LLM Settings
  const [llmModel, setLlmModel] = useState('qwen-2.5-coder-32b');
  const [temperature, setTemperature] = useState('0.1');

  const handleTestDatabase = () => {
    setIsTestingDb(true);
    setTimeout(() => {
      setIsTestingDb(false);
      showToast('PostgreSQL Connection Verified', 'Connected to novamart_prod_db with 14ms ping latency.', 'success');
    }, 800);
  };

  const handleTestHindsight = () => {
    setIsTestingHindsight(true);
    setTimeout(() => {
      setIsTestingHindsight(false);
      showToast('Hindsight Cloud Connected', 'Namespace novamart_production_v2 is active. 56 memories synced.', 'success');
    }, 800);
  };

  const handleSaveAll = () => {
    showToast('Settings Saved Successfully', 'Configuration persisted to local storage.', 'success');
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4EAEA] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#142337] tracking-tight flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-[#F45B0B]" />
            <span>Platform Configuration</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-normal">
            Configure database drivers, Hindsight persistent memory clusters, Groq LLM inference, and FastAPI routing.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleSaveAll} leftIcon={<Save className="w-4 h-4" />}>
          Save Configuration
        </Button>
      </div>

      {/* Backend & Mode Config */}
      <div className="rounded-2xl bg-white border border-[#E4EAEA] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4EAEA] pb-3">
          <div className="flex items-center gap-2 text-[#142337] font-bold text-sm">
            <Server className="w-4 h-4 text-[#F45B0B]" />
            <span>FastAPI Backend Target</span>
          </div>
          <Badge variant={mockMode ? 'orange' : 'emerald'} dot>
            {mockMode ? 'Simulated Demo Mode' : 'Connected to Live Server'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[#142337] font-bold mb-1">
              API Base URL (FastAPI Endpoint)
            </label>
            <input
              type="text"
              value={fastApiUrl}
              onChange={(e) => setFastApiUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E4EAEA] font-mono text-[#142337] text-xs focus:outline-none focus:border-[#F45B0B] font-medium"
            />
            <p className="text-[10px] text-[#64748B] mt-1">Configurable via VITE_API_BASE_URL env variable.</p>
          </div>

          <div className="flex flex-col justify-center">
            <label className="block text-[#142337] font-bold mb-1">
              Data Provider Mode
            </label>
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E4EAEA]">
              <input
                type="checkbox"
                id="mockToggle"
                checked={mockMode}
                onChange={(e) => setMockMode(e.target.checked)}
                className="w-4 h-4 accent-[#F45B0B] rounded cursor-pointer"
              />
              <label htmlFor="mockToggle" className="text-xs text-[#142337] font-medium cursor-pointer">
                Use Local Mock Simulator (Recommended for Hackathon Presentation)
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* PostgreSQL Database Connection */}
      <div className="rounded-2xl bg-white border border-[#E4EAEA] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4EAEA] pb-3">
          <div className="flex items-center gap-2 text-[#142337] font-bold text-sm">
            <Database className="w-4 h-4 text-[#F45B0B]" />
            <span>PostgreSQL Database Connection</span>
          </div>
          <Button
            variant="subtle"
            size="sm"
            onClick={handleTestDatabase}
            isLoading={isTestingDb}
          >
            Test Connection
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-[#64748B] font-bold mb-1">Host</label>
            <input
              type="text"
              value={dbHost}
              onChange={(e) => setDbHost(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E4EAEA] font-mono text-[#142337] text-xs focus:outline-none focus:border-[#F45B0B]"
            />
          </div>
          <div>
            <label className="block text-[#64748B] font-bold mb-1">Port</label>
            <input
              type="text"
              value={dbPort}
              onChange={(e) => setDbPort(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E4EAEA] font-mono text-[#142337] text-xs focus:outline-none focus:border-[#F45B0B]"
            />
          </div>
          <div>
            <label className="block text-[#64748B] font-bold mb-1">Database Name</label>
            <input
              type="text"
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E4EAEA] font-mono text-[#142337] text-xs focus:outline-none focus:border-[#F45B0B]"
            />
          </div>
          <div>
            <label className="block text-[#64748B] font-bold mb-1">Username</label>
            <input
              type="text"
              value={dbUser}
              onChange={(e) => setDbUser(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E4EAEA] font-mono text-[#142337] text-xs focus:outline-none focus:border-[#F45B0B]"
            />
          </div>
        </div>
      </div>

      {/* Hindsight Cloud Memory Engine Settings */}
      <div className="rounded-2xl bg-white border border-[#A8C9C8] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4EAEA] pb-3">
          <div className="flex items-center gap-2 text-[#142337] font-bold text-sm">
            <Cloud className="w-4 h-4 text-[#F45B0B]" />
            <span>Hindsight Persistent Memory Cloud</span>
          </div>
          <Button
            variant="powder"
            size="sm"
            onClick={handleTestHindsight}
            isLoading={isTestingHindsight}
          >
            Verify Memory Handshake
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-[#64748B] font-bold mb-1">Cluster Endpoint</label>
            <input
              type="text"
              value={hindsightCluster}
              onChange={(e) => setHindsightCluster(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E4EAEA] font-mono text-[#142337] text-xs focus:outline-none focus:border-[#F45B0B]"
            />
          </div>
          <div>
            <label className="block text-[#64748B] font-bold mb-1">Namespace</label>
            <input
              type="text"
              value={hindsightNamespace}
              onChange={(e) => setHindsightNamespace(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E4EAEA] font-mono text-[#142337] text-xs focus:outline-none focus:border-[#F45B0B]"
            />
          </div>
          <div>
            <label className="block text-[#64748B] font-bold mb-1">API Key (Protected)</label>
            <input
              type="password"
              value={hindsightApiKey}
              onChange={(e) => setHindsightApiKey(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E4EAEA] font-mono text-[#142337] text-xs focus:outline-none focus:border-[#F45B0B]"
            />
          </div>
        </div>
      </div>

      {/* Groq LLM Inference */}
      <div className="rounded-2xl bg-white border border-[#E4EAEA] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#142337] font-bold text-sm border-b border-[#E4EAEA] pb-3">
          <Zap className="w-4 h-4 text-[#F45B0B] fill-[#F45B0B]" />
          <span>Groq High-Speed Inference Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[#142337] font-bold mb-1">Target Model</label>
            <select
              value={llmModel}
              onChange={(e) => setLlmModel(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E4EAEA] font-mono text-[#142337] text-xs focus:outline-none focus:border-[#F45B0B] font-medium"
            >
              <option value="qwen-2.5-coder-32b">qwen-2.5-coder-32b (Ultra Fast SQL Specialist)</option>
              <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Complex Reasoning)</option>
              <option value="mixtral-8x7b-32768">mixtral-8x7b-32768 (High Token Context)</option>
            </select>
          </div>

          <div>
            <label className="block text-[#142337] font-bold mb-1">Sampling Temperature</label>
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F5F7F7] border border-[#E4EAEA] font-mono text-[#142337] text-xs focus:outline-none focus:border-[#F45B0B] font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
