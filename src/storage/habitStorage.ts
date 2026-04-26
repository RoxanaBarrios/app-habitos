import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit } from "../models/Habit";

const getHabitsStorageKey = (userId: string) => `@app_habitos:habits:${userId}`;

export const loadHabitsFromStorage = async (userId: string): Promise<Habit[]> => {
  try {
    const storedHabits = await AsyncStorage.getItem(getHabitsStorageKey(userId));

    if (!storedHabits) {
      return [];
    }

    const parsedHabits = JSON.parse(storedHabits);
    return Array.isArray(parsedHabits) ? parsedHabits : [];
  } catch (error) {
    console.error("Error al cargar hábitos:", error);
    return [];
  }
};

export const saveHabitsToStorage = async (
  userId: string,
  habits: Habit[]
): Promise<void> => {
  try {
    await AsyncStorage.setItem(getHabitsStorageKey(userId), JSON.stringify(habits));
  } catch (error) {
    console.error("Error al guardar hábitos:", error);
  }
};
