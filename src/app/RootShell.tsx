"use client";

import {
  AppShell,
  Burger,
  Button,
  Container,
  Group,
  Skeleton,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

export default function RootShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Stack gap="sm">
          {Object.entries({
            armor: "equipment",
            charms: "armor_charm",
          }).map(([route, icon]) => (
            <Button
              key={route}
              component={Link}
              href={`/${route}`}
              fullWidth
              size="lg"
              leftSection={
                <Image
                  src={`/icon/${icon}.png`}
                  alt={icon}
                  width={24}
                  height={24}
                />
              }
              justify="flex-start"
              variant="default"
              className="capitalize"
            >
              {route}
            </Button>
          ))}
          {Object.entries({
            ailments: "ailment_poison",
            decorations: "decoration_3",
            items: "chest",
            skills: "note_buff",
            weapons: "sharpening_stone",
          }).map(([route, icon]) => (
            <Button
              key={route}
              disabled
              fullWidth
              size="lg"
              leftSection={
                <Image
                  src={`/icon/${icon}.png`}
                  alt={icon}
                  width={24}
                  height={24}
                />
              }
              justify="flex-start"
              variant="default"
              className="capitalize"
            >
              {route}
            </Button>
          ))}
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
