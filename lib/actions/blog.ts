"use server";

import { BlogFormSchemaType } from "@/app/dashboard/schema";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../supabase";

// const cookieStore = cookies();
const DASHBOARD = "/dashboard/blog";

// const supabase = createServerClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   {
//     cookies: {
//       get(name: string) {
//         return cookieStore.get(name)?.value;
//       },
//       set(name: string, value: string, options: CookieOptions) {
//         try {
//           cookieStore.set({ name, value, ...options });
//         } catch (error) {
//           // The `set` method was called from a Server Component.
//           // This can be ignored if you have middleware refreshing
//           // user sessions.
//         }
//       },
//       remove(name: string, options: CookieOptions) {
//         try {
//           cookieStore.set({ name, value: "", ...options });
//         } catch (error) {
//           // The `delete` method was called from a Server Component.
//           // This can be ignored if you have middleware refreshing
//           // user sessions.
//         }
//       },
//     },
//   }
// );

export const createBlog = async (data: BlogFormSchemaType) => {
  const { ["content"]: excludedKey, ...blog } = data;
  const supabase = await createSupabaseServerClient();
  const resultBlog = await supabase
    .from("blog")
    .insert(blog)
    .select("id")
    .single();

  if (resultBlog.error) {
    return JSON.stringify(resultBlog);
  } else {
    const result = await supabase
      .from("blog_content")
      .insert({ blog_id: resultBlog?.data?.id!, content: data.content });

    revalidatePath(DASHBOARD);
    return JSON.stringify(result);
  }
};

export const readBlog = async () => {
  const supabase = await createSupabaseServerClient();
  return supabase
    .from("blog")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
};

export const readBlogAdmin = async () => {
  const supabase = await createSupabaseServerClient();
  return supabase
    .from("blog")
    .select("*")
    .order("created_at", { ascending: false });
};

export const readBlogDetailById = async (blogId: string) => {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("blog")
    .select("*,blog_content(*)")
    .eq("id", blogId)
    .single();
};

export const deleteBlogById = async (blogId: string) => {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("blog").delete().eq("id", blogId);
  revalidatePath(DASHBOARD);
  return JSON.stringify(result);
};

export const updateBlogById = async (
  blogId: string,
  data: BlogFormSchemaType
) => {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("blog").update(data).eq("id", blogId);
  revalidatePath(DASHBOARD);
  return JSON.stringify(result);
};

export const updateBlogDetail = async (
  blogId: string,
  data: BlogFormSchemaType
) => {
  const { ["content"]: excludedKey, ...blog } = data;
  const supabase = await createSupabaseServerClient();
  const resultBlog = await supabase.from("blog").update(blog).eq("id", blogId);
  if (resultBlog.error) {
    return JSON.stringify(resultBlog);
  } else {
    const result = await supabase
      .from("blog_content")
      .update({ content: data.content })
      .eq("blog_id", blogId);
    revalidatePath(DASHBOARD);
    return JSON.stringify(result);
  }
};
