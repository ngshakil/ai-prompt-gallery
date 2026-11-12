const COOKIE = "promptly_session";
const enc = new TextEncoder();
function b64(bytes){return btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}
function unb64(s){s=s.replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";return Uint8Array.from(atob(s),c=>c.charCodeAt(0))}
async function key(secret){return crypto.subtle.importKey("raw",enc.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign","verify"])}
export async function makeCookie(secret){
 const payload=b64(enc.encode(JSON.stringify({exp:Date.now()+7*24*60*60*1000})));
 const sig=b64(await crypto.subtle.sign("HMAC",await key(secret),enc.encode(payload)));
 return `${COOKIE}=${payload}.${sig}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`;
}
export async function isAuthed(request,secret){
 if(!secret)return false;
 const raw=request.headers.get("Cookie")||"";const found=raw.split(";").map(x=>x.trim()).find(x=>x.startsWith(COOKIE+"="));
 if(!found)return false;const token=found.slice(COOKIE.length+1).split(".");if(token.length!==2)return false;
 try{const valid=await crypto.subtle.verify("HMAC",await key(secret),unb64(token[1]),enc.encode(token[0]));if(!valid)return false;return JSON.parse(new TextDecoder().decode(unb64(token[0]))).exp>Date.now()}catch{return false}
}
export const clearCookie=`${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
export const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store",...headers}});
export async function requireAuth(context){if(!await isAuthed(context.request,context.env.SESSION_SECRET))return json({error:"Please sign in again."},401);return null}
