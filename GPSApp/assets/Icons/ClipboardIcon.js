import React from 'react';
import Svg, { Path, G, Defs } from 'react-native-svg';

const ClipboardIcon = ({ width = 32, height = 32, color }) => (
  <Svg 
    viewBox="0 0 32 32" 
    width={width} 
    height={height} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <Defs>
      {/* Styles are not used directly in React Native SVG */}
    </Defs>
    <G data-name="21. Clipboard" id="_21._Clipboard">
      <Path fill={color} d="M19,6H18a2,2,0,0,0-2-2H15V3A3,3,0,0,0,9,3V4H8A2,2,0,0,0,6,6H5A3,3,0,0,0,2,9V29a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V9A3,3,0,0,0,19,6ZM11,3a1,1,0,0,1,2,0V4H11ZM8,6h8V7h0V8H8ZM20,29a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8H6a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2h1a1,1,0,0,1,1,1Z" />
      <Path fill={color} d="M27,6a3,3,0,0,0-3,3V28a1,1,0,0,0,.17.55l2,3a1,1,0,0,0,1.66,0l2-3A1,1,0,0,0,30,28V9A3,3,0,0,0,27,6Zm0,2a1,1,0,0,1,1,1v2H26V9A1,1,0,0,1,27,8Zm0,21.2-1-1.5V13h2V27.7Z" />
      <Path fill={color} d="M14,26H10a1,1,0,0,1-1-1V23H7a1,1,0,0,1-1-1V18a1,1,0,0,1,1-1H9V15a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2h2a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H15v2A1,1,0,0,1,14,26Zm-3-2h2V22a1,1,0,0,1,1-1h2V19H14a1,1,0,0,1-1-1V16H11v2a1,1,0,0,1-1,1H8v2h2a1,1,0,0,1,1,1Z" />
    </G>
  </Svg>
);

export default ClipboardIcon;
