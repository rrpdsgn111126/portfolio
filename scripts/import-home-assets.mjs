import { mkdir, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
// Exact image references extracted from the user's Readymag publication.
// Keep the originals in git so the portfolio does not depend on Readymag CDN availability.
const base='https://i-p.rmcdn.net/628531367c6cb30024262282/3666146/';
const media=[
  ['beeline-family-01.webp','image-b9028884-9cc3-47fc-933a-a72afb7f7cfd.jpg?e=webp'],
  ['beeline-family-02.webp','image-ed89882c-e01f-4d97-969c-600795d439d2.jpg?e=webp'],
  ['beeline-family-03.webp','image-f75ec665-9b57-4316-b0aa-0441bc61f472.jpg?e=webp'],
  ['beeline-family-04.webp','image-b4f79380-81a4-4324-916a-9aeccfe74cf4.jpg?e=webp&cX=0&cY=0.8545751633987209&cW=611&cH=433.29084967320256'],
  ['alfaforex-01.webp','image-5f28ecde-9bbc-4a17-a3ff-8fbb4f00afd5.jpg?e=webp'],
  ['alfaforex-02.webp','image-b8f52a28-61aa-40b0-bbd8-3224ebdc04b5.jpg?e=webp'],
  ['equilibrium-01.webp','image-a6831169-3a46-4fc8-ad5c-a00ed6038f94.jpg?e=webp'],
  ['stforex-01.webp','image-d1f3ba54-2d12-401f-971b-aa2dab1589ab.jpg?e=webp&cX=0&cY=3&cW=612&cH=432']
];
await mkdir('assets/home',{recursive:true});
for(const [name,path] of media){
 const dest=join('assets/home',name);
 try {if((await stat(dest)).size>1024){console.log('Already present:',dest);continue;}}catch{}
 let ok=false;
 for(let retry=0;retry<5;retry++){
  try{
   const response=await fetch(base+path,{headers:{Accept:'image/webp,image/*;q=0.8'},signal:AbortSignal.timeout(40000)});
   if(!response.ok)throw Error('HTTP '+response.status+' for '+name);
   const contentType=response.headers.get('content-type')||'';
   const content=Buffer.from(await response.arrayBuffer());
   if(!contentType.startsWith('image/')||content.length<1024)throw Error('Invalid image '+name+' ('+contentType+', '+content.length+' B)');
   await writeFile(dest,content);
   console.log('Imported',name,content.length,contentType);
   ok=true;break;
  }catch(error){
   if(retry===4)throw error;
   await new Promise(r=>setTimeout(r,1200*(retry+1)));
  }
 }
 if(!ok)throw Error('Could not import '+name);
}
console.log('All Readymag source images saved locally');
