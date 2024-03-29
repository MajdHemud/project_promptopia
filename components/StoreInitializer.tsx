import { PassageUserType } from "@types";
import { useStore } from "@utils/store/store";
import { useRef } from "react";

interface StoreInitializerProps {
  userInfo: PassageUserType | null;
}

export function StoreInitializer({ userInfo }: StoreInitializerProps) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ userInfo });
    initialized.current = true;
  }

  return null;
}
