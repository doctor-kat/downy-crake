import { Item } from "@/app/api/mhdb/items/Item";

export interface CraftingCost {
  quantity: number;
  item: Item;
}
