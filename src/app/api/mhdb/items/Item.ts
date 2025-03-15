export interface Item {
  id: number;
  gameId: string;
  name: string;
  description: string;
  rarity: number;
  carryLimit: number;
  value: number;
  recipes: ItemRecipe[];
}

export interface ItemRecipe {
  id: number;
  amount: number;
  inputs: Item[];
}
