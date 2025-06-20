// Custom Components
import AntTable from "./../custom/AntTable";

export default function AuthorsList({
  authors,
  isLoading,
  formData,
  extraButtons = null,
  ...props
}) {
  const columns = [
    {
      title: "Ad",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-posta",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <AntTable
      rowKey="id"
      columns={columns}
      dataSource={authors}
      loading={isLoading}
      pagination={false}
      extraButtons={extraButtons}
      {...props}
    />
  );
}
