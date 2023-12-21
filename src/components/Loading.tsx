import { ThreeDots } from "react-loader-spinner";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loading}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#eae0d5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
