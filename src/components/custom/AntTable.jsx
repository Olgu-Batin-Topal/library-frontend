// Ant Design
import { Button, Popconfirm, Table, Tag, Tooltip } from "antd";
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
  extraButtons = null,
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
          {extraButtons && typeof extraButtons === "function"
            ? extraButtons(record)
            : extraButtons}

          <Tooltip title="Düzenle" placement="top" arrow={true}>
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
          </Tooltip>

          <Tooltip title="Sil" placement="top" arrow={true}>
            <Popconfirm
              title="Bu kaydı silmek istediğinize emin misiniz?"
              onConfirm={() => deleteAction(record)}
              okText="Evet"
              cancelText="Hayır"
              placement="left"
              okButtonProps={{ danger: true }}
              cancelButtonProps={{ type: "default" }}
              icon={<DeleteOutlined style={{ color: "red" }} />}
            >
              <Button color="red" variant="solid" size="small">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Tooltip>
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
      scroll={{ x: true }}
      {...props}
    />
  );
}
