import React, { useEffect, useState } from "react";

// Ant Design
import {
  Form,
  Button,
  Card,
  Skeleton,
  Pagination,
  Input,
  Tour,
  Alert,
  Space,
} from "antd";

// Moment
import moment from "./../helpers/moment";

// React Router
import { useNavigate } from "react-router-dom";

// Hooks
import { useBooks } from "./../hooks/books/useBooks";
import { useDeleteBook } from "./../hooks/books/useDeleteBook";
import { useAuthors } from "./../hooks/authors/useAuthors";
import { useCategories } from "./../hooks/categories/useCategories";

// Components
import BooksList from "./../components/books/List";
import BooksForm from "./../components/books/Form";

export default function Books() {
  // Navigation
  const navigate = useNavigate();

  // Form
  const [bookForm] = Form.useForm();

  // States
  const [visibleTour, setVisibleTour] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedBook, setSelectedBook] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Hooks
  const { data: authorsData } = useAuthors();
  const { data: categoriesData } = useCategories();
  const {
    data: booksData,
    isLoading: isLoadingBooks,
    refetch: booksRefetch,
    error: booksError,
  } = useBooks({ search: searchQuery, page: currentPage });
  const { mutate: deleteBook } = useDeleteBook();

  useEffect(() => {
    if (currentPage || searchQuery) {
      booksRefetch();
    }
  }, [currentPage, searchQuery]);

  // Error handling
  if (booksError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-900">
        <p className="text-red-500 text-center">
          {booksError?.message || "Beklenmeyen bir hata oluştu."}
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (!localStorage.getItem("books-tour")) {
      setVisibleTour(true);
      localStorage.setItem("books-tour", true);
    }
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <Skeleton loading={isLoadingBooks} active>
          <Space direction="vertical" className="w-full">
            {authorsData?.length === 0 && (
              <Alert
                message="Yazar bulunamadı"
                description="Kitap eklemek için en az bir yazar eklemeniz gerekiyor. Buraya tıklayarak yazar ekleme sayfasına gidebilirsiniz."
                type="warning"
                showIcon
                closable
                className="cursor-pointer"
                onClick={() =>
                  navigate("/authors", { state: { visibleForm: true } })
                }
              />
            )}

            {categoriesData?.length === 0 && (
              <Alert
                message="Kategori bulunamadı"
                description="Kitap eklemek için en az bir kategori eklemeniz gerekiyor. Buraya tıklayarak kategori ekleme sayfasına gidebilirsiniz."
                type="warning"
                showIcon
                closable
                className="cursor-pointer"
                onClick={() =>
                  navigate("/categories", { state: { visibleForm: true } })
                }
              />
            )}

            <Card title="Kitaplar">
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-500">
                  Kitaplarınızı buradan yönetebilirsiniz.
                </p>

                <div className="flex items-center gap-2">
                  <Input.Search
                    placeholder="Kitap ara..."
                    allowClear
                    onSearch={(value) => {
                      setSearchQuery(value);
                    }}
                  />

                  <Button
                    color="orange"
                    variant="solid"
                    onClick={() => setVisibleForm(true)}
                    data-tour="new-book-button"
                  >
                    Yeni Kitap Ekle
                  </Button>
                </div>
              </div>

              <BooksList
                className="mb-4"
                books={booksData?.data}
                isLoading={isLoadingBooks}
                createdTimeStamp={false}
                updatedTimeStamp={false}
                editAction={(record) => {
                  bookForm.setFieldsValue({
                    title: record.title,
                    author_id: record.author_id,
                    category_id: record.category_id,
                    isbn: record.isbn,
                    publication_year: moment(record.publication_year),
                    page_count: record.page_count,
                  });

                  setSelectedBook(record);
                  setVisibleForm(true);
                }}
                deleteAction={(record) => {
                  deleteBook(record.id);
                }}
              />

              <Pagination
                total={booksData?.pagination?.total_items || 0}
                defaultPageSize={booksData?.pagination?.per_page || 10}
                defaultCurrent={currentPage}
                showTotal={(total) => `Toplam ${total} kitap`}
                showSizeChanger={false}
                onChange={(page, pageSize) => {
                  setCurrentPage(page);
                }}
              />
            </Card>
          </Space>
        </Skeleton>
      </div>

      {/* Form Drawer */}
      <BooksForm
        form={bookForm}
        open={visibleForm}
        setOpen={setVisibleForm}
        formData={formData}
        setFormData={setFormData}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        authors={authorsData || []}
        categories={categoriesData || []}
      />

      {/* Tour */}
      <Tour
        open={visibleTour}
        onClose={() => setVisibleTour(false)}
        disabledInteraction={true}
        zIndex={9999}
        steps={[
          {
            title: "Kitaplar",
            description: "Bu sayfada kitaplarınızı yönetebilirsiniz.",
            target: () => null,
          },
          {
            title: "Yeni Kitap Ekle",
            description: "Yeni bir kitap eklemek için bu butona tıklayın.",
            target: () =>
              document.querySelector('[data-tour="new-book-button"]'),
          },
          {
            title: "Kitap Listesi",
            description: "Kitaplarınızın listelendiği alandır.",
            target: () => document.querySelector(".ant-card-body"),
          },
          {
            title: "Kitap Arama",
            description:
              "Kitaplarınızı aramak için bu alanı kullanabilirsiniz.",
            target: () => document.querySelector(".ant-input-search"),
          },
        ]}
      />
    </>
  );
}
