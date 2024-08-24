import React from 'react';

interface TooltipProps {
    text: string;
    visible: boolean;
    style?: React.CSSProperties; 
}

const Tooltip: React.FC<TooltipProps> = ({ text, visible, style }) => {
    return (
        <div
            className={`absolute bg-black text-white text-xs rounded p-1 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ zIndex: 10, ...style }}
        >
            {text}
        </div>
    );
};

export default Tooltip;