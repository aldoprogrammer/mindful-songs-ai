import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useAldoAlert } from "aldo-alert";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { HashLoader } from "react-spinners";

export default function Register() {
    const { showAldoAlert } = useAldoAlert();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dob, setDob] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMatch(false);
            return;
        }
        setPasswordMatch(true);
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);

            // Additional user info (name and dob) can be saved to your database here

            showAldoAlert("Registration successful! Please verify your email address.", "warning");
            setLoading(false);
        } catch (error) {
            showAldoAlert(`Registration failed: ${error.message}`, "error");
            setLoading(false);
        }
    };

    return (
        <form className="mt-12 flex flex-col gap-4" onSubmit={handleRegister}>
            <div>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                >
                    Name
                </Typography>
                <Input
                    type="text"
                    placeholder="Your Name"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                >
                    Email
                </Typography>
                <Input
                    type="email"
                    placeholder="name@mail.com"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                >
                    Date of Birth
                </Typography>
                <Input
                    type="date"
                    placeholder="Your Date of Birth"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
            </div>
            <div>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                >
                    Password
                </Typography>
                <Input
                    type="password"
                    placeholder="Password"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                >
                    Confirm Password
                </Typography>
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {!passwordMatch && (
                    <Typography variant="small" color="red">
                        Passwords do not match!
                    </Typography>
                )}
            </div>
            <Button size="lg" type="submit" disabled={loading} className="flex items-center justify-center">
                {loading ? (
                    <HashLoader size={24} color="#fff" />
                ) : (
                    "Register"
                )}
            </Button>
        </form>
    );
}
