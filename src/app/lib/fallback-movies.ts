import { Movie } from "../data/movies";

// 后备电影数据，在API连接失败时使用
export const FALLBACK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "肖申克的救赎",
    originalTitle: "The Shawshank Redemption",
    year: 1994,
    rating: 9.7,
    director: "弗兰克·德拉邦特",
    actors: ["蒂姆·罗宾斯", "摩根·弗里曼", "鲍勃·冈顿"],
    genres: ["剧情", "犯罪"],
    summary: "两个被囚禁的男人在多年中找到慰藉和最终的救赎，通过简单的善行。",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    duration: "142分钟",
  },
  {
    id: 2,
    title: "霸王别姬",
    originalTitle: "霸王别姬",
    year: 1993,
    rating: 9.6,
    director: "陈凯歌",
    actors: ["张国荣", "张丰毅", "巩俐", "葛优"],
    genres: ["剧情", "爱情", "同性"],
    summary:
      "两个京剧演员跨越半个多世纪的兄弟情谊，一段关于爱情、背叛和政治风暴的故事。",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1UJJmJpH1gzx8MxkHJsGpbspXAj.jpg",
    duration: "171分钟",
  },
  {
    id: 3,
    title: "阿甘正传",
    originalTitle: "Forrest Gump",
    year: 1994,
    rating: 9.5,
    director: "罗伯特·泽米吉斯",
    actors: ["汤姆·汉克斯", "罗宾·怀特", "加里·西尼斯"],
    genres: ["剧情", "爱情"],
    summary:
      "IQ只有75的阿甘，凭着一颗纯洁的心和坚韧不拔的精神，成就了一段传奇人生。",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    duration: "142分钟",
  },
  {
    id: 4,
    title: "这个杀手不太冷",
    originalTitle: "Léon",
    year: 1994,
    rating: 9.4,
    director: "吕克·贝松",
    actors: ["让·雷诺", "娜塔莉·波特曼", "加里·奥德曼"],
    genres: ["剧情", "动作", "犯罪"],
    summary: "一个职业杀手与一个12岁女孩之间的温情故事。",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/3AGkAgnie7UQCnpFE7LgXYv6j4q.jpg",
    duration: "110分钟",
  },
  {
    id: 5,
    title: "泰坦尼克号",
    originalTitle: "Titanic",
    year: 1997,
    rating: 9.4,
    director: "詹姆斯·卡梅隆",
    actors: ["莱昂纳多·迪卡普里奥", "凯特·温丝莱特", "比利·赞恩"],
    genres: ["剧情", "爱情", "灾难"],
    summary:
      "处于不同阶级的两个人在泰坦尼克号上相爱，最后在船沉没时面临生离死别的抉择。",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    duration: "194分钟",
  },
  {
    id: 6,
    title: "千与千寻",
    originalTitle: "千と千尋の神隠し",
    year: 2001,
    rating: 9.4,
    director: "宫崎骏",
    actors: ["柊瑠美", "入野自由", "夏木真理"],
    genres: ["剧情", "动画", "奇幻"],
    summary: "小千寻意外来到神灵世界，为了救爸爸妈妈，努力在此生存下去。",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    duration: "125分钟",
  },
];
