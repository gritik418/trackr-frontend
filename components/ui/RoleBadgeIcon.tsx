import { Crown, Shield, User } from "lucide-react";

type Props = {
  role: string;
  size?: number;
};

const RoleBadgeIcon = ({ role, size = 10 }: Props) => {
  const roleLower = role.toUpperCase();
  switch (roleLower) {
    case "OWNER":
      return <Crown size={size} className={"text-amber-500"} />;
    case "ADMIN":
      return <Shield size={size} className="text-blue-500" />;
    default:
      return <User size={size} className="text-neutral-500" />;
  }
};

export default RoleBadgeIcon;
