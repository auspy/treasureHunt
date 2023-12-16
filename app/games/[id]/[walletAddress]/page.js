import GameScreen from "../../../_components/GameScreen";
const page = ({ params }) => {
  const { id, walletAddress } = params;
  return (
    <>
      <div className="flex flex-wrap w-full h-full justify-center content-end pb-5 mt-5">
        <GameScreen id={id} walletAddress={walletAddress} />
      </div>
    </>
  );
};

export default page;
