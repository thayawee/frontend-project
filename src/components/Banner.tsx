import classes from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1>LearnHub</h1>
        <p>Hub for Educational Videos</p>
      </div>
      <div>
        <img src="/img/banner-img-1.svg" alt="banner-image" />
        <img src="/img/banner-img-2.svg" alt="banner-image" />
      </div>
    </div>
  );
};

export default Banner;
