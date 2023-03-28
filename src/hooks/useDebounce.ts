import {useCallback, useRef} from "react";

interface IUseDebounce {
	(callback: ()=> void, delay: number): () => void
}


export const useDebounce:IUseDebounce = (callback, delay) => {
	const timer = useRef<number>()

	return useCallback(() => {
		if (timer.current === null) return
		if (timer.current) {
			clearTimeout(timer.current)
		}
		timer.current = window.setTimeout(() => {
			callback()
		}, delay);

	}, [callback, delay]);


};