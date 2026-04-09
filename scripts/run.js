const {createClient}=require("@sanity/client");
const fs=require("fs");
const p=require("path");
const T="skmOKTulbh4hYAujc0PjCRldXUvN0GNXEj6z5K7HkJFh1RR4pGZLPdr49FSVnQvgFp18u3sCZocb2WjkqSKKYfNwoSvSv4FUwrgXK9nimELuBMUUWY2zf9O9rY6lNFdUwJ0oCOu3RWV5Z3CQXTncKo3ZhPTtulR56tfYPQW6Yie0UyXLKZX7";
const c=createClient({projectId:"3jv6o4t6",dataset:"production",apiVersion:"2026-04-01",token:T,useCdn:false});
const a=process.argv.slice(2);
function getArg(name){var idx=a.indexOf("--"+name);if(idx===-1)return"";var parts=[];for(var i=idx+1;i<a.length;i++){if(a[i].startsWith("--"))break;parts.push(a[i])}return parts.join(" ")}
const sd=getArg("dir"),cid=getArg("catalog");
if(sd===""||cid===""){console.error("Usage: node run.js --dir <path> --catalog <id>");process.exit(1);}
const EX=[".jpg",".jpeg",".png",".webp"];
const mp=p.resolve(__dirname,"image-map.json");
function lm(){try{return JSON.parse(fs.readFileSync(mp,"utf-8"))}catch(e){return{}}}
function sm(m){fs.writeFileSync(mp,JSON.stringify(m,null,2))}
async function go(){
const dir=p.resolve(sd);
if(fs.existsSync(dir)===false){console.error("Not found: "+dir);process.exit(1)}
const ff=fs.readdirSync(dir).filter(function(x){return EX.includes(p.extname(x).toLowerCase())&&x[0]!=="."}).map(function(x){return{name:x,path:p.join(dir,x)}});
if(ff.length===0){console.error("No images");process.exit(1)}
const m=lm(),todo=ff.filter(function(x){return m[x.name]===undefined});
console.log("\nUpload: "+cid+" | Total: "+ff.length+" | New: "+todo.length+"\n");
for(var i=0;i<todo.length;i+=3){
var b=todo.slice(i,i+3);
var r=await Promise.allSettled(b.map(function(x){
var s=fs.createReadStream(x.path);
var ext=p.extname(x.name).slice(1).toLowerCase().replace("jpg","jpeg");
return c.assets.upload("image",s,{filename:x.name,contentType:"image/"+ext}).then(function(a){m[x.name]=a._id;return x.name});
}));
r.forEach(function(x,j){var idx=i+j+1;if(x.status==="fulfilled")console.log("  ["+idx+"/"+todo.length+"] OK "+x.value);else console.log("  ["+idx+"/"+todo.length+"] FAIL "+b[j].name)});
sm(m)}
var cm={};ff.forEach(function(x){if(m[x.name])cm[x.name]=m[x.name]});
fs.writeFileSync(p.resolve(__dirname,"image-map-"+cid+".json"),JSON.stringify(cm,null,2));
console.log("\nDone: "+Object.keys(m).length+" total\n")}
go().catch(function(e){console.error(e.message);process.exit(1)});
