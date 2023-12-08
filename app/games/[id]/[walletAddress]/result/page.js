"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="fccc w-full h-full p-20 gap-y-10 max-w-[1000px] self-center">
      <h1 className="">Congratulations! You have won the game!</h1>
      <h3>You will get 0.0001 ETH.</h3>
      <button
        className="btnPrimary"
        onClick={() => {
          router.push("/");
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default page;
