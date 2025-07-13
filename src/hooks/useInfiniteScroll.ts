import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void) {
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!sentinelRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) callback();
            },
            { rootMargin: "400px" }, // срабатывает чуть раньше, чем достигли низа
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [callback]);

    return sentinelRef;
}
