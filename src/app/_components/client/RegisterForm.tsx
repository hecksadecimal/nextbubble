'use client';
import { createUser } from "@/app/_actions/register";
import { registrationSchema } from "@/lib/shared/schemas";
import { useMemo, useState } from "react";
import { z } from "zod";

export default function RegisterForm() {

    // Error state for all fields
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        dateOfBirth: ""
    });
    const [anyErrors, setAnyErrors] = useState(false);
    const [pending, setPending] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    // useMemo to revalidate form errors
    useMemo(() => {
        handleValidation();
    }, [username, password, passwordConfirm, dateOfBirth]);

    function handleValidation() {
        try {
            registrationSchema.parse({ username, password, passwordConfirm, dateOfBirth });
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.errors.reduce((acc, err) => {
                    return { ...acc, [err.path[0]]: err.message };
                }, {
                    username: "",
                    password: "",
                    passwordConfirm: "",
                    dateOfBirth: ""
                });
                setErrors(fieldErrors);
                setAnyErrors(true);
                return false;
            }
        }
        setErrors({
            username: "",
            password: "",
            passwordConfirm: "",
            dateOfBirth: ""
        });
        setAnyErrors(false);
        return true;
    }

    return (
        <div className="w-full bg-base-200 text-base-content placeholder-neutral-content p-4 pb-16">
            <h1>Register</h1>
            <form action={async (data: FormData) => {
                if (!handleValidation()) {
                    return;
                }
                setPending(true);
                await createUser(data);
                setPending(false);
            }}>
                <label className="form-control w-full">
                    <input type="text" name="username" placeholder="Username" className="input input-bordered w-full" onChangeCapture={e => setUsername(e.currentTarget.value)} />
                    <div className="label">
                        {errors.username && <span className="label-text-alt text-error">{errors.username}</span>}
                    </div>
                </label>
                <label className="form-control w-full">
                    <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" onChangeCapture={e => setPassword(e.currentTarget.value)} />
                    <div className="label">
                        {errors.password && <span className="label-text-alt text-error">{errors.password}</span>}
                    </div>
                </label>
                <label className="form-control w-full">
                    <input type="password" name="passwordConfirm" placeholder="Confirm Password" className="input input-bordered w-full" onChangeCapture={e => setPasswordConfirm(e.currentTarget.value)} />
                    <div className="label">
                        {errors.passwordConfirm && <span className="label-text-alt text-error">{errors.passwordConfirm}</span>}
                    </div>
                </label>
                <label className="form-control w-full">
                    <input type="date" name="dateOfBirth" className="input input-bordered w-full" onChangeCapture={e => setDateOfBirth(e.currentTarget.value)} />
                    <div className="label">
                        {errors.dateOfBirth && <span className="label-text-alt text-error">{errors.dateOfBirth}</span>}
                    </div>
                </label>
                <button className="btn float-end" type="submit" disabled={anyErrors || pending}>Register</button>
            </form>
        </div>
    )
}