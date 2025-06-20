import React, { useEffect, useState } from "react";

// Ant Design
import { Form, Button, Card, Skeleton, Modal, Tour, Tooltip } from "antd";
import { BookOutlined } from "@ant-design/icons";

// React Router
import { useLocation } from "react-router-dom";

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
  const [visibleTour, setVisibleTour] = useState(false);
  const [visibleForm, setVisibleForm] = useState(
    useLocation().state?.visibleForm || false
  );
  const [formData, setFormData] = useState({});
  const [selectedAuthor, setSelectedAuthor] = useState({});
  const [visibleBooks, setVisibleBooks] = useState(false);

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
                  data-tour="new-author-button"
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
                  <Tooltip
                    title="Yazarın Kitapları"
                    placement="top"
                    arrow={true}
                  >
                    <Button
                      color="orange"
                      variant="solid"
                      size="small"
                      onClick={() => {
                        setSelectedAuthor(record);
                        setVisibleBooks(true);
                      }}
                    >
                      <BookOutlined />
                    </Button>
                  </Tooltip>
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
        open={visibleBooks}
        onCancel={() => setVisibleBooks(false)}
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

      {/* Tour */}
      <Tour
        open={visibleTour}
        onClose={() => setVisibleTour(false)}
        disabledInteraction={true}
        zIndex={9999}
        steps={[
          {
            title: "Yazarlar",
            description: "Bu sayfada yazarlarınızı yönetebilirsiniz.",
            target: () => null,
          },
          {
            title: "Yeni Yazar Ekle",
            description: "Yeni bir yazar eklemek için bu butona tıklayın.",
            target: () =>
              document.querySelector('[data-tour="new-author-button"]'),
          },
          {
            title: "Yazar Listesi",
            description:
              "Yazarlarınızın listesini buradan görüntüleyebilir, düzenleyebilir veya silebilirsiniz.",
            target: () => document.querySelector(".ant-card-body"),
          },
        ]}
      />
    </>
  );
}
