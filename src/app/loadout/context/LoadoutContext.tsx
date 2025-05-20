"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import { CharmRank } from "@/app/api/mhdb/charms/Charm";
import { Decoration } from "@/app/api/mhdb/decorations/Decoration";
import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import {
  Loadout,
  LoadoutSlot,
  LoadoutSlotKind,
} from "@/app/loadout/types/Loadout";
import { useLocalStorage, useMap } from "@mantine/hooks";
import React, { createContext, ReactNode, useContext, useEffect } from "react";

type LoadoutContextType = {
  loadout: Loadout;
  setLoadout: ({
    slot,
    data,
    decorations,
  }: {
    slot: LoadoutSlotKind;
    data?: Weapon | Armor | CharmRank;
    decorations?: Record<number, Decoration>;
  }) => void;
  setDecoration: ({
    slot,
    data,
    index,
  }: {
    slot: LoadoutSlotKind;
    data: Decoration;
    index: number;
  }) => void;
};

const initialLoadoutEntries = Object.entries({
  weapon: { data: undefined, decorations: {} },
  head: { data: undefined, decorations: {} },
  chest: { data: undefined, decorations: {} },
  arms: { data: undefined, decorations: {} },
  waist: { data: undefined, decorations: {} },
  legs: { data: undefined, decorations: {} },
  charm: { data: undefined },
}) as [LoadoutSlotKind, LoadoutSlot][];

export const LoadoutContext = createContext<LoadoutContextType>({
  loadout: new Map<LoadoutSlotKind, LoadoutSlot>(initialLoadoutEntries),
  setLoadout: () => {},
  setDecoration: () => {},
});

export const LoadoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [storage, setStorage] = useLocalStorage({ key: "loadout" });
  useEffect(() => {
    try {
      if (!storage) return;
      const savedLoadout: [LoadoutSlotKind, LoadoutSlot][] = JSON.parse(
        storage
      );
      savedLoadout.forEach(([loadoutSlotKind, loadoutSlot]) => {
        loadout.set(loadoutSlotKind, loadoutSlot);
      });
    } catch (e) {
      console.error("Could not load saved loadout", e);
      setStorage("[]");
    }
  }, [storage]);

  const loadout = useMap<LoadoutSlotKind, LoadoutSlot>(initialLoadoutEntries);

  const saveToStorage = () => {
    setStorage(JSON.stringify(loadout.entries().toArray()));
  };
  const setLoadout = ({
    slot,
    data,
    decorations,
  }: {
    slot: LoadoutSlotKind;
    data?: Weapon | Armor | CharmRank;
    decorations?: Record<number, Decoration>;
  }) => {
    loadout.set(slot, { data, decorations });
    saveToStorage();
  };

  const setDecoration = ({
    slot,
    data,
    index,
  }: {
    slot: LoadoutSlotKind;
    data: Decoration;
    index: number;
  }) => {
    const loadoutSlot = loadout.get(slot);
    loadout.set(slot, {
      data: loadoutSlot?.data,
      decorations: { ...loadoutSlot?.decorations, [index]: data },
    });
    saveToStorage();
  };

  return (
    <LoadoutContext.Provider value={{ loadout, setLoadout, setDecoration }}>
      {children}
    </LoadoutContext.Provider>
  );
};

export const useLoadout = () => {
  const context = useContext(LoadoutContext);
  if (!context) {
    throw new Error("useLoadout must be used within a LoadoutProvider");
  }
  return context;
};
