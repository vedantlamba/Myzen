import { PuffLoader } from "react-spinners";

const Loadingpage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <PuffLoader size={80} />
    </div>
  );
};

export default Loadingpage;
