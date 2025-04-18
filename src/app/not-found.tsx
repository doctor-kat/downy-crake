import { Box, Stack, Text } from "@mantine/core";
import Image from "next/image";

export default function NotFound() {
  return (
    <Box style={{ top: "50%" }}>
      <Stack align="center" gap="0" className="translate-y-1/2">
        <Image src="/404.png" alt="404" width={128} height={128} />
        <Text>Meownster not found</Text>
      </Stack>
    </Box>
  );
}
