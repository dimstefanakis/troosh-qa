import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";
import { RootState } from "../../../store";

interface MenuLinkInterface {
  children: JSX.Element | string;
  href: string;
}

function HeaderMenu() {
  const router = useRouter();
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  return isSmallerThan768 ? <MobileMenu /> : <DesktopMenu />;
}

function MenuLink({ children, href }: MenuLinkInterface) {
  const router = useRouter();

  function onClick() {
    router.push(href);
  }

  return (
    <Text onClick={onClick} ml={4} cursor="pointer">
      {children}
    </Text>
  );
}

function DesktopMenu() {
  const { user } = useSelector((state: RootState) => state.authentication);

  return (
    <Flex>
      {user ? (
        <>
          <MenuLink href="/dashboard">Dashboard</MenuLink>
          <MenuLink href="/settings">Settings</MenuLink>
        </>
      ) : (
        <MenuLink href="/login">Mentor login</MenuLink>
      )}
    </Flex>
  );
}

function MobileMenu() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.authentication);

  function onLoginClick() {
    router.push("/login");
  }

  function onSettingsClick() {
    router.push("/settings");
  }

  function onDashboardClick() {
    router.push("/dashboard");
  }

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        {user ? (
          <>
            <MenuItem onClick={onDashboardClick}>Dashboard</MenuItem>
            <MenuItem onClick={onSettingsClick}>Settings</MenuItem>
          </>
        ) : (
          <MenuItem onClick={onLoginClick}>Mentor login</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}

export default HeaderMenu;
