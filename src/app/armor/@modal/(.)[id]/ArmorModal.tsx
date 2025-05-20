"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import ArmorInfo from "@/app/armor/[id]/ArmorInfo";
import AddToLoadout from "@/app/loadout/components/AddToLoadout";
import { useLoadout } from "@/app/loadout/context/LoadoutContext";
import { rarityColor } from "@/app/utils";
import { Carousel } from "@mantine/carousel";
import { Group, Modal, SegmentedControl, Stack, Tooltip } from "@mantine/core";
import { EmblaCarouselType } from "embla-carousel";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ArmorModal({
  armor,
  skills,
  armorSet,
}: {
  armor: Armor;
  armorSet: ArmorSet;
  skills: Skill[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { loadout, setLoadout } = useLoadout();
  const closeModal = () => router.push("/armor");

  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [activeSlide, setActiveSlide] = useState(
    armorSet.pieces.findIndex((piece) => piece.id === armor.id)
  );

  useEffect(() => {
    const [, , id] = pathname.split("/");
    const index = armorSet.pieces.findIndex((piece) => piece.id === Number(id));
    setActiveSlide(index);
    embla?.scrollTo(index);
  }, [pathname]);

  return (
    <Modal
      opened={pathname !== "/armor"}
      onClose={closeModal}
      withCloseButton={false}
    >
      <Stack>
        {/*<Text fw={500} c={`${rarityColor[armor.rarity]}.9`}>*/}
        {/*  {armorSet.name}*/}
        {/*</Text>*/}
        <SegmentedControl
          fullWidth
          classNames={{
            label: "p-0",
            innerLabel: "flex justify-center items-center",
          }}
          value={String(activeSlide)}
          withItemsBorders={false}
          color={`${rarityColor[armor.rarity]}.9`}
          onChange={(i) => {
            embla?.scrollTo(Number(i));
          }}
          data={armorSet.pieces.map((armor, i) => ({
            value: String(i),
            label: (
              <Tooltip label={armor.name} disabled={activeSlide === i}>
                <Group wrap="nowrap" gap="xs">
                  <Image
                    src={`/icon/armor/${armor.kind}.png`}
                    alt={armor.kind}
                    width={24}
                    height={24}
                  />
                  {activeSlide === i ? armor.name : null}
                </Group>
              </Tooltip>
            ),
          }))}
        />
        <Carousel
          slideGap="xl"
          withControls={false}
          withIndicators={false}
          getEmblaApi={setEmbla}
          onSlideChange={(i) => {
            setActiveSlide(i);
            const id = armorSet.pieces[i].id;
            if (pathname !== `/armor/${armorSet.pieces[i].id}`) {
              window.history.pushState(null, "", `/armor/${id}`);
            }
          }}
          initialSlide={armorSet.pieces
            .map((piece) => piece.id)
            .indexOf(armor.id)}
          emblaOptions={{
            inViewThreshold: 0.5,
          }}
        >
          {armorSet.pieces.map((armor) => {
            const isInLoadout = loadout.get(armor.kind)?.data?.id === armor.id;
            return (
              <Carousel.Slide key={armor.id}>
                <Stack gap="md" h="100%" justify="space-between">
                  <ArmorInfo
                    armor={armor}
                    armorSet={armorSet}
                    skills={skills}
                  />
                  <AddToLoadout armor={armor} onClick={closeModal} />
                </Stack>
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </Stack>
    </Modal>
  );
}
