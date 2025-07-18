import React, { useEffect, useState } from 'react';
import { getCoffees, addCoffee, updateCoffee, deleteCoffee } from '../services/api';
import CoffeeCard from '../components/CoffeeCard';
import CoffeeForm from '../components/CoffeeForm';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { FaMugHot } from 'react-icons/fa';

export default function Home() {
  const [coffees, setCoffees] = useState([]);
  const [filteredCoffees, setFilteredCoffees] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadCoffees = async () => {
    setLoading(true);
    try {
      const res = await getCoffees();
      setCoffees(res.data);
      setFilteredCoffees(res.data);
    } catch (error) {
      toast.error("Failed to load coffees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoffees();
  }, []);

  useEffect(() => {
    const results = coffees.filter(coffee =>
      coffee.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coffee.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coffee.ingredients?.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredCoffees(results);
  }, [searchTerm, coffees]);

  const handleSave = async (data) => {
    try {
      if (editing) {
        await updateCoffee(editing.id, data);
        toast.success("☕ Coffee updated successfully!");
      } else {
        await addCoffee(data);
        toast.success("☕ Coffee added successfully!");
      }
      setEditing(null);
      setShowForm(false);
      loadCoffees();
    } catch (err) {
      toast.error("Error saving coffee");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coffee?")) {
      try {
        await deleteCoffee(id);
        toast.success("Coffee deleted");
        loadCoffees();
      } catch (err) {
        toast.error("Error deleting coffee");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-4 md:p-8">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-full shadow-sm">
              <FaMugHot className="text-amber-700 text-2xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900">
              Coffee Explorer
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search coffees..."
                className="pl-10 pr-4 py-2 w-full rounded-full border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => { setEditing(null); setShowForm(true); }} 
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <FiPlus />
              Add Coffee
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {showForm && (
          <CoffeeForm
            initialData={editing}
            onSave={handleSave}
            onCancel={() => { setEditing(null); setShowForm(false); }}
          />
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : filteredCoffees.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <FaMugHot className="text-amber-600 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-amber-800 mb-2">
              {searchTerm ? 'No matching coffees found' : 'No coffees available'}
            </h3>
            <p className="text-amber-600 mb-4">
              {searchTerm ? 'Try a different search term' : 'Add your first coffee to get started'}
            </p>
            {!searchTerm && (
              <button 
                onClick={() => { setEditing(null); setShowForm(true); }} 
                className="bg-amber-500 text-white px-5 py-2 rounded-full shadow hover:bg-amber-600"
              >
                Create Coffee
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCoffees.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                coffee={coffee}
                onEdit={() => { setEditing(coffee); setShowForm(true); }}
                onDelete={() => handleDelete(coffee.id)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto mt-10 pt-6 border-t border-amber-200 text-center text-amber-700 text-sm">
        <p>☕ Enjoy your coffee journey! · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}