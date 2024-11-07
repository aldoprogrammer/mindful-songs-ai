import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { LockClosedIcon, CreditCardIcon, RectangleGroupIcon } from "@heroicons/react/24/outline"; // Heroicons v2

import LogoImage from '../assets/logo-removebg-preview.png';
import Login from "../components/Home/Login";
import Register from "../components/Home/Register";
import VideoBackground from "../components/VideoBackground";

export default function Home() {
    const [type, setType] = React.useState("login");

    return (
        <div className="relative flex items-center justify-center min-h-screen">
           <VideoBackground />
           <div className="absolute w-full h-full bg-black opacity-40" />
            <div className="relative z-10 flex items-center justify-center my-10">
                <Card className="w-11/12 mx-auto max-w-[24rem]">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="m-0 flex flex-col justify-center items-center px-4 py-8 text-center bg-blue-gray-300"
                    >
                        <div className="mb-9 mt-4 flex justify-center items-center h-20 p-6 text-white">
                            <img
                                alt="logo"
                                className="w-3/5"
                                src={LogoImage}
                            />
                        </div>
                        <Typography variant="h5" color="white">
                            {type === "login" ? "Welcome Back" : "Join Us"}
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <Tabs value={type} className="">
                            <TabsHeader className="relative z-0 ">
                                <Tab value="login" onClick={() => setType("login")}>
                                    <CreditCardIcon className="h-5 w-5 mr-2 inline" />
                                    Login
                                </Tab>
                                {/* <Tab value="register" onClick={() => setType("register")}>
                                    <RectangleGroupIcon className="h-5 w-5 mr-2 inline" />
                                    Register
                                </Tab> */}
                            </TabsHeader>
                            <TabsBody
                                className=""
                                animate={{
                                    initial: {
                                        x: type === "login" ? 400 : -400,
                                    },
                                    mount: {
                                        x: 0,
                                    },
                                    unmount: {
                                        x: type === "login" ? 400 : -400,
                                    },
                                }}
                            >
                                <TabPanel value="login" className="p-0">
                                    <Login />
                                </TabPanel>
                                <TabPanel value="register" className="p-0">
                                    <Register />
                                </TabPanel>
                            </TabsBody>
                        </Tabs>
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex text-center items-center justify-center mt-4 gap-2 font-bold opacity-60 italic"
                        >
                            If you have not registered, login using Google Account
                        </Typography>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
