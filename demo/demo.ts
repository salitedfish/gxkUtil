/**
 * 把多级路由处理成一级路由，只保留最高层级的路由（以便router-view渲染，因为多级的话每级都要写一个router-view）
 * @param virtualRoutes
 * @returns
 */
const useCreateRoutes = <T extends { children?: T[] }>(virtualRoutes: T[]) => {
  const routes: T[] = [];
  const createRoutes = (_virtualRoutes: T[]) => {
    for (const _virtualRoute of _virtualRoutes) {
      if (_virtualRoute.children) {
        createRoutes(_virtualRoute.children);
      } else {
        routes.push(_virtualRoute);
      }
    }
  };
  createRoutes(virtualRoutes);
  return routes;
};

/**
 * 根据多极
 * @param virtualRoutes
 * @returns
 */
export const useCreateMenu = <T extends { children?: T[] }>(virtualRoutes: T[]) => {
  // 具体要处理成什么样的menu根据ui框架来定
  virtualRoutes;
};

console.log(
  useCreateRoutes([
    {
      name: "第一层",
      children: [
        {
          name: "第二层",
          children: [
            {
              name: "第三层",
            },
          ],
        },
        {
          name: "第二层",
        },
      ],
    },
    {
      name: "第一层",
    },
    {
      name: "第一层",
      children: [
        {
          name: "第二层",
        },
      ],
    },
  ])
);
