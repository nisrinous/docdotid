import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function UseAuthMiddleware() {
  const { userRole } = useSelector((state: RootState) => state.user);
  return userRole;
}
