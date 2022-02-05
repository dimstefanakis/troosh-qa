import { useRouter } from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";

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
  return (
    <Flex>
      <MenuLink href="/login">Mentor login</MenuLink>
    </Flex>
  );
}

function MobileMenu() {
  const router = useRouter();

  function onMentorLoginClick(){
    router.push('/login');
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
        <MenuItem onClick={onMentorLoginClick}>Mentor login</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default HeaderMenu;
