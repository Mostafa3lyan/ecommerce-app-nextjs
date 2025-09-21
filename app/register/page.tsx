"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"; // shadcn form system
// import { Input } from "@/components/ui/input"; // shadcn input
import { Button } from "@heroui/button";
import Link from "next/link";
import { registerSchema, RegisterType } from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Input } from '@heroui/input';


const Register = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible)
    const router = useRouter();
    const form = useForm<RegisterType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        resolver: zodResolver(registerSchema),
    });

    async function handleRegister(values: RegisterType) {
        try {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (!res.ok) {
                addToast({
                    title: "❌ Signup failed",
                    description: data.message || data.error,
                    color: "danger",
                    variant: "flat",
                });
                return;
            }
            addToast({
                title: "Success",
                description: "You have registered successfully!",
                color: "success",
                variant: "flat",
            });
            router.push("/login");
        } catch (error) {
            addToast({
                title: "⚠️ Network error",
                description: String(error),
                color: "warning",
                variant: "flat",
            });
        }
    }


    return (

        <>
            <h1 className="text-3xl font-bold text-center">Register Now</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleRegister)}
                    className="space-y-4 p-6"
                >
                    {/* Name field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input className="border-0" placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-600" />
                            </FormItem>
                        )}
                    />

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
                                        className="border-0"
                                        type={isVisible ? "text" : "password"}
                                        placeholder="Enter password"
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


                    {/* Confirm Password field */}
                    <FormField
                        control={form.control}
                        name="rePassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="border-0"
                                        type={isVisible ? "text" : "password"}
                                        placeholder="Confirm password"
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

                    {/* Phone field */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input className="border-0" type="tel" placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-600" />
                            </FormItem>
                        )}
                    />
                    <div className=" flex flex-col justify-center items-end gap-4 mt-4">
                        <Button
                            type="submit"
                            className="w-[20%] mt-3 px-4 py-2 text-[15px] font-semibold rounded-md bg-green-600 text-white"
                        >
                            Register
                        </Button>
                        <Link href="/login">
                            already have an account? <span className="text-blue-600">Login</span>
                        </Link>
                    </div>
                </form>
            </Form>

        </>
    );
};

export default Register;
