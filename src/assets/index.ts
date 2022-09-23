import React, {lazy} from 'react';
import { FallBackUi, withIconSuspense } from '../utils/lazyLoaders/lazyIcon';



const Logo = withIconSuspense(
    lazy(() => import('../assets/images/svg/splashshape1.svg')),
    FallBackUi,
  );


export {
    Logo
}