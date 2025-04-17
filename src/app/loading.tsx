import { Box } from "@mantine/core";
import Image from "next/image";

export default function Loading() {
  const size = 64;

  return (
    <Box
      className="absolute"
      style={{
        top: `calc(50% - ${size / 2}px)`,
        left: `calc(50% - ${size / 2}px)`,
      }}
    >
      <Image
        src="/loading.png"
        alt="loading"
        className="translate-y-1/2"
        style={{ animation: "spin 1.5s linear infinite" }}
        width={size}
        height={size}
      />
    </Box>
  );
}
