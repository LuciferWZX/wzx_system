import React, {FC} from "react";
import {LottieProps} from "react-lottie-player";
import emptyJSON from "@/assets/lotties/empty.json";
import {LottieAnimation} from "@/components";

const EmptyInfo:FC = () => {
    const defaultOptions:LottieProps = {
        loop: false,
        animationData: emptyJSON,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
        play:true,
        speed:3,
        style:{
            maxHeight:400,
            maxWidth:400
        }
    };
    return(
        <LottieAnimation options={defaultOptions} />
    )
}
export default EmptyInfo
