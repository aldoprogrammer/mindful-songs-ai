import { Button, Input, Typography } from "@material-tailwind/react";
import { useAldoAlert } from "aldo-alert";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacebookIcon from '../../assets/facebook-color-svgrepo-com.svg';
import GoogleIcon from '../../components/Icons/GoogleIcon';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from "../../config/firebase";
import { HashLoader } from "react-spinners";

export default function Login() {
    const navigate = useNavigate();
    const { showAldoAlert } = useAldoAlert();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                // Store user data in sessionStorage
                sessionStorage.setItem('user', JSON.stringify(user));
                // Set user state for immediate UI update
                setUser(user);
                console.log({ user });
                showAldoAlert("Login successful.", "info");
                // Navigate to dashboard
                navigate('/dashboard');
            } else {
                // Send a verification email
                await sendEmailVerification(user);
                showAldoAlert("Please verify your email address.", "info");
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({ error, errorCode, errorMessage });
            showAldoAlert(`Login failed: ${errorMessage}`, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSignInWithGoogle = async () => {        
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                // Store user data in sessionStorage
                sessionStorage.setItem('user', JSON.stringify(user));
                // Set user state for immediate UI update
                setUser(user);
                console.log({ user });
                // Navigate to dashboard
                navigate('/dashboard');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log({ error, errorCode, errorMessage, email, credential });
                showAldoAlert(`Google login failed: ${errorMessage}`, "error");
                setLoading(false);
            });
    };


    return (
        <form className="mt-12 flex flex-col gap-4" onSubmit={handleLogin}>
            <div>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                >
                    Your Email
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
            <Button size="lg" type="submit" disabled={loading} className="flex items-center justify-center">
                {loading ? (
                    <HashLoader size={24} color="#fff" />
                ) : (
                    "Login"
                )}
            </Button>
            <div className="mt-0 flex justify-center gap-4">
                <Button
                    onClick={handleSignInWithGoogle}
                    variant="outlined"
                    className="flex justify-center items-center gap-2 w-full"
                    disabled={loading}
                >
                    <GoogleIcon className="w-5 h-5" />
                    <span className="text-sm">Google</span>
                </Button>
                
            </div>
        </form>
    );
}
