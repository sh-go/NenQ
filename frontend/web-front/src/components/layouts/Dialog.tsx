import React from 'react';

type Props = {
	children: React.ReactNode;
};

export default function Dialog({ children }: Props): React.JSX.Element {
	return <dialog className="w-content-width">{children}</dialog>;
}
