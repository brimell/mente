import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTableColumns,
  faFaceLaughWink,
  faBed,
  faPersonRunning,
  faMagnifyingGlassChart,
} from '@fortawesome/free-solid-svg-icons';

const navConfig = [
  {
    title: 'overview',
    path: '/app',
    icon: <FontAwesomeIcon icon={faTableColumns} size='lg' />,
  },
  {
    title: 'mood',
    path: '/app/mood',
    icon: <FontAwesomeIcon icon={faFaceLaughWink} size='lg' />,
  },
  {
    title: 'sleep',
    path: '/app/sleep',
    icon: <FontAwesomeIcon icon={faBed} size='lg' />,
  },
  {
    title: 'activity',
    path: '/app/activity',
    icon: <FontAwesomeIcon icon={faPersonRunning} size='lg' />,
  },
  {
    title: 'analysis',
    path: '/app/analysis',
    icon: <FontAwesomeIcon icon={faMagnifyingGlassChart} size='lg' />,
  },
];

export default navConfig;
