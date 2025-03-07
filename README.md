This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## TheMovieDB API 设置

本项目使用 TheMovieDB API 获取电影数据。请按照以下步骤设置 API 访问：

1. 注册[TheMovieDB](https://www.themoviedb.org)账号
2. 在[设置页面](https://www.themoviedb.org/settings/api)中申请 API 密钥
3. 创建`.env.local`文件（如果不存在），并添加以下内容：

```
TMDB_ACCESS_TOKEN=your_tmdb_read_access_token_here
```

4. 将`your_tmdb_read_access_token_here`替换为您获取的实际访问令牌

**注意**：`.env.local`文件包含敏感信息，已在`.gitignore`中设置为不提交到版本控制系统。
