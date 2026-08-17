import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({ok:true,service:"Unique Youth Association",time:new Date().toISOString()});}