import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const userSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "Name cannot be more than 50 characters"),
  lastName: z
    .string()
    .max(100, "Last Name cannot be more than 50 aracters")
    .min(1, "Last name is required"),
  email: z.string().email("Invalid Email"),
});

type UserSchema = z.infer<typeof userSchema>;

function App() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  function onSubmit(data: UserSchema) {
    console.log(data);
    reset();
  }

  return (
    <main className="flex w-screen h-screen justify-center items-center flex-col space-y-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <input
          {...register("firstName")}
          className="border border-black round"
          placeholder="First Name"
        />
        {errors.firstName?.message && (
          <p className="text-red-700">{errors.firstName?.message}</p>
        )}

        <input
          {...register("lastName")}
          className="border border-black round"
          placeholder="Last Name"
        />
        {errors.lastName?.message && (
          <p className="text-red-700">{errors.lastName?.message}</p>
        )}

        <input
          {...register("email")}
          className="border border-black round"
          placeholder="Email"
        />
        {errors.email?.message && (
          <p className="text-red-700">{errors.email?.message}</p>
        )}

        <button type="submit" className="border border-black">
          Submit
        </button>
      </form>
    </main>
  );
}

export default App;
