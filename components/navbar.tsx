"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  SearchIcon,
} from "@/components/icons";

import logo from "../assets/images/freshcart-logo.svg";

import { signOut, useSession } from "next-auth/react";

import { CartProduct } from "@/types/cart.types";

import { useCart } from "@/context/CartContext";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { UserRound } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { cartProducts = [] } = useCart() ?? { cartProducts: [] };

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  const searchInput = (
    <Input
      aria-label="Search products"
      role="searchbox"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Left Section - Logo + Main Nav */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              src={logo}
              alt="Store logo with cart icon"
              width={120}
              height={40}
              priority
            />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => {
            if (item.authOnly && !session) return null;
            return (
              <NavbarItem key={item.href}>
                <NextLink
                  href={item.href}
                  className={clsx(
                    "hover:text-green-600 transition-colors relative inline-flex items-center",
                    pathname === item.href &&
                      "text-green-600 font-medium data-[active=true]"
                  )}
                >
                  {item.label}
                  {/* Cart Count Badge */}
                  {item.label === "Cart" && cartProducts?.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {cartProducts.reduce(
                        (sum: number, p: CartProduct) => sum + p.count,
                        0
                      )}
                    </span>
                  )}
                </NextLink>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>

      {/* Right Section - Socials + Search */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem
          aria-label="social links"
          as="nav"
          className="hidden sm:flex gap-2"
        >
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>

        {/* ✅ Session guard for hydration */}
        {status === "loading" ? null : !session ? (
          <>
            <Link
              className="text-foreground hover:text-green-600"
              href="/register"
            >
              Register
            </Link>
            <Link
              className="text-foreground hover:text-green-600"
              href="/login"
            >
              Login
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    icon: <UserRound />,
                  }}
                  className="transition-transform cursor-pointer"
                  description={session.user.email}
                  name={session.user.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  as={Link}
                  className="text-foreground"
                  href={siteConfig.profileMenuItems[0].href}
                >
                  {siteConfig.profileMenuItems[0].label}
                </DropdownItem>
                <DropdownItem
                  key="wishlist"
                  as={Link}
                  className="text-foreground"
                  href={siteConfig.profileMenuItems[1].href}
                >
                  {siteConfig.profileMenuItems[1].label}
                </DropdownItem>
                <DropdownItem
                  key="orders"
                  as={Link}
                  className="text-foreground"
                  href={siteConfig.profileMenuItems[2].href}
                >
                  {siteConfig.profileMenuItems[2].label}
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="text-red-600"
                  color="danger"
                  onPress={logout}
                >
                  Log out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
      </NavbarContent>

      {/* Mobile Menu Toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu Content */}
      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => {
            // Hide login/register if logged in
            if (
              session &&
              (item.label === "Login" || item.label === "Register")
            ) {
              return null;
            }
            // Hide logout/cart/wishlist if not logged in
            if (
              !session &&
              (item.label === "Logout" ||
                item.label === "Cart" ||
                item.label === "Wishlist" ||
                item.label === "My Orders")
            ) {
              return null;
            }

            return (
              <NavbarMenuItem key={`${item.href}-${index}`}>
                {item.label === "Logout" ? (
                  <button
                    className="text-danger hover:text-red-600 bg-transparent border-none cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    className="hover:text-green-600 relative inline-flex items-center"
                    color={
                      index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                    }
                    href={item.href}
                    size="lg"
                  >
                    {item.label}
                    {item.label === "Cart" && cartProducts?.length > 0 && (
                      <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {cartProducts.reduce(
                          (sum: number, p: CartProduct) => sum + p.count,
                          0
                        )}
                      </span>
                    )}
                  </Link>
                )}
              </NavbarMenuItem>
            );
          })}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
