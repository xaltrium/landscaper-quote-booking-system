export interface CustomerLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  budget: 'under-2.5k' | '2.5k-5k' | '5k-10k' | '10k-20k' | '20k-plus';
  timeline: 'immediate' | '1-3-months' | '3-6-months' | 'just-pricing';
  ownsProperty: boolean;
  bookedSlot: string | null; // e.g., "Monday, July 6th at 10:00 AM"
  status: 'QUALIFIED' | 'SCREENED OUT' | 'PENDING';
  submittedAt: string;
}

export interface LandscaperApplication {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  location: string;
  monthlyCapacity: number;
  hasAdBudget: boolean;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  submittedAt: string;
}
