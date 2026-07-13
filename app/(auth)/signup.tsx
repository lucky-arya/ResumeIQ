import { BrutalButton } from "@/components/ui/BrutalButton";
import { BrutalInput } from "@/components/ui/BrutalInput";
import { signUp } from "@/lib/auth";
import { Link, useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, View, KeyboardAvoidingView, Platform } from "react-native";

export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async () => {
        if (!name || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await signUp(name, email, password);
            router.replace("/");
        } catch (e: any) {
            setError(mapFirebaseError(e.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            className="flex-1 bg-cream"
        >
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
                <View className="px-6 pt-16 pb-8 flex-1">
                    <Text className="font-mono text-xs font-bold uppercase tracking-widest text-orange-dark ">
                        Get Started
                    </Text>
                    <Text className='font-display text-4xl mt-2 leading-none text-ink'>
                        Create Your{"\n"}Account
                    </Text>
                    <Text className="
                        mt-4
                        text-lg
                        text-ink
                        font-sans
                    ">
                        One profile, unlimited resume scans and smart tips.
                    </Text>


                    <View className="gap-5 mt-8">
                        <BrutalInput
                            label="Name"
                            placeholder="Shivam Kumar"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                            className="bg-paper"
                        />
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
                            placeholder="Min. 8 characters"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        {error ? (
                            <Text className="text-red text-sm font-sans font-medium mt-3 mb-4 mx-4">
                                {error}
                            </Text>
                        ) : null}
                    </View>

                    <View className="mt-8">
                        <BrutalButton
                            label="Create Account"
                            disabled={loading}
                            onPress={handleSignup}
                            loading={loading}
                            icon={<ArrowRight size={20} color="#15130F" />}
                        />
                    </View>

                    <Text className="text-center mt-8 font-sans text-sm text-ink-soft">
                        Already have an account?{" "}
                        <Link
                            href={'/login' as any}
                            className=" text-ink font-bold underline"
                        >
                            Log In
                        </Link>
                    </Text>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


const mapFirebaseError = (code: string): string => {
    switch (code) {
        case 'auth/weak-password':
            return "Password is too weak. Use at least 8 characters.";
        case 'auth/email-already-in-use':
            return "Email is already registered. Try logging in instead.";
        case 'auth/invalid-email':
            return "Please enter a valid email address.";
        default:
            return "An error occurred. Please try again.";
    }
}