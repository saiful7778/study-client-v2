import { FC } from "react";
import { LoaderPinwheel } from "lucide-react";

const Spinner: FC = () => {
  return <LoaderPinwheel className="animate-spin" />;
};

export default Spinner;
