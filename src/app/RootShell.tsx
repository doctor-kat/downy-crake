"use client";

import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";
import { AppShell, Burger, Container, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Suspense } from "react";

export default function RootShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image
            src="/icon/endemic_downy_crake.png"
            alt="downy_crake"
            width={30}
            height={30}
          />
          Monster Hunter Wilds Set Builder
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {Object.entries({
          armor: "equipment",
          charms: "armor_charm",
          decorations: "decoration_3",
          skills: "note_buff",
        }).map(([route, icon]) => (
          <NavLink
            key={route}
            active={pathname === `/${route}`}
            component={Link}
            href={`/${route}`}
            leftSection={
              <Image
                src={`/icon/${icon}.png`}
                alt={icon}
                width={24}
                height={24}
              />
            }
            label={route}
            variant="default"
            className="capitalize"
          />
        ))}
        <NavLink
          active={pathname.startsWith("/weapon")}
          component={Link}
          href="/weapons"
          leftSection={
            <Image
              src={`/icon/sharpening_stone.png`}
              alt="sharpening_stone"
              width={24}
              height={24}
            />
          }
          label="weapons"
          variant="default"
          className="capitalize"
        >
          {Object.values(WeaponKind).map((kind) => (
            <NavLink
              key={kind}
              active={pathname === `/weapon/${kind}`}
              component={Link}
              href={`/weapon/${kind}`}
              leftSection={
                <Image
                  src={`/icon/weapon_${kind}.png`}
                  alt={kind}
                  width={24}
                  height={24}
                />
              }
              label={kind.replace("-", " ")}
              variant="default"
              className="capitalize"
            />
          ))}
        </NavLink>
        {Object.entries({
          ailments: "ailment_poison",
          items: "chest",
        }).map(([route, icon]) => (
          <NavLink
            key={route}
            disabled
            component={Link}
            href={`/${route}`}
            leftSection={
              <Image
                src={`/icon/${icon}.png`}
                alt={icon}
                width={24}
                height={24}
              />
            }
            label={route}
            variant="default"
            className="capitalize"
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Suspense fallback="LOADING">
          <Container>{children}</Container>
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
}
