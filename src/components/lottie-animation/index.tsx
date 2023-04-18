import React, {FC} from "react";
import Lottie, {LottieProps} from 'react-lottie-player'
type LottieAnimationType = {
    options:LottieProps
}
const LottieAnimation:FC<LottieAnimationType> = ({options}) => {
    return(
        <Lottie
            {...options}
        />
    )
}
export default LottieAnimation
