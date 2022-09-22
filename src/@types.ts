export interface AppProps {
    moveBall: React.Dispatch<React.SetStateAction<number>>;
    ballValue: number;
    text: string;
};

export interface ExpressError {
    status?: number;
    message?: string;
};