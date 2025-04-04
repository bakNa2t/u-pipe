import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image src="logo-u-pipe.svg" width={50} height={50} alt="logo" />
      <p className="text-2xl font-semibold tracking-tight">Welcome to Upipe</p>
    </div>
  );
}
