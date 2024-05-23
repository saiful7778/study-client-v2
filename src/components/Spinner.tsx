import { FC } from "react";
import { LoaderPinwheel } from "lucide-react";

interface SpinnerProps {
  size?: number | undefined;
}

const Spinner: FC<SpinnerProps> = ({ size }) => {
  return <LoaderPinwheel className="animate-spin" size={size} />;
};

export default Spinner;
