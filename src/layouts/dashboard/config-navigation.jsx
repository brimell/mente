import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'overview',
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
    title: 'analysis',
    path: '/app/analysis',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
