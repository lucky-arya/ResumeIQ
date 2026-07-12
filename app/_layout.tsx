// app/_layout.tsx
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";
import {
  ArchivoBlack_400Regular,
  useFonts,
} from "@expo-google-fonts/archivo-black";
import {
  JetBrainsMono_500Medium,
  JetBrainsMono_700Bold,
} from "@expo-google-fonts/jetbrains-mono";
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import "./globals.css";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,

    }
  }
});



export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    ArchivoBlack: ArchivoBlack_400Regular,
    SpaceGrotesk: SpaceGrotesk_400Regular,
    SpaceGroteskMedium: SpaceGrotesk_500Medium,
    SpaceGroteskBold: SpaceGrotesk_700Bold,
    JetBrainsMono: JetBrainsMono_500Medium,
    JetBrainsMonoBold: JetBrainsMono_700Bold,
  });


  const setUser = useAuthStore((s) => s.setUser);
  const setInitializing = useAuthStore((s) => s.setInitializing);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);


  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-cream">
        <ActivityIndicator color="#15130F" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  )
}
