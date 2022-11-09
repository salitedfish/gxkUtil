const argent = process.env.npm_config_user_agent;

if (/^(npm|yarn|cnpm)\//g.test(argent)) {
  console.warn("请使用pnpm安装依赖");
  process.exit(1);
}
