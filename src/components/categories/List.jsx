// Custom Components
import AntTable from "./../custom/AntTable";

export default function CategoriesList({
  categories,
  isLoading,
  formData,
  ...props
}) {
  const columns = [
    {
      title: "Kategori Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <AntTable
      rowKey="id"
      columns={columns}
      dataSource={categories}
      loading={isLoading}
      pagination={false}
      {...props}
    />
  );
}
