// Centralised URL config for the dashboard app

const clean = (url, fallback) =>
  ((url && url.trim()) || fallback).replace(/\/$/, "");

export const BACKEND_URL  = clean(process.env.REACT_APP_BACKEND_URL,  "http://localhost:3002");
export const FRONTEND_URL = clean(process.env.REACT_APP_FRONTEND_URL, "http://localhost:3000");