// Loading.js

import Image from "next/image";
import loaderImage from "./assets/images/loader.gif";
import styles from "./assets/css/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <Image
        src={loaderImage}
        width={50}
        height={50}
        alt="Loader Gif Image"
        className={styles.loader}
      />
    </div>
  );
}
