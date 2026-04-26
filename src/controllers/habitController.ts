import { Habit } from "../models/Habit";

// Obtiene la fecha de hoy en formato YYYY-MM-DD
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Verifica si una fecha es hoy
const isToday = (dateString: string | null): boolean => {
  if (!dateString) return false;
  return dateString === getTodayDate();
};

// Verifica si una fecha es ayer
const isYesterday = (dateString: string | null): boolean => {
  if (!dateString) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateString === yesterday.toISOString().split("T")[0];
};

export const createHabit = (name: string): Habit | null => {
  const trimmedName = name.trim();
  if (!trimmedName) return null;

  return {
    id: Date.now().toString(),
    name: trimmedName,
    completedToday: false,
    streak: 0,
    lastCompletedDate: null,
  };
};

export const completeHabit = (habits: Habit[], id: string): Habit[] => {
  return habits.map((h) => {
    if (h.id !== id) return h;

    // Si ya completó hoy, no hace nada
    if (isToday(h.lastCompletedDate)) {
      console.log("Ya completaste este hábito hoy");
      return h;
    }

    // Determina si el streak debe continuar o reiniciarse
    let newStreak = h.streak;
    if (isYesterday(h.lastCompletedDate)) {
      // Si lo completó ayer, incrementa el streak
      newStreak = h.streak + 1;
    } else if (!h.lastCompletedDate) {
      // Si es la primera vez, inicia con 1
      newStreak = 1;
    } else {
      // Si no completó ayer, resetea el streak a 1
      newStreak = 1;
    }

    return {
      ...h,
      completedToday: true,
      streak: newStreak,
      lastCompletedDate: getTodayDate(),
    };
  });
};

export const updateHabitName = (
  habits: Habit[],
  id: string,
  name: string
): Habit[] => {
  const trimmedName = name.trim();
  if (!trimmedName) return habits;

  return habits.map((habit) =>
    habit.id === id ? { ...habit, name: trimmedName } : habit
  );
};

export const deleteHabit = (habits: Habit[], id: string): Habit[] => {
  return habits.filter((habit) => habit.id !== id);
};