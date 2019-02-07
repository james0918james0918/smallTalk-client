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
  faVenus
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
    faVenus
  )
);

export default addFontAwesomeIcons;
