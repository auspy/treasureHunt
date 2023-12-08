"use client";
import ButtonLogout from "./ButtonLogout";
import Logo from "./Logo";
import Image from "next/image";
import { useState, useEffect } from "react";

const Header = () => {
  const [wallet, setWallet] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(storedAccount);
    }
  }, []);

  async function Connect() {
    console.log("connecting...");
    if (window.ethereum) {
      console.log("ethereum");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setWallet(accounts[0]);
      localStorage.setItem("account", accounts[0]);
    } else {
      console.log("not ethereum");
    }
  }
  return (
    <section className="flex items-center justify-between py-2 btmBorder">
      <Logo />
      <button style={{ display: "flex" }} onClick={Connect}>
        <Image src="/metamask.png" height={24} width={24} />
        {!wallet ? (
          <span>Connect to Metamask</span>
        ) : (
          <span>Welcome {wallet}</span>
        )}
      </button>
      <ButtonLogout />
    </section>
  );
};

export default Header;
