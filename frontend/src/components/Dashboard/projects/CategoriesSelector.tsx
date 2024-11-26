import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: string;
  name: string;
}

interface CategoriesSelectorProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  categoriesSelected: Category[];
  setCategoriesSelected: (categories: Category[]) => void;
  preSelectedCategories?: Category[]; // Propiedad opcional para las categorías preseleccionadas
}

const CategoriesSelector: React.FC<CategoriesSelectorProps> = ({
  categories,
  setCategories,
  categoriesSelected,
  setCategoriesSelected,
  preSelectedCategories = [], // Inicialización por defecto
}) => {
  const [categorySearch, setCategorySearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [initialized, setInitialized] = useState(false); // Controla si las categorías preseleccionadas ya se han manejado

  // Log de los props iniciales
  useEffect(() => {
  }, [categories, categoriesSelected, preSelectedCategories]);

  // Convertir todos los ids a tipo string para comparar correctamente
  const normalizeCategories = (categories: Category[]): Category[] => {
    return categories.map((category) => ({
      ...category,
      id: category.id.toString(),
    }));
  };

  // Inicializa las categorías seleccionadas si se pasan preseleccionadas
  useEffect(() => {
    if (!initialized && preSelectedCategories.length > 0) {
      const normalizedCategories = normalizeCategories(categories);
      const normalizedPreSelectedCategories = normalizeCategories(preSelectedCategories);

      const remainingCategories = normalizedCategories.filter(
        (cat) =>
          !normalizedPreSelectedCategories.some((preSelected) => preSelected.id === cat.id)
      );

      setCategoriesSelected(normalizedPreSelectedCategories);
      setCategories(remainingCategories);
      setInitialized(true); // Marcar como inicializado para evitar re-ejecuciones
    }
  }, [preSelectedCategories, categories, initialized, setCategories, setCategoriesSelected]);

  useEffect(() => {
    // Filtra las categorías para que no incluyan las ya seleccionadas
    const normalizedCategories = normalizeCategories(categories);
    const normalizedCategoriesSelected = normalizeCategories(categoriesSelected);

    setFilteredCategories(
      normalizedCategories.filter(
        (category) =>
          category.name.toLowerCase().includes(categorySearch.toLowerCase()) &&
          !normalizedCategoriesSelected.some((selected) => selected.id === category.id)
      )
    );
  }, [categorySearch, categories, categoriesSelected]);

  const handleCategorySearch = (search: string) => {
    setCategorySearch(search);
  };

  const addCategory = (category: Category) => {
    if (!categoriesSelected.some((cat) => cat.id === category.id)) {
      setCategoriesSelected([...categoriesSelected, category]);
      setCategories(categories.filter((cat) => cat.id !== category.id));
      setCategorySearch("");
    }
  };

  const removeCategory = (categoryId: string) => {
    const category = categoriesSelected.find((cat) => cat.id === categoryId);
    if (category) {
      setCategories([...categories, category]);
      setCategoriesSelected(
        categoriesSelected.filter((cat) => cat.id !== categoryId)
      );
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
      <label className="block text-lg font-semibold text-gray-700">Categorías</label>
      <input
        type="text"
        value={categorySearch}
        onChange={(e) => handleCategorySearch(e.target.value)}
        className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
        placeholder="Buscar categorías..."
      />
      {filteredCategories.length > 0 && (
        <ul className="bg-gray-50 border border-gray-200 rounded-md p-2 space-y-2 max-h-40 overflow-y-auto">
          {filteredCategories.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => addCategory(category)}
                className="w-full text-left px-3 py-1 text-gray-700 hover:bg-blue-100 rounded-md transition-colors"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Categorías seleccionadas:</p>
        <ul className="space-y-2">
          <AnimatePresence>
            {categoriesSelected.length > 0 ? (
              categoriesSelected.map((category) => (
                <motion.li
                  key={category.id}
                  className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-md p-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-blue-700 font-medium">{category.name}</span>
                  <button
                    type="button"
                    onClick={() => removeCategory(category.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrashAlt />
                  </button>
                </motion.li>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No hay categorías seleccionadas</p>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default CategoriesSelector;
