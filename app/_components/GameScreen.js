"use client";
import React, { useEffect, useState } from "react";
import ClueBox from "./ClueBox";
import Icon from "./icons/Icon";
import { useRouter } from "next/navigation";
import { changeOrientation } from "@/constants";
import useSound from "../_components/useSound";
const dummyItems = [
  {
    name: "skullArt",
    height: 88,
    width: 77,
    xOffSet: 133,
    yOffSet: 1,
    clue: `In the room of mystery, where shadows play,
    By the door, a grinning skull holds sway.
    Search this space, let curiosity guide,
    For the first clue waits, just outside.`,
  },
  {
    name: "goldCharm",
    height: 35,
    width: 30,
    xOffSet: 330,
    yOffSet: 193,
    clue: `Now you've found the skull, well done!
    But the puzzle's not over, there's more fun.
    Shift your gaze to the window's embrace,
    Under its charm, a table finds its place.`,
  },
  {
    name: "goldStone",
    height: 35,
    width: 35,
    xOffSet: 304,
    yOffSet: -135,
    clue: `Unlock the window, reveal the light,
    Beside the table, a golden ball bright.
    The room unfolds, yet mysteries untold,
    On the right, a divided table stands bold.
    `,
  },
  {
    name: "standingArrow",
    height: 26,
    width: 108,
    xOffSet: -345,
    yOffSet: -34,
    clue: `The puzzle deepens, as you explore,
    By the divided table, a hint galore.
    Look to the floor, where blue gems gleam,
    The final clue awaits, like a dream.`,
  },
];

function GameScreen({ id, screen = "screen1", items = dummyItems }) {
  const bgMusic = useSound("bg", 0, 0.05);
  useEffect(() => {
    bgMusic.play();
    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      bgMusic.loop = false;
    };
  }, []);
  const winSound = useSound("win", 0, 1, false);
  const height = 672;
  const router = useRouter();
  const width = 1000;
  const [showClue, setShowClue] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [screenWidth, setScreenWidth] = useState(width);
  const [screenHeight, setScreenHeight] = useState(height);
  const [showingWin, setShowingWin] = useState(false);
  const handleClueChange = (itemIndex) => {
    setCurrentItem(itemIndex);
    if (itemIndex > items.length - 1) {
      setTimeout(() => {
        alert("You won!");
        router.push(`/games/${id}/result`);
      }, 3000);
      return;
    }
  };
  const handleFound = (index) => {
    setShowingWin(true);
    winSound.play();
    const foundOverlay = document.getElementById("foundOverlay");
    foundOverlay.classList.add("foundOverlay");
    foundOverlay.style.display = "block";
    const currentItem = document.getElementById("item" + index);
    currentItem.classList.add("foundItem");
  };
  const toogleClue = () => {
    setShowClue(!showClue);
  };
  useEffect(() => {
    if (!window) {
      return;
    }
    const handleResize = () => {
      // screen size
      const screenEle = document.getElementById(screen);
      if (screenEle) {
        const isWidthSmaller =
          screenEle.clientWidth / screenWidth <
          screenEle.clientHeight / screenHeight;
        if (isWidthSmaller) {
          setScreenHeight((screenEle.clientWidth / width) * height);
          setScreenWidth(screenEle.clientWidth);
        } else {
          setScreenWidth((screenEle.clientHeight / height) * width);
          setScreenHeight(screenEle.clientHeight);
        }
        // setScreenWidth(screenEle.clientWidth);
        // console.log(screenEle.clientHeight);
        // setScreenHeight(screenEle.clientHeight);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  changeOrientation();
  const screenWidthPercent = (screenWidth || width) / width;
  const screenHeightPercent = (screenHeight || height) / height;
  const itemsLeft = items.length - currentItem;
  return (
    <div className="h-full w-full fcc">
      {
        <h1
          style={{
            position: "relative",
            zIndex: 11,
            fontSize: 36,
          }}
          className="my-4"
        >
          {showingWin
            ? "Double-Click anywhere to continue"
            : itemsLeft > 0
            ? ` Find ${itemsLeft} more item(s) to win`
            : itemsLeft == 0
            ? "All Items found"
            : "Find the last item to win"}
        </h1>
      }

      <div
        className={`grid ${screenWidthPercent}`}
        id={screen}
        style={{
          cursor: `url(/icons/cursor.png),crosshair`,
          alignSelf: "center",
          position: "relative",
          maxHeight: height,
          maxWidth: width,
          width: "100%",
          height: "100%",
          backgroundImage: `url(/screen1/screen1.png)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        {
          !showClue && (
            <div className="">
              <Icon
                width={92}
                height={100}
                style={{
                  position: "absolute",
                  bottom: "5px",
                  right: "80px",
                }}
                onClick={() => {
                  const confirm = window.confirm("Do you want to exit?");
                  if (confirm) router.push("/");
                }}
                iconName="exit"
              />
              <Icon
                title={"Show Clue"}
                width={92}
                height={100}
                style={{
                  position: "absolute",
                  bottom: "5px",
                  right: "160px",
                }}
                onClick={toogleClue}
                iconName="clue"
              />
            </div>
          )
          // <button onClick={toogleClue}>show clue</button>
        }

        {items.map((item, index) => (
          <div
            id={"item" + index}
            key={index}
            onClick={() => {
              if (currentItem !== index) {
                return;
              }
              console.log(item.name + " clicked");
              handleFound(index);
              handleClueChange(index + 1);
            }}
            style={{
              // height: screenHeightPercent * 88,
              // width: screenWidthPercent * 77,
              // maxHeight: 88,
              // maxWidth: 77,
              width: screenWidthPercent * item.height,
              height: screenHeightPercent * item.width,
              zIndex: 2,
              top: `calc(50% - ${screenHeightPercent * item.yOffSet}px)`,
              left: `calc(50% - ${screenWidthPercent * item.xOffSet}px)`,
              backgroundImage: `url(/${screen}/${item.name}.png)`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              position: "absolute",
            }}
          />
        ))}
        {
          // OVERLAY
          <div
            onClick={() => {
              console.log("overlay clicked");
              if (showingWin) {
                setShowingWin(false);
              } else {
                const foundOverlay = document.getElementById("foundOverlay");
                const foundItem =
                  document.getElementsByClassName("foundItem")[0];
                console.log("foundItem", foundItem);
                if (foundItem) {
                  foundItem.style.display = "none";
                  foundItem.classList.remove("foundItem");
                }
                if (foundOverlay) {
                  foundOverlay.classList.remove("foundOverlay");
                  foundOverlay.style.display = "none";
                }
              }
            }}
            id="foundOverlay"
            className="w-full h-full hidden"
            style={{
              position: "absolute",
              zIndex: 10,
              opacity: 0,
              backgroundColor: "var(--bg)",
            }}
          ></div>
        }
        <ClueBox
          clue={items?.[currentItem]?.clue || "No clue available"}
          widthPer={screenWidthPercent}
          heightPer={screenWidthPercent}
          showClue={showClue}
          setShowClue={setShowClue}
          // setCurrentItem={setCurrentItem}
        />
      </div>
    </div>
  );
}

export default GameScreen;
