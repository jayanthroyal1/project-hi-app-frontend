import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authAPI";
import toast from "react-hot-toast";
import { setCredentials } from "../features/auth/authSlice";
import { handleApiError } from "../utils/common";
import type { LoginPayload } from "../constants/types";

function LoginPage() {
  const { register, handleSubmit } = useForm<LoginPayload>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginPayload) => {
    try {
      const response = await loginUser(data);
      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        }),
      );
      toast.success(response?.message);
      navigate("/");
    } catch (err) {
      handleApiError({ err, action: "Login" });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-96 p-8 border rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2 rounded"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Login
        </button>
        <div>
          <Link to="/register" className="text-blue-500 mt-3.5 underline">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
