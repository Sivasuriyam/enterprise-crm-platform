import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Lead, Deal, Customer, Task, Activity } from "./types";

const load = <T,>(key: string, fallback: T): T => {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; }
};
const seedLeads: Lead[] = [
 {id:1,name:"Olivia Rhye",company:"Orbit Labs",email:"olivia@orbitlabs.com",phone:"+1 415 555 0134",source:"Website",status:"Qualified",owner:"Alex Morgan",value:24000},
 {id:2,name:"Phoenix Baker",company:"Acme Inc.",email:"phoenix@acme.com",phone:"+1 415 555 0188",source:"Referral",status:"New",owner:"Jamie Lee",value:12500},
 {id:3,name:"Lana Steiner",company:"Vertex Studio",email:"lana@vertex.io",phone:"+1 415 555 0121",source:"LinkedIn",status:"Contacted",owner:"Alex Morgan",value:18000},
 {id:4,name:"Demi Wilkinson",company:"Brightside",email:"demi@brightside.co",phone:"+1 415 555 0192",source:"Campaign",status:"Converted",owner:"Taylor Kim",value:32000},
 {id:5,name:"Candice Wu",company:"CloudNine",email:"candice@cloudnine.com",phone:"+1 415 555 0172",source:"Website",status:"Unqualified",owner:"Jamie Lee",value:7000}
];
const seedDeals: Deal[] = [
 {id:1,name:"Enterprise license",company:"Orbit Labs",value:42000,stage:"Qualification",owner:"Alex Morgan",closeDate:"2026-11-18"},
 {id:2,name:"Platform expansion",company:"Acme Inc.",value:28500,stage:"Proposal",owner:"Jamie Lee",closeDate:"2026-11-24"},
 {id:3,name:"Annual subscription",company:"Vertex Studio",value:16000,stage:"Negotiation",owner:"Taylor Kim",closeDate:"2026-11-12"},
 {id:4,name:"CRM rollout",company:"Brightside",value:54000,stage:"Won",owner:"Alex Morgan",closeDate:"2026-10-28"},
 {id:5,name:"Support package",company:"CloudNine",value:9500,stage:"Prospecting",owner:"Jamie Lee",closeDate:"2026-12-02"}
];
const seedCustomers: Customer[] = [
 {id:1,name:"Olivia Rhye",company:"Orbit Labs",email:"olivia@orbitlabs.com",phone:"+1 415 555 0134",industry:"Technology",status:"Active",owner:"Alex Morgan"},
 {id:2,name:"Phoenix Baker",company:"Acme Inc.",email:"phoenix@acme.com",phone:"+1 415 555 0188",industry:"Finance",status:"Active",owner:"Jamie Lee"},
 {id:3,name:"Lana Steiner",company:"Vertex Studio",email:"lana@vertex.io",phone:"+1 415 555 0121",industry:"Design",status:"Prospect",owner:"Taylor Kim"},
 {id:4,name:"Demi Wilkinson",company:"Brightside",email:"demi@brightside.co",phone:"+1 415 555 0192",industry:"Retail",status:"Active",owner:"Alex Morgan"}
];
const seedTasks: Task[] = [
 {id:1,title:"Send revised proposal to Orbit Labs",due:"2026-11-04",priority:"High",status:"In Progress",owner:"Alex Morgan"},
 {id:2,title:"Schedule discovery call with Acme",due:"2026-11-05",priority:"Medium",status:"Pending",owner:"Jamie Lee"},
 {id:3,title:"Prepare Q4 account review",due:"2026-11-07",priority:"Low",status:"Pending",owner:"Taylor Kim"},
 {id:4,title:"Follow up on contract signature",due:"2026-11-02",priority:"Urgent",status:"Completed",owner:"Alex Morgan"}
];
const seedActivities: Activity[] = [
 {id:1,kind:"Call",title:"Discovery call completed",person:"Olivia Rhye · Orbit Labs",date:"Today, 10:30 AM",detail:"Discussed enterprise rollout and timeline."},
 {id:2,kind:"Email",title:"Proposal email sent",person:"Phoenix Baker · Acme Inc.",date:"Today, 9:15 AM",detail:"Shared updated pricing and implementation plan."},
 {id:3,kind:"Meeting",title:"Quarterly account review",person:"Demi Wilkinson · Brightside",date:"Yesterday, 2:00 PM",detail:"Reviewed adoption metrics and expansion opportunities."}
];
type State = { leads: Lead[]; deals: Deal[]; customers: Customer[]; tasks: Task[]; activities: Activity[] };
const initialState: State = {
 leads:load("crm_leads",seedLeads), deals:load("crm_deals",seedDeals), customers:load("crm_customers",seedCustomers),
 tasks:load("crm_tasks",seedTasks), activities:load("crm_activities",seedActivities)
};
const crmSlice = createSlice({
 name:"crm", initialState,
 reducers:{
  addLead:(s,a:PayloadAction<Lead>)=>{s.leads.unshift(a.payload);},
  updateLead:(s,a:PayloadAction<Lead>)=>{s.leads=s.leads.map(x=>x.id===a.payload.id?a.payload:x);},
  deleteLead:(s,a:PayloadAction<number>)=>{s.leads=s.leads.filter(x=>x.id!==a.payload);},
  updateDealStage:(s,a:PayloadAction<{id:number;stage:string}>)=>{const d=s.deals.find(x=>x.id===a.payload.id);if(d)d.stage=a.payload.stage;},
  addTask:(s,a:PayloadAction<Task>)=>{s.tasks.unshift(a.payload);},
  toggleTask:(s,a:PayloadAction<number>)=>{const t=s.tasks.find(x=>x.id===a.payload);if(t)t.status=t.status==="Completed"?"Pending":"Completed";},
  addActivity:(s,a:PayloadAction<Activity>)=>{s.activities.unshift(a.payload);}
 }
});
export const {addLead,updateLead,deleteLead,updateDealStage,addTask,toggleTask,addActivity}=crmSlice.actions;
export const store=configureStore({reducer:{crm:crmSlice.reducer}});
store.subscribe(()=>{const s=store.getState().crm;try{localStorage.setItem("crm_leads",JSON.stringify(s.leads));localStorage.setItem("crm_deals",JSON.stringify(s.deals));localStorage.setItem("crm_customers",JSON.stringify(s.customers));localStorage.setItem("crm_tasks",JSON.stringify(s.tasks));localStorage.setItem("crm_activities",JSON.stringify(s.activities));}catch{/* storage may be unavailable */}});
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
