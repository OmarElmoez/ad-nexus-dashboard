
import { create } from 'zustand';

// Types for platform connections
export type PlatformType = 'google' | 'meta' | 'linkedin';

export interface PlatformConnection {
  id: string;
  type: PlatformType;
  name: string;
  isConnected: boolean;
  accountId: string;
  connectedAt?: Date;
}

// Types for campaigns
export interface Campaign {
  id: string;
  name: string;
  platforms: PlatformType[];
  status: 'active' | 'paused' | 'draft';
  budget: number;
  startDate: Date;
  endDate?: Date;
  stats: CampaignStats;
  userId: string;
}

export interface CampaignStats {
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
  cpc: number;
  roi: number;
}

// Store interface
interface CampaignState {
  campaigns: Campaign[];
  connections: PlatformConnection[];
  isLoading: boolean;
  error: string | null;
  
  // Connection actions
  connectPlatform: (type: PlatformType, accountId: string) => Promise<void>;
  disconnectPlatform: (connectionId: string) => void;
  
  // Campaign actions
  fetchCampaigns: (userId?: string) => void;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'stats'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  toggleCampaignStatus: (id: string) => void;
  deleteCampaign: (id: string) => void;
  
  // Error handling
  clearError: () => void;
}

// Mock data for campaigns
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale 2025',
    platforms: ['google', 'meta'],
    status: 'active',
    budget: 5000,
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-08-31'),
    stats: {
      impressions: 250000,
      clicks: 12500,
      conversions: 750,
      cost: 3750,
      ctr: 5,
      cpc: 0.3,
      roi: 2.5
    },
    userId: '2'
  },
  {
    id: '2',
    name: 'Product Launch',
    platforms: ['meta', 'linkedin'],
    status: 'draft',
    budget: 10000,
    startDate: new Date('2025-09-15'),
    stats: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      cost: 0,
      ctr: 0,
      cpc: 0,
      roi: 0
    },
    userId: '2'
  },
  {
    id: '3',
    name: 'Year-End Promotion',
    platforms: ['google'],
    status: 'paused',
    budget: 7500,
    startDate: new Date('2025-11-01'),
    endDate: new Date('2025-12-31'),
    stats: {
      impressions: 125000,
      clicks: 7500,
      conversions: 300,
      cost: 2250,
      ctr: 6,
      cpc: 0.3,
      roi: 2.0
    },
    userId: '2'
  }
];

// Mock data for platform connections
const mockConnections: PlatformConnection[] = [
  {
    id: '1',
    type: 'google',
    name: 'Google Ads - Main',
    isConnected: true,
    accountId: 'ga-123456789',
    connectedAt: new Date('2025-01-15')
  },
  {
    id: '2',
    type: 'meta',
    name: 'Meta Business - Company',
    isConnected: true,
    accountId: 'fb-987654321',
    connectedAt: new Date('2025-01-20')
  }
];

export const useCampaignStore = create<CampaignState>((set, get) => ({
  campaigns: [],
  connections: mockConnections,
  isLoading: false,
  error: null,
  
  connectPlatform: async (type, accountId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newConnection: PlatformConnection = {
        id: Date.now().toString(),
        type,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Account`,
        isConnected: true,
        accountId,
        connectedAt: new Date()
      };
      
      set(state => ({
        connections: [...state.connections, newConnection],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to connect platform', isLoading: false });
    }
  },
  
  disconnectPlatform: (connectionId) => {
    set(state => ({
      connections: state.connections.filter(c => c.id !== connectionId)
    }));
  },
  
  fetchCampaigns: (userId) => {
    set({ isLoading: true, error: null });
    
    try {
      // In a real app, this would be an API call
      const filteredCampaigns = userId 
        ? mockCampaigns.filter(campaign => campaign.userId === userId)
        : mockCampaigns;
        
      set({ campaigns: filteredCampaigns, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch campaigns', isLoading: false });
    }
  },
  
  createCampaign: (campaignData) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: Date.now().toString(),
      stats: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        cost: 0,
        ctr: 0,
        cpc: 0,
        roi: 0
      }
    };
    
    set(state => ({
      campaigns: [...state.campaigns, newCampaign]
    }));
  },
  
  updateCampaign: (id, updates) => {
    set(state => ({
      campaigns: state.campaigns.map(campaign => 
        campaign.id === id ? { ...campaign, ...updates } : campaign
      )
    }));
  },
  
  toggleCampaignStatus: (id) => {
    set(state => ({
      campaigns: state.campaigns.map(campaign => {
        if (campaign.id === id) {
          const newStatus = campaign.status === 'active' ? 'paused' : 'active';
          return { ...campaign, status: newStatus };
        }
        return campaign;
      })
    }));
  },
  
  deleteCampaign: (id) => {
    set(state => ({
      campaigns: state.campaigns.filter(campaign => campaign.id !== id)
    }));
  },
  
  clearError: () => {
    set({ error: null });
  }
}));
