import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
    
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== 'itggadmin@kmitl.ac.th') {
        redirect("/")
    }
  return (
    <div className="flex flex-col justify-center items-center">
        {children}
    </div>
  );
}
