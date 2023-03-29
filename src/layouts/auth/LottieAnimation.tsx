import React, {FC} from "react";
import Lottie from 'react-lottie'
import loginJSON from '@/assets/lotties/login_bg.json'
const LottieAnimation:FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loginJSON,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return(
        <Lottie
            options={defaultOptions}
            isClickToPauseDisabled={true}
            height={400}
            width={400}
        />
    )
}
export default LottieAnimation
