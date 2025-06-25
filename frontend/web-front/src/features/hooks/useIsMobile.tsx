import { useEffect, useState } from 'react';

export default function useIsMobile(breakpoint = 640) {
	const [isMobile, setIsMobile] = useState<boolean>(() => {
		if (typeof window !== 'undefined') {
			return window.innerWidth < breakpoint;
		}
		return false;
	});

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < breakpoint);
		};

		handleResize();

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [breakpoint]);

	return isMobile;
}
