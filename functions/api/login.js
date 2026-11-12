import {json,makeCookie} from "./_auth.js";
export async function onRequestPost({request,env}){
 if(!env.ADMIN_PASSWORD||!env.SESSION_SECRET)return json({error:"Admin secrets are not configured."},500);
 let body;try{body=await request.json()}catch{return json({error:"Invalid request."},400)}
 if(typeof body.password!=="string"||body.password!==env.ADMIN_PASSWORD)return json({error:"Incorrect password."},401);
 return json({ok:true},200,{"Set-Cookie":await makeCookie(env.SESSION_SECRET)});
}
