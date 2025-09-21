"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"; // shadcn form system

import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/toast";
import { loginSchema, LoginType } from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
    InputOtp,
} from "@heroui/react";
import { Eye, EyeOff, MailIcon } from "lucide-react";
import forgetPassword from "@/api/profile/forgetPassword";
import verifyCode from "@/api/profile/verifyCode";
import resetPassword from "@/api/profile/resetPassword";

const Login = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [step, setStep] = useState<"email" | "otp" | "reset">("email");
    const [isLoading, setisLoading] = useState(false);
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible)

    React.useEffect(() => {
        if (otp.length === 6) {
            handleResetCode(); // ✅ auto-verify once 6 digits are entered
        }
    }, [otp]);


    const form = useForm<LoginType>({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(loginSchema),
    });

    async function handleLogin(values: LoginType) {
        try {
            const res = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });
            if (res?.error) {
                addToast({
                    title: "❌ Signin failed",
                    description: res.error,
                    color: "danger",
                    variant: "flat",
                });
                return;
            }
            // Success
            addToast({
                title: "Success",
                description: "You have logged in successfully!",
                color: "success",
                variant: "flat",
            });
            window.location.href = "/";
        }
        catch (error) {
            addToast({
                title: "⚠️ Network error",
                description: String(error),
                color: "warning",
                variant: "flat",
            });
        }
    }

    const handleForget = async () => {
        setisLoading(true);
        try {
            const response = await forgetPassword(email);

            if (response.statusMsg === "success") {
                addToast({
                    title: "Success",
                    description: response.message,
                    color: "primary",
                    variant: "flat",
                });
                setStep("otp");
            } else {
                addToast({
                    title: "Error",
                    description: response.message,
                    color: "danger",
                    variant: "flat",
                });
            }
        } catch (error) {
            addToast({
                title: "Failed",
                description: String(error),
                color: "danger",
                variant: "flat",
            });
        } finally {
            setisLoading(false);
        }
    };

    const handleResetCode = async () => {
        setisLoading(true);
        try {
            const response = await verifyCode(otp);
            addToast({
                title: "Success",
                description: "Code verified successfully",
                color: "primary",
                variant: "flat",
            });
            setStep("reset");
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to verify code",
                color: "danger",
                variant: "flat",
            });
        }
        finally {
            setisLoading(false);
        }

    }

    const handleResetPassword = async () => {
        setisLoading(true);
        try {
            const response = await resetPassword(email, newPassword);

            addToast({
                title: "Success",
                description: "Your password has been reset successfully",
                color: "success",
                variant: "flat",
            });
            onOpenChange();
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to reset password",
                color: "danger",
                variant: "flat",
            });
        }
        finally {
            setisLoading(false);
        }

    }

    return (
        <>
            <h1 className="text-3xl font-bold text-center">Login Now</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleLogin)}
                    className="w-[80%] mx-auto space-y-4 p-6"
                >
                    {/* Email field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input className="border-0" type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-600" />
                            </FormItem>
                        )}
                    />

                    {/* Password field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type={isVisible ? "text" : "password"}
                                        placeholder="Enter password"
                                        className="border-0"
                                        endContent={
                                            <button
                                                type="button"
                                                aria-label="toggle password visibility"
                                                className="focus:outline-none"
                                                onClick={toggleVisibility}
                                            >
                                                {isVisible ? (
                                                    <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                    />
                                </FormControl>
                                <FormMessage className="text-red-600" />
                            </FormItem>
                        )}
                    />


                    {/*Forget Password field */}
                    <>
                        <Button color="primary" onPress={onOpen}>
                            Forgot Password ?
                        </Button>
                        <Modal
                            isOpen={isOpen}
                            placement="top-center"
                            onOpenChange={(open) => {
                                onOpenChange();
                                if (!open) {
                                    setStep("email");
                                    setEmail("");
                                    setOtp("");
                                    setnewPassword("");
                                }
                            }}
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">
                                            {step === "email" && "Forgot Password ?"} {step === "otp" && "Verify OTP"} {step === "reset" && "Reset Password"}</ModalHeader>
                                        <ModalBody>
                                            {step === "email" && (
                                                <Input
                                                    endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />}
                                                    label="Email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    variant="bordered"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    isDisabled={isLoading}
                                                />
                                            )}

                                            {step === "otp" && (
                                                <InputOtp
                                                    isRequired
                                                    aria-label="Enter OTP"
                                                    variant="bordered"
                                                    length={6}
                                                    value={otp}
                                                    onChange={(e) => setOtp((e.target as HTMLInputElement).value)}
                                                    isDisabled={isLoading}
                                                />
                                            )}

                                            {step === "reset" && (
                                                <Input
                                                    type="password"
                                                    label="New Password"
                                                    placeholder="Enter new password"
                                                    variant="bordered"
                                                    value={newPassword}
                                                    onChange={(e) => setnewPassword(e.target.value)}
                                                    isDisabled={isLoading}
                                                />
                                            )}
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button color="danger" variant="flat" onPress={onClose} isDisabled={isLoading}>
                                                Close
                                            </Button>

                                            {step === "email" && (
                                                <Button color="primary" onPress={handleForget} isLoading={isLoading}>
                                                    Send Code
                                                </Button>
                                            )}

                                            {/* {step === "otp" && (
                                                <Button color="primary" onPress={handleResetCode} isLoading={isLoading}>
                                                    Verify Code
                                                </Button>
                                            )} */}

                                            {step === "reset" && (
                                                <Button color="primary" onPress={handleResetPassword} isLoading={isLoading}>
                                                    Reset Password
                                                </Button>
                                            )}
                                        </ModalFooter>

                                    </>
                                )}
                            </ModalContent>
                        </Modal>

                    </>
                    <div className=" flex flex-col justify-center items-end gap-4 mt-4">
                        <Button
                            type="submit"
                            className="w-[25%] mt-3 px-4 py-2 text-[15px] font-semibold rounded-md bg-green-600 text-white"
                        >
                            Login
                        </Button>
                        <Link href="/register">
                            Don't have an account? <span className="text-blue-600">Register here</span>
                        </Link>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default Login;
