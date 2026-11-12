import {json,requireAuth} from "../_auth.js";
export async function onRequestPut(ctx){
 const denied=await requireAuth(ctx);if(denied)return denied;
 let b;try{b=await ctx.request.json()}catch{return json({error:"Invalid JSON."},400)}
 if(!valid(b))return json({error:"Please provide a title, category, valid HTTPS image URL and prompt."},400);
 try{let r=await ctx.env.DB.prepare("UPDATE prompts SET title=?,category=?,image_url=?,description=?,prompt=? WHERE id=?").bind(b.title.trim(),b.category.trim(),b.image_url.trim(),(b.description||"").trim(),b.prompt.trim(),ctx.params.id).run();return r.meta.changes?json({ok:true}):json({error:"Prompt not found."},404)}catch{return json({error:"Could not update prompt."},500)}
}
export async function onRequestDelete(ctx){
 const denied=await requireAuth(ctx);if(denied)return denied;
 try{let r=await ctx.env.DB.prepare("DELETE FROM prompts WHERE id=?").bind(ctx.params.id).run();return r.meta.changes?json({ok:true}):json({error:"Prompt not found."},404)}catch{return json({error:"Could not delete prompt."},500)}
}
function valid(b){try{return b&&typeof b.title==="string"&&b.title.trim()&&typeof b.category==="string"&&b.category.trim()&&typeof b.image_url==="string"&&new URL(b.image_url).protocol==="https:"&&typeof b.prompt==="string"&&b.prompt.trim()}catch{return false}}
