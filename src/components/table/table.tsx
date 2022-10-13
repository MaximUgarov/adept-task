import { memo } from "react";
import type { RefObject, ReactNode } from "react";

interface Props {
    children: Array<JSX.Element>,
    columns: Array<string | ReactNode>,
    paginationRef: RefObject<HTMLDivElement>,
}



function TableComponent({ children, paginationRef, columns }: Props) {
    // eslint-disable-next-line no-console
    console.log("render", columns);
    return <div className="table-container">
        {children[0]}
        <div className="table-wrapper" ref={paginationRef}>
            <table>
                <tbody>
                    <tr>
                        {columns.map((column, i) => <th key={i}>{column}</th>)}
                    </tr>
                    {children[1]}
                </tbody>
            </table>
        </div>
    </div>;
}

export default memo(TableComponent);