export interface OutlineNode {
  usageKey: string;
  displayName: string;
  badgeEnabled: boolean;
  badgeId: number | null;
  children: OutlineNode[];
}

export interface CourseOutlineResponse {
  chapters: OutlineNode[];
}
