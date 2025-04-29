// This is intended to store relevant global variables
// Could also be extended to include things like environment

function getRoomIdFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("roomId");
}

declare global {
  interface Window {
    APP_CONFIG?: {
      roomId?: string;
    };
  }
}

export const AppConfig = window.APP_CONFIG ?? {
  roomId: getRoomIdFromUrl() ?? "four",
};
