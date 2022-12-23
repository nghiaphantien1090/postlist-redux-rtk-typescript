import { ReactElement } from "react";

export function PostManager({ children }: { children: ReactElement }) {
    return (
        <div className=" flex">
            {children}
        </div>
    )
}