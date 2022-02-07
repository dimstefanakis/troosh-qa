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

  return <Text onClick={onClick}>{children}</Text>;
}

function DesktopMenu() {
  const { user } = useSelector((state: RootState) => state.authentication);

  return (
    <Flex>
      <MenuLink href={user ? "/dashboard" : "/login"}>
        {user ? "Dashboard" : "Mentor login"}
      </MenuLink>
    </Flex>
  );
}

function MobileMenu() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.authentication);

  function onMentorLoginClick() {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
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
        <MenuItem onClick={onMentorLoginClick}>
          {user ? "Dashboard" : "Mentor login"}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default HeaderMenu;
