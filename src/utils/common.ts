import axios from "axios";
import toast from "react-hot-toast";

type HandleApiErrorProps = {
  err: unknown;
  action?: string;
};
export const handleApiError = ({
  err,
  action = "Request",
}: HandleApiErrorProps) => {
  const fallbackMessage = `Failed during - ${action} !`;
  if (axios.isAxiosError(err)) {
    toast.error(err?.response?.data?.message || fallbackMessage);
  } else {
    toast.error(`Something went wrong during ${action.toLowerCase()}`);
  }
};
