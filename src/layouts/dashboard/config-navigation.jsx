import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns } from '@fortawesome/free-solid-svg-icons';

const navConfig = [
  {
    title: 'overview',
    path: '/app',
    icon: <FontAwesomeIcon icon={faTableColumns} />,
  },
  {
    title: 'mood',
    path: '/app/mood',
    icon: <FontAwesomeIcon icon={faFaceLaughWink} />,
  },
  {
    title: 'sleep',
    path: '/app/sleep',
    icon: <FontAwesomeIcon icon={faBed} />,
  },
  {
    title: 'activity',
    path: '/app/activity',
    icon: <FontAwesomeIcon icon={faPersonRunning} />,
  },
  {
    title: 'analysis',
    path: '/app/analysis',
    icon: <FontAwesomeIcon icon={faMagnifyingGlassChart} />,
  },
];

export default navConfig;
