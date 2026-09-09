export interface Badge {
  id: number;
  name: string;
  description: string;
  image: string | null;
}

export interface BadgeInput {
  name: string;
  description: string;
  image?: File | null;
}
