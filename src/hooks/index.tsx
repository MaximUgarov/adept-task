import { useEffect, useRef } from "react";



export function useDynamicPagination(callback: () => void) {
    const refPagination = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refPagination && refPagination.current)
            refPagination.current.addEventListener("scroll", handleScroll);
        return () => {
            if (refPagination && refPagination.current)
                refPagination.current.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function handleScroll(): void {
        if (!refPagination.current) return;
        const { scrollHeight, scrollTop, clientHeight } = refPagination.current;
        const heingt = scrollHeight - (scrollTop + clientHeight);
        if (heingt < 100)
            callback();
    }

    return { refPagination };
}