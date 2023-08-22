import { HalfMoon, SunLight } from 'iconoir-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

export const ChangeDarkModeButton: React.FC = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => setMounted(true), []);
	return (
		<>
			<button
				aria-label="DarkModeToggle"
				type="button"
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			>
				{mounted && <>{theme === 'dark' ? <HalfMoon /> : <SunLight />}</>}
			</button>
		</>
	);
};
