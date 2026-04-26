export interface Habit {
  id: string;
  name: string;
  description?: string;
  completedToday: boolean;
  streak: number;
  lastCompletedDate: string | null; // Fecha del último día que se completó
}