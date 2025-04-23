import { __, handleTableChange } from "@/lib/utils";
import { QueryResultType, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { Table } from "antd";

type DatatableType = {
  queryResult: QueryResultType;
  route: string;
  columns: object[];
};

export default function Datatable({ queryResult, route, columns }: DatatableType) {
  const { locale } = usePage<SharedData>().props;

  return (
    <Table
      // bordered
      rowKey="id"
      style={{
        marginBottom: -16,
      }}
      onChange={(pagination, filter, sorter) => handleTableChange(queryResult, route, pagination, sorter)}
      size="small"
      scroll={{ x: "max-content" }}
      columns={columns}
      dataSource={queryResult.data}
      pagination={{
        size: "default",
        current: queryResult.page,
        total: queryResult.total,
        pageSize: queryResult.size,
        responsive: true,
        showSizeChanger: true,
        showTotal: (total, range) => __(locale, "lang.total_data_table", { from: range[0], to: range[1], total }),
      }}
    />
  );
}
