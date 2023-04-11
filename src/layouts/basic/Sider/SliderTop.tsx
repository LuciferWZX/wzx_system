import {FC} from "react";
import {styled} from "umi";

const SliderTop:FC = () => {
    return(
        <StyledSliderTop>Logo</StyledSliderTop>
    )
}
const StyledSliderTop = styled.div`
  height: 64px;
  border-right: 1px solid rgba(5, 5, 5, 0.06);
`
export default SliderTop
