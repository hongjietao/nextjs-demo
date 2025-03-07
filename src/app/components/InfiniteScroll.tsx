"use client";

import React, { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

/**
 * 无限滚动加载组件
 * 当用户滚动到页面底部时触发加载更多数据
 */
export default function InfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  children,
}: InfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 如果没有更多数据，或者正在加载中，不需要观察
    if (!hasMore || isLoading) return;

    // 创建Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 } // 当目标元素10%可见时触发
    );

    // 开始观察底部元素
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    // 清理函数
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <div className="relative">
      {children}

      <div
        ref={loadMoreRef}
        className="h-10 w-full flex items-center justify-center my-4"
      >
        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-300">
              加载中...
            </span>
          </div>
        )}
        {!hasMore && !isLoading && (
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            没有更多内容了
          </div>
        )}
      </div>
    </div>
  );
}
