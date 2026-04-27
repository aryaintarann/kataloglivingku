"use server";

import { createServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function submitTestimonial(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const housing_type = formData.get("housing_type") as string;
    const rating = parseInt(formData.get("rating") as string, 10);
    const content = formData.get("content") as string;

    if (!name || !city || !housing_type || !rating || !content) {
      return { success: false, error: "Semua kolom wajib diisi" };
    }

    if (rating < 1 || rating > 5) {
      return { success: false, error: "Rating harus antara 1 dan 5" };
    }

    const db = createServerClient();
    
    const { error } = await db.from("testimonials").insert({
      name,
      city,
      housing_type,
      rating,
      content,
      is_approved: true, // Auto-approve for demo/simplicity based on user request to see rating instantly
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: "Gagal menyimpan testimoni" };
    }

    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("submitTestimonial error:", error);
    return { success: false, error: "Terjadi kesalahan server" };
  }
}
