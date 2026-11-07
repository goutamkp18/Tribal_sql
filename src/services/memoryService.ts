import { apiFetch, ApiResponse } from './api';
import { RetainedMemory, RecalledMemory, ReflectedKnowledge, MentalModel, LearningEvent } from '../types';
import { 
  mockRetainedMemories, 
  mockRecalledMemories, 
  mockReflectedKnowledge, 
  mockMentalModels 
} from '../data/mockMemories';
import { mockLearningEvents } from '../data/mockLearning';

export async function retainMemory(payload: {
  title: string;
  type: string;
  ruleText: string;
  description: string;
  author: string;
  categoryTag: string;
}): Promise<ApiResponse<RetainedMemory>> {
  return apiFetch<RetainedMemory>(
    '/memory/retain',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    async () => {
      const newMemory: RetainedMemory = {
        id: `mem-${Date.now().toString().slice(-4)}`,
        type: payload.type as any,
        title: payload.title,
        description: payload.description,
        ruleText: payload.ruleText,
        createdAt: new Date().toISOString(),
        confidenceScore: 0.99,
        timesApplied: 1,
        author: payload.author || 'Current User',
        verified: true,
        categoryTag: payload.categoryTag || 'Custom Rule',
      };
      return newMemory;
    }
  );
}

export async function recallMemory(query: string): Promise<ApiResponse<RecalledMemory[]>> {
  return apiFetch<RecalledMemory[]>(
    '/memory/recall',
    {
      method: 'POST',
      body: JSON.stringify({ query }),
    },
    async () => {
      return mockRecalledMemories;
    }
  );
}

export async function reflectMemory(): Promise<ApiResponse<ReflectedKnowledge[]>> {
  return apiFetch<ReflectedKnowledge[]>(
    '/memory/reflect',
    {
      method: 'GET',
    },
    async () => {
      return mockReflectedKnowledge;
    }
  );
}

export async function getMentalModels(): Promise<ApiResponse<MentalModel[]>> {
  return apiFetch<MentalModel[]>(
    '/memory/mental-models',
    {
      method: 'GET',
    },
    async () => {
      return mockMentalModels;
    }
  );
}

export async function getLearningHistory(filter: string = 'all'): Promise<ApiResponse<LearningEvent[]>> {
  return apiFetch<LearningEvent[]>(
    `/memory/learning-history?filter=${filter}`,
    {
      method: 'GET',
    },
    async () => {
      if (filter === 'all') return mockLearningEvents;
      return mockLearningEvents.filter(ev => ev.verificationStatus === filter);
    }
  );
}

export async function getRetainedMemories(): Promise<ApiResponse<RetainedMemory[]>> {
  return apiFetch<RetainedMemory[]>(
    '/memory/retained',
    {
      method: 'GET',
    },
    async () => {
      return mockRetainedMemories;
    }
  );
}

