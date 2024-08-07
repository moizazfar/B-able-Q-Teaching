const videoData = [
  {
    id: 0,
    name: "Alif",
    image: require("../Assets/huroof/Huroof Mufradat/alif.png"),
    video: require("../Assets/huroof/videos/alif.mp4"),
  },
  {
    id: 1,
    name: "Baa",
    image: require("../Assets/huroof/Huroof Mufradat/baa.png"),
    video: require("../Assets/huroof/videos/baa.mp4"),
  },
  {
    id: 2,
    name: "Taa",
    image: require("../Assets/huroof/Huroof Mufradat/taa.png"),
    video: require("../Assets/huroof/videos/taa.mp4"),
  },
  {
    id: 3,
    name: "Saa",
    image: require("../Assets/huroof/Huroof Mufradat/saa.png"),
    video: require("../Assets/huroof/videos/saa.mp4"),
  },
  {
    id: 4,
    name: "Jeem",
    image: require("../Assets/huroof/Huroof Mufradat/jeem.png"),
    video: require("../Assets/huroof/videos/jeem.mp4"),
  },
  {
    id: 5,
    name: "Haa",
    image: require("../Assets/huroof/Huroof Mufradat/haa.png"),
    video: require("../Assets/huroof/videos/haa1.mp4"),
  },
  {
    id: 6,
    name: "Kha",
    image: require("../Assets/huroof/Huroof Mufradat/kha.png"),
    video: require("../Assets/huroof/videos/kha.mp4"),
  },
  {
    id: 7,
    name: "Daal",
    image: require("../Assets/huroof/Huroof Mufradat/daal.png"),
    video: require("../Assets/huroof/videos/daal.mp4"),
  },
  {
    id: 8,
    name: "Zaal",
    image: require("../Assets/huroof/Huroof Mufradat/zaal.png"),
    video: require("../Assets/huroof/videos/zaal.mp4"),
  },
  {
    id: 9,
    name: "Raa",
    image: require("../Assets/huroof/Huroof Mufradat/raa.png"),
    video: require("../Assets/huroof/videos/raa.mp4"),
  },
  {
    id: 10,
    name: "Zaa",
    image: require("../Assets/huroof/Huroof Mufradat/zaa.png"),
    video: require("../Assets/huroof/videos/zaa.mp4"),
  },
  {
    id: 11,
    name: "Seen",
    image: require("../Assets/huroof/Huroof Mufradat/seen.png"),
    video: require("../Assets/huroof/videos/seen.mp4"),
  },
  {
    id: 12,
    name: "Sheen",
    image: require("../Assets/huroof/Huroof Mufradat/sheen.png"),
    video: require("../Assets/huroof/videos/sheen.mp4"),
  },
  {
    id: 13,
    name: "Suad",
    image: require("../Assets/huroof/Huroof Mufradat/suad.png"),
    video: require("../Assets/huroof/videos/suad.mp4"),
  },
  {
    id: 14,
    name: "Zuad",
    image: require("../Assets/huroof/Huroof Mufradat/zuad.png"),
    video: require("../Assets/huroof/videos/zuad.mp4"),
  },
  {
    id: 15,
    name: "Tau",
    image: require("../Assets/huroof/Huroof Mufradat/tau.png"),
    video: require("../Assets/huroof/videos/tau.mp4"),
  },
  {
    id: 16,
    name: "Zau",
    image: require("../Assets/huroof/Huroof Mufradat/zau.png"),
    video: require("../Assets/huroof/videos/zau.mp4"),
  },
  {
    id: 17,
    name: "Aeeen",
    image: require("../Assets/huroof/Huroof Mufradat/aeeen.png"),
    video: require("../Assets/huroof/videos/aeeen.mp4"),
  },
  {
    id: 18,
    name: "Gaeen",
    image: require("../Assets/huroof/Huroof Mufradat/gaeen.png"),
    video: require("../Assets/huroof/videos/gaeen.mp4"),
  },
  {
    id: 19,
    name: "Faa",
    image: require("../Assets/huroof/Huroof Mufradat/faa.png"),
    video: require("../Assets/huroof/videos/faa.mp4"),
  },
  {
    id: 20,
    name: "Qaaf",
    image: require("../Assets/huroof/Huroof Mufradat/qaaf.png"),
    video: require("../Assets/huroof/videos/qaaf.mp4"),
  },
  {
    id: 21,
    name: "Kaaf",
    image: require("../Assets/huroof/Huroof Mufradat/kaaf.png"),
    video: require("../Assets/huroof/videos/kaaf.mp4"),
  },
  {
    id: 22,
    name: "Laam",
    image: require("../Assets/huroof/Huroof Mufradat/laam.png"),
    video: require("../Assets/huroof/videos/laam.mp4"),
  },
  {
    id: 23,
    name: "Meem",
    image: require("../Assets/huroof/Huroof Mufradat/meem.png"),
    video: require("../Assets/huroof/videos/meem.mp4"),
  },
  {
    id: 24,
    name: "Noon",
    image: require("../Assets/huroof/Huroof Mufradat/noon.png"),
    video: require("../Assets/huroof/videos/noon.mp4"),
  },
  {
    id: 25,
    name: "Wow",
    image: require("../Assets/huroof/Huroof Mufradat/wow.png"),
    video: require("../Assets/huroof/videos/wow.mp4"),
  },
  {
    id: 26,
    name: "Hamza",
    image: require("../Assets/huroof/Huroof Mufradat/hamza.png"),
    video: require("../Assets/huroof/videos/aeeen.mp4"),
  },
  {
    id: 27,
    name: "Haa1",
    image: require("../Assets/huroof/Huroof Mufradat/haa1.png"),
    video: require("../Assets/huroof/videos/haa1.mp4"),
  },
  {
    id: 28,
    name: "Bari_ya",
    image: require("../Assets/huroof/Huroof Mufradat/bari_ya.png"),
    video: require("../Assets/huroof/videos/bari_ya.mp4"),
  },
  {
    id: 29,
    name: "Choti_ya",
    image: require("../Assets/huroof/Huroof Mufradat/choti_ya.png"),
    video: require("../Assets/huroof/videos/choti_ya.mp4"),
  },
];

export default videoData;
