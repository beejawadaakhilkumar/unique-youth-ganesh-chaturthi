import { Member } from "@/lib/data";
export default function MemberCard({member}:{member:Member}) {
 return <article className="card"><div className="member-img">{member.photo_url ? <img src={member.photo_url} alt={member.name}/> : "🪔"}</div><div className="member-info"><h3>{member.name}</h3><p>{member.role || "Community Member"}</p></div></article>
}