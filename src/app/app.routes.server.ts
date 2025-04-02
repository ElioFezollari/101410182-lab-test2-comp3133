import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'missiondetails/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const ids = [1, 2, 3, 4, 5];
      return ids.map(id => ({ id: id.toString() }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
