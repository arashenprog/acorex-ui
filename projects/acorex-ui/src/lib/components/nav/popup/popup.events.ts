export interface ClosingEventArgs {
    cancel?: boolean;
    data?: any;
}

export interface ClosingAction {
    cancel?: boolean;
    data?: any;
    resolve: () => void;
}

export interface ClosedEventArgs {
    data?: any;
}

