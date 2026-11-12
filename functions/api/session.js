import {json,isAuthed} from "./_auth.js";
export async function onRequestGet({request,env}){return await isAuthed(request,env.SESSION_SECRET)?json({ok:true}):json({error:"Not signed in."},401)}
