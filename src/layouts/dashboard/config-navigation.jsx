import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'mood',
    path: '/app/user',
    icon: icon('ic_user'),
  },
  {
    title: 'sleep',
    path: '/app/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'activity',
    path: '/app/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'AI Analysis',
    path: '/app/analysis',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
