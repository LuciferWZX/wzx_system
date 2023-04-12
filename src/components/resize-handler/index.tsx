import {FC, useState} from "react";
import {styled} from "umi";
import {PanelResizeHandle} from "react-resizable-panels";
import ResizeSVG from "@/assets/svgs/arrows-resize-h.svg"
const ResizeHandler:FC = () => {
    const [isDragging, setDragging] = useState<boolean>(false);
    const onDragging=(isDragging:boolean)=>{
        setDragging(isDragging)
    }
    return(
        <StyledResizeHandler onDragging={onDragging}>
            <StyledHighLight $isDragging={isDragging}/>
        </StyledResizeHandler>
    )
}
export default ResizeHandler
const StyledResizeHandler = styled(PanelResizeHandle)`
    position: relative;
    width: 0;
`
const StyledHighLight = styled.div<{$isDragging:boolean}>`
  position: absolute;
  height: 100%;
    width: 2px;
  transition-duration: 0.1s;
  transition-property: background-color;
  background-color: ${props=>props.$isDragging?"orange":"transparent"};
  &:hover{
    background-color: orange;
  }
    
`
