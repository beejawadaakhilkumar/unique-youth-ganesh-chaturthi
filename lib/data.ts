// --- MEMBERS DATA ---
export type Member = { id:string; name:string; role?:string; photo_url?:string };

export const demoMembers:Member[] = [
 {id:"1",name:"Add your first member",role:"Community Member"},
 {id:"2",name:"Your colony members",role:"Unique Youth Association"},
 {id:"3",name:"Ganesh Chaturthi Team",role:"Event Volunteer"},
 {id:"4",name:"Youth Association",role:"Community"}
];

// --- GALLERY DATA ---
// 1. We added 'href' here so TypeScript knows cards can be clicked
export type GalleryItem = { id:string; title:string; image_url?:string; href?:string };

// 2. We added the actual links to the pages here
export const demoGallery:GalleryItem[] = [
 {id:"1", title:"Ganesh Chaturthi Celebration", href:"/gallery/ganesh-chaturthi"},
 {id:"2", title:"Community Gathering", href:"/gallery/community-gathering"},
 {id:"3", title:"Festival Memories", href:"/gallery/festival-memories"}
];

// --- SCHEDULE DATA ---
export type ScheduleItem = {
  id: string;
  title: string;
  time: string;
  icon: string;
};

export const defaultSchedule: ScheduleItem[] = [
  { id: "1", icon: "🕉️", title: "Ganesh Sthapana & Pooja", time: "Daily at 9:00 AM & 7:00 PM" },
  { id: "2", icon: "🍛", title: "Maha Annadanam", time: "Day 5 • 12:30 PM Onwards" },
  { id: "3", icon: "🥮", title: "Laddu Auction", time: "Day 9 • 6:00 PM" },
  { id: "4", icon: "🌊", title: "Nimajjanam (Visarjan)", time: "Day 11 • Procession starts at 4:00 PM" }
];

// --- VIDEO DATA ---
export type VideoItem = {
  id: string;
  title: string;
  video_url: string; // The link to the video (YouTube or direct MP4/MOV)
};

export const defaultGaneshVideos: VideoItem[] = [
  { 
    id: "v1", 
    title: "Ganesh Chaturthi 2024 Highlights", 
    video_url: "/public/Videos/Gang.mp4" // Make sure Gang.mp4 is inside your public/Videos/ folder!
  }
];