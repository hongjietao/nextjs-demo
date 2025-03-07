"use client";

import React from "react";
import ClientImage from "./ClientImage";

interface ActorProps {
  id: number;
  name: string;
  character: string;
  profileUrl: string;
}

/**
 * 演员卡片组件，显示演员头像和角色
 */
export default function ActorCard({ actor }: { actor: ActorProps }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden mb-2">
        <ClientImage
          src={actor.profileUrl}
          alt={actor.name}
          className="w-full h-full object-cover"
          fallbackSrc="/placeholder-avatar.jpg"
        />
      </div>
      <h4 className="font-medium text-sm text-center">{actor.name}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
        {actor.character}
      </p>
    </div>
  );
}
