import React, { useEffect, useState } from "react";

// Ant Design
import { Form, Button, Card, Skeleton, Tour } from "antd";

// React Router
import { useLocation } from "react-router-dom";

// Hooks
import { useCategories } from "./../hooks/categories/useCategories";
import { useDeleteCategory } from "./../hooks/categories/useDeleteCategory";

// Components
import CategoriesList from "./../components/categories/List";
import CategoriesForm from "./../components/categories/Form";

export default function Categories() {
  const [categoryForm] = Form.useForm();

  // States
  const [visibleTour, setVisibleTour] = useState(false);
  const [visibleForm, setVisibleForm] = useState(
    useLocation().state?.visibleForm || false
  );
  const [formData, setFormData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});

  // Hooks
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();

  // Error handling
  if (categoriesError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-900">
        <p className="text-red-500 text-center">
          {categoriesError?.message || "Beklenmeyen bir hata oluştu."}
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (!localStorage.getItem("categories-tour")) {
      setVisibleTour(true);
      localStorage.setItem("categories-tour", true);
    }
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <Skeleton loading={isLoadingCategories} active>
          <Card title="Kategoriler">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">
                Kategorilerinizi buradan yönetebilirsiniz.
              </p>

              <div>
                <Button
                  color="orange"
                  variant="solid"
                  onClick={() => setVisibleForm(true)}
                  data-tour="new-category-button"
                >
                  Yeni Kategori Ekle
                </Button>
              </div>
            </div>

            <CategoriesList
              categories={categoriesData}
              isLoading={isLoadingCategories}
              editAction={(record) => {
                categoryForm.setFieldsValue({
                  name: record.name,
                  description: record.description,
                });

                setSelectedCategory(record);
                setVisibleForm(true);
              }}
              deleteAction={(record) => {
                deleteCategory(record.id);
              }}
            />
          </Card>
        </Skeleton>
      </div>

      {/* Form Drawer */}
      <CategoriesForm
        form={categoryForm}
        open={visibleForm}
        setOpen={setVisibleForm}
        formData={formData}
        setFormData={setFormData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Tour */}
      <Tour
        open={visibleTour}
        onClose={() => setVisibleTour(false)}
        disabledInteraction={true}
        zIndex={9999}
        steps={[
          {
            title: "Kategoriler",
            description: "Bu sayfada kitap kategorilerinizi yönetebilirsiniz.",
            target: () => null,
          },
          {
            title: "Yeni Kategori Ekle",
            description: "Yeni bir kategori eklemek için bu butona tıklayın.",
            target: () =>
              document.querySelector('[data-tour="new-category-button"]'),
          },
          {
            title: "Kategori Listesi",
            description:
              "Kategorilerinizi burada görüntüleyebilir ve yönetebilirsiniz.",
            target: () =>
              document.querySelector(".ant-card-body .ant-table-container"),
          },
        ]}
      />
    </>
  );
}
