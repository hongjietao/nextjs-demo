export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  year: number;
  rating: number;
  director: string;
  actors: string[];
  genres: string[];
  summary: string;
  posterUrl: string;
  duration: string;
}

// 模拟豆瓣电影Top100数据
export const TOP_MOVIES: Movie[] = [
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
      "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg",
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
      "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg",
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
      "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.jpg",
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
      "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg",
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
      "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p457760035.jpg",
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
      "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg",
    duration: "125分钟",
  },
  {
    id: 7,
    title: "美丽人生",
    originalTitle: "La vita è bella",
    year: 1997,
    rating: 9.5,
    director: "罗伯托·贝尼尼",
    actors: ["罗伯托·贝尼尼", "尼可莱塔·布拉斯基", "乔治·坎塔里尼"],
    genres: ["剧情", "喜剧", "爱情", "战争"],
    summary:
      "一位犹太人父亲用他的想象力使他的儿子相信集中营实际上是一种精心设计的游戏。",
    posterUrl:
      "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2578474613.jpg",
    duration: "116分钟",
  },
  {
    id: 8,
    title: "辛德勒的名单",
    originalTitle: "Schindler's List",
    year: 1993,
    rating: 9.5,
    director: "史蒂文·斯皮尔伯格",
    actors: ["连姆·尼森", "本·金斯利", "拉尔夫·费因斯"],
    genres: ["剧情", "历史", "战争"],
    summary: "一位德国商人救了一千多名犹太人的性命。",
    posterUrl:
      "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p492406163.jpg",
    duration: "195分钟",
  },
  {
    id: 9,
    title: "盗梦空间",
    originalTitle: "Inception",
    year: 2010,
    rating: 9.3,
    director: "克里斯托弗·诺兰",
    actors: ["莱昂纳多·迪卡普里奥", "约瑟夫·高登-莱维特", "艾伦·佩吉"],
    genres: ["剧情", "科幻", "悬疑", "冒险"],
    summary: "一个高技能的小偷能够进入人们的梦境窃取他们的秘密。",
    posterUrl:
      "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p513344864.jpg",
    duration: "148分钟",
  },
  {
    id: 10,
    title: "忠犬八公的故事",
    originalTitle: "Hachi: A Dog's Tale",
    year: 2009,
    rating: 9.4,
    director: "拉斯·霍尔斯道姆",
    actors: ["理查·基尔", "萨拉·罗默尔", "琼·艾伦"],
    genres: ["剧情", "家庭"],
    summary: "一条狗的忠诚和友谊的感人故事。",
    posterUrl:
      "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p524964039.jpg",
    duration: "93分钟",
  },
];

// 根据索引范围获取电影列表
export function getMovies(start = 0, limit = 10): Movie[] {
  return TOP_MOVIES.slice(start, start + limit);
}

// 获取所有电影
export function getAllMovies(): Movie[] {
  return TOP_MOVIES;
}

// 根据ID获取电影详情
export function getMovieById(id: number): Movie | undefined {
  return TOP_MOVIES.find((movie) => movie.id === id);
}
