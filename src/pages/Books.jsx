import React, { useState } from "react";

// Ant Design
import { Form, Button, Card, Skeleton } from "antd";

// Moment
import moment from "./../helpers/moment";

// Hooks
import { useBooks } from "./../hooks/books/useBooks";
import { useDeleteBook } from "./../hooks/books/useDeleteBook";
import { useAuthors } from "./../hooks/authors/useAuthors";
import { useCategories } from "./../hooks/categories/useCategories";

// Components
import BooksList from "./../components/books/List";
import BooksForm from "./../components/books/Form";

export default function Books() {
  const [bookForm] = Form.useForm();

  // States
  const [visibleForm, setVisibleForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedBook, setSelectedBook] = useState({});

  // Hooks
  const { data: authorsData } = useAuthors();
  const { data: categoriesData } = useCategories();
  const {
    data: booksData,
    isLoading: isLoadingBooks,
    error: booksError,
  } = useBooks();
  const { mutate: deleteBook } = useDeleteBook();

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

  return (
    <>
      <div className="container mx-auto">
        <Skeleton loading={isLoadingBooks} active>
          <Card title="Kitaplar">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">
                Kitaplarınızı buradan yönetebilirsiniz.
              </p>

              <div>
                <Button
                  color="orange"
                  variant="solid"
                  onClick={() => setVisibleForm(true)}
                >
                  Yeni Kitap Ekle
                </Button>
              </div>
            </div>

            <BooksList
              books={booksData}
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
          </Card>
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
    </>
  );
}
