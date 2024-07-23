import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ icon, className }) => (
 <FontAwesomeIcon icon={icon} className={className} style={{width: '30px', height: '30px'}} />
);

export default Icon;
