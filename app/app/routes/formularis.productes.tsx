// app/routes/products.tsx o formularis.productes.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react'; // Assuming useRevalidator might be needed if data revalidation is complex.
import type { Producte } from '~/lib/types'; // Make sure this path is correct
import { ProductesService, ProducteDataInput } from '~/services/productes.services'; // Make sure this path is correct

const initialFormData: ProducteDataInput & { id_producte?: number; databaixa_producte_checkbox?: boolean } = {
  id_client: 1,
  nom_producte: '',
  preu_producte: 0,
  descripcio_producte: '',
  sector_producte: '',
  significatiu_producte: '',
  enquesta_producte: '',
  actiu_producte: true,
  databaixa_producte: undefined,
  databaixa_producte_checkbox: false,
};

export const loader: LoaderFunction = async () => {
  try {
    const productsFromService = await ProductesService.getAll();
    return json({ products: productsFromService, error: null });
  } catch (error: any) {
    console.error('Error loading products:', error);
    return json({
      products: [],
      error: error.message || 'Error al cargar los productos. Por favor, inténtelo de nuevo.'
    });
  }
};

export default function ProductsPage() {
  const { products: initialProducts, error: loaderError } = useLoaderData<{ products: Producte[]; error: string | null }>();
  const navigation = useNavigation();
  // const revalidator = useRevalidator(); // Uncomment if you implement revalidation like in campaigns

  const [products, setProducts] = useState<Producte[]>(initialProducts);
  const [activeTab, setActiveTab] = useState<'list' | 'new' | 'edit'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Producte | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<ProducteDataInput & { id_producte?: number; databaixa_producte_checkbox?: boolean }>(initialFormData);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string | null }>({
    type: null,
    text: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    if (message.type) {
      const timer = setTimeout(() => setMessage({ type: null, text: null }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        product.id_producte.toString().includes(term) ||
        product.nom_producte.toLowerCase().includes(term) ||
        product.id_client.toString().includes(term) ||
        (product.sector_producte && product.sector_producte.toLowerCase().includes(term))
      );
    });
  }, [products, searchTerm]);

  const resetFormAndState = () => {
    setFormData(initialFormData);
    setSelectedProduct(null); // Deselect product when resetting
    setMessage({ type: null, text: null });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = name === 'preu_producte' ? parseFloat(value) : parseInt(value, 10);
    setFormData(prev => ({ ...prev, [name]: isNaN(numValue) ? '' : numValue }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'databaixa_producte_checkbox') {
      setFormData(prev => ({
        ...prev,
        databaixa_producte_checkbox: checked,
        databaixa_producte: checked ? (prev.databaixa_producte || new Date().toISOString().split('T')[0]) : undefined,
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: checked }));
    }
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value || undefined }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom_producte || formData.preu_producte < 0) {
      setMessage({ type: 'error', text: 'Nombre del producto y precio (>=0) son obligatorios.' });
      return;
    }
    setIsLoading(true);
    setMessage({type: null, text: null});

    const { id_producte, databaixa_producte_checkbox, ...dataToSubmit } = formData;
    const finalDataToSubmit: ProducteDataInput = {
      ...dataToSubmit,
      databaixa_producte: databaixa_producte_checkbox && dataToSubmit.databaixa_producte 
                          ? dataToSubmit.databaixa_producte 
                          : undefined,
    };
    
    try {
      if (activeTab === 'edit' && id_producte) {
        const updatedProduct = await ProductesService.update(id_producte, finalDataToSubmit);
        // Optimistically update UI or revalidate
        setProducts(prev => prev.map(p => p.id_producte === id_producte ? { ...p, ...updatedProduct } : p));
        setMessage({ type: 'success', text: `Producto "${updatedProduct.nom_producte}" actualizado.` });
      } else {
        const newProduct = await ProductesService.create(finalDataToSubmit);
        // Optimistically update UI or revalidate
        setProducts(prev => [...prev, newProduct]);
        setMessage({ type: 'success', text: `Producto "${newProduct.nom_producte}" creado.` });
      }
      setActiveTab('list');
      resetFormAndState();
      // revalidator.revalidate(); // If using revalidator
    } catch (err: any) {
      console.error("Error guardando producto:", err);
      setMessage({ type: 'error', text: `Error al guardar: ${err.message || 'Error desconocido'}` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: number, productName: string) => {
    if (window.confirm(`¿Está seguro de que desea eliminar "${productName}" (ID: ${productId})? Esta acción no se puede deshacer.`)) {
      setIsLoading(true);
      setMessage({type: null, text: null});
      try {
        await ProductesService.delete(productId);
        setProducts(prev => prev.filter(p => p.id_producte !== productId));
        setMessage({ type: 'success', text: `Producto "${productName}" eliminado.` });
        if (selectedProduct?.id_producte === productId) {
          setSelectedProduct(null);
          if (activeTab === 'edit') {
             setActiveTab('list'); // Go to list if the edited item was deleted
          }
        }
        // revalidator.revalidate(); // If using revalidator
      } catch (err: any) {
        console.error("Error eliminando producto:", err);
        setMessage({ type: 'error', text: `Error al eliminar: ${err.message || 'Error desconocido'}` });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditClick = (product: Producte) => {
    setSelectedProduct(product); // Keep product selected
    setFormData({
      id_producte: product.id_producte,
      id_client: product.id_client,
      nom_producte: product.nom_producte,
      preu_producte: product.preu_producte,
      descripcio_producte: product.descripcio_producte || '',
      sector_producte: product.sector_producte || '',
      significatiu_producte: product.significatiu_producte || '',
      enquesta_producte: product.enquesta_producte || '',
      actiu_producte: product.actiu_producte,
      databaixa_producte: product.databaixa_producte ? product.databaixa_producte.split('T')[0] : undefined,
      databaixa_producte_checkbox: !!product.databaixa_producte,
    });
    setActiveTab('edit');
    setMessage({type: null, text: null});
  };
  
  const handleNewClick = () => {
    resetFormAndState();
    setActiveTab('new');
  };

  const isSubmitting = navigation.state === "submitting" || isLoading;

  const renderProductForm = () => (
    // Using campaign form section styling
    <form onSubmit={handleSubmitForm} className="space-y-6">
      {activeTab === 'edit' && formData.id_producte && (
        <input type="hidden" name="id" value={formData.id_producte} />
      )}

      {/* Información Básica - Formato horizontal */}
      <div className="p-4 rounded border border-gray-100 bg-gray-50">
        <h4 className="text-lg font-medium mb-4 text-gray-600">Información Básica</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="id_client" className="block text-sm font-medium text-gray-700 mb-1">ID del Cliente *</label>
            <input
              type="number"
              name="id_client"
              id="id_client"
              value={formData.id_client}
              onChange={handleNumberChange}
              min="1"
              step="1"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="nom_producte" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto *</label>            
            <input
              type="text"
              name="nom_producte"
              id="nom_producte"
              value={formData.nom_producte}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>
      
      {/* Detalles del Producto */}
      <div className="p-4 rounded border border-gray-100 bg-gray-50">
        <h4 className="text-lg font-medium mb-4 text-gray-600">Detalles del Producto</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="preu_producte" className="block text-sm font-medium text-gray-700 mb-1">Precio (€) *</label>
            <div className="relative mt-1"> {/* Removed shadow-sm from campaign, can add back if needed */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">€</span>
              </div>
              <input
                type="number"
                name="preu_producte"
                id="preu_producte"
                value={formData.preu_producte}
                onChange={handleNumberChange}
                min="0"
                step="0.01"
                required
                className="w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="sector_producte" className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
            <input
              type="text"
              name="sector_producte"
              id="sector_producte"
              value={formData.sector_producte}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6"> {/* Single column for textareas */}
           <div>
            <label htmlFor="descripcio_producte" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              name="descripcio_producte"
              id="descripcio_producte"
              value={formData.descripcio_producte}
              onChange={handleInputChange}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Descripción detallada del producto..."
            />
          </div>
           <div>
            <label htmlFor="significatiu_producte" className="block text-sm font-medium text-gray-700 mb-1">Significativo</label>
            <textarea // Changed to textarea for consistency if it can be long
              name="significatiu_producte"
              id="significatiu_producte"
              value={formData.significatiu_producte}
              onChange={handleInputChange}
              rows={2}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Aspectos significativos..."
            />
          </div>
           <div>
            <label htmlFor="enquesta_producte" className="block text-sm font-medium text-gray-700 mb-1">Encuesta</label>
            <textarea
              name="enquesta_producte"
              id="enquesta_producte"
              value={formData.enquesta_producte}
              onChange={handleInputChange}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Preguntas o resultados de encuestas..."
            />
          </div>
        </div>
      </div>

      {/* Estado y Fecha de Baja */}
      <div className="p-4 rounded border border-gray-100 bg-gray-50">
        <h4 className="text-lg font-medium mb-4 text-gray-600">Estado y Programación</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3"> {/* Adjusted spacing */}
                 <label className="flex items-center cursor-pointer">
                    <input
                        id="actiu_producte"
                        name="actiu_producte"
                        type="checkbox"
                        checked={formData.actiu_producte}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4 shadow-sm"
                    />
                    <span className="ml-2 text-sm text-gray-700">Producto Activo</span>
                </label>
                 <label className="flex items-center cursor-pointer">
                    <input
                        id="databaixa_producte_checkbox"
                        name="databaixa_producte_checkbox"
                        type="checkbox"
                        checked={formData.databaixa_producte_checkbox}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4 shadow-sm"
                    />
                    <span className="ml-2 text-sm text-gray-700">Configurar Fecha de Baja</span>
                </label>
            </div>
            <div>
                {formData.databaixa_producte_checkbox && (
                  <div > {/* Removed mt-3 pl-7, integrated into grid */}
                    <label htmlFor="databaixa_producte" className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Baja
                    </label>
                    <input
                      type="date"
                      name="databaixa_producte"
                      id="databaixa_producte"
                      value={formData.databaixa_producte || ''}
                      onChange={handleDateChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                )}
            </div>
        </div>
      </div>
      
      {/* Notas - Optional, similar to Campaign's Observaciones */}
      {/* <div className="p-4 rounded border border-gray-100 bg-gray-50">
        <h4 className="text-lg font-medium mb-4 text-gray-600">Notas Adicionales</h4>
        <textarea name="notes_producte" rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
      </div> */}

      {/* Botones de acción - Using campaign button styling */}
      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => { setActiveTab('list'); resetFormAndState(); }}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
        >
          Cancelar
        </button>
        {/* Optional: Limpiar button if needed
        <button
          type="button"
          onClick={resetFormAndState} // or specific form fields reset
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
        >
          Limpiar
        </button>
        */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </span>
          ) : (activeTab === 'edit' ? 'Actualizar Producto' : 'Guardar Producto')}
        </button>
      </div>
    </form>
  );

  return (
    <div className="products-container p-4 md:p-6 max-w-screen-2xl mx-auto"> {/* Consistent with campaign container */}
      {/* Header con título y navegación de pestañas en una sola línea - Campaign Style */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Gestión de Productos</h2> {/* Campaign title style */}
        
        <div className="flex border border-gray-300 rounded-lg bg-white shadow-sm"> {/* Campaign tab group style */}
          <button
            className={`py-2 px-4 font-medium rounded-l-lg ${activeTab === 'list' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => { setActiveTab('list'); resetFormAndState();}} // Ensure reset when switching to list
            disabled={isSubmitting}
          >
            Lista
          </button>
          <button
            className={`py-2 px-4 font-medium border-l border-gray-300 ${activeTab === 'new' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => { handleNewClick(); }}
            disabled={isSubmitting}
          >
            Nuevo
          </button>
          <button
            className={`py-2 px-4 font-medium rounded-r-lg border-l border-gray-300 ${activeTab === 'edit' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'} disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => {
              if (selectedProduct) setActiveTab('edit'); // Only switch if a product is selected
            }}
            disabled={!selectedProduct || isSubmitting}
          >
            Editar
          </button>
        </div>
      </div>
      
      {/* Mensajes de alerta - Campaign Style */}
      {message.text && (
        <div className={`mb-4 p-4 rounded-lg shadow-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}
      
      {loaderError && !message.text && ( // Ensure loader error is displayed if no other message
        <div className="mb-4 p-4 rounded-lg shadow-sm bg-red-50 text-red-700 border border-red-200">
          {loaderError}
        </div>
      )}
      
      {/* Contenido principal */}
      <div className="mb-6"> {/* Added mb-6 for spacing below content block, similar to campaign */}
        {activeTab === 'list' ? (
          // Two-column layout like Campaigns
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Columna izquierda: Búsqueda y tabla de productos */}
            <div className="lg:w-3/5 space-y-4">
              <div className="flex items-center bg-white rounded-lg shadow-sm p-2 border border-gray-200">
                <input
                  type="text"
                  placeholder="Buscar por ID, nombre, cliente o sector..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border-0 focus:outline-none focus:ring-0" // Consistent with campaign search
                  disabled={isSubmitting}
                />
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
              </div>
              
              {isSubmitting && products.length === 0 && (
                <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                  Cargando productos...
                </div>
              )}

              {!isSubmitting && filteredProducts.length === 0 && products.length > 0 && (
                <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                  No se encontraron productos con los criterios de búsqueda.
                </div>
              )}

              {!isSubmitting && products.length === 0 && !loaderError && (
                <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                  Aún no hay productos registrados. ¡Crea uno nuevo!
                </div>
              )}

              {filteredProducts.length > 0 && (
                <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Precio</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr 
                          key={product.id_producte} 
                          className={`${selectedProduct?.id_producte === product.id_producte ? 'bg-primary-50' : 'hover:bg-gray-50'} cursor-pointer transition-colors`}
                          onClick={() => setSelectedProduct(product)}
                        >
                          <td className="py-3 px-4 whitespace-nowrap text-sm">{product.id_producte}</td>
                          <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.nom_producte}</td>
                          <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">{product.preu_producte?.toFixed(2)} €</td>
                          <td className="py-3 px-4 whitespace-nowrap text-sm">
                            <div className="flex items-center space-x-2"> {/* Campaign status style */}
                                <div className={`h-2.5 w-2.5 rounded-full ${product.actiu_producte ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span>{product.actiu_producte ? 'Activo' : 'Inactivo'}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-3"> {/* Campaign action buttons style */}
                              <button
                                className="text-primary-600 hover:text-primary-800 font-medium disabled:opacity-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditClick(product);
                                }}
                                disabled={isSubmitting}
                              >
                                Editar
                              </button>
                              <button
                                className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteProduct(product.id_producte, product.nom_producte);
                                }}
                                disabled={isSubmitting}
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Columna derecha: Detalles del producto seleccionado - Campaign Style */}
            <div className="lg:w-2/5">
              {selectedProduct ? (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-700">
                      Detalles del Producto
                    </h4>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      ID: {selectedProduct.id_producte}
                    </span>
                  </div>
                  
                  {/* Mimic campaign details layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Nombre</h5>
                      <p className="text-sm font-medium">{selectedProduct.nom_producte}</p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">ID Cliente</h5>
                      <p className="text-sm">{selectedProduct.id_client}</p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Precio</h5>
                      <p className="text-sm">{selectedProduct.preu_producte?.toFixed(2)} €</p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Estado</h5>
                      <div className="flex items-center space-x-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${selectedProduct.actiu_producte ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm">{selectedProduct.actiu_producte ? 'Activo' : 'Inactivo'}</span>
                      </div>
                    </div>
                  </div>

                  {selectedProduct.sector_producte && (
                    <div className="mb-4 space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Sector</h5>
                      <p className="text-sm bg-gray-50 p-3 rounded border border-gray-100">{selectedProduct.sector_producte}</p>
                    </div>
                  )}
                  {selectedProduct.descripcio_producte && (
                    <div className="mb-4 space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Descripción</h5>
                      <p className="text-sm bg-gray-50 p-3 rounded border border-gray-100 break-words">{selectedProduct.descripcio_producte}</p>
                    </div>
                  )}
                   {selectedProduct.significatiu_producte && (
                    <div className="mb-4 space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Significativo</h5>
                      <p className="text-sm bg-gray-50 p-3 rounded border border-gray-100 break-words">{selectedProduct.significatiu_producte}</p>
                    </div>
                  )}
                   {selectedProduct.enquesta_producte && (
                    <div className="mb-4 space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Encuesta</h5>
                      <p className="text-sm bg-gray-50 p-3 rounded border border-gray-100 break-words">{selectedProduct.enquesta_producte}</p>
                    </div>
                  )}
                  {selectedProduct.databaixa_producte && (
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Fecha de Baja</h5>
                      <p className="text-sm">{new Date(selectedProduct.databaixa_producte).toLocaleDateString()}</p>
                    </div>
                  )}
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      className="px-4 py-2 bg-primary-50 text-primary-700 rounded border border-primary-200 hover:bg-primary-100 transition-colors"
                       onClick={() => handleEditClick(selectedProduct)} // Already sets to edit tab
                       disabled={isSubmitting}
                    >
                      Editar Producto
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center"> {/* Campaign placeholder style */}
                  <div className="flex justify-center mb-3">
                     {/* Product Icon or Generic Icon */}
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Ningún producto seleccionado</h4>
                  <p className="text-gray-500 text-sm">Selecciona un producto de la lista para ver sus detalles</p>
                </div>
              )}
            </div>
          </div>
        ) : ( // Form view (New or Edit)
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3"> {/* Campaign form title style */}
              <h3 className="text-xl font-semibold text-gray-700">
                {activeTab === 'new' ? 'Crear Nuevo Producto' : 'Editar Producto'}
              </h3>
              {activeTab === 'edit' && selectedProduct && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  ID: {selectedProduct.id_producte}
                </span>
              )}
            </div>
            {renderProductForm()}
          </div>
        )}
      </div>
    </div>
  );
}