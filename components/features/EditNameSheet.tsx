// components/features/EditNameSheet.tsx
import { useState } from "react";
import { View, Text, Modal } from "react-native";
import { BrutalCard } from "../ui/BrutalCard";
import { BrutalInput } from "../ui/BrutalInput";
import { BrutalButton } from "../ui/BrutalButton";
import { updateUserName } from "../../lib/auth";
import { useQueryClient } from "@tanstack/react-query";

interface EditNameSheetProps {
    visible: boolean;
    currentName: string;
    onClose: () => void;
}

export function EditNameSheet({ visible, currentName, onClose }: EditNameSheetProps) {
    const [name, setName] = useState(currentName);
    const [saving, setSaving] = useState(false);
    const queryClient = useQueryClient();

    const handleSave = async () => {
        if (!name.trim()) return;
        setSaving(true);
        try {
            await updateUserName(name.trim());
            // Tells React Query "userProfile" is stale — refetches so the new name shows immediately
            await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            onClose();
        } catch (err) {
            console.error("Failed to update name:", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 bg-ink/60 justify-center px-6">
                <BrutalCard className="w-full">
                    <Text className="font-display text-xl text-ink mb-4">Edit Name</Text>
                    <BrutalInput label="Full Name" value={name} onChangeText={setName} placeholder="Your name" />
                    <View className="flex-row gap-3 mt-5">
                        <View className="flex-1">
                            <BrutalButton label="Cancel" variant="outline" size="default" onPress={onClose} disabled={saving} />
                        </View>
                        <View className="flex-1">
                            <BrutalButton label="Save" size="default" onPress={handleSave} loading={saving} />
                        </View>
                    </View>
                </BrutalCard>
            </View>
        </Modal>
    );
}