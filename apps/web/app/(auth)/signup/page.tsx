"use client";
import { BACKEND_URL } from "@repo/secret/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function App() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password } = data;

    const response = await axios.post(`${BACKEND_URL}/signup`, {
      name,
      email,
      password,
    });

    if (response.data?.response?.id) {
      router.push("/signin");
    } else {
      alert(response.data.message);
    }
  };

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} placeholder="Name" />

      {/* register your input into the hook by invoking the "register" function */}
      <input {...register("email", { required: true })} placeholder="Email" />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("password", { required: true })} placeholder="Password" />

      {/* errors will return when field validation fails  */}
      {errors.name && <span>Name is required</span>}
      {errors.email && <span>Email is required</span>}
      {errors.password && <span>Password is required</span>}

      <input type="submit" />
    </form>
  );
}
