import Link from "next/link";

export const Navcomponet = () => {
  return (
    <nav className=" flex flex-row justify-center h-14  bg-violet-600 ">
      <ul className="flex flex-row gap-6">
        <li className="">
          <Link href={"/home"}>home</Link>
        </li>
        <li className="">login</li>
        <li className="">#</li>
      </ul>
    </nav>
  );
};
