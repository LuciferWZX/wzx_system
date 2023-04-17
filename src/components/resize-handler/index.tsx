import {FC, useState} from "react";
import {styled} from "umi";
import {PanelResizeHandle} from "react-resizable-panels";
import {theme} from "antd"

const {useToken}=theme
const ResizeHandler:FC = () => {
    const {token:{colorPrimaryBorderHover,colorBorder}}=useToken()
    const [isDragging, setDragging] = useState<boolean>(false);
    const onDragging=(isDragging:boolean)=>{
        setDragging(isDragging)
    }
    return(
        <StyledResizeHandler onDragging={onDragging} style={{backgroundColor:colorBorder}}>
            <StyledHighLight $isDragging={isDragging} $bgColor={colorPrimaryBorderHover}/>
        </StyledResizeHandler>
    )
}
export default ResizeHandler
const StyledResizeHandler = styled(PanelResizeHandle)`
    position: relative;
    width: 1px;
`
const StyledHighLight = styled.div<{$isDragging:boolean,$bgColor:string}>`
  position: absolute;
  height: 100%;
    width: 2px;
  transition-duration: 0.1s;
  transition-property: background-color;
  background-color: ${props=>props.$isDragging?props.$bgColor:"transparent"};
  &:hover{
    background-color: ${props=>props.$bgColor};
  }
    
`
