"use client";

import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";
import Loading from "@/app/loading";
import { theme } from "@/app/theme";
import {
  AppShell,
  Burger,
  Button,
  Container,
  Divider,
  Group,
  MantineThemeProvider,
  NavLink,
  ScrollArea,
  Space,
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
  const [opened, { close, toggle }] = useDisclosure();

  return (
    <MantineThemeProvider theme={theme}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: !opened, mobile: !opened },
        }}
        padding="xs"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} size="sm" />
            <Image
              src="/icon/endemic/downy_crake.png"
              alt="downy_crake"
              width={30}
              height={30}
            />
            MHWilds Set Builder
            <Space className="grow" />
            <Button
              component={Link}
              href="/loadout"
              variant="default"
              className="capitalize"
              leftSection={
                <Image
                  src={`/icon/skills/set.png`}
                  alt="armor_display"
                  width={24}
                  height={24}
                />
              }
            >
              View Loadout
            </Button>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md" className="justify-between">
          <AppShell.Section component={ScrollArea}>
            <Stack gap={0}>
              {Object.entries({
                armor: "equipment",
                charms: "armor/charm",
                decorations: "decoration/3",
                skills: "skills/element",
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
                  onClick={close}
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
                label="Weapons"
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
                    className="capitalize"
                    onClick={close}
                  />
                ))}
              </NavLink>
              <NavLink
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
              />
              <Divider />
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
              />
            </Stack>
          </AppShell.Section>
          <AppShell.Section>
            <Stack gap={0}>
              <Divider />
              <NavLink
                label="Github"
                leftSection={
                  <Image
                    src={`/icon/book.png`}
                    alt="book"
                    width={24}
                    height={24}
                  />
                }
                component={Link}
                href="https://github.com/doctor-kat/mhwsb"
                onClick={close}
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
                onClick={close}
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
                onClick={close}
              />
            </Stack>
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main>
          <Suspense fallback={<Loading />}>
            <Container p={{ base: "0", md: "md" }}>{children}</Container>
          </Suspense>
        </AppShell.Main>
      </AppShell>
    </MantineThemeProvider>
  );
}
