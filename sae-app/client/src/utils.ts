export function refresh(force?: boolean): void {
    window.location.reload(!!force);
}

export default refresh;
