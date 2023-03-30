import React, {FC} from "react";
import Lottie, {LottieProps} from 'react-lottie-player'
import loginJSON from '@/assets/lotties/login_bg.json'
const LottieAnimation:FC = () => {
    const defaultOptions:LottieProps = {
        loop: true,
        animationData: loginJSON,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
        play:true,
        style:{
            height:400,
            width:400
        }
    };

    return(
        <Lottie
            {...defaultOptions}
        />
    )
}
export default LottieAnimation
