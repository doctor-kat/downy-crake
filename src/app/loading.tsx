import { Box } from "@mantine/core";
import Image from "next/image";

export default function Loading() {
  const height = 128;
  const width = 128;

  return (
    <Box
      className="absolute"
      style={{
        top: `calc(50% - ${height / 2}px)`,
        left: `calc(50% + ${width / 2}px)`,
      }}
    >
      <Image
        src="/loading.png"
        alt="loading"
        className="translate-x-1/4 translate-y-1/4"
        style={{ animation: "spin 1.5s linear infinite" }}
        width={width}
        height={height}
      />
    </Box>
  );
}
