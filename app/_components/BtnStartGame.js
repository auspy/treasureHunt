"use client";
import Image from "next/image";
import Link from "next/link";
import useSound from "./useSound";
import { useEffect } from "react";

const BtnStartGame = () => {
  const walletAddress = localStorage.getItem("account");
  // const bgMusic = useSound("bg");
  // useEffect(() => {
  //   window.addEventListener("click", () => {
  //     bgMusic.play();
  //   });
  //   return () => {
  //     bgMusic.pause();
  //   };
  // }, [window]);
  return (
    <>
      <button
        className="hover relative h-[80px] w-[80px]  md:h-[100px] md:w-[100px]"
        style={{ top: "38%", left: "5px" }}
      >
        <Link href={`/games/1/${walletAddress}`}>
          <Image
            src={"/startBtn.png"}
            alt="start game"
            style={{ objectFit: "contain" }}
            fill
            priority={true}
          />
        </Link>
      </button>
    </>
  );
};

export default BtnStartGame;
