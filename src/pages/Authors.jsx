import React, { useState } from "react";

// Ant Design
import { Form, Button, Card, Skeleton } from "antd";

// Hooks
import { useAuthors } from "./../hooks/authors/useAuthors";
import { useDeleteAuthor } from "./../hooks/authors/useDeleteAuthor";

// Components
import AuthorsList from "./../components/authors/List";
import AuthorsForm from "./../components/authors/Form";

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
    </>
  );
}
