export type LeadStatus = "New" | "Contacted" | "Qualified" | "Unqualified" | "Converted";
export type Lead = { id: number; name: string; company: string; email: string; phone: string; source: string; status: LeadStatus; owner: string; value: number };
export type Deal = { id: number; name: string; company: string; value: number; stage: string; owner: string; closeDate: string };
export type Customer = { id: number; name: string; company: string; email: string; phone: string; industry: string; status: string; owner: string };
export type Task = { id: number; title: string; due: string; priority: string; status: string; owner: string };
export type Activity = { id: number; kind: string; title: string; person: string; date: string; detail: string };
