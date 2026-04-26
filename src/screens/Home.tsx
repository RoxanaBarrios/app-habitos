import { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Alert } from "react-native";
import HabitCard from "../components/HabitCard";
import {
  createHabit,
  completeHabit,
  updateHabitName,
  deleteHabit,
} from "../controllers/habitController";
import { Habit } from "../models/Habit";
import {
  loadHabitsFromStorage,
  saveHabitsToStorage,
} from "../storage/habitStorage";

interface HomeProps {
  userId: string;
  onLogout: () => Promise<void>;
}

export default function Home({ userId, onLogout }: HomeProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);

  useEffect(() => {
    const loadHabits = async () => {
      const storedHabits = await loadHabitsFromStorage(userId);
      setHabits(storedHabits);
      setIsLoaded(true);
    };

    loadHabits();
  }, [userId]);

  useEffect(() => {
    if (!isLoaded) return;

    saveHabitsToStorage(userId, habits);
  }, [habits, isLoaded, userId]);

  const handleLogout = async () => {
    await onLogout();
  };

  const handleSubmitHabit = () => {
    if (editingHabitId) {
      setHabits(updateHabitName(habits, editingHabitId, name));
      setEditingHabitId(null);
      setName("");
      return;
    }

    const newHabit = createHabit(name);
    if (!newHabit) return;

    setHabits([...habits, newHabit]);
    setName("");
  };

  const handleComplete = (id: string) => {
    const updated = completeHabit(habits, id);
    setHabits(updated);
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabitId(habit.id);
    setName(habit.name);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Eliminar hábito",
      "¿Seguro que quieres eliminar este hábito?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setHabits(deleteHabit(habits, id));

            if (editingHabitId === id) {
              setEditingHabitId(null);
              setName("");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20, flex: 1, backgroundColor: '#ffffff' }}>
      <TextInput
        placeholder={editingHabitId ? "Editar hábito" : "Nuevo hábito"}
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 15, padding: 12, fontSize: 16, height: 45 }}
      />

      <Button
        title={editingHabitId ? "Guardar cambios" : "Agregar hábito"}
        onPress={handleSubmitHabit}
      />

      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Button title="Cerrar sesión" color="#555" onPress={handleLogout} />
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            onComplete={handleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      />
    </View>
  );
}