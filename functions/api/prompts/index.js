import {json,requireAuth} from "../_auth.js";
export async function onRequestGet({env}){try{let {results=[]}=await env.DB.prepare("SELECT id,title,category,image_url,description,prompt,created_at FROM prompts ORDER BY created_at DESC").all();return json(results)}catch(e){return json({error:"Database is not ready. Follow setup instructions."},500)}}
export async function onRequestPost(ctx){
 const denied=await requireAuth(ctx);if(denied)return denied;
 let b;try{b=await ctx.request.json()}catch{return json({error:"Invalid JSON."},400)}
 if(!valid(b))return json({error:"Please provide a title, category, valid image URL and prompt."},400);
 try{let r=await ctx.env.DB.prepare("INSERT INTO prompts(title,category,image_url,description,prompt) VALUES(?,?,?,?,?)").bind(b.title.trim(),b.category.trim(),b.image_url.trim(),(b.description||"").trim(),b.prompt.trim()).run();return json({ok:true,id:r.meta.last_row_id},201)}catch{return json({error:"Could not save prompt."},500)}
}
function valid(b){try{return b&&typeof b.title==="string"&&b.title.trim()&&typeof b.category==="string"&&b.category.trim()&&typeof b.image_url==="string"&&new URL(b.image_url).protocol==="https:"&&typeof b.prompt==="string"&&b.prompt.trim()}catch{return false}}
