import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";

const store = getStore("yhnexora-site");

const DEFAULT = {
  heroDesc:"We Design • We Create • We Promote. Your Vision, Our Technology. We build modern websites, creative designs and digital promotions that help brands grow online.",
  aboutText:"At YH NEXORA TECHNOLOGIES, we turn ideas into powerful digital experiences. We create websites, design stunning graphics and run smart promotions to help your brand grow online.",
  established:"21/08/2026",
  founder:"Yeswanth",
  co:"Amar nadh",
  founderImg:"assets/founder.jpg",
  coImg:"assets/cofounder.jpg",
  services:[
    {name:"Website Development",icon:"</>",desc:"Modern, responsive and high-performance websites for businesses.",details:"Professional business websites, landing pages and portfolio websites with responsive UI, modern animations, SEO-ready structure and fast-loading layouts.",showContact:false,images:["portfolio/website-project.svg"]},
    {name:"Graphic Design",icon:"✦",desc:"Creative visual designs for brands, creators and businesses.",details:"YouTube thumbnails, Instagram posts, brochures, roll-up stands, visiting cards, posters and promotional creatives designed for digital and print.",showContact:false,images:["portfolio/youtube-thumbnail.svg","portfolio/instagram-post.svg","portfolio/brochure.svg","portfolio/rollup.svg","portfolio/visiting-card.svg"]},
    {name:"Digital Promotions",icon:"📣",desc:"Social media promotion, branding and digital growth support.",details:"Social media campaign planning, promotional creatives, branding support and growth-focused digital promotions.",showContact:true,images:["portfolio/digital-promotion.svg"]}
  ],
  projects:[
    {name:"Love Proposal Website 💗",desc:"Interactive romantic website concept with animated visuals, music-ready sections and responsive design.",tags:"HTML • CSS • JavaScript",img:"portfolio/love-proposal.svg"},
    {name:"Business Website Concept",desc:"Modern premium business website concept for a digital brand.",tags:"Responsive • UI/UX • SEO",img:"portfolio/website-project.svg"}
  ],
  websitePrice:"₹10,000",
  thumbPrice:"₹150",
  wa:"9381262063",
  mail:"yeswanthram29@gmail.com",
  insta:"",
  instaLabel:"YH NEXORA TECHNOLOGIES"
};

function secret(){return process.env.ADMIN_SECRET || "CHANGE_THIS_ADMIN_SECRET_BEFORE_LAUNCH";}
function adminEmail(){return process.env.ADMIN_EMAIL || "yhnexora@ai.com";}
function adminPassword(){return process.env.ADMIN_PASSWORD || "yhnexora5436@";}
function tokenFor(email){
  return crypto.createHmac("sha256",secret()).update(email+"|yhnexora-admin").digest("hex");
}
function validToken(t){return !!t && crypto.timingSafeEqual(Buffer.from(t),Buffer.from(tokenFor(adminEmail())));}
async function readData(){
  const data=await store.get("site", {type:"json"});
  return data ? data : DEFAULT;
}
function json(status,body){return {statusCode:status,headers:{"Content-Type":"application/json","Cache-Control":"no-store"},body:JSON.stringify(body)}}

export default async (req)=>{
  try{
    if(req.httpMethod==="GET") return json(200,await readData());
    if(req.httpMethod!=="POST") return json(405,{error:"Method not allowed"});
    const body=JSON.parse(req.body||"{}");
    if(body.action==="login"){
      if(body.email===adminEmail() && body.password===adminPassword())
        return json(200,{token:tokenFor(adminEmail())});
      return json(401,{error:"Invalid admin email or password"});
    }
    if(body.action==="save"){
      if(!validToken(body.token)) return json(401,{error:"Admin session expired. Login again."});
      if(!body.data || typeof body.data!=="object") return json(400,{error:"Invalid website data"});
      await store.setJSON("site",body.data);
      return json(200,{ok:true});
    }
    return json(400,{error:"Unknown action"});
  }catch(e){
    console.error(e);
    return json(500,{error:"Server error"});
  }
};
