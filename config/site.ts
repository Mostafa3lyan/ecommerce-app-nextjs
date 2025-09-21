import { Span } from "next/dist/trace";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {

  name: "FreshCart",
  description: "An e-commerce project built with Next.js and Hero UI by Mostafa Elyan",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Cart",
      href: "/cart",
      authOnly: true,
    },

    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Brands",
      href: "/brands",
    },
  ],

  profileMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Wishlist",
      href: "/wishlist",
    },
    {
      label: "My Orders",
      href: "/allorders",
    }
  ],

  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Cart",
      href: "/cart",
      authOnly: true,
    },
    {
      label: "Wishlist",
      href: "/wishlist",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Brands",
      href: "/brands",
    },
    {
      label: "My Orders",
      href: "/allorders",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Register",
      href: "/register",
    },
    {
      label: "Login",
      href: "/login",
    },

    {
      label: "Logout",
      href: "/login",
    },
  ],
  links: {
    github: "https://github.com/Mostafa3lyan",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
