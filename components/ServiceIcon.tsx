import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faHotel,
  faShieldHeart,
  faPassport,
  faMapLocationDot,
  faCarSide,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
  plane: faPlaneDeparture,
  hotel: faHotel,
  shield: faShieldHeart,
  passport: faPassport,
  map: faMapLocationDot,
  car: faCarSide,
} as const;

export type ServiceIconName = keyof typeof icons;

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconName;
  className?: string;
}) {
  return <FontAwesomeIcon icon={icons[name]} className={className} />;
}
