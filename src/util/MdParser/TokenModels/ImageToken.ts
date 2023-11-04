import HrefHandler from "../Helpers/HrefHandler";
import { TokenHandler } from "../types";

const ImageToken: TokenHandler<"image"> = function (token, container) {
  const imageProps = {
    src: HrefHandler(token.href),
    title: token.title,
    alt: token.text,
    style: {
      maxWidth: "100%",
    },
  };

  container.push("img", imageProps);
  
  return container;
}

export default ImageToken;
