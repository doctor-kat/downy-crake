import { Charm } from "@/app/api/mhdb/charms/Charm";
import { baseUrl } from "@/app/api/mhdb/endpoint";

export async function getCharm({ id }: { id?: string }) {
  const response = await fetch(`${baseUrl}/charm/${id}`, {
    cache: "force-cache",
  });
  const charm: Charm = await response.json();
  return charm;
}

export async function getAllCharms() {
  const response = await fetch(`${baseUrl}/charms`, {
    cache: "force-cache",
  });
  const charms: Charm[] = await response.json();
  return charms;
}
