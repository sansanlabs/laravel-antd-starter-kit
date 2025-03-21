import { __ } from "@/lib/utils";
import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { LuKeyRound, LuUserRound } from "react-icons/lu";

export default function MenuSetting() {
  const { locale } = usePage<SharedData>().props;

  return [
    {
      key: "profile",
      label: <Link href={route("profile.index")}>{__(locale, "lang.profile")}</Link>,
      icon: <LuUserRound size={16} />,
    },
    {
      key: "password",
      label: <Link href={route("password.index")}>{__(locale, "lang.password")}</Link>,
      icon: <LuKeyRound size={16} />,
    },
  ].filter(Boolean);
}
