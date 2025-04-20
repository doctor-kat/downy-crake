import { DecorationKind } from "@/app/api/mhdb/dataTypes/DecorationKind";
import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { baseUrl } from "@/app/api/mhdb/endpoint";

export async function getDecoration({ id }: { id?: string }) {
  const response = await fetch(`${baseUrl}/decoration/${id}`, {
    cache: "force-cache",
  });
  const decoration: Decoration = await response.json();
  return decoration;
}

export async function getAllDecorations({ kind }: { kind?: DecorationKind }) {
  const response = await fetch(
    `${baseUrl}/decorations` + (kind ? `?q={"kind": "${kind}"}` : ""),
    {
      cache: "force-cache",
    }
  );
  const decorations: Decoration[] = await response.json();
  return decorations;
}
