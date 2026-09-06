export interface ActivityStep {
  time: string;
  title: string;
  description: string;
  lead: string;
  tag: string;
}

export interface AlumniEvent {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  description: string;
  curator?: string;
  curatorRole?: string;
  category?: string;
  date?: string;
  location?: string;
  attendeesCount?: string;
  aspectRatio?: string;
  impactMetrics?: {
    label: string;
    value: string;
  }[];
  activities?: ActivityStep[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  keyTopics?: string[];
}