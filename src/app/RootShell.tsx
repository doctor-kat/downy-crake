"use client";

import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";
import {
  AppShell,
  Burger,
  Container,
  Divider,
  Group,
  NavLink,
  Stack,
} from "@mantine/core";
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
            src="/icon/endemic/downy_crake.png"
            alt="downy_crake"
            width={30}
            height={30}
          />
          Monster Hunter Wilds Set Builder
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" className="justify-between overflow-auto">
        <Stack gap={0}>
          {Object.entries({
            armor: "equipment",
            charms: "armor/charm",
            decorations: "decoration/3",
            skills: "skills/elemental",
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
                    src={`/icon/weapon/${kind}.png`}
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
          <Divider m="sm" />
          {Object.entries({
            ailments: "ailment/poison",
            items: "chest",
            monsters: "monster/doshaguma",
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
          <NavLink
            disabled
            component={Link}
            href="/loadout"
            leftSection={
              <Image
                src={`/icon/skills/set.png`}
                alt="armor_display"
                width={24}
                height={24}
              />
            }
            label="Loadouts"
            variant="default"
            className="capitalize"
          />
          <NavLink
            disabled
            component={Link}
            href="/set-finder"
            leftSection={
              <Image
                src={`/icon/endemic/sandstar.png`}
                alt="endemic_sandstar"
                width={24}
                height={24}
              />
            }
            label="Set Finder"
            variant="default"
            className="capitalize"
          />
        </Stack>
        <Stack gap={0}>
          <Divider m="sm" />
          <NavLink
            label="Github"
            leftSection={
              <Image src={`/icon/book.png`} alt="book" width={24} height={24} />
            }
            component={Link}
            href="https://github.com/doctor-kat/mhwsb"
          />
          <NavLink
            label="Report a bug"
            leftSection={
              <Image
                src={`/icon/endemic/bitterbug.png`}
                alt="endemic_bitterbug"
                width={24}
                height={24}
              />
            }
            component={Link}
            href="https://github.com/doctor-kat/mhwsb/issues/new"
          />
          <NavLink
            label="Monster Hunter DB"
            leftSection={
              <Image
                src={`/icon/tile203.png`}
                alt="mhdb_logo"
                width={24}
                height={24}
              />
            }
            component={Link}
            href="https://docs.wilds.mhdb.io/"
          />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Suspense fallback="LOADING">
          <Container>{children}</Container>
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
}
