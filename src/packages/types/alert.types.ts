export type Alert = { type: Exclude<AlertState['type'], null>; message: string };

export type AlertState = {
    open: boolean;
    message: string;
    type: 'error' | 'success' | 'warning' | 'info' | null;
}

export type AlertContextType = {
    state: AlertState;
    setAlert: ({ type, message }: Alert) => void;
    closeAlert: () => void;
    removeAlert: () => void;
};