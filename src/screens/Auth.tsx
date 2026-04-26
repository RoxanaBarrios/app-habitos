import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setMessage("Escribe email y contraseña");
      return;
    }

    if (!isSupabaseConfigured) {
      setMessage("Configura SUPABASE_URL y SUPABASE_ANON_KEY en src/lib/supabase.ts");
      return;
    }

    setIsLoading(true);
    setMessage("");

    if (isRegister) {
      const { error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Cuenta creada. Revisa tu correo para confirmar.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setMessage(error.message);
      }
    }

    setIsLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingTop: 70,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 6 }}>
        app-habitos
      </Text>
      <Text style={{ marginBottom: 22 }}>
        {isRegister ? "Crear cuenta" : "Iniciar sesión"}
      </Text>

      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, marginBottom: 12, borderRadius: 8 }}
      />

      <TextInput
        secureTextEntry
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 12, marginBottom: 14, borderRadius: 8 }}
      />

      <Button
        title={isLoading ? "Cargando..." : isRegister ? "Registrarme" : "Entrar"}
        disabled={isLoading}
        onPress={handleAuth}
      />

      <View style={{ marginTop: 10 }}>
        <Button
          title={
            isRegister
              ? "Ya tengo cuenta, iniciar sesión"
              : "No tengo cuenta, crear una"
          }
          onPress={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}
        />
      </View>

      {message ? (
        <Text style={{ marginTop: 14, color: "#b00020" }}>{message}</Text>
      ) : null}
    </View>
  );
}
