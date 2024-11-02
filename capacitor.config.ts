import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "bib-capacitor",
  webDir: "dist",
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    LocalNotifications: {
      smallIcon: "icon_only",
      iconColor: "#fffae2",
    },
  },
};

export default config;
