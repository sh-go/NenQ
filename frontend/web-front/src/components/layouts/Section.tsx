import React from 'react';

type Props = {
	children: React.ReactNode;
};

export default function Section({ children }: Props): React.JSX.Element {
	return <section className="px-content-side-width">{children}</section>;
}
