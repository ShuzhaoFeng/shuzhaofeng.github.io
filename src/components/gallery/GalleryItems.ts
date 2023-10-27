import JsonPathSerializerIcon from "../../assets/JsonPathSerializerIcon.png";
import ReactViteTypescript from "../../assets/ReactViteTypescript.png";

type GalleryItem = {
  title: string;
  desc: string;
  image: string;
  color: string;
  url: string;
};

const galleryItems: GalleryItem[] = [
  {
    title: "JsonPathSerializer",
    color: "#90e090",
    desc: "JsonPathSerializer is a class library that help C# code to build JSON objects incrementally," +
    "each time with a JsonPath and a value.",
    image: JsonPathSerializerIcon,
    url: "https://github.com/ShuzhaoFeng/JsonPathSerializer"
  },
  {
    title: "shuzhaofeng.github.io",
    color: "#61dbfb",
    desc: "Yes, I make this website",
    image: ReactViteTypescript,
    url: "https://github.com/ShuzhaoFeng/shuzhaofeng.github.io"
  },
];

export default galleryItems;