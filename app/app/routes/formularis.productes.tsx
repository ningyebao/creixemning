// app/routes/products.tsx
import React, { useState, useEffect } from 'react';
import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Producte } from '~/lib/types';
import { ProductesService } from '~/services/productes.services';

export const loader: LoaderFunction = async () => {
  try {
    // Usamos el método unificado del servicio para obtener los productos.
    const products = await ProductesService.getAll();
    return json({ products, error: null });
  } catch (error) {
    console.error('Error loading products:', error);
    return json({
      products: [],
      error: 'Error al cargar los productos. Por favor, inténtelo de nuevo.'
    });
  }
};

export default function ProductsPage() {
  const { products, error } = useLoaderData<{ products: Producte[]; error: string | null }>();

  const [activeTab, setActiveTab] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState<Producte | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    id_client: 1,
    nom_producte: '',
    preu_producte: 0,
    descripcio_producte: '',
    sector_producte: '',
    significatiu_producte: '',
    enquesta_producte: '',
    actiu_producte: true,
    databaixa_producte: null as string | null,
  });
  const [message, setMessage] = useState<{ type: string | null; text: string | null }>({
    type: null,
    text: null,
  });
  const [loading, setLoading] = useState(false);

  // Filtrar productos según el término de búsqueda
  const filteredProducts = products.filter(product => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      product.id_producte.toString().includes(term) ||
      product.nom_producte.toLowerCase().includes(term) ||
      product.id_client.toString().includes(term) ||
      (product.sector_producte && product.sector_producte.toLowerCase().includes(term))
    );
  });

  // Función para crear un producto usando ProductesService.create
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validación básica: campos obligatorios y precio no negativo
    if (!formData.id_client || !formData.nom_producte || formData.preu_producte < 0) {
      setMessage({ type: 'error', text: 'Complete los campos obligatorios marcados con *' });
      return;
    }
    setLoading(true);
    try {
      // Construir el objeto nuevo de forma explícita
      const newProduct = {
        ...formData,
        data_creacio_producte: new Date().toISOString(),
        // Si formData.databaixa_producte es null, se transforma a undefined
        databaixa_producte: formData.databaixa_producte ?? undefined,
      };
  
      // Depurar el objeto newProduct
      console.log("Creando nuevo producto:", newProduct);
      
      const result = await ProductesService.create(newProduct);
      setMessage({
        type: 'success',
        text: `Producto '${formData.nom_producte}' creado exitosamente con ID: ${result.id_producte}`
      });
      setActiveTab('list');
      resetForm();
      // Recargar la página para mostrar el nuevo producto (o actualizar el estado local)
      window.location.reload();
    } catch (error) {
      console.error('Error creating product:', error);
      setMessage({ type: 'error', text: 'Error al crear el producto' });
    } finally {
      setLoading(false);
    }
  };
  

  const resetForm = () => {
    setFormData({
      id_client: 1,
      nom_producte: '',
      preu_producte: 0,
      descripcio_producte: '',
      sector_producte: '',
      significatiu_producte: '',
      enquesta_producte: '',
      actiu_producte: true,
      databaixa_producte: null
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'preu_producte') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'marcar_baja') {
      setFormData(prev => ({
        ...prev,
        databaixa_producte: checked ? new Date().toISOString().split('T')[0] : null
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: checked }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Limpiar mensaje después de 5 segundos
  useEffect(() => {
    if (message.type) {
      const timer = setTimeout(() => setMessage({ type: null, text: null }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="products-container">
      <h2 className="text-xl font-semibold mb-4">Gestión de Productos</h2>
      
      {message.type && (
        <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 rounded bg-red-100 text-red-700">
          {error}
        </div>
      )}
      
      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 ${activeTab === 'list' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('list')}
        >
          Lista de Productos
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'new' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('new')}
        >
          Nuevo Producto
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'edit' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('edit')}
          disabled={!selectedProduct}
        >
          Editar Producto
        </button>
      </div>
      
      <div className="mt-4">
        {activeTab === 'list' && (
          <div>
            <h3 className="text-lg font-medium mb-2">Catálogo de Productos</h3>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar producto por ID, nombre o sector..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">ID</th>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">ID Cliente</th>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">Nombre</th>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">Precio</th>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">Sector</th>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">Activo</th>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id_producte} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{product.id_producte}</td>
                      <td className="py-2 px-4 border-b">{product.id_client}</td>
                      <td className="py-2 px-4 border-b">{product.nom_producte}</td>
                      <td className="py-2 px-4 border-b">{product.preu_producte.toFixed(2)}€</td>
                      <td className="py-2 px-4 border-b">{product.sector_producte}</td>
                      <td className="py-2 px-4 border-b">
                        {product.actiu_producte ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Activo
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Inactivo
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="text-primary-600 hover:text-primary-800 mr-2"
                          onClick={() => {
                            setSelectedProduct(product);
                            setActiveTab('edit');
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            // Implementar la eliminación usando ProductesService.delete(...)
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No se encontraron productos con los criterios de búsqueda.
              </div>
            )}

            {selectedProduct && (
              <div className="mt-6 p-4 border rounded bg-gray-50">
                <h4 className="text-md font-medium mb-2">Detalles del Producto</h4>
                <pre className="bg-white p-4 rounded overflow-auto">
                  {JSON.stringify(selectedProduct, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'new' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Crear Nuevo Producto</h3>
            
            <form onSubmit={handleCreateProduct} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Información Básica</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID del Cliente *</label>
                    <input
                      type="number"
                      name="id_client"
                      value={formData.id_client}
                      onChange={handleNumberChange}
                      min="1"
                      step="1"
                      required
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto *</label>
                    <input
                      type="text"
                      name="nom_producte"
                      value={formData.nom_producte}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Nombre identificativo del producto</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Detalles del Producto</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio (€) *</label>
                    <input
                      type="number"
                      name="preu_producte"
                      value={formData.preu_producte}
                      onChange={handleNumberChange}
                      min="0"
                      step="0.01"
                      required
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Precio de venta</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                    <input
                      type="text"
                      name="sector_producte"
                      value={formData.sector_producte}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Sector del producto</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    name="descripcio_producte"
                    value={formData.descripcio_producte}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Información detallada sobre el producto</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Significativo</label>
                  <input
                    type="text"
                    name="significatiu_producte"
                    value={formData.significatiu_producte}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Información relevante o distintiva</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enquesta</label>
                  <textarea
                    name="enquesta_producte"
                    value={formData.enquesta_producte}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Resultados o datos de enquesta</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Estado</h4>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="actiu_producte"
                      checked={formData.actiu_producte}
                      onChange={handleCheckboxChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-700">Producto Activo</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Indica si el producto está activo</p>
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="marcar_baja"
                      checked={!!formData.databaixa_producte}
                      onChange={handleCheckboxChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-700">Marcar como dado de baja</span>
                  </label>
                  {formData.databaixa_producte && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Baja</label>
                      <input
                        type="date"
                        name="databaixa_producte"
                        value={formData.databaixa_producte}
                        onChange={handleDateChange}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Limpiar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : 'Guardar Producto'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'edit' && selectedProduct && (
          <div>
            <h3 className="text-lg font-medium mb-4">Editar Producto</h3>
            <p className="text-gray-600">
              Implementación pendiente para editar el producto con ID: {selectedProduct.id_producte}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
