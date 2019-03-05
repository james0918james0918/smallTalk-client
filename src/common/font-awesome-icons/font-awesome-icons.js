import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope,
  faFileSignature,
  faKey,
  faMars,
  faRedo,
  faSignInAlt,
  faSpinner,
  faUser,
  faUserPlus,
  faVenus,
  faSearchPlus,
  faSearch,
  faTimesCircle,
  faUserCog,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const addFontAwesomeIcons = () => (
  library.add(
    faEnvelope,
    faFileSignature,
    faKey,
    faMars,
    faRedo,
    faSignInAlt,
    faSpinner,
    faUser,
    faUserPlus,
    faVenus,
    faSearchPlus,
    faSearch,
    faTimesCircle,
    faUserCog,
    faCog,
    faSignOutAlt
  )
);

export default addFontAwesomeIcons;
