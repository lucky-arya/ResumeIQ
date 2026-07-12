// lib/cloudinary.ts
const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  original_filename: string;
  bytes: number;
  format: string;
}

/**
 * Uploads a resume file (from expo-document-picker) to Cloudinary.
 * `file` is the asset object returned by DocumentPicker.getDocumentAsync().
 */
export async function uploadResumeToCloudinary(file: {
  uri: string;
  name: string;
  mimeType?: string;
}): Promise<CloudinaryUploadResult> {
  const formData = new FormData();

  // React Native's fetch FormData wants this exact shape for file fields
  formData.append("file", {
    uri: file.uri,
    name: file.name,
    type: file.mimeType ?? "application/octet-stream",
  } as any);

  formData.append("upload_preset", UPLOAD_PRESET!);
  formData.append("folder", "resumeiq/resumes");

  const response = await fetch(UPLOAD_URL, {
    method: "POST",
    body: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudinary upload failed: ${errorText}`);
  }

  return response.json();
}