"use client";

import React, { createContext, useContext, useState } from "react";

// 创建Tabs上下文
const TabsContext = createContext<{
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  defaultValue?: string;
}>({
  selectedTab: "",
  setSelectedTab: () => {},
});

// 主Tabs组件
export function Tabs({
  defaultValue,
  children,
  className = "",
}: {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [selectedTab, setSelectedTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab, defaultValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

// Tabs列表容器
export function TabsList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`inline-flex ${className}`}>{children}</div>;
}

// Tab触发器
export function TabsTrigger({
  value,
  children,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { selectedTab, setSelectedTab } = useContext(TabsContext);
  const isActive = selectedTab === value;

  return (
    <button
      className={`${className} ${isActive ? "data-[state=active]" : ""}`}
      onClick={() => setSelectedTab(value)}
      data-state={isActive ? "active" : "inactive"}
    >
      {children}
    </button>
  );
}

// Tab内容
export function TabsContent({
  value,
  children,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { selectedTab } = useContext(TabsContext);
  const isActive = selectedTab === value;

  if (!isActive) return null;

  return (
    <div className={className} data-state={isActive ? "active" : "inactive"}>
      {children}
    </div>
  );
}
