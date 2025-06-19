import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  onClick = null,
  ...props 
}) => {
  const baseClasses = 'card';
  const hoverClasses = hover ? 'hover:scale-[1.02] cursor-pointer' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  const Component = onClick ? motion.div : 'div';
  const motionProps = onClick ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    onClick
  } : {};

  return (
    <Component
      className={classes}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;