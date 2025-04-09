import { Ailment } from "@/app/api/mhdb/ailments/Ailment";
import { baseUrl } from "@/app/api/mhdb/endpoint";

export async function getAilment({ id }: { id?: string }) {
  const response = await fetch(`${baseUrl}/ailment/${id}`, {
    cache: "force-cache",
  });
  const ailment: Ailment = await response.json();
  return ailment;
}

export async function getAllAilments() {
  const response = await fetch(`${baseUrl}/ailments`, {
    cache: "force-cache",
  });
  const ailments: Ailment[] = await response.json();
  return ailments;
}
