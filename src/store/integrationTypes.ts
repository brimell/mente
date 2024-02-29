export interface Integration {
  name: string;
  description: string;
  cover: string;
  logo: string;
  status: string;
}

export interface SleepData {
  id: string;
  contributors: {
      deep_sleep: number;
      efficiency: number;
      latency: number;
      rem_sleep: number;
      restfulness: number;
      timing: number;
      total_sleep: number;
  };
  day: string;
  score: number;
  timestamp: string;
}