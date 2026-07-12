import { BrutalButton } from "@/components/ui/BrutalButton";
import { BrutalInput } from "@/components/ui/BrutalInput";
import { logIn } from "@/lib/auth";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email.trim() || !password) {
            setError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await logIn(email.trim(), password);
            router.replace("/home" as any);
        } catch (e: any) {
            setError(mapFirebaseError(e.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView className="flex-1 bg-cream" contentContainerStyle={{ flexGrow: 1 }}>
            <View className="px-6 pt-16 pb-8 flex-1">
                <Text className="font-mono text-xs font-bold uppercase tracking-widest text-orange-dark">
                    Welcome Back
                </Text>
                <Text className='font-display text-4xl mt-2 leading-none text-ink'>
                    Log In To{"\n"}Your Account
                </Text>

                <View className="gap-5 mt-8">
                    <BrutalInput
                        label="Email"
                        placeholder="you@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <BrutalInput
                        label="Password"
                        placeholder="Enter your password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    {error ? (
                        <Text className="text-red text-sm font-sans font-medium mt-3 mb-4 mx-4">
                            {error}
                        </Text>
                    ) : null}

                    <BrutalButton
                        label="Log In"
                        onPress={handleLogin}
                        loading={loading}
                    />
                </View>

                <Text className="text-center mt-8 font-sans text-sm text-ink-soft">
                    {"Don't have an account? "}
                    <Link
                        href="/signup"
                        className="text-ink font-bold underline"
                    >
                        Sign Up
                    </Link>
                </Text>
            </View>
        </ScrollView>
    );
}

const mapFirebaseError = (code: string): string => {
    switch (code) {
        case 'auth/invalid-email':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            return "Invalid email or password.";
        case 'auth/user-disabled':
            return "This user account has been disabled.";
        default:
            return "An error occurred. Please try again.";
    }
};
