const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export async function createLink(url: string) {
  const res = await fetch(`${API_BASE}/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json?.error || "Failed to create shortened URL")
  return json
}