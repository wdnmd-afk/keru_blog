import { TableProps } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { default as React } from 'react';

interface IKTableProps extends TableProps<any> {
    fetchData?: (page: number, pageSize: number) => void;
    loading?: boolean;
    total: number;
    pageSize: number;
    columns: IKTableColumns[];
    stripe?: boolean;
    showCheck?: boolean;
    rowClick?: (record: any) => void;
    rowDoubleClick?: (record: any) => void;
}
export interface IKTableColumns extends ColumnProps<any> {
}
declare const MemoizedKTable: React.MemoExoticComponent<React.ForwardRefExoticComponent<IKTableProps & React.RefAttributes<any>>>;
export default MemoizedKTable;
export type { IKTableProps };
//# sourceMappingURL=index.d.ts.map