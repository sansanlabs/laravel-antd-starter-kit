import { __ } from "@/lib/utils";
import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { LuHistory, LuKeyRound, LuMonitorSmartphone, LuUserRound } from "react-icons/lu";

export default function InnerSidebarMenuUser() {
  const { locale } = usePage<SharedData>().props;

  return [
    {
      key: "profile",
      label: <Link href={route("settings.profile.index")}>{__(locale, "lang.profile")}</Link>,
      icon: <LuUserRound size={16} />,
    },
    {
      key: "password",
      label: <Link href={route("settings.password.index")}>{__(locale, "lang.password")}</Link>,
      icon: <LuKeyRound size={16} />,
    },
    {
      key: "activity-logs",
      label: <Link href={route("settings.activity-logs.index")}>{__(locale, "lang.activity_logs")}</Link>,
      icon: <LuHistory size={16} />,
    },
    {
      key: "device-sessions",
      label: <Link href={route("settings.device-sessions.index")}>{__(locale, "lang.device_sessions")}</Link>,
      icon: <LuMonitorSmartphone size={16} />,
    },
  ].filter(Boolean);
}
