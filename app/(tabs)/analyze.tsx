// app/(tabs)/analyze.tsx
import { useState } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { Upload, FileText, CheckCircle2, X } from "lucide-react-native";
import { BrutalCard } from "../../components/ui/BrutalCard";
import { BrutalButton } from "../../components/ui/BrutalButton";
import { BrutalInput } from "../../components/ui/BrutalInput";
import { analyzeResume } from "../../lib/analyze";

type PickedFile = { uri: string; name: string; mimeType?: string; size?: number };

export default function Analyze() {
    const router = useRouter();
    const [file, setFile] = useState<PickedFile | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePickFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            copyToCacheDirectory: true,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        setFile({ uri: asset.uri, name: asset.name, mimeType: asset.mimeType, size: asset.size });
    };

    const handleAnalyze = async () => {
        if (!file) {
            Alert.alert("No file selected", "Choose a resume file first.");
            return;
        }

        setLoading(true);
        try {
            const analysisId = await analyzeResume({ file, jobDescription: jobDescription.trim() || undefined });
            router.push(`/results/${analysisId}` as any);
        } catch (err: any) {
            Alert.alert("Analysis failed", err.message ?? "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            className="flex-1 bg-cream"
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
                <View className="px-6 pt-6">
                    <Text className="font-mono text-xs font-bold uppercase tracking-widest text-orange-dark">
                        Step 1 of 2
                    </Text>
                    <Text className="font-display text-3xl mt-2 leading-none text-ink">
                        Upload Your{"\n"}Resume
                    </Text>
                    <Text className="mt-3 text-ink-soft font-sans">
                        PDF or DOCX. We'll scan it in seconds.
                    </Text>
                </View>

                <View className="px-6 mt-6">
                    <BrutalCard className="items-center py-10 gap-4">
                        <View className="w-16 h-16 rounded-brutal-sm border-[3px] border-ink bg-purple items-center justify-center rotate-[-6deg]">
                            <Upload size={26} color="#15130F" />
                        </View>
                        <Text className="font-sans font-bold text-ink text-center">Tap below to browse files</Text>
                        <BrutalButton label="Choose File" size="sm" fullWidth={false} onPress={handlePickFile} />
                    </BrutalCard>
                </View>

                {file && (
                    <View className="px-6 mt-4">
                        <BrutalCard variant="flat" bg="#B7EBD3" className="flex-row items-center gap-4">
                            <View className="w-11 h-11 rounded-brutal-sm border-[3px] border-ink bg-paper items-center justify-center">

                                <FileText size={20} color="#15130F" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-sans font-bold text-sm text-ink" numberOfLines={1}>
                                    {file.name}
                                </Text>
                                <Text className="text-xs text-ink-soft font-sans">
                                    {file.size ? `${(file.size / 1024 / 1024).toFixed(1)} MB · ` : ""}Ready to analyze
                                </Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => setFile(null)} 
                                className="w-8 h-8 rounded-full bg-paper border-2 border-ink items-center justify-center"
                                activeOpacity={0.7}
                            >
                                <X size={14} color="#15130F" />
                            </TouchableOpacity>
                        </BrutalCard>
                    </View>
                )}

                <View className="px-6 mt-6">
                    <Text className="font-display text-lg text-ink">
                        Target Job <Text className="font-sans text-xs text-ink-soft font-normal">(optional)</Text>
                    </Text>
                    <View className="mt-3">
                        <BrutalInput
                            placeholder="Paste a job description to tailor the score..."
                            value={jobDescription}
                            onChangeText={setJobDescription}
                            multiline
                            numberOfLines={4}
                            style={{ height: 100, textAlignVertical: "top" }}
                        />
                    </View>
                </View>

                <View className="px-6 mt-8">
                    <BrutalButton
                        label={loading ? "Analyzing..." : "Analyze Resume"}
                        variant="secondary"
                        onPress={handleAnalyze}
                        loading={loading}
                        disabled={!file}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}