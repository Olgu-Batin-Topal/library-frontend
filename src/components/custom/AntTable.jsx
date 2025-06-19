// Ant Design
import { Button, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// Moment
import moment from "./../../helpers/moment";

export default function AntTable({
  columns,
  dataSource,
  loading,
  createdTimeStamp = true,
  updatedTimeStamp = true,
  editAction = () => {},
  deleteAction = () => {},
  ...props
}) {
  const enhancedColumns = [
    {
      title: "#",
      render: (text, record, index) => <Tag color="blue">{index + 1}</Tag>,
    },
    ...columns,
    {
      title: "Eklenme Tarihi",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => {
        return moment(record.created_at).format("DD MMMM YYYY HH:mm");
      },
      enabled: createdTimeStamp,
    },
    {
      title: "Güncelleme Tarihi",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text, record) => {
        return moment(record.updated_at).format("DD MMMM YYYY HH:mm");
      },
      enabled: updatedTimeStamp,
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (text, record) => (
        <div className="flex items-center gap-1">
          <Button
            color="blue"
            variant="solid"
            size="small"
            onClick={() => {
              editAction(record);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            color="red"
            variant="solid"
            size="small"
            onClick={() => {
              deleteAction(record);
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={enhancedColumns.filter((col) => col.enabled !== false)}
      dataSource={dataSource}
      pagination={false}
      {...props}
    />
  );
}
