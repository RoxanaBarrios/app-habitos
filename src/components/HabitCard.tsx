import { View, Text, Button } from "react-native";
import { Habit } from "../models/Habit";

export default function HabitCard({
  habit,
  onComplete,
  onEdit,
  onDelete,
}: {
  habit: Habit;
  onComplete: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <View style={{ padding: 10, borderWidth: 1, marginBottom: 10, backgroundColor: habit.completedToday ? "#e8f5e9" : "#fff" }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{habit.name}</Text>
      <Text style={{ marginBottom: 5 }}>🔥 Racha: {habit.streak} días</Text>
      {habit.completedToday && <Text style={{ color: "green", fontWeight: "bold" }}>✓ Completado hoy</Text>}

      <Button
        title={habit.completedToday ? "Completado ✓" : "Completar"}
        onPress={() => onComplete(habit.id)}
        disabled={habit.completedToday}
      />

      <View style={{ marginTop: 8 }}>
        <Button title="Editar" onPress={() => onEdit(habit)} />
      </View>

      <View style={{ marginTop: 8 }}>
        <Button title="Eliminar" color="#b00020" onPress={() => onDelete(habit.id)} />
      </View>
    </View>
  );
}