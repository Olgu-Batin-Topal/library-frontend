// Custom Components
import { Tag } from "antd";
import AntTable from "./../custom/AntTable";

export default function BooksList({
  books,
  isLoading,
  formData,
  authorVisible = true,
  ...props
}) {
  const columns = [
    {
      title: "Kitap Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Yazar",
      dataIndex: "author_name",
      key: "author_name",
      enabled: authorVisible,
    },
    {
      title: "Kategori",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Yayın Yılı",
      dataIndex: "publication_year",
      key: "publication_year",
    },
    {
      title: "Sayfa Sayısı",
      dataIndex: "page_count",
      key: "page_count",
    },
    {
      title: "Mevcut",
      dataIndex: "is_available",
      key: "is_available",
      render: (text) => (
        <Tag color={text ? "green" : "red"}>{text ? "Evet" : "Hayır"}</Tag>
      ),
    },
  ];

  return (
    <AntTable
      rowKey="id"
      columns={columns}
      dataSource={books}
      loading={isLoading}
      pagination={false}
      {...props}
    />
  );
}
