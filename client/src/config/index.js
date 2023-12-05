import keysDev from "./dev";
import keysProd from "./prod";

let keys;
if (process.env.NODE_ENV === "production") {
  keys = keysProd;
} else {
  keys = keysDev;
}

export default keys;
