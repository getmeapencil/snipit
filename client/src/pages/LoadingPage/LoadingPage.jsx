import { Loader } from "@mantine/core";

export const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loader size="xl" type="dots" />
    </div>
  );
};
