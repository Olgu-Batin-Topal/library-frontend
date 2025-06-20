import React, { useState } from "react";

// Ant Design
import { Form, Button, Card, Skeleton, Modal } from "antd";
import { BookOutlined } from "@ant-design/icons";

// Hooks
import { useAuthors } from "./../hooks/authors/useAuthors";
import { useAuthorBooks } from "./../hooks/authors/useAuthorBooks";
import { useDeleteAuthor } from "./../hooks/authors/useDeleteAuthor";

// Components
import AuthorsList from "./../components/authors/List";
import AuthorsForm from "./../components/authors/Form";
import BooksList from "./../components/books/List";

export default function Authors() {
  const [authorForm] = Form.useForm();

  // States
  const [visibleForm, setVisibleForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedAuthor, setSelectedAuthor] = useState({});

  // Hooks
  const {
    data: authorsData,
    isLoading: isLoadingAuthors,
    error: authorsError,
  } = useAuthors();
  const { data: authorBooksData } = useAuthorBooks(selectedAuthor.id);
  const { mutate: deleteAuthor } = useDeleteAuthor();

  // Error handling
  if (authorsError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-900">
        <p className="text-red-500 text-center">
          {authorsError?.message || "Beklenmeyen bir hata oluştu."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto">
        <Skeleton loading={isLoadingAuthors} active>
          <Card title="Yazarlar">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">
                Yazarlarınızı buradan yönetebilirsiniz.
              </p>

              <div>
                <Button
                  color="orange"
                  variant="solid"
                  onClick={() => setVisibleForm(true)}
                >
                  Yeni Yazar Ekle
                </Button>
              </div>
            </div>

            <AuthorsList
              authors={authorsData}
              isLoading={isLoadingAuthors}
              editAction={(record) => {
                authorForm.setFieldsValue({
                  name: record.name,
                  email: record.email,
                });

                setSelectedAuthor(record);
                setVisibleForm(true);
              }}
              deleteAction={(record) => {
                deleteAuthor(record.id);
              }}
              extraButtons={(record) => (
                <>
                  <Button
                    color="orange"
                    variant="solid"
                    size="small"
                    onClick={() => {
                      setSelectedAuthor(record);
                      console.log("Selected Author:", record);
                    }}
                  >
                    <BookOutlined />
                  </Button>
                </>
              )}
            />
          </Card>
        </Skeleton>
      </div>

      {/* Form Drawer */}
      <AuthorsForm
        form={authorForm}
        open={visibleForm}
        setOpen={setVisibleForm}
        formData={formData}
        setFormData={setFormData}
        selectedAuthor={selectedAuthor}
        setSelectedAuthor={setSelectedAuthor}
      />

      {/* Author Books List */}
      <Modal
        width={"70%"}
        centered
        title={`${selectedAuthor.name} Kitapları`}
        open={!!selectedAuthor.id}
        onCancel={() => setSelectedAuthor({})}
        footer={null}
      >
        <Skeleton loading={!authorBooksData} active>
          <BooksList
            className="mb-4"
            books={authorBooksData || []}
            isLoading={!authorBooksData}
            authorVisible={false}
            createdTimeStamp={false}
            updatedTimeStamp={false}
            editAction={(record) => {}}
            deleteAction={(record) => {}}
            pagination={true}
          />
        </Skeleton>
      </Modal>
    </>
  );
}
