import React from 'react';

export const Section: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => {
	return <section className="px-content-side-width">{children}</section>;
};
