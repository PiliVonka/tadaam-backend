import AuthDirective from "./auth";
import GuestDirective from "./guest";
import RoleDirective from "./role";
import OwnerDirective from "./owner";

export default {
  auth: AuthDirective,
  guest: GuestDirective,
  hasRole: RoleDirective,
  isOwner: OwnerDirective
};
