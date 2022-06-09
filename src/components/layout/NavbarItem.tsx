import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  path: string;
  name: string;
  className?: string;
};

const NavbarItem: NextPage<Props> = ({ path, name, className = '' }: Props) => {

  const route = useRouter().route === path ? 'active-route ' : '';
  const classes = 'link w-full text-center px-2 py-1 flex w-full lg:p-0 ' + route + className;
  return (
    <li>
      <Link href={path} passHref>
        <a className={classes}>
          {name}
        </a>
      </Link>
    </li>
  )
}

export default NavbarItem;
