import React, { useState, useEffect } from "react";
import { FaTimes, FaCoffee } from "react-icons/fa";

export default function CoffeeForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    image: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        ingredients: initialData.ingredients?.join(", ") || "",
        image: initialData.image || "",
      });
    }
  }, [initialData]);

  useEffect(() => {
    const allFieldsFilled = Object.values(form).every(field => field.trim() !== "");
    
    const hasFormChanged = initialData 
      ? !(
          form.title === initialData.title &&
          form.description === initialData.description &&
          form.ingredients === initialData.ingredients?.join(", ") &&
          form.image === initialData.image
        )
      : false;

    setIsFormValid(initialData ? hasFormChanged : allFieldsFilled);
  }, [form, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      ingredients: form.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i),
    };
    onSave(data);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative animate-fade-in"
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close form"
        >
          <FaTimes size={20} />
        </button>

        <div className="flex items-center mb-6">
          <div className="bg-amber-100 p-2 rounded-lg mr-3">
            <FaCoffee className="text-amber-600 text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? "Edit Coffee" : "Add Coffee"}
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title*
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Espresso"
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Rich, creamy coffee with..."
              rows="3"
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients*
            </label>
            <input
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              placeholder="Coffee beans, milk, sugar (comma separated)"
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL*
            </label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/coffee.jpg"
              className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-5 py-2.5 rounded-lg ${
              isFormValid
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-amber-300 cursor-not-allowed"
            } text-white transition shadow-sm`}
            disabled={!isFormValid}
          >
            {initialData ? "Update" : "Create"} Coffee
          </button>
        </div>
      </form>
    </div>
  );
}