"use client";

import { useState, useEffect } from "react";
import { Movie } from "../../data/movies";

interface MovieFetcherProps {
  children: (props: {
    popularMovies: Movie[];
    popularPage: number;
    popularTotalPages: number;
    isLoadingPopular: boolean;
    loadMorePopularMovies: () => void;

    topRatedMovies: Movie[];
    topRatedPage: number;
    topRatedTotalPages: number;
    isLoadingTopRated: boolean;
    loadMoreTopRatedMovies: () => void;

    handleTabChange: (value: string) => void;
  }) => React.ReactNode;
}

export default function MovieFetcher({ children }: MovieFetcherProps) {
  // 热门电影状态
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularPage, setPopularPage] = useState(1);
  const [popularTotalPages, setPopularTotalPages] = useState(1);
  const [isLoadingPopular, setIsLoadingPopular] = useState(false);

  // 最佳评分电影状态
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [topRatedPage, setTopRatedPage] = useState(1);
  const [topRatedTotalPages, setTopRatedTotalPages] = useState(1);
  const [isLoadingTopRated, setIsLoadingTopRated] = useState(false);

  // 初始加载热门电影和最佳评分电影
  useEffect(() => {
    fetchPopularMovies(1);
    fetchTopRatedMovies(1); // 预先加载最佳评分电影，而不是等到用户切换标签
  }, []);

  // 初始化最佳评分电影（当用户切换到该标签时）
  const initializeTopRatedMovies = () => {
    // 如果数据已过期或发生过错误，重新获取
    if (isLoadingTopRated || topRatedMovies.length === 0) {
      fetchTopRatedMovies(1);
    }
  };

  // 获取热门电影
  const fetchPopularMovies = async (page: number) => {
    try {
      setIsLoadingPopular(true);
      const response = await fetch(`/api/movies/popular?page=${page}`);
      const data = await response.json();

      if (page === 1) {
        setPopularMovies(data.movies);
      } else {
        setPopularMovies((prev) => [...prev, ...data.movies]);
      }

      setPopularPage(data.page);
      setPopularTotalPages(data.totalPages);
      setIsLoadingPopular(false);
    } catch (error) {
      console.error("获取热门电影失败:", error);
      setIsLoadingPopular(false);
    }
  };

  // 获取最佳评分电影
  const fetchTopRatedMovies = async (page: number) => {
    try {
      setIsLoadingTopRated(true);
      const response = await fetch(`/api/movies/top-rated?page=${page}`);
      const data = await response.json();

      if (page === 1) {
        setTopRatedMovies(data.movies);
      } else {
        setTopRatedMovies((prev) => [...prev, ...data.movies]);
      }

      setTopRatedPage(data.page);
      setTopRatedTotalPages(data.totalPages);
      setIsLoadingTopRated(false);
    } catch (error) {
      console.error("获取最佳评分电影失败:", error);
      setIsLoadingTopRated(false);
    }
  };

  // 加载更多热门电影
  const loadMorePopularMovies = () => {
    if (popularPage < popularTotalPages && !isLoadingPopular) {
      fetchPopularMovies(popularPage + 1);
    }
  };

  // 加载更多最佳评分电影
  const loadMoreTopRatedMovies = () => {
    if (topRatedPage < topRatedTotalPages && !isLoadingTopRated) {
      fetchTopRatedMovies(topRatedPage + 1);
    }
  };

  // 标签切换处理函数
  const handleTabChange = (value: string) => {
    if (value === "top-rated") {
      initializeTopRatedMovies();
    } else if (value === "popular") {
      // 如果热门电影数据为空，加载热门电影数据
      if (popularMovies.length === 0) {
        fetchPopularMovies(1);
      }
    }
  };

  return (
    <>
      {children({
        popularMovies,
        popularPage,
        popularTotalPages,
        isLoadingPopular,
        loadMorePopularMovies,

        topRatedMovies,
        topRatedPage,
        topRatedTotalPages,
        isLoadingTopRated,
        loadMoreTopRatedMovies,

        handleTabChange,
      })}
    </>
  );
}
