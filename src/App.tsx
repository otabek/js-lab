import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema, UserRegisterForm } from "./validators";
import { useForm } from "react-hook-form";
import { TextField, Button, FormControl } from "@mui/material";

export function App() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<UserRegisterForm>({
        resolver: zodResolver(userRegisterSchema)
    });

    function onSubmit(data: UserRegisterForm) {
        console.log(JSON.stringify(data));
        reset();
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <div className="initials">
                        <TextField
                            {...register("firstName")}
                            error
                            helperText={errors.firstName?.message}
                            label="First Name"
                            autoComplete="off"
                            className="first-name"
                        />
                        <TextField
                            {...register("lastName")}
                            error
                            helperText={errors.lastName?.message}
                            label="Last Name"
                            autoComplete="off"
                            className="last-name"
                        />
                    </div>
                    <div className="email">
                        <TextField
                            {...register("email")}
                            error
                            fullWidth
                            helperText={errors.email?.message}
                            label="Email"
                        />
                    </div>
                    <Button type="submit" variant="contained">
                        Register
                    </Button>
                </FormControl>
            </form>
        </>
    );
}
