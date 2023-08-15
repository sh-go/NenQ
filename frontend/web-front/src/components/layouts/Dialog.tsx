import React from 'react';

export const Dialog: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => {
	return <dialog className="w-content-width">{children}</dialog>;
};
