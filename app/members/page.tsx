import MemberCard from "@/components/MemberCard";
import { createClient } from "@/lib/supabase";
import { demoMembers, Member } from "@/lib/data";
export const dynamic="force-dynamic";
export default async function Members(){
 const supabase=createClient(); let members:Member[]=demoMembers;
 if(supabase){const {data}=await supabase.from("members").select("*").eq("is_active",true).order("name"); if(data) members=data as Member[];}
 return <main className="section"><div className="container"><div className="section-head"><div className="eyebrow" style={{color:"#f36b21"}}>Unique Youth Association</div><h2>Our Members</h2><p>Meet the people who make our community strong.</p></div><div className="members">{members.map(m=><MemberCard key={m.id} member={m}/>)}</div></div></main>
}