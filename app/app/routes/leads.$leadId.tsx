// app/routes/leads.$leadId.tsx
import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link, useNavigate, Form } from "@remix-run/react";
import { LeadService, type Lead } from "~/services/leads.service";
import { LeadSize, DEFAULT_LEAD_VALUES } from "~/lib/types";
import { useState } from "react";

// Función auxiliar para formatear el tamaño del lead
const formatMidaLead = (mida?: number): string => {
  switch (mida) {
    case 1:
      return "Microempresa";
    case 2:
      return "Pequeña";
    case 3:
      return "Mediana";
    case 4:
      return "Grande";
    default:
      return "Sin definir";
  }
};

// Función para formatear fechas
const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "-";
  
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { leadId } = params;
  
  // Manejar específicamente el caso "new"
  if (leadId === 'new') {
    return json({ 
      lead: null,
      isNew: true 
    });
  }
  
  // Para leads existentes, verificar que el ID sea válido
  const id = parseInt(leadId || "0");
  
  if (isNaN(id) || id <= 0) {
    throw new Response("ID de lead inválido", { status: 400 });
  }
  
  try {
    const lead = await LeadService.getById(id);
    return json({ 
      lead,
      isNew: false 
    });
  } catch (error) {
    console.error(`Error cargando lead con ID ${id}:`, error);
    throw new Response(error instanceof Error ? error.message : "Error al cargar el lead", { 
      status: error instanceof Response ? error.status : 500 
    });
  }
}

export async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");
  
  // Si es una acción de creación
  if (action === "create") {
    try {
      // Procesamos los datos del formulario
      const leadData: Partial<Lead> = {
        nom_lead: formData.get("nom_lead") as string,
        nom_fiscal_lead: formData.get("nom_fiscal_lead") as string || undefined,
        nom_basic_lead: formData.get("nom_basic_lead") as string || undefined,
        nom_empresarial_lead: formData.get("nom_empresarial_lead") as string || undefined,
        NIF_lead: formData.get("NIF_lead") as string || undefined,
        email_lead: formData.get("email_lead") as string || undefined,
        adreca_lead: formData.get("adreca_lead") as string || undefined,
        codi_postal_lead: formData.get("codi_postal_lead") as string || undefined,
        poblacio_lead: formData.get("poblacio_lead") as string || undefined,
        comarca_lead: formData.get("comarca_lead") as string || undefined,
        provincia_lead: formData.get("provincia_lead") as string || undefined,
        cnae_lead: formData.get("cnae_lead") as string || undefined,
        activitat_lead: formData.get("activitat_lead") as string || undefined,
        mida_lead: formData.get("mida_lead") ? parseInt(formData.get("mida_lead") as string) : undefined,
        nombre_treballadors_lead: formData.get("nombre_treballadors_lead") ? parseInt(formData.get("nombre_treballadors_lead") as string) : undefined,
        capital_social_lead: formData.get("capital_social_lead") ? parseFloat(formData.get("capital_social_lead") as string) : undefined,
        any_creacio_lead: formData.get("any_creacio_lead") as string || undefined,
        link_web_lead: formData.get("link_web_lead") as string || undefined,
        xarxe_social_lead: formData.get("xarxe_social_lead") as string || undefined,
        idioma_preferent_lead: formData.get("idioma_preferent_lead") as string || undefined,
        importa_exporta_lead: formData.get("importa_exporta_lead") as string || undefined,
        observacions_lead: formData.get("observacions_lead") as string || undefined,
        
        // Campos booleanos
        actiu_lead: formData.get("actiu_lead") === "true",
        cotitza_borsa_lead: formData.get("cotitza_borsa_lead") === "true",
        nomes_temporada_lead: formData.get("nomes_temporada_lead") === "true",
        conciencia_ecologica_lead: formData.get("conciencia_ecologica_lead") === "true",
        solidaria_social_lead: formData.get("solidaria_social_lead") === "true",
        
        // Campos automáticos
        fecha_registro: new Date().toISOString(),
      };
      
      // Crear el nuevo lead con el servicio
      await LeadService.create(leadData);
      
      return redirect("/leads");
    } catch (error) {
      console.error(`Error creando nuevo lead:`, error);
      return json({ 
        ok: false, 
        error: error instanceof Error ? error.message : "Error al crear el lead" 
      }, { status: 500 });
    }
  }
  
  // Para acciones que requieren un ID existente
  const leadId = parseInt(params.leadId || "0");
  
  if (isNaN(leadId) || leadId <= 0) {
    throw new Response("ID de lead inválido", { status: 400 });
  }
  
  if (action === "delete") {
    try {
      await LeadService.delete(leadId);
      return redirect("/leads");
    } catch (error) {
      console.error(`Error eliminando lead con ID ${leadId}:`, error);
      return json({ 
        ok: false, 
        error: error instanceof Error ? error.message : "Error al eliminar el lead" 
      }, { status: 500 });
    }
  }
  
  return json({ ok: false, error: "Acción no soportada" }, { status: 400 });
}

export default function LeadDetails() {
  const { lead, isNew } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  
  // Si estamos en modo "new", mostrar el formulario de creación
  if (isNew) {
    return <LeadForm />;
  }
  
  // Si no tenemos un lead válido y no estamos en modo "new", mostrar error
  if (!lead) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-100 text-red-700 p-4 rounded">
          Error: No se pudo cargar la información del lead
        </div>
        <div className="mt-4">
          <Link 
            to="/leads" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Volver a la lista
          </Link>
        </div>
      </div>
    );
  }
  
  // Para leads existentes, mostrar detalles
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este lead? Esta acción no se puede deshacer.")) {
      const formData = new FormData();
      formData.append("action", "delete");
      
      try {
        const response = await fetch(`/leads/${lead.id_lead}`, {
          method: "DELETE",
          body: formData,
        });
        
        if (response.ok) {
          navigate("/leads");
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el lead");
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalles del Lead</h1>
        
        <div className="flex space-x-3">
          <Link 
            to="/leads" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Volver
          </Link>
          
          <Link 
            to={`/leads/${lead.id_lead}/edit`} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Editar
          </Link>
          
          <button 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Eliminar
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Cabecera con información principal */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{lead.nom_lead}</h2>
              {lead.nom_fiscal_lead && (
                <p className="text-sm text-gray-600 mt-1">{lead.nom_fiscal_lead}</p>
              )}
            </div>
            
            <div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${lead.actiu_lead ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {lead.actiu_lead ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Cuerpo con información detallada */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Información básica */}
            <div>
              <h3 className="text-lg font-medium mb-3 pb-2 border-b border-gray-200">
                Información Básica
              </h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">ID</p>
                  <p>{lead.id_lead}</p>
                </div>
                
                {lead.NIF_lead && (
                  <div>
                    <p className="text-sm text-gray-500">NIF</p>
                    <p>{lead.NIF_lead}</p>
                  </div>
                )}
                
                {lead.email_lead && (
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{lead.email_lead}</p>
                  </div>
                )}
                
                {lead.fecha_registro && (
                  <div>
                    <p className="text-sm text-gray-500">Fecha de registro</p>
                    <p>{formatDate(lead.fecha_registro)}</p>
                  </div>
                )}
                
                {lead.any_creacio_lead && (
                  <div>
                    <p className="text-sm text-gray-500">Año de creación</p>
                    <p>{lead.any_creacio_lead}</p>
                  </div>
                )}
                
                {lead.mida_lead !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Tamaño</p>
                    <p>{formatMidaLead(lead.mida_lead)}</p>
                  </div>
                )}
                
                {lead.nombre_treballadors_lead !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Nº Trabajadores</p>
                    <p>{lead.nombre_treballadors_lead}</p>
                  </div>
                )}
                
                {lead.capital_social_lead !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500">Capital Social</p>
                    <p>{lead.capital_social_lead.toLocaleString('es-ES')} €</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Dirección y ubicación */}
            <div>
              <h3 className="text-lg font-medium mb-3 pb-2 border-b border-gray-200">
                Ubicación
              </h3>
              
              <div className="space-y-3">
                {lead.adreca_lead && (
                  <div>
                    <p className="text-sm text-gray-500">Dirección</p>
                    <p>{lead.adreca_lead}</p>
                  </div>
                )}
                
                {lead.codi_postal_lead && (
                  <div>
                    <p className="text-sm text-gray-500">Código Postal</p>
                    <p>{lead.codi_postal_lead}</p>
                  </div>
                )}
                
                {lead.poblacio_lead && (
                  <div>
                    <p className="text-sm text-gray-500">Población</p>
                    <p>{lead.poblacio_lead}</p>
                  </div>
                )}
                
                {lead.comarca_lead && (
                  <div>
                    <p className="text-sm text-gray-500">Comarca</p>
                    <p>{lead.comarca_lead}</p>
                  </div>
                )}
                
                {lead.provincia_lead && (
                  <div>
                    <p className="text-sm text-gray-500">Provincia</p>
                    <p>{lead.provincia_lead}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Características adicionales */}
            <div>
              <h3 className="text-lg font-medium mb-3 pb-2 border-b border-gray-200">
                Características
              </h3>
              
              <div className="space-y-3">
                {lead.activitat_lead && (
                  <div>
                    <p className="text-sm text-gray-500">Actividad</p>
                    <p>{lead.activitat_lead}</p>
                  </div>
                )}
                
                {lead.cnae_lead && (
                  <div>
                    <p className="text-sm text-gray-500">CNAE</p>
                    <p>{lead.cnae_lead}</p>
                  </div>
                )}
                
                {lead.idioma_preferent_lead && (
                  <div>
                    <p className="text-sm text-gray-500">Idioma Preferente</p>
                    <p>{lead.idioma_preferent_lead}</p>
                  </div>
                )}
                
                {lead.importa_exporta_lead && (
                  <div>
                    <p className="text-sm text-gray-500">Importación/Exportación</p>
                    <p>{lead.importa_exporta_lead}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-y-2 mt-4">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${lead.cotitza_borsa_lead ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm">Cotiza en bolsa</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${lead.nomes_temporada_lead ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm">Solo temporada</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${lead.conciencia_ecologica_lead ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm">Conciencia ecológica</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${lead.solidaria_social_lead ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm">Empresa solidaria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enlaces web y redes sociales */}
          {(lead.link_web_lead || lead.xarxe_social_lead) && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-3">
                Enlaces Web
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lead.link_web_lead && (
                  <div>
                    <p className="text-sm text-gray-500">Sitio Web</p>
                    <a 
                      href={lead.link_web_lead.startsWith('http') ? lead.link_web_lead : `https://${lead.link_web_lead}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {lead.link_web_lead}
                    </a>
                  </div>
                )}
                
                {lead.xarxe_social_lead && (
                  <div>
                    <p className="text-sm text-gray-500">Redes Sociales</p>
                    <p>{lead.xarxe_social_lead}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Observaciones */}
          {lead.observacions_lead && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-3">
                Observaciones
              </h3>
              <p className="whitespace-pre-line">{lead.observacions_lead}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente de formulario para crear un nuevo lead
function LeadForm() {
  const [formState, setFormState] = useState({
    actiu_lead: true,
    cotitza_borsa_lead: DEFAULT_LEAD_VALUES.cotitza_borsa_lead || false,
    nomes_temporada_lead: DEFAULT_LEAD_VALUES.nomes_temporada_lead || false,
    conciencia_ecologica_lead: DEFAULT_LEAD_VALUES.conciencia_ecologica_lead || false,
    solidaria_social_lead: DEFAULT_LEAD_VALUES.solidaria_social_lead || false,
  });
  
  const handleBooleanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState(prev => ({ ...prev, [name]: checked }));
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Crear Nuevo Lead</h1>
        <Link 
          to="/leads" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Cancelar
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <Form method="post" className="space-y-8">
          <input type="hidden" name="action" value="create" />
          
          {/* Sección de información básica */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Información Básica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nom_lead"
                  required
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Fiscal
                </label>
                <input
                  type="text"
                  name="nom_fiscal_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Básico
                </label>
                <input
                  type="text"
                  name="nom_basic_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Empresarial
                </label>
                <input
                  type="text"
                  name="nom_empresarial_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NIF
                </label>
                <input
                  type="text"
                  name="NIF_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tamaño
                </label>
                <select
                  name="mida_lead"
                  defaultValue={DEFAULT_LEAD_VALUES.mida_lead || ""}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                >
                  <option value="">Seleccionar tamaño</option>
                  <option value={LeadSize.MICROEMPRESA}>Microempresa</option>
                  <option value={LeadSize.PEQUEÑA}>Pequeña</option>
                  <option value={LeadSize.MEDIANA}>Mediana</option>
                  <option value={LeadSize.GRANDE}>Grande</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Trabajadores
                </label>
                <input
                  type="number"
                  name="nombre_treballadors_lead"
                  min="0"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capital Social (€)
                </label>
                <input
                  type="number"
                  name="capital_social_lead"
                  min="0"
                  step="0.01"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Año de Creación
                </label>
                <input
                  type="text"
                  name="any_creacio_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div className="col-span-full flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="actiu_lead"
                  name="actiu_lead"
                  checked={formState.actiu_lead}
                  onChange={handleBooleanChange}
                  value="true"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="actiu_lead" className="font-medium text-gray-700">
                  Activo
                </label>
              </div>
            </div>
          </div>
          
          {/* Sección de ubicación */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Ubicación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  name="adreca_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código Postal
                </label>
                <input
                  type="text"
                  name="codi_postal_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Población
                </label>
                <input
                  type="text"
                  name="poblacio_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comarca
                </label>
                <input
                  type="text"
                  name="comarca_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provincia
                </label>
                <input
                  type="text"
                  name="provincia_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          </div>
          
          {/* Sección de características */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Características</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actividad
                </label>
                <input
                  type="text"
                  name="activitat_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CNAE
                </label>
                <input
                  type="text"
                  name="cnae_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Idioma Preferente
                </label>
                <select
                  name="idioma_preferent_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                >
                  <option value="">Seleccionar idioma</option>
                  <option value="Catalán">Catalán</option>
                  <option value="Castellano">Castellano</option>
                  <option value="Inglés">Inglés</option>
                  <option value="Francés">Francés</option>
                  <option value="Alemán">Alemán</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Importación/Exportación
                </label>
                <select
                  name="importa_exporta_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                >
                  <option value="">Seleccionar</option>
                  <option value="Importa">Importa</option>
                  <option value="Exporta">Exporta</option>
                  <option value="Ambos">Ambos</option>
                  <option value="Ninguno">Ninguno</option>
                </select>
              </div>
              
              {/* Checkboxes para características especiales */}
              <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="cotitza_borsa_lead"
                    name="cotitza_borsa_lead"
                    checked={formState.cotitza_borsa_lead}
                    onChange={handleBooleanChange}
                    value="true"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="cotitza_borsa_lead" className="font-medium text-gray-700">
                    Cotiza en bolsa
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="nomes_temporada_lead"
                    name="nomes_temporada_lead"
                    checked={formState.nomes_temporada_lead}
                    onChange={handleBooleanChange}
                    value="true"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="nomes_temporada_lead" className="font-medium text-gray-700">
                    Solo temporada
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="conciencia_ecologica_lead"
                    name="conciencia_ecologica_lead"
                    checked={formState.conciencia_ecologica_lead}
                    onChange={handleBooleanChange}
                    value="true"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="conciencia_ecologica_lead" className="font-medium text-gray-700">
                    Conciencia ecológica
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="solidaria_social_lead"
                    name="solidaria_social_lead"
                    checked={formState.solidaria_social_lead}
                    onChange={handleBooleanChange}
                    value="true"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="solidaria_social_lead" className="font-medium text-gray-700">
                    Empresa solidaria
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enlaces web y redes sociales */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Enlaces Web</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sitio Web
                </label>
                <input
                  type="text"
                  name="link_web_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Redes Sociales
                </label>
                <input
                  type="text"
                  name="xarxe_social_lead"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="@usuario, facebook.com/pagina, etc."
                />
              </div>
            </div>
          </div>
          
          {/* Observaciones */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Observaciones</h2>
            <div>
              <textarea
                name="observacions_lead"
                rows={4}
                className="w-full rounded border border-gray-300 px-3 py-2"
                placeholder="Añadir observaciones..."
              ></textarea>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 mt-8">
            <Link 
              to="/leads" 
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Link>
            
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Crear Lead
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}