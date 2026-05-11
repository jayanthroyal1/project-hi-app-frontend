/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { registerUser } from "../features/auth/authAPI";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function RegisterPage() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await registerUser(data);
      toast.success(response?.message);
      reset();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Registation Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-96 p-8 border rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold">Register</h1>
        <input
          {...register("name")}
          placeholder="name"
          className="border p-2 rounded"
        />
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
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Register
        </button>
        <div>
          <Link to="/login" className="text-blue-500 mt-3.5 underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
