import {
  FABMiniBottomClosed,
  FABMiniBottomOpen1,
  FABMiniBottomOpenDiff,
} from '../../lib/constants';

const calculateBottom = (FABOpen, FABNum) =>
  (FABOpen * (FABMiniBottomOpen1 + (FABNum * FABMiniBottomOpenDiff)))
   + (!FABOpen * FABMiniBottomClosed);

export default calculateBottom;
