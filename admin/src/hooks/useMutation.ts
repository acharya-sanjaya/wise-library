import { useState } from "react";

interface MutationResult<T> {
    mutate: (data: T) => Promise<void>;
    loading: boolean;
    error: Error | null;
}

const useMutation = <T>(url: string): MutationResult<T> => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (data: T) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
};

export default useMutation;
