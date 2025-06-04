import {
  formatMidaLead
} from "/build/_shared/chunk-JP32FIMV.js";
import {
  useLoaderData
} from "/build/_shared/chunk-QWJ64ZKI.js";
import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
  createHotContext
} from "/build/_shared/chunk-WWESKXYW.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-WWEL7QKW.js";
import {
  require_react
} from "/build/_shared/chunk-2AFRYLX2.js";
import {
  __toESM
} from "/build/_shared/chunk-RODUX5XG.js";

// app/routes/assignments.filter-panel.tsx
var import_react4 = __toESM(require_react());
var import_node = __toESM(require_node());

// app/components/CNAESelect.tsx
var import_react2 = __toESM(require_react());

// app/hooks/useCNAEData.ts
var import_react = __toESM(require_react());

// app/data/cnae.json
var cnae_default = [
  {
    codigo: "A",
    descripcion: "AGRICULTURA, GANADER\xCDA, SILVICULTURA Y PESCA"
  },
  {
    codigo: "01",
    descripcion: "Agricultura, ganader\xEDa, caza y servicios relacionados con las mismas"
  },
  {
    codigo: "01.1",
    descripcion: "Cultivos no perennes"
  },
  {
    codigo: "01.11",
    descripcion: "Cultivo de cereales, distintos de arroz, leguminosas y oleaginosas"
  },
  {
    codigo: "01.12",
    descripcion: "Cultivo de arroz"
  },
  {
    codigo: "01.13",
    descripcion: "Cultivo de hortalizas, ra\xEDces y tub\xE9rculos"
  },
  {
    codigo: "01.14",
    descripcion: "Cultivo de ca\xF1a de az\xFAcar"
  },
  {
    codigo: "01.15",
    descripcion: "Cultivo de tabaco"
  },
  {
    codigo: "01.16",
    descripcion: "Cultivo de plantas para fibras textiles"
  },
  {
    codigo: "01.19",
    descripcion: "Otros cultivos no perennes"
  },
  {
    codigo: "01.2",
    descripcion: "Cultivos perennes"
  },
  {
    codigo: "01.21",
    descripcion: "Cultivo de la vid"
  },
  {
    codigo: "01.22",
    descripcion: "Cultivo de frutos tropicales y subtropicales"
  },
  {
    codigo: "01.23",
    descripcion: "Cultivo de c\xEDtricos"
  },
  {
    codigo: "01.24",
    descripcion: "Cultivo de frutos con hueso y pepitas"
  },
  {
    codigo: "01.25",
    descripcion: "Cultivo de otros \xE1rboles y arbustos frutales y frutos secos"
  },
  {
    codigo: "01.26",
    descripcion: "Cultivo de frutos oleaginosos"
  },
  {
    codigo: "01.27",
    descripcion: "Cultivo de plantas para bebidas"
  },
  {
    codigo: "01.28",
    descripcion: "Cultivo de especias, plantas arom\xE1ticas, medicinales y farmac\xE9uticas"
  },
  {
    codigo: "01.29",
    descripcion: "Otros cultivos perennes"
  },
  {
    codigo: "01.3",
    descripcion: "Propagaci\xF3n de plantas"
  },
  {
    codigo: "01.30",
    descripcion: "Propagaci\xF3n de plantas"
  },
  {
    codigo: "01.4",
    descripcion: "Producci\xF3n ganadera"
  },
  {
    codigo: "01.41",
    descripcion: "Explotaci\xF3n de ganado bovino para la producci\xF3n de leche"
  },
  {
    codigo: "01.42",
    descripcion: "Explotaci\xF3n de otro ganado bovino y b\xFAfalos"
  },
  {
    codigo: "01.43",
    descripcion: "Explotaci\xF3n de caballos y otros equinos"
  },
  {
    codigo: "01.44",
    descripcion: "Explotaci\xF3n de camellos y otros cam\xE9lidos"
  },
  {
    codigo: "01.45",
    descripcion: "Explotaci\xF3n de ganado ovino y caprino"
  },
  {
    codigo: "01.46",
    descripcion: "Explotaci\xF3n de ganado porcino"
  },
  {
    codigo: "01.47",
    descripcion: "Avicultura"
  },
  {
    codigo: "01.48",
    descripcion: "Otras explotaciones de ganado"
  },
  {
    codigo: "01.5",
    descripcion: "Producci\xF3n agr\xEDcola combinada con la producci\xF3n ganadera"
  },
  {
    codigo: "01.50",
    descripcion: "Producci\xF3n agr\xEDcola combinada con la producci\xF3n ganadera"
  },
  {
    codigo: "01.6",
    descripcion: "Actividades de apoyo a la agricultura, a la ganader\xEDa y de preparaci\xF3n posterior a la cosecha"
  },
  {
    codigo: "01.61",
    descripcion: "Actividades de apoyo a la agricultura"
  },
  {
    codigo: "01.62",
    descripcion: "Actividades de apoyo a la ganader\xEDa"
  },
  {
    codigo: "01.63",
    descripcion: "Actividades de preparaci\xF3n posterior a la cosecha y tratamiento de semillas para reproducci\xF3n"
  },
  {
    codigo: "01.7",
    descripcion: "Caza, captura de animales y servicios relacionados "
  },
  {
    codigo: "01.70",
    descripcion: "Caza, captura de animales y servicios relacionados "
  },
  {
    codigo: "02",
    descripcion: "Silvicultura y explotaci\xF3n forestal"
  },
  {
    codigo: "02.1",
    descripcion: "Silvicultura y otras actividades forestales"
  },
  {
    codigo: "02.10",
    descripcion: "Silvicultura y otras actividades forestales"
  },
  {
    codigo: "02.2",
    descripcion: "Explotaci\xF3n de la madera"
  },
  {
    codigo: "02.20",
    descripcion: "Explotaci\xF3n de la madera"
  },
  {
    codigo: "02.3",
    descripcion: "Recolecci\xF3n de productos silvestres, excepto madera"
  },
  {
    codigo: "02.30",
    descripcion: "Recolecci\xF3n de productos silvestres, excepto madera"
  },
  {
    codigo: "02.4",
    descripcion: "Servicios de apoyo a la silvicultura"
  },
  {
    codigo: "02.40",
    descripcion: "Servicios de apoyo a la silvicultura"
  },
  {
    codigo: "03",
    descripcion: "Pesca y acuicultura"
  },
  {
    codigo: "03.1",
    descripcion: "Pesca"
  },
  {
    codigo: "03.11",
    descripcion: "Pesca marina"
  },
  {
    codigo: "03.12",
    descripcion: "Pesca en agua dulce"
  },
  {
    codigo: "03.2",
    descripcion: "Acuicultura"
  },
  {
    codigo: "03.21",
    descripcion: "Acuicultura marina"
  },
  {
    codigo: "03.22",
    descripcion: "Acuicultura en agua dulce"
  },
  {
    codigo: "03.3",
    descripcion: "Actividades de apoyo a la pesca y la acuicultura"
  },
  {
    codigo: "03.30",
    descripcion: "Actividades de apoyo a la pesca y la acuicultura"
  },
  {
    codigo: "B",
    descripcion: "INDUSTRIAS EXTRACTIVAS"
  },
  {
    codigo: "05",
    descripcion: "Extracci\xF3n de antracita, hulla, y lignito"
  },
  {
    codigo: "05.1",
    descripcion: "Extracci\xF3n de antracita y hulla"
  },
  {
    codigo: "05.10",
    descripcion: "Extracci\xF3n de antracita y hulla"
  },
  {
    codigo: "05.2",
    descripcion: "Extracci\xF3n de lignito"
  },
  {
    codigo: "05.20",
    descripcion: "Extracci\xF3n de lignito"
  },
  {
    codigo: "06",
    descripcion: "Extracci\xF3n de crudo de petr\xF3leo y gas natural"
  },
  {
    codigo: "06.1",
    descripcion: "Extracci\xF3n de crudo de petr\xF3leo"
  },
  {
    codigo: "06.10",
    descripcion: "Extracci\xF3n de crudo de petr\xF3leo"
  },
  {
    codigo: "06.2",
    descripcion: "Extracci\xF3n de gas natural"
  },
  {
    codigo: "06.20",
    descripcion: "Extracci\xF3n de gas natural"
  },
  {
    codigo: "07",
    descripcion: "Extracci\xF3n de minerales met\xE1licos"
  },
  {
    codigo: "07.1",
    descripcion: "Extracci\xF3n de minerales de hierro"
  },
  {
    codigo: "07.10",
    descripcion: "Extracci\xF3n de minerales de hierro"
  },
  {
    codigo: "07.2",
    descripcion: "Extracci\xF3n de minerales met\xE1licos no f\xE9rreos"
  },
  {
    codigo: "07.21",
    descripcion: "Extracci\xF3n de minerales de uranio y torio"
  },
  {
    codigo: "07.29",
    descripcion: "Extracci\xF3n de otros minerales met\xE1licos no f\xE9rreos"
  },
  {
    codigo: "08",
    descripcion: "Otras industrias extractivas"
  },
  {
    codigo: "08.1",
    descripcion: "Extracci\xF3n de piedra, arena y arcilla"
  },
  {
    codigo: "08.11",
    descripcion: "Extracci\xF3n de piedra ornamental, piedra caliza, yeso, pizarra y otras piedras"
  },
  {
    codigo: "08.12",
    descripcion: "Extracci\xF3n de gravas y arenas y extracci\xF3n de arcilla y caol\xEDn"
  },
  {
    codigo: "08.9",
    descripcion: "Industrias extractivas n.c.o.p."
  },
  {
    codigo: "08.91",
    descripcion: "Extracci\xF3n de minerales para productos qu\xEDmicos y fertilizantes"
  },
  {
    codigo: "08.92",
    descripcion: "Extracci\xF3n de turba"
  },
  {
    codigo: "08.93",
    descripcion: "Extracci\xF3n de sal"
  },
  {
    codigo: "08.99",
    descripcion: "Otras industrias extractivas n.c.o.p."
  },
  {
    codigo: "09",
    descripcion: "Actividades de apoyo a las industrias extractivas"
  },
  {
    codigo: "09.1",
    descripcion: "Actividades de apoyo a la extracci\xF3n de petr\xF3leo y gas natural"
  },
  {
    codigo: "09.10",
    descripcion: "Actividades de apoyo a la extracci\xF3n de petr\xF3leo y gas natural"
  },
  {
    codigo: "09.9",
    descripcion: "Actividades de apoyo a otras industrias extractivas"
  },
  {
    codigo: "09.90",
    descripcion: "Actividades de apoyo a otras industrias extractivas"
  },
  {
    codigo: "C",
    descripcion: "INDUSTRIA MANUFACTURERA"
  },
  {
    codigo: 10,
    descripcion: "Industria alimentaria"
  },
  {
    codigo: "10.1",
    descripcion: "Procesado y conservaci\xF3n de carne y elaboraci\xF3n de productos c\xE1rnicos"
  },
  {
    codigo: "10.11",
    descripcion: "Procesado y conservaci\xF3n de carne, excepto volater\xEDa"
  },
  {
    codigo: "10.12",
    descripcion: "Procesado y conservaci\xF3n de volater\xEDa"
  },
  {
    codigo: "10.13",
    descripcion: "Elaboraci\xF3n de productos c\xE1rnicos y de volater\xEDa"
  },
  {
    codigo: "10.2",
    descripcion: "Procesado y conservaci\xF3n de pescados, crust\xE1ceos y moluscos"
  },
  {
    codigo: "10.21",
    descripcion: "Procesado de pescados, crust\xE1ceos y moluscos"
  },
  {
    codigo: "10.22",
    descripcion: "Fabricaci\xF3n de conservas de pescado"
  },
  {
    codigo: "10.3",
    descripcion: "Procesado y conservaci\xF3n de frutas y hortalizas"
  },
  {
    codigo: "10.31",
    descripcion: "Procesado y conservaci\xF3n de patatas"
  },
  {
    codigo: "10.32",
    descripcion: "Elaboraci\xF3n de zumos de frutas y hortalizas"
  },
  {
    codigo: "10.39",
    descripcion: "Otro procesado y conservaci\xF3n de frutas y hortalizas"
  },
  {
    codigo: "10.4",
    descripcion: "Fabricaci\xF3n de aceites y grasas vegetales y animales"
  },
  {
    codigo: "10.42",
    descripcion: "Fabricaci\xF3n de margarina y grasas comestibles similares"
  },
  {
    codigo: "10.43",
    descripcion: "Fabricaci\xF3n de aceite de oliva"
  },
  {
    codigo: "10.44",
    descripcion: "Fabricaci\xF3n de otros aceites y grasas"
  },
  {
    codigo: "10.5",
    descripcion: "Fabricaci\xF3n de productos l\xE1cteos y hielo comestible"
  },
  {
    codigo: "10.52",
    descripcion: "Fabricaci\xF3n de helados y otros hielos comestibles"
  },
  {
    codigo: "10.53",
    descripcion: "Fabricaci\xF3n de quesos"
  },
  {
    codigo: "10.54",
    descripcion: "Preparaci\xF3n de leche y otros productos l\xE1cteos"
  },
  {
    codigo: "10.6",
    descripcion: "Fabricaci\xF3n de productos de moliner\xEDa, almidones y productos amil\xE1ceos"
  },
  {
    codigo: "10.61",
    descripcion: "Fabricaci\xF3n de productos de moliner\xEDa"
  },
  {
    codigo: "10.62",
    descripcion: "Fabricaci\xF3n de almidones y productos amil\xE1ceos"
  },
  {
    codigo: "10.7",
    descripcion: "Fabricaci\xF3n de productos de panader\xEDa y pastas alimenticias"
  },
  {
    codigo: "10.71",
    descripcion: "Fabricaci\xF3n de pan y de productos frescos de panader\xEDa y pasteler\xEDa"
  },
  {
    codigo: "10.72",
    descripcion: "Fabricaci\xF3n de galletas y productos de panader\xEDa y pasteler\xEDa de larga duraci\xF3n"
  },
  {
    codigo: "10.73",
    descripcion: "Elaboraci\xF3n de pastas alimenticias"
  },
  {
    codigo: "10.8",
    descripcion: "Fabricaci\xF3n de otros productos alimenticios"
  },
  {
    codigo: "10.81",
    descripcion: "Fabricaci\xF3n de az\xFAcar"
  },
  {
    codigo: "10.82",
    descripcion: "Fabricaci\xF3n de cacao, chocolate y productos de confiter\xEDa"
  },
  {
    codigo: "10.83",
    descripcion: "Elaboraci\xF3n de caf\xE9, t\xE9 e infusiones"
  },
  {
    codigo: "10.84",
    descripcion: "Elaboraci\xF3n de especias, salsas y condimentos"
  },
  {
    codigo: "10.85",
    descripcion: "Elaboraci\xF3n de platos y comidas preparados"
  },
  {
    codigo: "10.86",
    descripcion: "Elaboraci\xF3n de preparados alimenticios homogeneizados y alimentos diet\xE9ticos"
  },
  {
    codigo: "10.89",
    descripcion: "Elaboraci\xF3n de otros productos alimenticios n.c.o.p."
  },
  {
    codigo: "10.9",
    descripcion: "Fabricaci\xF3n de productos para la alimentaci\xF3n animal"
  },
  {
    codigo: "10.91",
    descripcion: "Fabricaci\xF3n de productos para la alimentaci\xF3n de animales de granja"
  },
  {
    codigo: "10.92",
    descripcion: "Fabricaci\xF3n de productos para la alimentaci\xF3n de animales de compa\xF1\xEDa"
  },
  {
    codigo: 11,
    descripcion: "Fabricaci\xF3n de bebidas"
  },
  {
    codigo: "11.0",
    descripcion: "Fabricaci\xF3n de bebidas"
  },
  {
    codigo: "11.01",
    descripcion: "Destilaci\xF3n, rectificaci\xF3n y mezcla de bebidas alcoh\xF3licas"
  },
  {
    codigo: "11.02",
    descripcion: "Elaboraci\xF3n de vinos"
  },
  {
    codigo: "11.03",
    descripcion: "Elaboraci\xF3n de sidra y otras bebidas fermentadas a partir de frutas"
  },
  {
    codigo: "11.04",
    descripcion: "Elaboraci\xF3n de otras bebidas no destiladas, procedentes de la fermentaci\xF3n"
  },
  {
    codigo: "11.05",
    descripcion: "Fabricaci\xF3n de cerveza"
  },
  {
    codigo: "11.06",
    descripcion: "Fabricaci\xF3n de malta"
  },
  {
    codigo: "11.07",
    descripcion: "Fabricaci\xF3n de bebidas no alcoh\xF3licas y aguas embotelladas"
  },
  {
    codigo: 12,
    descripcion: "Industria del tabaco"
  },
  {
    codigo: "12.0",
    descripcion: "Industria del tabaco"
  },
  {
    codigo: "12.00",
    descripcion: "Industria del tabaco"
  },
  {
    codigo: 13,
    descripcion: "Industria textil"
  },
  {
    codigo: "13.1",
    descripcion: "Preparaci\xF3n e hilado de fibras textiles"
  },
  {
    codigo: "13.10",
    descripcion: "Preparaci\xF3n e hilado de fibras textiles"
  },
  {
    codigo: "13.2",
    descripcion: "Fabricaci\xF3n de tejidos textiles"
  },
  {
    codigo: "13.20",
    descripcion: "Fabricaci\xF3n de tejidos textiles"
  },
  {
    codigo: "13.3",
    descripcion: "Acabado de textiles"
  },
  {
    codigo: "13.30",
    descripcion: "Acabado de textiles"
  },
  {
    codigo: "13.9",
    descripcion: "Fabricaci\xF3n de otros productos textiles"
  },
  {
    codigo: "13.91",
    descripcion: "Fabricaci\xF3n de tejidos de punto"
  },
  {
    codigo: "13.92",
    descripcion: "Fabricaci\xF3n de textiles para el hogar y art\xEDculos de decoraci\xF3n confeccionados"
  },
  {
    codigo: "13.93",
    descripcion: "Fabricaci\xF3n de alfombras y moquetas"
  },
  {
    codigo: "13.94",
    descripcion: "Fabricaci\xF3n de cuerdas, cordeles, bramantes y redes"
  },
  {
    codigo: "13.95",
    descripcion: "Fabricaci\xF3n de telas no tejidas y art\xEDculos confeccionados con ellas"
  },
  {
    codigo: "13.96",
    descripcion: "Fabricaci\xF3n de otros productos textiles de uso t\xE9cnico e industrial"
  },
  {
    codigo: "13.99",
    descripcion: "Fabricaci\xF3n de otros productos textiles n.c.o.p."
  },
  {
    codigo: 14,
    descripcion: "Confecci\xF3n de prendas de vestir"
  },
  {
    codigo: "14.1",
    descripcion: "Confecci\xF3n de prendas de vestir de punto"
  },
  {
    codigo: "14.10",
    descripcion: "Confecci\xF3n de prendas de vestir de punto"
  },
  {
    codigo: "14.2",
    descripcion: "Confecci\xF3n de otras prendas de vestir y accesorios"
  },
  {
    codigo: "14.21",
    descripcion: "Confecci\xF3n de prendas de vestir exteriores"
  },
  {
    codigo: "14.22",
    descripcion: "Confecci\xF3n de ropa interior"
  },
  {
    codigo: "14.23",
    descripcion: "Confecci\xF3n de ropa de trabajo"
  },
  {
    codigo: "14.24",
    descripcion: "Confecci\xF3n de prendas de vestir de cuero y peleter\xEDa"
  },
  {
    codigo: "14.29",
    descripcion: "Confecci\xF3n de otras prendas de vestir y accesorios n.c.o.p."
  },
  {
    codigo: 15,
    descripcion: "Industria del cuero y productos relacionados de otros materiales"
  },
  {
    codigo: "15.1",
    descripcion: "Preparaci\xF3n, te\xF1ido y curtido de cueros y pieles; fabricaci\xF3n de art\xEDculos de marroquiner\xEDa, viaje y de guarnicioner\xEDa y talabarter\xEDa"
  },
  {
    codigo: "15.11",
    descripcion: "Preparaci\xF3n, curtido y te\xF1ido de cueros y pieles"
  },
  {
    codigo: "15.12",
    descripcion: "Fabricaci\xF3n de art\xEDculos de marroquiner\xEDa, viaje y de guarnicioner\xEDa y talabarter\xEDa de cualquier material"
  },
  {
    codigo: "15.2",
    descripcion: "Fabricaci\xF3n de calzado"
  },
  {
    codigo: "15.20",
    descripcion: "Fabricaci\xF3n de calzado"
  },
  {
    codigo: 16,
    descripcion: "Industria de la madera y del corcho, excepto muebles; cester\xEDa y esparter\xEDa"
  },
  {
    codigo: "16.1",
    descripcion: "Aserrado y cepillado de la madera; transformaci\xF3n y acabado de la madera"
  },
  {
    codigo: "16.11",
    descripcion: "Aserrado y cepillado de la madera"
  },
  {
    codigo: "16.12",
    descripcion: "Transformaci\xF3n y acabado de la madera"
  },
  {
    codigo: "16.2",
    descripcion: "Fabricaci\xF3n de productos de madera, corcho, cester\xEDa y esparter\xEDa"
  },
  {
    codigo: "16.21",
    descripcion: "Fabricaci\xF3n de chapas y tableros de madera"
  },
  {
    codigo: "16.22",
    descripcion: "Fabricaci\xF3n de suelos de madera ensamblados"
  },
  {
    codigo: "16.23",
    descripcion: "Fabricaci\xF3n de otras estructuras de madera y piezas de carpinter\xEDa y ebanister\xEDa para la construcci\xF3n, excepto las destinadas a construcci\xF3n industrializada"
  },
  {
    codigo: "16.24",
    descripcion: "Fabricaci\xF3n de envases y embalajes de madera"
  },
  {
    codigo: "16.25",
    descripcion: "Fabricaci\xF3n de puertas y ventanas de madera"
  },
  {
    codigo: "16.26",
    descripcion: "Fabricaci\xF3n de combustibles s\xF3lidos a partir de biomasa vegetal"
  },
  {
    codigo: "16.27",
    descripcion: "Acabado de productos de madera"
  },
  {
    codigo: "16.28",
    descripcion: "Fabricaci\xF3n de otros productos de madera, art\xEDculos de corcho, cester\xEDa y esparter\xEDa"
  },
  {
    codigo: "16.29",
    descripcion: "Fabricaci\xF3n de otras estructuras de madera y piezas de carpinter\xEDa y ebanister\xEDa destinadas a la construcci\xF3n industrializada"
  },
  {
    codigo: 17,
    descripcion: "Industria del papel"
  },
  {
    codigo: "17.1",
    descripcion: "Fabricaci\xF3n de pasta papelera, papel y cart\xF3n"
  },
  {
    codigo: "17.11",
    descripcion: "Fabricaci\xF3n de pasta papelera"
  },
  {
    codigo: "17.12",
    descripcion: "Fabricaci\xF3n de papel y cart\xF3n"
  },
  {
    codigo: "17.2",
    descripcion: "Fabricaci\xF3n de art\xEDculos de papel y de cart\xF3n"
  },
  {
    codigo: "17.21",
    descripcion: "Fabricaci\xF3n de papel y cart\xF3n ondulados y de envases y embalajes de papel y cart\xF3n"
  },
  {
    codigo: "17.22",
    descripcion: "Fabricaci\xF3n de art\xEDculos de papel y cart\xF3n para uso dom\xE9stico, sanitario e higi\xE9nico"
  },
  {
    codigo: "17.23",
    descripcion: "Fabricaci\xF3n de art\xEDculos de papeler\xEDa"
  },
  {
    codigo: "17.24",
    descripcion: "Fabricaci\xF3n de papeles pintados"
  },
  {
    codigo: "17.25",
    descripcion: "Fabricaci\xF3n de otros art\xEDculos de papel y cart\xF3n"
  },
  {
    codigo: 18,
    descripcion: "Artes gr\xE1ficas y reproducci\xF3n de soportes grabados"
  },
  {
    codigo: "18.1",
    descripcion: "Artes gr\xE1ficas y servicios relacionados "
  },
  {
    codigo: "18.11",
    descripcion: "Impresi\xF3n de peri\xF3dicos"
  },
  {
    codigo: "18.12",
    descripcion: "Otras actividades de impresi\xF3n y artes gr\xE1ficas"
  },
  {
    codigo: "18.13",
    descripcion: "Servicios de preimpresi\xF3n y preparaci\xF3n de soportes"
  },
  {
    codigo: "18.14",
    descripcion: "Encuadernaci\xF3n y servicios relacionados"
  },
  {
    codigo: "18.2",
    descripcion: "Reproducci\xF3n de soportes grabados"
  },
  {
    codigo: "18.20",
    descripcion: "Reproducci\xF3n de soportes grabados"
  },
  {
    codigo: 19,
    descripcion: "Coquer\xEDas y refino de petr\xF3leo"
  },
  {
    codigo: "19.1",
    descripcion: "Coquer\xEDas"
  },
  {
    codigo: "19.10",
    descripcion: "Coquer\xEDas"
  },
  {
    codigo: "19.2",
    descripcion: "Refino de petr\xF3leo y de combustibles f\xF3siles"
  },
  {
    codigo: "19.20",
    descripcion: "Refino de petr\xF3leo y de combustibles f\xF3siles"
  },
  {
    codigo: 20,
    descripcion: "Industria qu\xEDmica"
  },
  {
    codigo: "20.1",
    descripcion: "Fabricaci\xF3n de productos qu\xEDmicos b\xE1sicos, compuestos nitrogenados, fertilizantes, pl\xE1sticos y caucho sint\xE9tico en formas primarias"
  },
  {
    codigo: "20.11",
    descripcion: "Fabricaci\xF3n de gases industriales"
  },
  {
    codigo: "20.12",
    descripcion: "Fabricaci\xF3n de colorantes y pigmentos"
  },
  {
    codigo: "20.13",
    descripcion: "Fabricaci\xF3n de otros productos b\xE1sicos de qu\xEDmica inorg\xE1nica"
  },
  {
    codigo: "20.14",
    descripcion: "Fabricaci\xF3n de otros productos b\xE1sicos de qu\xEDmica org\xE1nica"
  },
  {
    codigo: "20.15",
    descripcion: "Fabricaci\xF3n de fertilizantes y compuestos nitrogenados"
  },
  {
    codigo: "20.16",
    descripcion: "Fabricaci\xF3n de pl\xE1sticos en formas primarias"
  },
  {
    codigo: "20.17",
    descripcion: "Fabricaci\xF3n de caucho sint\xE9tico en formas primarias"
  },
  {
    codigo: "20.2",
    descripcion: "Fabricaci\xF3n de pesticidas, desinfectantes y otros productos agroqu\xEDmicos"
  },
  {
    codigo: "20.20",
    descripcion: "Fabricaci\xF3n de pesticidas, desinfectantes y otros productos agroqu\xEDmicos"
  },
  {
    codigo: "20.3",
    descripcion: "Fabricaci\xF3n de pinturas, barnices y revestimientos similares, tintas de imprenta y masillas"
  },
  {
    codigo: "20.30",
    descripcion: "Fabricaci\xF3n de pinturas, barnices y revestimientos similares, tintas de imprenta y masillas"
  },
  {
    codigo: "20.4",
    descripcion: "Fabricaci\xF3n de art\xEDculos de lavado, limpieza y abrillantamiento"
  },
  {
    codigo: "20.41",
    descripcion: "Fabricaci\xF3n de jabones, detergentes y otros art\xEDculos de limpieza y abrillantamiento"
  },
  {
    codigo: "20.42",
    descripcion: "Fabricaci\xF3n de productos de perfumer\xEDa y cosm\xE9tica"
  },
  {
    codigo: "20.5",
    descripcion: "Fabricaci\xF3n de otros productos qu\xEDmicos"
  },
  {
    codigo: "20.51",
    descripcion: "Fabricaci\xF3n de biocombustibles l\xEDquidos"
  },
  {
    codigo: "20.59",
    descripcion: "Fabricaci\xF3n de otros productos qu\xEDmicos n.c.o.p."
  },
  {
    codigo: "20.6",
    descripcion: "Fabricaci\xF3n de fibras artificiales y sint\xE9ticas"
  },
  {
    codigo: "20.60",
    descripcion: "Fabricaci\xF3n de fibras artificiales y sint\xE9ticas"
  },
  {
    codigo: 21,
    descripcion: "Fabricaci\xF3n de productos farmac\xE9uticos"
  },
  {
    codigo: "21.1",
    descripcion: "Fabricaci\xF3n de productos farmac\xE9uticos de base"
  },
  {
    codigo: "21.10",
    descripcion: "Fabricaci\xF3n de productos farmac\xE9uticos de base"
  },
  {
    codigo: "21.2",
    descripcion: "Fabricaci\xF3n de especialidades farmac\xE9uticas"
  },
  {
    codigo: "21.20",
    descripcion: "Fabricaci\xF3n de especialidades farmac\xE9uticas"
  },
  {
    codigo: 22,
    descripcion: "Fabricaci\xF3n de productos de caucho y pl\xE1sticos"
  },
  {
    codigo: "22.1",
    descripcion: "Fabricaci\xF3n de productos de caucho"
  },
  {
    codigo: "22.11",
    descripcion: "Fabricaci\xF3n, recauchutado y reconstrucci\xF3n de neum\xE1ticos de caucho y fabricaci\xF3n de c\xE1maras"
  },
  {
    codigo: "22.12",
    descripcion: "Fabricaci\xF3n de otros productos de caucho"
  },
  {
    codigo: "22.2",
    descripcion: "Fabricaci\xF3n de productos de pl\xE1stico"
  },
  {
    codigo: "22.21",
    descripcion: "Fabricaci\xF3n de placas, hojas, tubos y perfiles de pl\xE1stico"
  },
  {
    codigo: "22.22",
    descripcion: "Fabricaci\xF3n de envases y embalajes de pl\xE1stico"
  },
  {
    codigo: "22.23",
    descripcion: "Fabricaci\xF3n de puertas y ventanas de pl\xE1stico"
  },
  {
    codigo: "22.24",
    descripcion: "Fabricaci\xF3n de productos de pl\xE1stico para la construcci\xF3n"
  },
  {
    codigo: "22.25",
    descripcion: "Transformaci\xF3n y acabado de productos de pl\xE1stico"
  },
  {
    codigo: "22.26",
    descripcion: "Fabricaci\xF3n de otros productos de pl\xE1stico"
  },
  {
    codigo: 23,
    descripcion: "Fabricaci\xF3n de otros productos minerales no met\xE1licos"
  },
  {
    codigo: "23.1",
    descripcion: "Fabricaci\xF3n de vidrio y productos de vidrio"
  },
  {
    codigo: "23.11",
    descripcion: "Fabricaci\xF3n de vidrio plano"
  },
  {
    codigo: "23.12",
    descripcion: "Manipulado y transformaci\xF3n de vidrio plano"
  },
  {
    codigo: "23.13",
    descripcion: "Fabricaci\xF3n de vidrio hueco"
  },
  {
    codigo: "23.14",
    descripcion: "Fabricaci\xF3n de fibra de vidrio"
  },
  {
    codigo: "23.15",
    descripcion: "Fabricaci\xF3n y manipulado de otro vidrio, incluido el vidrio t\xE9cnico"
  },
  {
    codigo: "23.2",
    descripcion: "Fabricaci\xF3n de productos cer\xE1micos refractarios"
  },
  {
    codigo: "23.20",
    descripcion: "Fabricaci\xF3n de productos cer\xE1micos refractarios"
  },
  {
    codigo: "23.3",
    descripcion: "Fabricaci\xF3n de productos cer\xE1micos para la construcci\xF3n"
  },
  {
    codigo: "23.31",
    descripcion: "Fabricaci\xF3n de azulejos y baldosas de cer\xE1mica"
  },
  {
    codigo: "23.32",
    descripcion: "Fabricaci\xF3n de ladrillos, tejas y productos de tierras cocidas para la construcci\xF3n"
  },
  {
    codigo: "23.4",
    descripcion: "Fabricaci\xF3n de otros productos cer\xE1micos"
  },
  {
    codigo: "23.41",
    descripcion: "Fabricaci\xF3n de art\xEDculos cer\xE1micos de uso dom\xE9stico y ornamental"
  },
  {
    codigo: "23.42",
    descripcion: "Fabricaci\xF3n de aparatos sanitarios cer\xE1micos"
  },
  {
    codigo: "23.43",
    descripcion: "Fabricaci\xF3n de aisladores y piezas aislantes de material cer\xE1mico"
  },
  {
    codigo: "23.44",
    descripcion: "Fabricaci\xF3n de otros productos cer\xE1micos de uso t\xE9cnico"
  },
  {
    codigo: "23.45",
    descripcion: "Fabricaci\xF3n de otros productos cer\xE1micos"
  },
  {
    codigo: "23.5",
    descripcion: "Fabricaci\xF3n de cemento, cal y yeso"
  },
  {
    codigo: "23.51",
    descripcion: "Fabricaci\xF3n de cemento"
  },
  {
    codigo: "23.52",
    descripcion: "Fabricaci\xF3n de cal y yeso"
  },
  {
    codigo: "23.6",
    descripcion: "Fabricaci\xF3n de elementos de hormig\xF3n, cemento y yeso"
  },
  {
    codigo: "23.62",
    descripcion: "Fabricaci\xF3n de elementos de yeso para la construcci\xF3n"
  },
  {
    codigo: "23.63",
    descripcion: "Fabricaci\xF3n de hormig\xF3n fresco"
  },
  {
    codigo: "23.64",
    descripcion: "Fabricaci\xF3n de mortero"
  },
  {
    codigo: "23.65",
    descripcion: "Fabricaci\xF3n de fibrocemento"
  },
  {
    codigo: "23.66",
    descripcion: "Fabricaci\xF3n de otros productos de hormig\xF3n, yeso y cemento"
  },
  {
    codigo: "23.67",
    descripcion: "Fabricaci\xF3n de elementos de hormig\xF3n para la construcci\xF3n no industrializada"
  },
  {
    codigo: "23.68",
    descripcion: "Fabricaci\xF3n de elementos de hormig\xF3n para la construcci\xF3n industrializada"
  },
  {
    codigo: "23.7",
    descripcion: "Corte, tallado y acabado de la piedra"
  },
  {
    codigo: "23.70",
    descripcion: "Corte, tallado y acabado de la piedra"
  },
  {
    codigo: "23.9",
    descripcion: "Fabricaci\xF3n de productos abrasivos y productos minerales no met\xE1licos n.c.o.p."
  },
  {
    codigo: "23.91",
    descripcion: "Fabricaci\xF3n de productos abrasivos"
  },
  {
    codigo: "23.99",
    descripcion: "Fabricaci\xF3n de otros productos minerales no met\xE1licos n.c.o.p."
  },
  {
    codigo: 24,
    descripcion: "Metalurgia"
  },
  {
    codigo: "24.1",
    descripcion: "Fabricaci\xF3n de productos b\xE1sicos de hierro, acero y ferroaleaciones"
  },
  {
    codigo: "24.10",
    descripcion: "Fabricaci\xF3n de productos b\xE1sicos de hierro, acero y ferroaleaciones"
  },
  {
    codigo: "24.2",
    descripcion: "Fabricaci\xF3n de tubos, tuber\xEDas, perfiles huecos y sus accesorios, de acero"
  },
  {
    codigo: "24.20",
    descripcion: "Fabricaci\xF3n de tubos, tuber\xEDas, perfiles huecos y sus accesorios, de acero"
  },
  {
    codigo: "24.3",
    descripcion: "Fabricaci\xF3n de otros productos de primera transformaci\xF3n del acero"
  },
  {
    codigo: "24.31",
    descripcion: "Estirado en fr\xEDo"
  },
  {
    codigo: "24.32",
    descripcion: "Laminado en fr\xEDo"
  },
  {
    codigo: "24.33",
    descripcion: "Producci\xF3n de perfiles en fr\xEDo por conformaci\xF3n con plegado"
  },
  {
    codigo: "24.34",
    descripcion: "Trefilado en fr\xEDo"
  },
  {
    codigo: "24.4",
    descripcion: "Producci\xF3n de metales preciosos y de otros metales no f\xE9rreos"
  },
  {
    codigo: "24.41",
    descripcion: "Producci\xF3n de metales preciosos"
  },
  {
    codigo: "24.42",
    descripcion: "Producci\xF3n de aluminio"
  },
  {
    codigo: "24.43",
    descripcion: "Producci\xF3n de plomo, zinc y esta\xF1o"
  },
  {
    codigo: "24.44",
    descripcion: "Producci\xF3n de cobre"
  },
  {
    codigo: "24.45",
    descripcion: "Producci\xF3n de otros metales no f\xE9rreos"
  },
  {
    codigo: "24.46",
    descripcion: "Procesamiento de combustibles nucleares"
  },
  {
    codigo: "24.5",
    descripcion: "Fundici\xF3n de metales"
  },
  {
    codigo: "24.51",
    descripcion: "Fundici\xF3n de hierro"
  },
  {
    codigo: "24.52",
    descripcion: "Fundici\xF3n de acero"
  },
  {
    codigo: "24.53",
    descripcion: "Fundici\xF3n de metales ligeros"
  },
  {
    codigo: "24.54",
    descripcion: "Fundici\xF3n de otros metales no f\xE9rreos"
  },
  {
    codigo: 25,
    descripcion: "Fabricaci\xF3n de productos met\xE1licos, excepto maquinaria y equipo"
  },
  {
    codigo: "25.1",
    descripcion: "Fabricaci\xF3n de elementos met\xE1licos para la construcci\xF3n"
  },
  {
    codigo: "25.12",
    descripcion: "Fabricaci\xF3n de puertas y ventanas de metal"
  },
  {
    codigo: "25.13",
    descripcion: "Fabricaci\xF3n de estructuras met\xE1licas y sus componentes, excepto las destinadas a construcci\xF3n industrializada"
  },
  {
    codigo: "25.14",
    descripcion: "Fabricaci\xF3n de estructuras met\xE1licas y sus componentes destinadas a construcci\xF3n industrializada"
  },
  {
    codigo: "25.2",
    descripcion: "Fabricaci\xF3n de cisternas, grandes dep\xF3sitos y contenedores de metal"
  },
  {
    codigo: "25.21",
    descripcion: "Fabricaci\xF3n de radiadores, generadores de vapor y calderas para calefacci\xF3n central"
  },
  {
    codigo: "25.22",
    descripcion: "Fabricaci\xF3n de otras cisternas, grandes dep\xF3sitos y contenedores de metal"
  },
  {
    codigo: "25.3",
    descripcion: "Fabricaci\xF3n de armas y municiones"
  },
  {
    codigo: "25.30",
    descripcion: "Fabricaci\xF3n de armas y municiones"
  },
  {
    codigo: "25.4",
    descripcion: "Forja y modelado de metales y metalurgia de polvos"
  },
  {
    codigo: "25.40",
    descripcion: "Forja y modelado de metales y metalurgia de polvos"
  },
  {
    codigo: "25.5",
    descripcion: "Tratamiento, revestimiento y mecanizado de metales"
  },
  {
    codigo: "25.51",
    descripcion: "Revestimiento de metales"
  },
  {
    codigo: "25.52",
    descripcion: "Tratamiento t\xE9rmico de metales"
  },
  {
    codigo: "25.53",
    descripcion: "Mecanizado de metales"
  },
  {
    codigo: "25.6",
    descripcion: "Fabricaci\xF3n de art\xEDculos de cuchiller\xEDa y cuberter\xEDa, herramientas y ferreter\xEDa"
  },
  {
    codigo: "25.61",
    descripcion: "Fabricaci\xF3n de art\xEDculos de cuchiller\xEDa y cuberter\xEDa"
  },
  {
    codigo: "25.62",
    descripcion: "Fabricaci\xF3n de cerraduras y herrajes"
  },
  {
    codigo: "25.63",
    descripcion: "Fabricaci\xF3n de herramientas"
  },
  {
    codigo: "25.9",
    descripcion: "Fabricaci\xF3n de otros productos met\xE1licos"
  },
  {
    codigo: "25.91",
    descripcion: "Fabricaci\xF3n de bidones y toneles de hierro o acero"
  },
  {
    codigo: "25.92",
    descripcion: "Fabricaci\xF3n de envases y embalajes met\xE1licos ligeros"
  },
  {
    codigo: "25.93",
    descripcion: "Fabricaci\xF3n de productos de alambre, cadenas y muelles"
  },
  {
    codigo: "25.94",
    descripcion: "Fabricaci\xF3n de pernos y productos de torniller\xEDa"
  },
  {
    codigo: "25.99",
    descripcion: "Fabricaci\xF3n de otros productos met\xE1licos n.c.o.p."
  },
  {
    codigo: 26,
    descripcion: "Fabricaci\xF3n de productos inform\xE1ticos, electr\xF3nicos y \xF3pticos"
  },
  {
    codigo: "26.1",
    descripcion: "Fabricaci\xF3n de componentes electr\xF3nicos y circuitos impresos ensamblados"
  },
  {
    codigo: "26.11",
    descripcion: "Fabricaci\xF3n de componentes electr\xF3nicos"
  },
  {
    codigo: "26.12",
    descripcion: "Fabricaci\xF3n de circuitos impresos ensamblados"
  },
  {
    codigo: "26.2",
    descripcion: "Fabricaci\xF3n de ordenadores y equipos perif\xE9ricos"
  },
  {
    codigo: "26.20",
    descripcion: "Fabricaci\xF3n de ordenadores y equipos perif\xE9ricos"
  },
  {
    codigo: "26.3",
    descripcion: "Fabricaci\xF3n de equipos de telecomunicaciones"
  },
  {
    codigo: "26.30",
    descripcion: "Fabricaci\xF3n de equipos de telecomunicaciones"
  },
  {
    codigo: "26.4",
    descripcion: "Fabricaci\xF3n de productos electr\xF3nicos de consumo"
  },
  {
    codigo: "26.40",
    descripcion: "Fabricaci\xF3n de productos electr\xF3nicos de consumo"
  },
  {
    codigo: "26.5",
    descripcion: "Fabricaci\xF3n de instrumentos de verificaci\xF3n de medidas y relojes"
  },
  {
    codigo: "26.51",
    descripcion: "Fabricaci\xF3n de instrumentos y aparatos de medida, verificaci\xF3n y navegaci\xF3n"
  },
  {
    codigo: "26.52",
    descripcion: "Fabricaci\xF3n de relojes"
  },
  {
    codigo: "26.6",
    descripcion: "Fabricaci\xF3n de equipos de radiaci\xF3n, electrom\xE9dicos y electroterap\xE9uticos"
  },
  {
    codigo: "26.60",
    descripcion: "Fabricaci\xF3n de equipos de radiaci\xF3n, electrom\xE9dicos y electroterap\xE9uticos"
  },
  {
    codigo: "26.7",
    descripcion: "Fabricaci\xF3n de instrumentos \xF3pticos, soportes magn\xE9ticos y \xF3pticos y equipos fotogr\xE1ficos"
  },
  {
    codigo: "26.70",
    descripcion: "Fabricaci\xF3n de instrumentos \xF3pticos, soportes magn\xE9ticos y \xF3pticos y equipos fotogr\xE1ficos"
  },
  {
    codigo: 27,
    descripcion: "Fabricaci\xF3n de material y equipo el\xE9ctrico"
  },
  {
    codigo: "27.1",
    descripcion: "Fabricaci\xF3n de motores, generadores y transformadores el\xE9ctricos, y de aparatos de distribuci\xF3n y control el\xE9ctrico"
  },
  {
    codigo: "27.11",
    descripcion: "Fabricaci\xF3n de motores, generadores y transformadores el\xE9ctricos"
  },
  {
    codigo: "27.12",
    descripcion: "Fabricaci\xF3n de aparatos de distribuci\xF3n y control el\xE9ctrico"
  },
  {
    codigo: "27.2",
    descripcion: "Fabricaci\xF3n de pilas y acumuladores el\xE9ctricos"
  },
  {
    codigo: "27.20",
    descripcion: "Fabricaci\xF3n de pilas y acumuladores el\xE9ctricos"
  },
  {
    codigo: "27.3",
    descripcion: "Fabricaci\xF3n de cables y dispositivos de cableado"
  },
  {
    codigo: "27.31",
    descripcion: "Fabricaci\xF3n de cables de fibra \xF3ptica"
  },
  {
    codigo: "27.32",
    descripcion: "Fabricaci\xF3n de otros hilos y cables electr\xF3nicos y el\xE9ctricos"
  },
  {
    codigo: "27.33",
    descripcion: "Fabricaci\xF3n de dispositivos de cableado"
  },
  {
    codigo: "27.4",
    descripcion: "Fabricaci\xF3n de equipos de iluminaci\xF3n"
  },
  {
    codigo: "27.40",
    descripcion: "Fabricaci\xF3n de equipos de iluminaci\xF3n"
  },
  {
    codigo: "27.5",
    descripcion: "Fabricaci\xF3n de aparatos dom\xE9sticos"
  },
  {
    codigo: "27.51",
    descripcion: "Fabricaci\xF3n de electrodom\xE9sticos"
  },
  {
    codigo: "27.52",
    descripcion: "Fabricaci\xF3n de aparatos dom\xE9sticos no el\xE9ctricos"
  },
  {
    codigo: "27.9",
    descripcion: "Fabricaci\xF3n de otro material y equipo el\xE9ctrico"
  },
  {
    codigo: "27.90",
    descripcion: "Fabricaci\xF3n de otro material y equipo el\xE9ctrico"
  },
  {
    codigo: 28,
    descripcion: "Fabricaci\xF3n de maquinaria y equipo n.c.o.p."
  },
  {
    codigo: "28.1",
    descripcion: "Fabricaci\xF3n de maquinaria de uso general"
  },
  {
    codigo: "28.11",
    descripcion: "Fabricaci\xF3n de motores y turbinas, excepto los destinados a aeronaves, veh\xEDculos autom\xF3viles y ciclomotores"
  },
  {
    codigo: "28.12",
    descripcion: "Fabricaci\xF3n de equipos de transmisi\xF3n hidr\xE1ulica y neum\xE1tica"
  },
  {
    codigo: "28.13",
    descripcion: "Fabricaci\xF3n de otras bombas y compresores"
  },
  {
    codigo: "28.14",
    descripcion: "Fabricaci\xF3n de otra grifer\xEDa y v\xE1lvulas"
  },
  {
    codigo: "28.15",
    descripcion: "Fabricaci\xF3n de cojinetes, engranajes y \xF3rganos mec\xE1nicos de transmisi\xF3n"
  },
  {
    codigo: "28.2",
    descripcion: "Fabricaci\xF3n de otra maquinaria de uso general"
  },
  {
    codigo: "28.21",
    descripcion: "Fabricaci\xF3n de hornos, quemadores y equipos de calefacci\xF3n dom\xE9stica permanente"
  },
  {
    codigo: "28.22",
    descripcion: "Fabricaci\xF3n de maquinaria de elevaci\xF3n y manipulaci\xF3n"
  },
  {
    codigo: "28.23",
    descripcion: "Fabricaci\xF3n de m\xE1quinas y equipos de oficina, excepto equipos inform\xE1ticos"
  },
  {
    codigo: "28.24",
    descripcion: "Fabricaci\xF3n de herramientas el\xE9ctricas manuales"
  },
  {
    codigo: "28.25",
    descripcion: "Fabricaci\xF3n de equipos de aire acondicionado no dom\xE9sticos"
  },
  {
    codigo: "28.29",
    descripcion: "Fabricaci\xF3n de otra maquinaria de uso general n.c.o.p."
  },
  {
    codigo: "28.3",
    descripcion: "Fabricaci\xF3n de maquinaria agraria y forestal"
  },
  {
    codigo: "28.30",
    descripcion: "Fabricaci\xF3n de maquinaria agraria y forestal"
  },
  {
    codigo: "28.4",
    descripcion: "Fabricaci\xF3n de maquinaria para el conformado de metales y de m\xE1quinas herramienta"
  },
  {
    codigo: "28.41",
    descripcion: "Fabricaci\xF3n de maquinaria para el conformado de metales y de otras m\xE1quinas herramienta para trabajar el metal"
  },
  {
    codigo: "28.42",
    descripcion: "Fabricaci\xF3n de otras m\xE1quinas herramienta"
  },
  {
    codigo: "28.9",
    descripcion: "Fabricaci\xF3n de otra maquinaria para usos espec\xEDficos"
  },
  {
    codigo: "28.91",
    descripcion: "Fabricaci\xF3n de maquinaria para la industria metal\xFArgica"
  },
  {
    codigo: "28.92",
    descripcion: "Fabricaci\xF3n de maquinaria para las industrias extractivas y de la construcci\xF3n"
  },
  {
    codigo: "28.93",
    descripcion: "Fabricaci\xF3n de maquinaria para la industria de la alimentaci\xF3n, bebidas y tabaco"
  },
  {
    codigo: "28.94",
    descripcion: "Fabricaci\xF3n de maquinaria para las industrias textil, de la confecci\xF3n y del cuero"
  },
  {
    codigo: "28.95",
    descripcion: "Fabricaci\xF3n de maquinaria para la industria del papel y del cart\xF3n"
  },
  {
    codigo: "28.96",
    descripcion: "Fabricaci\xF3n de maquinaria para las industrias del pl\xE1stico y del caucho"
  },
  {
    codigo: "28.97",
    descripcion: "Fabricaci\xF3n de maquinaria de fabricaci\xF3n aditiva"
  },
  {
    codigo: "28.99",
    descripcion: "Fabricaci\xF3n de otra maquinaria para usos espec\xEDficos n.c.o.p."
  },
  {
    codigo: 29,
    descripcion: "Fabricaci\xF3n de veh\xEDculos de motor, remolques y semirremolques"
  },
  {
    codigo: "29.1",
    descripcion: "Fabricaci\xF3n de veh\xEDculos de motor"
  },
  {
    codigo: "29.10",
    descripcion: "Fabricaci\xF3n de veh\xEDculos de motor"
  },
  {
    codigo: "29.2",
    descripcion: "Fabricaci\xF3n de carrocer\xEDas para veh\xEDculos de motor; fabricaci\xF3n de remolques y semirremolques"
  },
  {
    codigo: "29.20",
    descripcion: "Fabricaci\xF3n de carrocer\xEDas para veh\xEDculos de motor; fabricaci\xF3n de remolques y semirremolques"
  },
  {
    codigo: "29.3",
    descripcion: "Fabricaci\xF3n de repuestos y accesorios de veh\xEDculos de motor"
  },
  {
    codigo: "29.31",
    descripcion: "Fabricaci\xF3n de equipos el\xE9ctricos y electr\xF3nicos para veh\xEDculos de motor"
  },
  {
    codigo: "29.32",
    descripcion: "Fabricaci\xF3n de otros componentes, piezas y accesorios para veh\xEDculos de motor"
  },
  {
    codigo: 30,
    descripcion: "Fabricaci\xF3n de otro material de transporte"
  },
  {
    codigo: "30.1",
    descripcion: "Construcci\xF3n naval"
  },
  {
    codigo: "30.11",
    descripcion: "Construcci\xF3n de buques civiles y estructuras flotantes"
  },
  {
    codigo: "30.12",
    descripcion: "Construcci\xF3n de embarcaciones de recreo y deporte"
  },
  {
    codigo: "30.13",
    descripcion: "Construcci\xF3n de embarcaciones y buques militares"
  },
  {
    codigo: "30.2",
    descripcion: "Fabricaci\xF3n de locomotoras y material ferroviario"
  },
  {
    codigo: "30.20",
    descripcion: "Fabricaci\xF3n de locomotoras y material ferroviario"
  },
  {
    codigo: "30.3",
    descripcion: "Construcci\xF3n aeron\xE1utica y espacial y su maquinaria"
  },
  {
    codigo: "30.31",
    descripcion: "Construcci\xF3n aeron\xE1utica y espacial civil y su maquinaria"
  },
  {
    codigo: "30.32",
    descripcion: "Construcci\xF3n aeron\xE1utica y espacial militar y su maquinaria"
  },
  {
    codigo: "30.4",
    descripcion: "Fabricaci\xF3n de veh\xEDculos militares de combate"
  },
  {
    codigo: "30.40",
    descripcion: "Fabricaci\xF3n de veh\xEDculos militares de combate"
  },
  {
    codigo: "30.9",
    descripcion: "Fabricaci\xF3n de otro material de transporte n.c.o.p."
  },
  {
    codigo: "30.91",
    descripcion: "Fabricaci\xF3n de motocicletas"
  },
  {
    codigo: "30.92",
    descripcion: "Fabricaci\xF3n de bicicletas y de veh\xEDculos para personas con discapacidad"
  },
  {
    codigo: "30.99",
    descripcion: "Fabricaci\xF3n de otro material de transporte n.c.o.p."
  },
  {
    codigo: 31,
    descripcion: "Fabricaci\xF3n de muebles"
  },
  {
    codigo: "31.0",
    descripcion: "Fabricaci\xF3n de muebles"
  },
  {
    codigo: "31.00",
    descripcion: "Fabricaci\xF3n de muebles"
  },
  {
    codigo: 32,
    descripcion: "Otras industrias manufactureras"
  },
  {
    codigo: "32.1",
    descripcion: "Fabricaci\xF3n de art\xEDculos de joyer\xEDa, bisuter\xEDa y similares"
  },
  {
    codigo: "32.11",
    descripcion: "Fabricaci\xF3n de monedas"
  },
  {
    codigo: "32.12",
    descripcion: "Fabricaci\xF3n de art\xEDculos de joyer\xEDa y art\xEDculos similares"
  },
  {
    codigo: "32.13",
    descripcion: "Fabricaci\xF3n de art\xEDculos de bisuter\xEDa y art\xEDculos similares"
  },
  {
    codigo: "32.2",
    descripcion: "Fabricaci\xF3n de instrumentos musicales"
  },
  {
    codigo: "32.20",
    descripcion: "Fabricaci\xF3n de instrumentos musicales"
  },
  {
    codigo: "32.3",
    descripcion: "Fabricaci\xF3n de art\xEDculos de deporte"
  },
  {
    codigo: "32.30",
    descripcion: "Fabricaci\xF3n de art\xEDculos de deporte"
  },
  {
    codigo: "32.4",
    descripcion: "Fabricaci\xF3n de juegos y juguetes"
  },
  {
    codigo: "32.40",
    descripcion: "Fabricaci\xF3n de juegos y juguetes"
  },
  {
    codigo: "32.5",
    descripcion: "Fabricaci\xF3n de instrumentos y suministros m\xE9dicos y odontol\xF3gicos"
  },
  {
    codigo: "32.50",
    descripcion: "Fabricaci\xF3n de instrumentos y suministros m\xE9dicos y odontol\xF3gicos"
  },
  {
    codigo: "32.9",
    descripcion: "Industrias manufactureras n.c.o.p."
  },
  {
    codigo: "32.91",
    descripcion: "Fabricaci\xF3n de escobas, brochas y cepillos"
  },
  {
    codigo: "32.99",
    descripcion: "Otras industrias manufactureras n.c.o.p."
  },
  {
    codigo: 33,
    descripcion: "Reparaci\xF3n, mantenimiento e instalaci\xF3n de maquinaria y equipos"
  },
  {
    codigo: "33.1",
    descripcion: "Reparaci\xF3n y mantenimiento de productos met\xE1licos, maquinaria y equipos"
  },
  {
    codigo: "33.11",
    descripcion: "Reparaci\xF3n y mantenimiento de productos met\xE1licos"
  },
  {
    codigo: "33.12",
    descripcion: "Reparaci\xF3n y mantenimiento de maquinaria"
  },
  {
    codigo: "33.13",
    descripcion: "Reparaci\xF3n y mantenimiento de equipos electr\xF3nicos y \xF3pticos"
  },
  {
    codigo: "33.14",
    descripcion: "Reparaci\xF3n y mantenimiento de equipos el\xE9ctricos"
  },
  {
    codigo: "33.15",
    descripcion: "Reparaci\xF3n y mantenimiento de buques y embarcaciones civiles"
  },
  {
    codigo: "33.16",
    descripcion: "Reparaci\xF3n y mantenimiento aeron\xE1utico y espacial civil"
  },
  {
    codigo: "33.17",
    descripcion: "Reparaci\xF3n y mantenimiento de otro material de transporte civil"
  },
  {
    codigo: "33.18",
    descripcion: "Reparaci\xF3n y mantenimiento de veh\xEDculos de combate, buques, embarcaciones, veh\xEDculos a\xE9reos y espaciales militares"
  },
  {
    codigo: "33.19",
    descripcion: "Reparaci\xF3n y mantenimiento de otros equipos"
  },
  {
    codigo: "33.2",
    descripcion: "Instalaci\xF3n de m\xE1quinas y equipos industriales"
  },
  {
    codigo: "33.20",
    descripcion: "Instalaci\xF3n de m\xE1quinas y equipos industriales"
  },
  {
    codigo: "D",
    descripcion: "SUMINISTRO DE ENERGIA ELECTRICA, GAS, VAPOR Y AIRE ACONDICIONADO"
  },
  {
    codigo: 35,
    descripcion: "Suministro de energ\xEDa el\xE9ctrica, gas, vapor y aire acondicionado"
  },
  {
    codigo: "35.1",
    descripcion: "Producci\xF3n, transporte y distribuci\xF3n de energ\xEDa el\xE9ctrica"
  },
  {
    codigo: "35.11",
    descripcion: "Producci\xF3n de energ\xEDa el\xE9ctrica a partir de fuentes no renovables"
  },
  {
    codigo: "35.12",
    descripcion: "Producci\xF3n de energ\xEDa el\xE9ctrica a partir de fuentes renovables"
  },
  {
    codigo: "35.13",
    descripcion: "Transporte de energ\xEDa el\xE9ctrica"
  },
  {
    codigo: "35.14",
    descripcion: "Distribuci\xF3n de energ\xEDa el\xE9ctrica"
  },
  {
    codigo: "35.15",
    descripcion: "Comercio de energ\xEDa el\xE9ctrica"
  },
  {
    codigo: "35.16",
    descripcion: "Almacenamiento de energ\xEDa el\xE9ctrica"
  },
  {
    codigo: "35.2",
    descripcion: "Producci\xF3n de gas y distribuci\xF3n por tuber\xEDa de combustibles gaseosos"
  },
  {
    codigo: "35.21",
    descripcion: "Producci\xF3n de gas"
  },
  {
    codigo: "35.22",
    descripcion: "Distribuci\xF3n por tuber\xEDa de combustibles gaseosos"
  },
  {
    codigo: "35.23",
    descripcion: "Comercio de gas por tuber\xEDas "
  },
  {
    codigo: "35.24",
    descripcion: "Almacenamiento de gas como parte de los servicios de suministro de la red"
  },
  {
    codigo: "35.3",
    descripcion: "Suministro de vapor y aire acondicionado "
  },
  {
    codigo: "35.30",
    descripcion: "Suministro de vapor y aire acondicionado "
  },
  {
    codigo: "35.4",
    descripcion: "Actividades de intermediaci\xF3n de energ\xEDa el\xE9ctrica y gas natural"
  },
  {
    codigo: "35.40",
    descripcion: "Actividades de intermediaci\xF3n de energ\xEDa el\xE9ctrica y gas natural"
  },
  {
    codigo: "E",
    descripcion: "SUMINISTRO DE AGUA, ACTIVIDADES DE SANEAMIENTO, GESTI\xD3N DE RESIDUOS Y DESCONTAMINACI\xD3N"
  },
  {
    codigo: 36,
    descripcion: "Captaci\xF3n, depuraci\xF3n y distribuci\xF3n de agua"
  },
  {
    codigo: "36.0",
    descripcion: "Captaci\xF3n, depuraci\xF3n y distribuci\xF3n de agua"
  },
  {
    codigo: "36.00",
    descripcion: "Captaci\xF3n, depuraci\xF3n y distribuci\xF3n de agua"
  },
  {
    codigo: 37,
    descripcion: "Recogida y tratamiento de aguas residuales"
  },
  {
    codigo: "37.0",
    descripcion: "Recogida y tratamiento de aguas residuales"
  },
  {
    codigo: "37.00",
    descripcion: "Recogida y tratamiento de aguas residuales"
  },
  {
    codigo: 38,
    descripcion: "Actividades de recogida, tratamiento y eliminaci\xF3n de residuos "
  },
  {
    codigo: "38.1",
    descripcion: "Recogida de residuos "
  },
  {
    codigo: "38.11",
    descripcion: "Recogida de residuos no peligrosos"
  },
  {
    codigo: "38.12",
    descripcion: "Recogida de residuos peligrosos"
  },
  {
    codigo: "38.2",
    descripcion: "Valorizaci\xF3n de residuos"
  },
  {
    codigo: "38.21",
    descripcion: "Valorizaci\xF3n de materiales"
  },
  {
    codigo: "38.22",
    descripcion: "Valorizaci\xF3n energ\xE9tica"
  },
  {
    codigo: "38.23",
    descripcion: "Otra valorizaci\xF3n de residuos"
  },
  {
    codigo: "38.3",
    descripcion: "Eliminaci\xF3n de residuos sin valorizaci\xF3n"
  },
  {
    codigo: "38.31",
    descripcion: "Incineraci\xF3n sin valorizaci\xF3n energ\xE9tica"
  },
  {
    codigo: "38.32",
    descripcion: "Dep\xF3sito en vertederos o almacenamiento permanente"
  },
  {
    codigo: "38.33",
    descripcion: "Otra eliminaci\xF3n de residuos"
  },
  {
    codigo: 39,
    descripcion: "Actividades de descontaminaci\xF3n y otros servicios de gesti\xF3n de residuos"
  },
  {
    codigo: "39.0",
    descripcion: "Actividades de descontaminaci\xF3n y otros servicios de gesti\xF3n de residuos"
  },
  {
    codigo: "39.00",
    descripcion: "Actividades de descontaminaci\xF3n y otros servicios de gesti\xF3n de residuos"
  },
  {
    codigo: "F",
    descripcion: "CONSTRUCCI\xD3N"
  },
  {
    codigo: 41,
    descripcion: "Construcci\xF3n de edificios"
  },
  {
    codigo: "41.0",
    descripcion: "Construcci\xF3n de edificios"
  },
  {
    codigo: "41.01",
    descripcion: "Construcci\xF3n de edificios residenciales"
  },
  {
    codigo: "41.02",
    descripcion: "Construcci\xF3n de edificios no residenciales"
  },
  {
    codigo: 42,
    descripcion: "Ingenier\xEDa civil"
  },
  {
    codigo: "42.1",
    descripcion: "Construcci\xF3n de carreteras y v\xEDas f\xE9rreas, puentes y t\xFAneles"
  },
  {
    codigo: "42.11",
    descripcion: "Construcci\xF3n de carreteras y autopistas"
  },
  {
    codigo: "42.12",
    descripcion: "Construcci\xF3n de v\xEDas f\xE9rreas de superficie y subterr\xE1neas"
  },
  {
    codigo: "42.13",
    descripcion: "Construcci\xF3n de puentes y t\xFAneles"
  },
  {
    codigo: "42.2",
    descripcion: "Construcci\xF3n de redes"
  },
  {
    codigo: "42.21",
    descripcion: "Construcci\xF3n de redes para fluidos"
  },
  {
    codigo: "42.22",
    descripcion: "Construcci\xF3n de redes el\xE9ctricas y de telecomunicaciones"
  },
  {
    codigo: "42.9",
    descripcion: "Construcci\xF3n de otros proyectos de ingenier\xEDa civil"
  },
  {
    codigo: "42.91",
    descripcion: "Obras hidr\xE1ulicas"
  },
  {
    codigo: "42.99",
    descripcion: "Construcci\xF3n de otros proyectos de ingenier\xEDa civil n.c.o.p."
  },
  {
    codigo: 43,
    descripcion: "Actividades de construcci\xF3n especializada"
  },
  {
    codigo: "43.1",
    descripcion: "Demolici\xF3n y preparaci\xF3n de terrenos"
  },
  {
    codigo: "43.11",
    descripcion: "Demolici\xF3n"
  },
  {
    codigo: "43.12",
    descripcion: "Preparaci\xF3n de terrenos"
  },
  {
    codigo: "43.13",
    descripcion: "Perforaciones y sondeos"
  },
  {
    codigo: "43.2",
    descripcion: "Instalaciones el\xE9ctricas, de fontaner\xEDa y otras instalaciones en obras de construcci\xF3n"
  },
  {
    codigo: "43.21",
    descripcion: "Instalaciones el\xE9ctricas"
  },
  {
    codigo: "43.22",
    descripcion: "Fontaner\xEDa, instalaci\xF3n de sistemas de calefacci\xF3n y aire acondicionado"
  },
  {
    codigo: "43.23",
    descripcion: "Instalaci\xF3n de aislamientos"
  },
  {
    codigo: "43.24",
    descripcion: "Otras instalaciones en obras de construcci\xF3n"
  },
  {
    codigo: "43.3",
    descripcion: "Acabado de edificios"
  },
  {
    codigo: "43.31",
    descripcion: "Revocamiento"
  },
  {
    codigo: "43.32",
    descripcion: "Instalaci\xF3n de carpinter\xEDa"
  },
  {
    codigo: "43.33",
    descripcion: "Revestimiento de suelos y paredes"
  },
  {
    codigo: "43.34",
    descripcion: "Pintura y acristalamiento"
  },
  {
    codigo: "43.35",
    descripcion: "Otros acabados de edificios"
  },
  {
    codigo: "43.4",
    descripcion: "Actividades de construcci\xF3n especializada en la construcci\xF3n de edificios"
  },
  {
    codigo: "43.41",
    descripcion: "Construcci\xF3n de cubiertas"
  },
  {
    codigo: "43.42",
    descripcion: "Otras actividades de construcci\xF3n especializada en la construcci\xF3n de edificios"
  },
  {
    codigo: "43.5",
    descripcion: "Actividades de construcci\xF3n especializada en ingenier\xEDa civil"
  },
  {
    codigo: "43.50",
    descripcion: "Actividades de construcci\xF3n especializada en ingenier\xEDa civil"
  },
  {
    codigo: "43.6",
    descripcion: "Actividades de intermediaci\xF3n para servicios de construcci\xF3n especializada"
  },
  {
    codigo: "43.60",
    descripcion: "Actividades de intermediaci\xF3n para servicios de construcci\xF3n especializada"
  },
  {
    codigo: "43.9",
    descripcion: "Otras actividades de construcci\xF3n especializada"
  },
  {
    codigo: "43.91",
    descripcion: "Actividades de mamposter\xEDa y alba\xF1iler\xEDa"
  },
  {
    codigo: "43.99",
    descripcion: "Otras actividades de construcci\xF3n especializada n.c.o.p."
  },
  {
    codigo: "G",
    descripcion: "COMERCIO AL POR MAYOR Y AL POR MENOR"
  },
  {
    codigo: 46,
    descripcion: "Comercio al por mayor"
  },
  {
    codigo: "46.1",
    descripcion: "Intermediarios del comercio al por mayor"
  },
  {
    codigo: "46.11",
    descripcion: "Actividades de intermediarios del comercio al por mayor de materias primas agrarias, animales vivos, materias primas textiles y productos semielaborados"
  },
  {
    codigo: "46.12",
    descripcion: "Actividades de intermediarios del comercio al por mayor de combustibles, minerales, metales y productos qu\xEDmicos industriales"
  },
  {
    codigo: "46.13",
    descripcion: "Actividades de intermediarios del comercio al por mayor de la madera y materiales de construcci\xF3n"
  },
  {
    codigo: "46.14",
    descripcion: "Actividades de intermediarios del comercio al por mayor de maquinaria, equipo industrial, embarcaciones y aeronaves"
  },
  {
    codigo: "46.15",
    descripcion: "Actividades de intermediarios del comercio al por mayor de muebles, art\xEDculos para el hogar y ferreter\xEDa"
  },
  {
    codigo: "46.16",
    descripcion: "Actividades de intermediarios del comercio al por mayor de textiles, prendas de vestir, peleter\xEDa, calzado y art\xEDculos de cuero"
  },
  {
    codigo: "46.17",
    descripcion: "Actividades de intermediarios del comercio al por mayor de productos alimenticios, bebidas y tabaco"
  },
  {
    codigo: "46.18",
    descripcion: "Actividades de intermediarios del comercio al por mayor de otros productos espec\xEDficos"
  },
  {
    codigo: "46.19",
    descripcion: "Actividades de los agentes del comercio al por mayor no especializado"
  },
  {
    codigo: "46.2",
    descripcion: "Comercio al por mayor de materias primas agrarias y de animales vivos"
  },
  {
    codigo: "46.21",
    descripcion: "Comercio al por mayor de cereales, tabaco en rama, simientes y alimentos para animales"
  },
  {
    codigo: "46.22",
    descripcion: "Comercio al por mayor de flores y plantas"
  },
  {
    codigo: "46.23",
    descripcion: "Comercio al por mayor de animales vivos"
  },
  {
    codigo: "46.24",
    descripcion: "Comercio al por mayor de cueros y pieles"
  },
  {
    codigo: "46.3",
    descripcion: "Comercio al por mayor de productos alimenticios, bebidas y tabaco"
  },
  {
    codigo: "46.31",
    descripcion: "Comercio al por mayor de frutas y hortalizas"
  },
  {
    codigo: "46.32",
    descripcion: "Comercio al por mayor de carne, productos c\xE1rnicos; pescado y productos del pescado"
  },
  {
    codigo: "46.33",
    descripcion: "Comercio al por mayor de productos l\xE1cteos, huevos, aceites y grasas comestibles"
  },
  {
    codigo: "46.34",
    descripcion: "Comercio al por mayor de bebidas"
  },
  {
    codigo: "46.35",
    descripcion: "Comercio al por mayor de productos del tabaco"
  },
  {
    codigo: "46.36",
    descripcion: "Comercio al por mayor de az\xFAcar, chocolate y confiter\xEDa"
  },
  {
    codigo: "46.37",
    descripcion: "Comercio al por mayor de caf\xE9, t\xE9, cacao y especias"
  },
  {
    codigo: "46.38",
    descripcion: "Comercio al por mayor de otros alimentos"
  },
  {
    codigo: "46.39",
    descripcion: "Comercio al por mayor, no especializado, de productos alimenticios, bebidas y tabaco"
  },
  {
    codigo: "46.4",
    descripcion: "Comercio al por mayor de art\xEDculos de uso dom\xE9stico"
  },
  {
    codigo: "46.41",
    descripcion: "Comercio al por mayor de textiles"
  },
  {
    codigo: "46.42",
    descripcion: "Comercio al por mayor de prendas de vestir y calzado"
  },
  {
    codigo: "46.43",
    descripcion: "Comercio al por mayor de aparatos electrodom\xE9sticos"
  },
  {
    codigo: "46.44",
    descripcion: "Comercio al por mayor de porcelana, cristaler\xEDa y art\xEDculos de limpieza"
  },
  {
    codigo: "46.45",
    descripcion: "Comercio al por mayor de productos de perfumer\xEDa y cosm\xE9tica"
  },
  {
    codigo: "46.46",
    descripcion: "Comercio al por mayor de productos farmac\xE9uticos y m\xE9dicos"
  },
  {
    codigo: "46.47",
    descripcion: "Comercio al por mayor de muebles para el hogar, oficinas y establecimientos comerciales, alfombras y aparatos de iluminaci\xF3n"
  },
  {
    codigo: "46.48",
    descripcion: "Comercio al por mayor de art\xEDculos de relojer\xEDa y joyer\xEDa"
  },
  {
    codigo: "46.49",
    descripcion: "Comercio al por mayor de otros art\xEDculos de uso dom\xE9stico"
  },
  {
    codigo: "46.5",
    descripcion: "Comercio al por mayor de equipos para las tecnolog\xEDas de la informaci\xF3n y las comunicaciones"
  },
  {
    codigo: "46.50",
    descripcion: "Comercio al por mayor de equipos para las tecnolog\xEDas de la informaci\xF3n y las comunicaciones"
  },
  {
    codigo: "46.6",
    descripcion: "Comercio al por mayor de otra maquinaria, equipos y suministros"
  },
  {
    codigo: "46.61",
    descripcion: "Comercio al por mayor de maquinaria, equipos y suministros agr\xEDcolas"
  },
  {
    codigo: "46.62",
    descripcion: "Comercio al por mayor de m\xE1quinas herramienta"
  },
  {
    codigo: "46.63",
    descripcion: "Comercio al por mayor de maquinaria para la miner\xEDa, la construcci\xF3n y la ingenier\xEDa civil"
  },
  {
    codigo: "46.64",
    descripcion: "Comercio al por mayor de otra maquinaria y equipo"
  },
  {
    codigo: "46.7",
    descripcion: "Comercio al por mayor de veh\xEDculos de motor, motocicletas y sus repuestos y accesorios"
  },
  {
    codigo: "46.71",
    descripcion: "Comercio al por mayor de veh\xEDculos de motor"
  },
  {
    codigo: "46.72",
    descripcion: "Comercio al por mayor de repuestos y accesorios de veh\xEDculos de motor"
  },
  {
    codigo: "46.73",
    descripcion: "Comercio al por mayor de motocicletas, y repuestos y accesorios de motocicletas"
  },
  {
    codigo: "46.8",
    descripcion: "Otro comercio al por mayor especializado"
  },
  {
    codigo: "46.81",
    descripcion: "Comercio al por mayor de combustibles s\xF3lidos, l\xEDquidos y gaseosos, y productos similares"
  },
  {
    codigo: "46.82",
    descripcion: "Comercio al por mayor de metales y minerales met\xE1licos"
  },
  {
    codigo: "46.83",
    descripcion: "Comercio al por mayor de madera, materiales de construcci\xF3n y aparatos sanitarios"
  },
  {
    codigo: "46.84",
    descripcion: "Comercio al por mayor de equipos y suministros de ferreter\xEDa, fontaner\xEDa y calefacci\xF3n"
  },
  {
    codigo: "46.85",
    descripcion: "Comercio al por mayor de productos qu\xEDmicos"
  },
  {
    codigo: "46.86",
    descripcion: "Comercio al por mayor de otros productos semielaborados"
  },
  {
    codigo: "46.87",
    descripcion: "Comercio al por mayor de chatarra y productos de desecho"
  },
  {
    codigo: "46.89",
    descripcion: "Otro comercio al por mayor especializado n.c.o.p."
  },
  {
    codigo: "46.9",
    descripcion: "Comercio al por mayor no especializado"
  },
  {
    codigo: "46.90",
    descripcion: "Comercio al por mayor no especializado"
  },
  {
    codigo: 47,
    descripcion: "Comercio al por menor"
  },
  {
    codigo: "47.1",
    descripcion: "Comercio al por menor no especializado"
  },
  {
    codigo: "47.11",
    descripcion: "Comercio al por menor no especializado con predominio de productos alimenticios, bebidas y tabaco"
  },
  {
    codigo: "47.12",
    descripcion: "Otro comercio al por menor no especializado"
  },
  {
    codigo: "47.2",
    descripcion: "Comercio al por menor de productos alimenticios, bebidas y tabaco"
  },
  {
    codigo: "47.21",
    descripcion: "Comercio al por menor de frutas y verduras"
  },
  {
    codigo: "47.22",
    descripcion: "Comercio al por menor de carne y productos c\xE1rnicos"
  },
  {
    codigo: "47.23",
    descripcion: "Comercio al por menor de pescados y mariscos"
  },
  {
    codigo: "47.24",
    descripcion: "Comercio al por menor de pan, productos de panader\xEDa y confiter\xEDa"
  },
  {
    codigo: "47.25",
    descripcion: "Comercio al por menor de bebidas"
  },
  {
    codigo: "47.26",
    descripcion: "Comercio al por menor de productos de tabaco"
  },
  {
    codigo: "47.27",
    descripcion: "Comercio al por menor de otros productos alimenticios"
  },
  {
    codigo: "47.3",
    descripcion: "Comercio al por menor de combustible para la automoci\xF3n"
  },
  {
    codigo: "47.30",
    descripcion: "Comercio al por menor de combustible para la automoci\xF3n"
  },
  {
    codigo: "47.4",
    descripcion: "Comercio al por menor de equipos para las tecnolog\xEDas de la informaci\xF3n y las comunicaciones"
  },
  {
    codigo: "47.40",
    descripcion: "Comercio al por menor de equipos para las tecnolog\xEDas de la informaci\xF3n y las comunicaciones"
  },
  {
    codigo: "47.5",
    descripcion: "Comercio al por menor de otros art\xEDculos de uso dom\xE9stico"
  },
  {
    codigo: "47.51",
    descripcion: "Comercio al por menor de textiles"
  },
  {
    codigo: "47.52",
    descripcion: "Comercio al por menor de ferreter\xEDa, materiales de construcci\xF3n, pinturas y vidrio"
  },
  {
    codigo: "47.53",
    descripcion: "Comercio al por menor de alfombras, moquetas y revestimientos de paredes y suelos"
  },
  {
    codigo: "47.54",
    descripcion: "Comercio al por menor de aparatos electrodom\xE9sticos"
  },
  {
    codigo: "47.55",
    descripcion: "Comercio al por menor de muebles, aparatos de iluminaci\xF3n, vajilla y otros art\xEDculos de uso dom\xE9stico"
  },
  {
    codigo: "47.6",
    descripcion: "Comercio al por menor de art\xEDculos culturales y recreativos"
  },
  {
    codigo: "47.61",
    descripcion: "Comercio al por menor de libros"
  },
  {
    codigo: "47.62",
    descripcion: "Comercio al por menor de peri\xF3dicos y otras publicaciones peri\xF3dicas y art\xEDculos de papeler\xEDa"
  },
  {
    codigo: "47.63",
    descripcion: "Comercio al por menor de art\xEDculos deportivos"
  },
  {
    codigo: "47.64",
    descripcion: "Comercio al por menor de juegos y juguetes"
  },
  {
    codigo: "47.69",
    descripcion: "Comercio al por menor de art\xEDculos culturales y recreativos n.c.o.p."
  },
  {
    codigo: "47.7",
    descripcion: "Comercio al por menor de otros art\xEDculos, excepto veh\xEDculos de motor y motocicletas"
  },
  {
    codigo: "47.71",
    descripcion: "Comercio al por menor de prendas de vestir"
  },
  {
    codigo: "47.72",
    descripcion: "Comercio al por menor de calzado y art\xEDculos de cuero"
  },
  {
    codigo: "47.73",
    descripcion: "Comercio al por menor de productos farmac\xE9uticos"
  },
  {
    codigo: "47.74",
    descripcion: "Comercio al por menor de art\xEDculos m\xE9dicos y ortop\xE9dicos"
  },
  {
    codigo: "47.75",
    descripcion: "Comercio al por menor de productos de cosm\xE9tica e higiene"
  },
  {
    codigo: "47.76",
    descripcion: "Comercio al por menor de flores, plantas, fertilizantes, animales de compa\xF1\xEDa y alimentos para estos"
  },
  {
    codigo: "47.77",
    descripcion: "Comercio al por menor de art\xEDculos de relojer\xEDa y joyer\xEDa"
  },
  {
    codigo: "47.78",
    descripcion: "Comercio al por menor de otros productos nuevos"
  },
  {
    codigo: "47.79",
    descripcion: "Comercio al por menor de art\xEDculos de segunda mano"
  },
  {
    codigo: "47.8",
    descripcion: "Comercio al por menor de veh\xEDculos de motor, motocicletas y sus repuestos y accesorios"
  },
  {
    codigo: "47.81",
    descripcion: "Comercio al por menor de veh\xEDculos de motor"
  },
  {
    codigo: "47.82",
    descripcion: "Comercio al por menor de repuestos y accesorios de veh\xEDculos de motor"
  },
  {
    codigo: "47.83",
    descripcion: "Comercio al por menor de motocicletas, y repuestos y accesorios de motocicletas"
  },
  {
    codigo: "47.9",
    descripcion: "Actividades de servicios de intermediaci\xF3n para el comercio al por menor"
  },
  {
    codigo: "47.91",
    descripcion: "Actividades de servicios de intermediaci\xF3n para el comercio al por menor no especializado"
  },
  {
    codigo: "47.92",
    descripcion: "Actividades de servicios de intermediaci\xF3n para el comercio al por menor especializado"
  },
  {
    codigo: "H",
    descripcion: "TRANSPORTE Y ALMACENAMIENTO"
  },
  {
    codigo: 49,
    descripcion: "Transporte terrestre y por tuber\xEDa"
  },
  {
    codigo: "49.1",
    descripcion: "Transporte de pasajeros por ferrocarril"
  },
  {
    codigo: "49.11",
    descripcion: "Transporte pesado de pasajeros por ferrocarril"
  },
  {
    codigo: "49.12",
    descripcion: "Otro transporte de pasajeros por ferrocarril"
  },
  {
    codigo: "49.2",
    descripcion: "Transporte de mercanc\xEDas por ferrocarril"
  },
  {
    codigo: "49.20",
    descripcion: "Transporte de mercanc\xEDas por ferrocarril"
  },
  {
    codigo: "49.3",
    descripcion: "Otro transporte terrestre de pasajeros"
  },
  {
    codigo: "49.31",
    descripcion: "Transporte regular de pasajeros por carretera"
  },
  {
    codigo: "49.32",
    descripcion: "Transporte no regular de pasajeros por carretera"
  },
  {
    codigo: "49.33",
    descripcion: "Servicios de transporte de pasajeros bajo demanda en veh\xEDculos con conductor"
  },
  {
    codigo: "49.34",
    descripcion: "Transporte de pasajeros en telef\xE9ricos y remontes"
  },
  {
    codigo: "49.39",
    descripcion: "Otros tipos de transporte terrestre de pasajeros n.c.o.p."
  },
  {
    codigo: "49.4",
    descripcion: "Transporte de mercanc\xEDas por carretera y servicios de mudanza"
  },
  {
    codigo: "49.41",
    descripcion: "Transporte de mercanc\xEDas por carretera"
  },
  {
    codigo: "49.42",
    descripcion: "Servicios de mudanzas"
  },
  {
    codigo: "49.5",
    descripcion: "Transporte por tuber\xEDa"
  },
  {
    codigo: "49.50",
    descripcion: "Transporte por tuber\xEDa"
  },
  {
    codigo: 50,
    descripcion: "Transporte mar\xEDtimo y por v\xEDas navegables interiores"
  },
  {
    codigo: "50.1",
    descripcion: "Transporte mar\xEDtimo de pasajeros"
  },
  {
    codigo: "50.10",
    descripcion: "Transporte mar\xEDtimo de pasajeros"
  },
  {
    codigo: "50.2",
    descripcion: "Transporte mar\xEDtimo de mercanc\xEDas"
  },
  {
    codigo: "50.20",
    descripcion: "Transporte mar\xEDtimo de mercanc\xEDas"
  },
  {
    codigo: "50.3",
    descripcion: "Transporte de pasajeros por v\xEDas navegables interiores"
  },
  {
    codigo: "50.30",
    descripcion: "Transporte de pasajeros por v\xEDas navegables interiores"
  },
  {
    codigo: "50.4",
    descripcion: "Transporte de mercanc\xEDas por v\xEDas navegables interiores"
  },
  {
    codigo: "50.40",
    descripcion: "Transporte de mercanc\xEDas por v\xEDas navegables interiores"
  },
  {
    codigo: 51,
    descripcion: "Transporte a\xE9reo"
  },
  {
    codigo: "51.1",
    descripcion: "Transporte a\xE9reo de pasajeros"
  },
  {
    codigo: "51.10",
    descripcion: "Transporte a\xE9reo de pasajeros"
  },
  {
    codigo: "51.2",
    descripcion: "Transporte a\xE9reo de mercanc\xEDas y transporte espacial"
  },
  {
    codigo: "51.21",
    descripcion: "Transporte a\xE9reo de mercanc\xEDas"
  },
  {
    codigo: "51.22",
    descripcion: "Transporte espacial"
  },
  {
    codigo: 52,
    descripcion: "Dep\xF3sito, almacenamiento y actividades auxiliares del transporte "
  },
  {
    codigo: "52.1",
    descripcion: "Dep\xF3sito y almacenamiento"
  },
  {
    codigo: "52.10",
    descripcion: "Dep\xF3sito y almacenamiento"
  },
  {
    codigo: "52.2",
    descripcion: "Actividades auxiliares del transporte"
  },
  {
    codigo: "52.21",
    descripcion: "Actividades auxiliares del transporte terrestre"
  },
  {
    codigo: "52.22",
    descripcion: "Actividades auxiliares del transporte mar\xEDtimo y por v\xEDas navegables interiores"
  },
  {
    codigo: "52.23",
    descripcion: "Actividades auxiliares del transporte a\xE9reo"
  },
  {
    codigo: "52.24",
    descripcion: "Manipulaci\xF3n de mercanc\xEDas"
  },
  {
    codigo: "52.25",
    descripcion: "Actividades de servicios log\xEDsticos"
  },
  {
    codigo: "52.26",
    descripcion: "Otras actividades auxiliares del transporte"
  },
  {
    codigo: "52.3",
    descripcion: "Actividades de intermediaci\xF3n para el transporte"
  },
  {
    codigo: "52.31",
    descripcion: "Actividades de intermediaci\xF3n para el transporte de mercanc\xEDas"
  },
  {
    codigo: "52.32",
    descripcion: "Actividades de intermediaci\xF3n para el transporte de pasajeros"
  },
  {
    codigo: 53,
    descripcion: "Actividades postales y de mensajer\xEDa"
  },
  {
    codigo: "53.1",
    descripcion: "Actividades postales sometidas a la obligaci\xF3n del servicio universal"
  },
  {
    codigo: "53.10",
    descripcion: "Actividades postales sometidas a la obligaci\xF3n del servicio universal"
  },
  {
    codigo: "53.2",
    descripcion: "Otras actividades postales y de mensajer\xEDa"
  },
  {
    codigo: "53.20",
    descripcion: "Otras actividades postales y de mensajer\xEDa"
  },
  {
    codigo: "53.3",
    descripcion: "Servicios de intermediaci\xF3n para las actividades postales y de mensajer\xEDa"
  },
  {
    codigo: "53.30",
    descripcion: "Servicios de intermediaci\xF3n para las actividades postales y de mensajer\xEDa"
  },
  {
    codigo: "I",
    descripcion: "HOSTELER\xCDA"
  },
  {
    codigo: 55,
    descripcion: "Servicios de alojamiento"
  },
  {
    codigo: "55.1",
    descripcion: "Hoteles y alojamientos similares"
  },
  {
    codigo: "55.10",
    descripcion: "Hoteles y alojamientos similares"
  },
  {
    codigo: "55.2",
    descripcion: "Alojamientos tur\xEDsticos y otros alojamientos de corta estancia"
  },
  {
    codigo: "55.20",
    descripcion: "Alojamientos tur\xEDsticos y otros alojamientos de corta estancia"
  },
  {
    codigo: "55.3",
    descripcion: "Campings y aparcamientos para caravanas"
  },
  {
    codigo: "55.30",
    descripcion: "Campings y aparcamientos para caravanas"
  },
  {
    codigo: "55.4",
    descripcion: "Actividades de intermediaci\xF3n para los servicios de alojamiento"
  },
  {
    codigo: "55.40",
    descripcion: "Actividades de intermediaci\xF3n para los servicios de alojamiento"
  },
  {
    codigo: "55.9",
    descripcion: "Otros servicios de alojamiento"
  },
  {
    codigo: "55.90",
    descripcion: "Otros servicios de alojamiento"
  },
  {
    codigo: 56,
    descripcion: "Servicios de comidas y bebidas"
  },
  {
    codigo: "56.1",
    descripcion: "Restaurantes y puestos de comidas"
  },
  {
    codigo: "56.11",
    descripcion: "Restaurantes"
  },
  {
    codigo: "56.12",
    descripcion: "Puestos de comidas"
  },
  {
    codigo: "56.2",
    descripcion: "Servicios de catering y otros servicios de comidas"
  },
  {
    codigo: "56.21",
    descripcion: "Servicios ocasionales de catering "
  },
  {
    codigo: "56.22",
    descripcion: "Servicios regulares de catering y otros servicios de comidas"
  },
  {
    codigo: "56.3",
    descripcion: "Servicios de bebidas"
  },
  {
    codigo: "56.30",
    descripcion: "Servicios de bebidas"
  },
  {
    codigo: "56.4",
    descripcion: "Actividades de intermediaci\xF3n para los servicios de comidas y bebidas"
  },
  {
    codigo: "56.40",
    descripcion: "Actividades de intermediaci\xF3n para los servicios de comidas y bebidas"
  },
  {
    codigo: "J",
    descripcion: "ACTIVIDADES DE EDICI\xD3N, RADIODIFUSI\xD3N Y PRODUCCI\xD3N Y DISTRIBUCI\xD3N DE CONTENIDOS"
  },
  {
    codigo: 58,
    descripcion: "Edici\xF3n"
  },
  {
    codigo: "58.1",
    descripcion: "Edici\xF3n de libros, peri\xF3dicos y otras actividades editoriales, excepto la edici\xF3n de programas inform\xE1ticos"
  },
  {
    codigo: "58.11",
    descripcion: "Edici\xF3n de libros"
  },
  {
    codigo: "58.12",
    descripcion: "Edici\xF3n de peri\xF3dicos"
  },
  {
    codigo: "58.13",
    descripcion: "Edici\xF3n de revistas"
  },
  {
    codigo: "58.19",
    descripcion: "Otras actividades editoriales, excepto la edici\xF3n de programas inform\xE1ticos"
  },
  {
    codigo: "58.2",
    descripcion: "Edici\xF3n de programas inform\xE1ticos"
  },
  {
    codigo: "58.21",
    descripcion: "Edici\xF3n de videojuegos"
  },
  {
    codigo: "58.29",
    descripcion: "Edici\xF3n de otros programas inform\xE1ticos"
  },
  {
    codigo: 59,
    descripcion: "Producci\xF3n cinematogr\xE1fica, de v\xEDdeo y de programas de televisi\xF3n, grabaci\xF3n de sonido y edici\xF3n musical"
  },
  {
    codigo: "59.1",
    descripcion: "Actividades cinematogr\xE1ficas, de v\xEDdeo y de programas de televisi\xF3n"
  },
  {
    codigo: "59.12",
    descripcion: "Actividades de posproducci\xF3n cinematogr\xE1fica, de v\xEDdeo y de programas de televisi\xF3n"
  },
  {
    codigo: "59.14",
    descripcion: "Actividades de exhibici\xF3n cinematogr\xE1fica"
  },
  {
    codigo: "59.15",
    descripcion: "Actividades de producci\xF3n cinematogr\xE1fica y de v\xEDdeo"
  },
  {
    codigo: "59.16",
    descripcion: "Actividades de producci\xF3n de programas de televisi\xF3n"
  },
  {
    codigo: "59.17",
    descripcion: "Actividades de distribuci\xF3n cinematogr\xE1fica y de v\xEDdeo, excepto de programas de televisi\xF3n."
  },
  {
    codigo: "59.18",
    descripcion: "Actividades de distribuci\xF3n de programas de televisi\xF3n"
  },
  {
    codigo: "59.2",
    descripcion: "Actividades de grabaci\xF3n de sonido y edici\xF3n musical"
  },
  {
    codigo: "59.20",
    descripcion: "Actividades de grabaci\xF3n de sonido y edici\xF3n musical"
  },
  {
    codigo: 60,
    descripcion: "Actividades de programaci\xF3n, radiodifusi\xF3n, agencias de noticias y otras actividades de distribuci\xF3n de contenidos"
  },
  {
    codigo: "60.1",
    descripcion: "Actividades de radiodifusi\xF3n y distribuci\xF3n de audio"
  },
  {
    codigo: "60.10",
    descripcion: "Actividades de radiodifusi\xF3n y distribuci\xF3n de audio"
  },
  {
    codigo: "60.2",
    descripcion: "Actividades de programaci\xF3n de televisi\xF3n, emisi\xF3n y distribuci\xF3n de v\xEDdeos"
  },
  {
    codigo: "60.20",
    descripcion: "Actividades de programaci\xF3n de televisi\xF3n, emisi\xF3n y distribuci\xF3n de v\xEDdeos"
  },
  {
    codigo: "60.3",
    descripcion: "Actividades de las agencias de noticias y otras actividades de distribuci\xF3n de contenidos"
  },
  {
    codigo: "60.31",
    descripcion: "Actividades de las agencias de noticias"
  },
  {
    codigo: "60.39",
    descripcion: "Otras actividades de distribuci\xF3n de contenidos"
  },
  {
    codigo: "K",
    descripcion: "TELECOMUNICACIONES, PROGRAMACI\xD3N INFORM\xC1TICA, CONSULTOR\xCDA, INFRAESTRUCTURA INFORM\xC1TICA Y OTROS SERVICIOS DE INFORMACI\xD3N"
  },
  {
    codigo: 61,
    descripcion: "Telecomunicaciones"
  },
  {
    codigo: "61.1",
    descripcion: "Actividades de telecomunicaciones por cable, inal\xE1mbricas y por sat\xE9lite"
  },
  {
    codigo: "61.10",
    descripcion: "Actividades de telecomunicaciones por cable, inal\xE1mbricas y por sat\xE9lite"
  },
  {
    codigo: "61.2",
    descripcion: "Actividades de reventa de telecomunicaciones y servicios de intermediaci\xF3n para telecomunicaciones"
  },
  {
    codigo: "61.20",
    descripcion: "Actividades de reventa de telecomunicaciones y servicios de intermediaci\xF3n para telecomunicaciones"
  },
  {
    codigo: "61.9",
    descripcion: "Otras actividades de telecomunicaciones"
  },
  {
    codigo: "61.90",
    descripcion: "Otras actividades de telecomunicaciones"
  },
  {
    codigo: 62,
    descripcion: "Programaci\xF3n, consultor\xEDa y otras actividades relacionadas con la inform\xE1tica"
  },
  {
    codigo: "62.1",
    descripcion: "Actividades de programaci\xF3n inform\xE1tica"
  },
  {
    codigo: "62.10",
    descripcion: "Actividades de programaci\xF3n inform\xE1tica"
  },
  {
    codigo: "62.2",
    descripcion: "Actividades de consultor\xEDa inform\xE1tica y gesti\xF3n de instalaciones inform\xE1ticas"
  },
  {
    codigo: "62.20",
    descripcion: "Actividades de consultor\xEDa inform\xE1tica y gesti\xF3n de instalaciones inform\xE1ticas"
  },
  {
    codigo: "62.9",
    descripcion: "Otros servicios relacionados con las tecnolog\xEDas de la informaci\xF3n y la inform\xE1tica"
  },
  {
    codigo: "62.90",
    descripcion: "Otros servicios relacionados con las tecnolog\xEDas de la informaci\xF3n y la inform\xE1tica"
  },
  {
    codigo: 63,
    descripcion: "Infraestructura inform\xE1tica, tratamiento de datos, hosting y otras actividades de servicios de informaci\xF3n"
  },
  {
    codigo: "63.1",
    descripcion: "Infraestructura inform\xE1tica, procesamiento de datos, hosting y actividades relacionadas"
  },
  {
    codigo: "63.10",
    descripcion: "Infraestructura inform\xE1tica, procesamiento de datos, hosting y actividades relacionadas"
  },
  {
    codigo: "63.9",
    descripcion: "Actividades de portales de b\xFAsqueda en la web y otras actividades de servicios de informaci\xF3n"
  },
  {
    codigo: "63.91",
    descripcion: "Actividades de portales de b\xFAsqueda en la web"
  },
  {
    codigo: "63.92",
    descripcion: "Otros servicios de informaci\xF3n"
  },
  {
    codigo: "L",
    descripcion: "ACTIVIDADES FINANCIERAS Y DE SEGUROS"
  },
  {
    codigo: 64,
    descripcion: "Servicios financieros, excepto seguros y fondos de pensiones"
  },
  {
    codigo: "64.1",
    descripcion: "Intermediaci\xF3n monetaria"
  },
  {
    codigo: "64.11",
    descripcion: "Banca central"
  },
  {
    codigo: "64.19",
    descripcion: "Otra intermediaci\xF3n monetaria"
  },
  {
    codigo: "64.2",
    descripcion: "Actividades de sociedades holding y de sociedades instrumentales de financiaci\xF3n"
  },
  {
    codigo: "64.21",
    descripcion: "Actividades de sociedades holding"
  },
  {
    codigo: "64.22",
    descripcion: "Actividades de sociedades instrumentales de financiaci\xF3n"
  },
  {
    codigo: "64.3",
    descripcion: "Actividades de inversi\xF3n colectiva, de fondos y de entidades financieras similares"
  },
  {
    codigo: "64.31",
    descripcion: "Actividades de fondos de inversi\xF3n monetarios y no monetarios"
  },
  {
    codigo: "64.32",
    descripcion: "Actividades de cuentas fiduciarias, patrimoniales y de agencia"
  },
  {
    codigo: "64.9",
    descripcion: "Otros servicios financieros, excepto seguros y fondos de pensiones"
  },
  {
    codigo: "64.91",
    descripcion: "Arrendamiento financiero"
  },
  {
    codigo: "64.92",
    descripcion: "Otras actividades crediticias"
  },
  {
    codigo: "64.99",
    descripcion: "Otros servicios financieros, excepto seguros y fondos de pensiones n.c.o.p."
  },
  {
    codigo: 65,
    descripcion: "Seguros, reaseguros y planes de pensiones, excepto seguridad social obligatoria"
  },
  {
    codigo: "65.1",
    descripcion: "Seguros"
  },
  {
    codigo: "65.11",
    descripcion: "Seguros de vida"
  },
  {
    codigo: "65.12",
    descripcion: "Seguros distintos de los seguros de vida"
  },
  {
    codigo: "65.2",
    descripcion: "Reaseguros"
  },
  {
    codigo: "65.20",
    descripcion: "Reaseguros"
  },
  {
    codigo: "65.3",
    descripcion: "Fondos de pensiones"
  },
  {
    codigo: "65.30",
    descripcion: "Fondos de pensiones"
  },
  {
    codigo: 66,
    descripcion: "Actividades auxiliares a los servicios financieros y a los seguros"
  },
  {
    codigo: "66.1",
    descripcion: "Actividades auxiliares a los servicios financieros, excepto seguros y fondos de pensiones"
  },
  {
    codigo: "66.11",
    descripcion: "Administraci\xF3n de mercados financieros"
  },
  {
    codigo: "66.13",
    descripcion: "Actividades de financiaci\xF3n participativa"
  },
  {
    codigo: "66.14",
    descripcion: "Otras actividades de intermediaci\xF3n en operaciones con valores y otros activos"
  },
  {
    codigo: "66.19",
    descripcion: "Otras actividades auxiliares a los servicios financieros, excepto seguros y fondos de pensiones"
  },
  {
    codigo: "66.2",
    descripcion: "Actividades auxiliares a seguros y fondos de pensiones"
  },
  {
    codigo: "66.21",
    descripcion: "Evaluaci\xF3n de riesgos y da\xF1os"
  },
  {
    codigo: "66.22",
    descripcion: "Actividades de agentes y corredores de seguros"
  },
  {
    codigo: "66.29",
    descripcion: "Actividades auxiliares a seguros y fondos de pensiones n.c.o.p."
  },
  {
    codigo: "66.3",
    descripcion: "Actividades de gesti\xF3n de fondos"
  },
  {
    codigo: "66.30",
    descripcion: "Actividades de gesti\xF3n de fondos"
  },
  {
    codigo: "M",
    descripcion: "ACTIVIDADES INMOBILIARIAS"
  },
  {
    codigo: 68,
    descripcion: "Actividades inmobiliarias "
  },
  {
    codigo: "68.1",
    descripcion: "Actividades inmobiliarias por cuenta propia y promoci\xF3n inmobiliaria"
  },
  {
    codigo: "68.11",
    descripcion: "Compraventa de bienes inmobiliarios por cuenta propia"
  },
  {
    codigo: "68.12",
    descripcion: "Promoci\xF3n inmobiliaria"
  },
  {
    codigo: "68.2",
    descripcion: "Alquiler de bienes inmobiliarios por cuenta propia"
  },
  {
    codigo: "68.20",
    descripcion: "Alquiler de bienes inmobiliarios por cuenta propia"
  },
  {
    codigo: "68.3",
    descripcion: "Actividades inmobiliarias por cuenta de terceros"
  },
  {
    codigo: "68.31",
    descripcion: "Servicios de intermediaci\xF3n para actividades inmobiliarias"
  },
  {
    codigo: "68.32",
    descripcion: "Otras actividades inmobiliarias por cuenta de terceros"
  },
  {
    codigo: "N",
    descripcion: "ACTIVIDADES PROFESIONALES, CIENT\xCDFICAS Y T\xC9CNICAS"
  },
  {
    codigo: 69,
    descripcion: "Actividades jur\xEDdicas y de contabilidad"
  },
  {
    codigo: "69.1",
    descripcion: "Actividades jur\xEDdicas"
  },
  {
    codigo: "69.10",
    descripcion: "Actividades jur\xEDdicas"
  },
  {
    codigo: "69.2",
    descripcion: "Actividades de contabilidad, tenedur\xEDa de libros, auditor\xEDa y asesor\xEDa fiscal"
  },
  {
    codigo: "69.20",
    descripcion: "Actividades de contabilidad, tenedur\xEDa de libros, auditor\xEDa y asesor\xEDa fiscal"
  },
  {
    codigo: 70,
    descripcion: "Actividades de las sedes centrales y consultor\xEDa de gesti\xF3n empresarial"
  },
  {
    codigo: "70.1",
    descripcion: "Actividades de las sedes centrales"
  },
  {
    codigo: "70.10",
    descripcion: "Actividades de las sedes centrales"
  },
  {
    codigo: "70.2",
    descripcion: "Otras actividades de consultor\xEDa de gesti\xF3n empresarial"
  },
  {
    codigo: "70.20",
    descripcion: "Otras actividades de consultor\xEDa de gesti\xF3n empresarial"
  },
  {
    codigo: 71,
    descripcion: "Servicios t\xE9cnicos de arquitectura e ingenier\xEDa; ensayos y an\xE1lisis t\xE9cnicos"
  },
  {
    codigo: "71.1",
    descripcion: "Servicios t\xE9cnicos de arquitectura e ingenier\xEDa y otras actividades relacionadas con el asesoramiento t\xE9cnico"
  },
  {
    codigo: "71.11",
    descripcion: "Servicios t\xE9cnicos de arquitectura"
  },
  {
    codigo: "71.12",
    descripcion: "Servicios t\xE9cnicos de ingenier\xEDa y otras actividades relacionadas con el asesoramiento t\xE9cnico"
  },
  {
    codigo: "71.2",
    descripcion: "Ensayos y an\xE1lisis t\xE9cnicos"
  },
  {
    codigo: "71.20",
    descripcion: "Ensayos y an\xE1lisis t\xE9cnicos"
  },
  {
    codigo: 72,
    descripcion: "Investigaci\xF3n y desarrollo"
  },
  {
    codigo: "72.1",
    descripcion: "Investigaci\xF3n y desarrollo experimental en ciencias naturales y t\xE9cnicas"
  },
  {
    codigo: "72.10",
    descripcion: "Investigaci\xF3n y desarrollo experimental en ciencias naturales y t\xE9cnicas"
  },
  {
    codigo: "72.2",
    descripcion: "Investigaci\xF3n y desarrollo experimental en ciencias sociales y humanidades"
  },
  {
    codigo: "72.20",
    descripcion: "Investigaci\xF3n y desarrollo experimental en ciencias sociales y humanidades"
  },
  {
    codigo: 73,
    descripcion: "Actividades de publicidad, estudios de mercado, relaciones p\xFAblicas y comunicaci\xF3n "
  },
  {
    codigo: "73.1",
    descripcion: "Publicidad"
  },
  {
    codigo: "73.11",
    descripcion: "Actividades de las agencias de publicidad"
  },
  {
    codigo: "73.12",
    descripcion: "Servicios de representaci\xF3n de medios de comunicaci\xF3n"
  },
  {
    codigo: "73.2",
    descripcion: "Estudios de mercado y realizaci\xF3n de encuestas de opini\xF3n p\xFAblica"
  },
  {
    codigo: "73.20",
    descripcion: "Estudios de mercado y realizaci\xF3n de encuestas de opini\xF3n p\xFAblica"
  },
  {
    codigo: "73.3",
    descripcion: "Relaciones p\xFAblicas y comunicaci\xF3n"
  },
  {
    codigo: "73.30",
    descripcion: "Relaciones p\xFAblicas y comunicaci\xF3n"
  },
  {
    codigo: 74,
    descripcion: "Otras actividades profesionales, cient\xEDficas y t\xE9cnicas"
  },
  {
    codigo: "74.1",
    descripcion: "Actividades de dise\xF1o especializado"
  },
  {
    codigo: "74.11",
    descripcion: "Actividades de dise\xF1o de productos industriales y moda"
  },
  {
    codigo: "74.12",
    descripcion: "Actividades de dise\xF1o gr\xE1fico y de comunicaci\xF3n visual"
  },
  {
    codigo: "74.13",
    descripcion: "Actividades de dise\xF1o de interiores"
  },
  {
    codigo: "74.14",
    descripcion: "Otras actividades de dise\xF1o especializado"
  },
  {
    codigo: "74.2",
    descripcion: "Actividades de fotograf\xEDa"
  },
  {
    codigo: "74.20",
    descripcion: "Actividades de fotograf\xEDa"
  },
  {
    codigo: "74.3",
    descripcion: "Actividades de traducci\xF3n e interpretaci\xF3n"
  },
  {
    codigo: "74.30",
    descripcion: "Actividades de traducci\xF3n e interpretaci\xF3n"
  },
  {
    codigo: "74.9",
    descripcion: "Otras actividades profesionales, cient\xEDficas y t\xE9cnicas n.c.o.p."
  },
  {
    codigo: "74.91",
    descripcion: "Actividades de los agentes de patentes y de los servicios de marketing"
  },
  {
    codigo: "74.99",
    descripcion: "Todas las dem\xE1s actividades profesionales, cient\xEDficas y t\xE9cnicas n.c.o.p."
  },
  {
    codigo: 75,
    descripcion: "Actividades veterinarias"
  },
  {
    codigo: "75.0",
    descripcion: "Actividades veterinarias"
  },
  {
    codigo: "75.00",
    descripcion: "Actividades veterinarias"
  },
  {
    codigo: "O",
    descripcion: "ACTIVIDADES ADMINISTRATIVAS Y SERVICIOS AUXILIARES"
  },
  {
    codigo: 77,
    descripcion: "Actividades de alquiler"
  },
  {
    codigo: "77.1",
    descripcion: "Alquiler de veh\xEDculos de motor"
  },
  {
    codigo: "77.11",
    descripcion: "Alquiler de autom\xF3viles y veh\xEDculos de motor ligeros"
  },
  {
    codigo: "77.12",
    descripcion: "Alquiler de camiones"
  },
  {
    codigo: "77.2",
    descripcion: "Alquiler de efectos personales y art\xEDculos de uso dom\xE9stico"
  },
  {
    codigo: "77.21",
    descripcion: "Alquiler de art\xEDculos de ocio y deportivos"
  },
  {
    codigo: "77.22",
    descripcion: "Alquiler de efectos personales y art\xEDculos de uso dom\xE9stico"
  },
  {
    codigo: "77.3",
    descripcion: "Alquiler de otra maquinaria, equipos y bienes tangibles"
  },
  {
    codigo: "77.31",
    descripcion: "Alquiler de maquinaria y equipo de uso agr\xEDcola"
  },
  {
    codigo: "77.32",
    descripcion: "Alquiler de maquinaria y equipo para la construcci\xF3n e ingenier\xEDa civil"
  },
  {
    codigo: "77.33",
    descripcion: "Alquiler de maquinaria y equipo de oficina y ordenadores"
  },
  {
    codigo: "77.34",
    descripcion: "Alquiler de medios de navegaci\xF3n"
  },
  {
    codigo: "77.35",
    descripcion: "Alquiler de medios de transporte a\xE9reo"
  },
  {
    codigo: "77.39",
    descripcion: "Alquiler de otra maquinaria, equipos y bienes tangibles n.c.o.p."
  },
  {
    codigo: "77.4",
    descripcion: "Arrendamiento de la propiedad intelectual y productos similares, excepto obras protegidas por derechos de autor"
  },
  {
    codigo: "77.40",
    descripcion: "Arrendamiento de la propiedad intelectual y productos similares, excepto obras protegidas por derechos de autor"
  },
  {
    codigo: "77.5",
    descripcion: "Servicios de intermediaci\xF3n para el alquiler de bienes tangibles y de activos intangibles no financieros"
  },
  {
    codigo: "77.51",
    descripcion: "Servicios de intermediaci\xF3n para el alquiler de autom\xF3viles, autocaravanas y remolques"
  },
  {
    codigo: "77.52",
    descripcion: "Servicios de intermediaci\xF3n para el alquiler de otros bienes tangibles y de activos intangibles no financieros"
  },
  {
    codigo: 78,
    descripcion: "Actividades relacionadas con el empleo"
  },
  {
    codigo: "78.1",
    descripcion: "Actividades de las agencias de colocaci\xF3n"
  },
  {
    codigo: "78.10",
    descripcion: "Actividades de las agencias de colocaci\xF3n"
  },
  {
    codigo: "78.2",
    descripcion: "Actividades de las empresas de trabajo temporal y otra provisi\xF3n de recursos humanos"
  },
  {
    codigo: "78.20",
    descripcion: "Actividades de las empresas de trabajo temporal y otra provisi\xF3n de recursos humanos"
  },
  {
    codigo: 79,
    descripcion: "Actividades de agencias de viajes, operadores tur\xEDsticos, servicios de reservas y actividades relacionadas "
  },
  {
    codigo: "79.1",
    descripcion: "Actividades de agencias de viajes y operadores tur\xEDsticos"
  },
  {
    codigo: "79.11",
    descripcion: "Actividades de las agencias de viajes"
  },
  {
    codigo: "79.12",
    descripcion: "Actividades de los operadores tur\xEDsticos"
  },
  {
    codigo: "79.9",
    descripcion: "Otros servicios de reservas y actividades relacionadas con los mismos"
  },
  {
    codigo: "79.90",
    descripcion: "Otros servicios de reservas y actividades relacionadas con los mismos"
  },
  {
    codigo: 80,
    descripcion: "Servicios de investigaci\xF3n y seguridad"
  },
  {
    codigo: "80.0",
    descripcion: "Servicios de investigaci\xF3n y seguridad"
  },
  {
    codigo: "80.01",
    descripcion: "Servicios de investigaci\xF3n y seguridad privados"
  },
  {
    codigo: "80.09",
    descripcion: "Servicios de seguridad n.c.o.p."
  },
  {
    codigo: 81,
    descripcion: "Servicios a edificios y actividades de jardiner\xEDa"
  },
  {
    codigo: "81.1",
    descripcion: "Servicios integrales a edificios e instalaciones"
  },
  {
    codigo: "81.10",
    descripcion: "Servicios integrales a edificios e instalaciones"
  },
  {
    codigo: "81.2",
    descripcion: "Actividades de limpieza"
  },
  {
    codigo: "81.21",
    descripcion: "Limpieza general de edificios"
  },
  {
    codigo: "81.22",
    descripcion: "Otras actividades de limpieza industrial y de edificios"
  },
  {
    codigo: "81.23",
    descripcion: "Otras actividades de limpieza"
  },
  {
    codigo: "81.3",
    descripcion: "Actividades de jardiner\xEDa"
  },
  {
    codigo: "81.30",
    descripcion: "Actividades de jardiner\xEDa"
  },
  {
    codigo: "82",
    descripcion: "Actividades administrativas de oficina y otras actividades auxiliares a las empresas"
  },
  {
    codigo: "82.1",
    descripcion: "Actividades administrativas y auxiliares de oficina"
  },
  {
    codigo: "82.10",
    descripcion: "Actividades administrativas y auxiliares de oficina"
  },
  {
    codigo: "82.2",
    descripcion: "Actividades de los centros de llamadas"
  },
  {
    codigo: "82.20",
    descripcion: "Actividades de los centros de llamadas"
  },
  {
    codigo: "82.3",
    descripcion: "Organizaci\xF3n de convenciones y ferias de muestras"
  },
  {
    codigo: "82.30",
    descripcion: "Organizaci\xF3n de convenciones y ferias de muestras"
  },
  {
    codigo: "82.4",
    descripcion: "Actividades de intermediaci\xF3n para servicios de apoyo a las empresas n.c.o.p."
  },
  {
    codigo: "82.40",
    descripcion: "Actividades de intermediaci\xF3n para servicios de apoyo a las empresas n.c.o.p."
  },
  {
    codigo: "82.9",
    descripcion: "Otras actividades de apoyo a las empresas n.c.o.p."
  },
  {
    codigo: "82.91",
    descripcion: "Actividades de las agencias de cobros y de las oficinas de cr\xE9dito"
  },
  {
    codigo: "82.92",
    descripcion: "Actividades de envasado y empaquetado"
  },
  {
    codigo: "82.99",
    descripcion: "Otras actividades de apoyo a las empresas n.c.o.p."
  },
  {
    codigo: "P",
    descripcion: "ADMINISTRACI\xD3N P\xDABLICA Y DEFENSA; SEGURIDAD SOCIAL OBLIGATORIA"
  },
  {
    codigo: 84,
    descripcion: "Administraci\xF3n p\xFAblica y defensa; seguridad social obligatoria"
  },
  {
    codigo: "84.1",
    descripcion: "Administraci\xF3n p\xFAblica y de la pol\xEDtica econ\xF3mica, social y medioambiental"
  },
  {
    codigo: "84.11",
    descripcion: "Actividades generales de la administraci\xF3n p\xFAblica"
  },
  {
    codigo: "84.12",
    descripcion: "Regulaci\xF3n de los servicios sanitarios, educativos y culturales y otros servicios sociales"
  },
  {
    codigo: "84.13",
    descripcion: "Regulaci\xF3n de la actividad econ\xF3mica y contribuci\xF3n a su mayor eficiencia"
  },
  {
    codigo: "84.2",
    descripcion: "Prestaci\xF3n de servicios a la comunidad en general"
  },
  {
    codigo: "84.21",
    descripcion: "Asuntos exteriores"
  },
  {
    codigo: "84.22",
    descripcion: "Defensa"
  },
  {
    codigo: "84.23",
    descripcion: "Justicia"
  },
  {
    codigo: "84.24",
    descripcion: "Orden p\xFAblico y seguridad"
  },
  {
    codigo: "84.25",
    descripcion: "Servicios de extinci\xF3n de incendios"
  },
  {
    codigo: "84.3",
    descripcion: "Seguridad social obligatoria"
  },
  {
    codigo: "84.30",
    descripcion: "Seguridad social obligatoria"
  },
  {
    codigo: "Q",
    descripcion: "EDUCACI\xD3N"
  },
  {
    codigo: "85",
    descripcion: "Educaci\xF3n"
  },
  {
    codigo: "85.1",
    descripcion: "Educaci\xF3n preprimaria"
  },
  {
    codigo: "85.10",
    descripcion: "Educaci\xF3n preprimaria"
  },
  {
    codigo: "85.2",
    descripcion: "Educaci\xF3n primaria"
  },
  {
    codigo: "85.20",
    descripcion: "Educaci\xF3n primaria"
  },
  {
    codigo: "85.3",
    descripcion: "Educaci\xF3n secundaria y educaci\xF3n postsecundaria no terciaria"
  },
  {
    codigo: "85.31",
    descripcion: "Educaci\xF3n secundaria general"
  },
  {
    codigo: "85.32",
    descripcion: "Educaci\xF3n secundaria profesional"
  },
  {
    codigo: "85.33",
    descripcion: "Educaci\xF3n postsecundaria no terciaria"
  },
  {
    codigo: "85.4",
    descripcion: "Educaci\xF3n terciaria"
  },
  {
    codigo: "85.41",
    descripcion: "Educaci\xF3n universitaria"
  },
  {
    codigo: "85.42",
    descripcion: "Educaci\xF3n terciaria no universitaria"
  },
  {
    codigo: "85.5",
    descripcion: "Otra educaci\xF3n"
  },
  {
    codigo: "85.51",
    descripcion: "Educaci\xF3n deportiva y recreativa"
  },
  {
    codigo: "85.52",
    descripcion: "Educaci\xF3n cultural"
  },
  {
    codigo: "85.53",
    descripcion: "Actividades de las escuelas de conducci\xF3n y pilotaje"
  },
  {
    codigo: "85.59",
    descripcion: "Otra educaci\xF3n n.c.o.p."
  },
  {
    codigo: "85.6",
    descripcion: "Actividades auxiliares a la educaci\xF3n"
  },
  {
    codigo: "85.61",
    descripcion: "Actividades de servicios de intermediaci\xF3n para cursos y tutores"
  },
  {
    codigo: "85.69",
    descripcion: "Actividades auxiliares a la educaci\xF3n n.c.o.p."
  },
  {
    codigo: "R",
    descripcion: "ACTIVIDADES SANITARIAS Y DE SERVICIOS SOCIALES"
  },
  {
    codigo: "86",
    descripcion: "Actividades sanitarias"
  },
  {
    codigo: "86.1",
    descripcion: "Actividades hospitalarias"
  },
  {
    codigo: "86.10",
    descripcion: "Actividades hospitalarias"
  },
  {
    codigo: "86.2",
    descripcion: "Actividades m\xE9dicas y odontol\xF3gicas"
  },
  {
    codigo: "86.21",
    descripcion: "Actividades de medicina general y de medicina familiar y comunitaria"
  },
  {
    codigo: "86.22",
    descripcion: "Actividades de otras especialidades m\xE9dicas"
  },
  {
    codigo: "86.23",
    descripcion: "Actividades odontol\xF3gicas"
  },
  {
    codigo: "86.9",
    descripcion: "Otras actividades sanitarias"
  },
  {
    codigo: "86.91",
    descripcion: "Servicios de diagn\xF3stico por la imagen y actividades de laboratorio m\xE9dico"
  },
  {
    codigo: "86.92",
    descripcion: "Transporte de pacientes en ambulancia"
  },
  {
    codigo: "86.93",
    descripcion: "Actividades de psic\xF3logos y psicoterapeutas, excepto m\xE9dicos"
  },
  {
    codigo: "86.94",
    descripcion: "Actividades de enfermer\xEDa y enfermer\xEDa obst\xE9trica"
  },
  {
    codigo: "86.95",
    descripcion: "Actividades de fisioterapia"
  },
  {
    codigo: "86.96",
    descripcion: "Actividades de medicina tradicional, complementaria y alternativa"
  },
  {
    codigo: "86.97",
    descripcion: "Actividades de intermediaci\xF3n para servicios m\xE9dicos, odontol\xF3gicos y otros servicios sanitarios"
  },
  {
    codigo: "86.99",
    descripcion: "Otras actividades sanitarias n.c.o.p."
  },
  {
    codigo: "87",
    descripcion: "Asistencia en establecimientos residenciales"
  },
  {
    codigo: "87.1",
    descripcion: "Asistencia en establecimientos residenciales con cuidados sanitarios"
  },
  {
    codigo: "87.10",
    descripcion: "Asistencia en establecimientos residenciales con cuidados sanitarios"
  },
  {
    codigo: "87.2",
    descripcion: "Asistencia en establecimientos residenciales para personas que padecen una enfermedad mental o una drogodependencia o que han recibido un diagn\xF3stico al respecto"
  },
  {
    codigo: "87.20",
    descripcion: "Asistencia en establecimientos residenciales para personas que padecen una enfermedad mental o una drogodependencia o que han recibido un diagn\xF3stico al respecto"
  },
  {
    codigo: "87.3",
    descripcion: "Asistencia en establecimientos residenciales para personas mayores o con discapacidad f\xEDsica"
  },
  {
    codigo: "87.31",
    descripcion: "Asistencia en establecimientos residenciales para personas mayores "
  },
  {
    codigo: "87.32",
    descripcion: "Asistencia en establecimientos residenciales para personas con discapacidad f\xEDsica"
  },
  {
    codigo: "87.9",
    descripcion: "Otras actividades de asistencia en establecimientos residenciales"
  },
  {
    codigo: "87.91",
    descripcion: "Servicios de intermediaci\xF3n para actividades de asistencia en establecimientos residenciales"
  },
  {
    codigo: "87.99",
    descripcion: "Otro tipo de asistencia en establecimientos residenciales n.c.o.p."
  },
  {
    codigo: "88",
    descripcion: "Actividades de servicios sociales sin alojamiento"
  },
  {
    codigo: "88.1",
    descripcion: "Actividades de servicios sociales sin alojamiento para personas mayores o con discapacidad"
  },
  {
    codigo: "88.11",
    descripcion: "Actividades de servicios sociales sin alojamiento para personas mayores "
  },
  {
    codigo: "88.12",
    descripcion: "Actividades de servicios sociales sin alojamiento para personas con discapacidad"
  },
  {
    codigo: "88.9",
    descripcion: "Otras actividades de servicios sociales sin alojamiento"
  },
  {
    codigo: "88.91",
    descripcion: "Actividades de cuidado diurno de ni\xF1os"
  },
  {
    codigo: "88.99",
    descripcion: "Otras actividades de servicios sociales sin alojamiento n.c.o.p."
  },
  {
    codigo: "S",
    descripcion: "ACTIVIDADES ART\xCDSTICAS, DEPORTIVAS Y DE ENTRETENIMIENTO"
  },
  {
    codigo: "90",
    descripcion: "Actividades de creaci\xF3n art\xEDstica y artes esc\xE9nicas"
  },
  {
    codigo: "90.1",
    descripcion: "Actividades de creaci\xF3n art\xEDstica"
  },
  {
    codigo: "90.11",
    descripcion: "Actividades de creaci\xF3n literaria y composici\xF3n musical"
  },
  {
    codigo: "90.12",
    descripcion: "Actividades de creaci\xF3n de artes visuales"
  },
  {
    codigo: "90.13",
    descripcion: "Otras actividades de creaci\xF3n art\xEDstica"
  },
  {
    codigo: "90.2",
    descripcion: "Actividades de artes esc\xE9nicas"
  },
  {
    codigo: "90.20",
    descripcion: "Actividades de artes esc\xE9nicas"
  },
  {
    codigo: "90.3",
    descripcion: "Actividades de apoyo a la creaci\xF3n art\xEDstica y a las artes esc\xE9nicas"
  },
  {
    codigo: "90.31",
    descripcion: "Gesti\xF3n de instalaciones para actividades art\xEDsticas y artes esc\xE9nicas"
  },
  {
    codigo: "90.39",
    descripcion: "Otras actividades de apoyo a la creaci\xF3n art\xEDstica y a las artes esc\xE9nicas"
  },
  {
    codigo: "91",
    descripcion: "Actividades de bibliotecas, archivos, museos y otras actividades culturales"
  },
  {
    codigo: "91.1",
    descripcion: "Actividades de bibliotecas y archivos"
  },
  {
    codigo: "91.11",
    descripcion: "Actividades de bibliotecas"
  },
  {
    codigo: "91.12",
    descripcion: "Actividades de archivos"
  },
  {
    codigo: "91.2",
    descripcion: "Actividades de museos, colecciones de arte, sitios hist\xF3ricos y monumentos"
  },
  {
    codigo: "91.21",
    descripcion: "Actividades de museos y de colecciones "
  },
  {
    codigo: "91.22",
    descripcion: "Actividades de sitios hist\xF3ricos y monumentos"
  },
  {
    codigo: "91.3",
    descripcion: "Conservaci\xF3n, restauraci\xF3n y otras actividades de apoyo al patrimonio cultural"
  },
  {
    codigo: "91.30",
    descripcion: "Conservaci\xF3n, restauraci\xF3n y otras actividades de apoyo al patrimonio cultural"
  },
  {
    codigo: "91.4",
    descripcion: "Actividades de los jardines bot\xE1nicos, parques zool\xF3gicos y reservas naturales"
  },
  {
    codigo: "91.41",
    descripcion: "Actividades de los jardines bot\xE1nicos y los parques zool\xF3gicos "
  },
  {
    codigo: "91.42",
    descripcion: "Actividades de las reservas naturales"
  },
  {
    codigo: "92",
    descripcion: "Actividades de juegos de azar y apuestas"
  },
  {
    codigo: "92.0",
    descripcion: "Actividades de juegos de azar y apuestas"
  },
  {
    codigo: "92.00",
    descripcion: "Actividades de juegos de azar y apuestas"
  },
  {
    codigo: 93,
    descripcion: "Actividades deportivas, recreativas y de entretenimiento"
  },
  {
    codigo: "93.1",
    descripcion: "Actividades deportivas"
  },
  {
    codigo: "93.11",
    descripcion: "Gesti\xF3n de instalaciones deportivas"
  },
  {
    codigo: "93.12",
    descripcion: "Actividades de los clubes deportivos"
  },
  {
    codigo: "93.13",
    descripcion: "Actividades de los centros deportivos"
  },
  {
    codigo: "93.19",
    descripcion: "Actividades deportivas n.c.o.p."
  },
  {
    codigo: "93.2",
    descripcion: "Otras actividades recreativas y de entretenimiento"
  },
  {
    codigo: "93.21",
    descripcion: "Actividades de los parques de atracciones y los parques tem\xE1ticos"
  },
  {
    codigo: "93.29",
    descripcion: "Actividades recreativas y de entretenimiento n.c.o.p."
  },
  {
    codigo: "T",
    descripcion: "OTROS SERVICIOS"
  },
  {
    codigo: "94",
    descripcion: "Actividades asociativas"
  },
  {
    codigo: "94.1",
    descripcion: "Actividades de organizaciones empresariales, profesionales y patronales"
  },
  {
    codigo: "94.11",
    descripcion: "Actividades de organizaciones empresariales y patronales"
  },
  {
    codigo: "94.12",
    descripcion: "Actividades de organizaciones profesionales"
  },
  {
    codigo: "94.2",
    descripcion: "Actividades sindicales"
  },
  {
    codigo: "94.20",
    descripcion: "Actividades sindicales"
  },
  {
    codigo: "94.9",
    descripcion: "Otras actividades asociativas"
  },
  {
    codigo: "94.91",
    descripcion: "Actividades de organizaciones religiosas"
  },
  {
    codigo: "94.92",
    descripcion: "Actividades de organizaciones pol\xEDticas"
  },
  {
    codigo: "94.99",
    descripcion: "Otras actividades asociativas n.c.o.p."
  },
  {
    codigo: 95,
    descripcion: "Reparaci\xF3n y mantenimiento de ordenadores, art\xEDculos personales y enseres dom\xE9sticos y veh\xEDculos de motor y motocicletas"
  },
  {
    codigo: "95.1",
    descripcion: "Reparaci\xF3n y mantenimiento de ordenadores y equipos de comunicaci\xF3n"
  },
  {
    codigo: "95.10",
    descripcion: "Reparaci\xF3n y mantenimiento de ordenadores y equipos de comunicaci\xF3n"
  },
  {
    codigo: "95.2",
    descripcion: "Reparaci\xF3n y mantenimiento de efectos personales y art\xEDculos de uso dom\xE9stico"
  },
  {
    codigo: "95.21",
    descripcion: "Reparaci\xF3n y mantenimiento de aparatos electr\xF3nicos de uso dom\xE9stico"
  },
  {
    codigo: "95.22",
    descripcion: "Reparaci\xF3n y mantenimiento de electrodom\xE9sticos y de equipos para el hogar y el jard\xEDn"
  },
  {
    codigo: "95.23",
    descripcion: "Reparaci\xF3n y mantenimiento de calzado y art\xEDculos de cuero"
  },
  {
    codigo: "95.24",
    descripcion: "Reparaci\xF3n y mantenimiento de muebles y art\xEDculos de menaje"
  },
  {
    codigo: "95.25",
    descripcion: "Reparaci\xF3n y mantenimiento de relojes y joyer\xEDa"
  },
  {
    codigo: "95.29",
    descripcion: "Reparaci\xF3n y mantenimiento de efectos personales y art\xEDculos de uso dom\xE9stico n.c.o.p."
  },
  {
    codigo: "95.3",
    descripcion: "Reparaci\xF3n y mantenimiento de veh\xEDculos de motor y motocicletas"
  },
  {
    codigo: "95.31",
    descripcion: "Reparaci\xF3n y mantenimiento de veh\xEDculos de motor"
  },
  {
    codigo: "95.32",
    descripcion: "Reparaci\xF3n y mantenimiento de motocicletas"
  },
  {
    codigo: "95.4",
    descripcion: "Actividades de intermediaci\xF3n para reparaci\xF3n y mantenimiento de ordenadores, art\xEDculos personales y enseres dom\xE9sticos y veh\xEDculos de motor y motocicletas"
  },
  {
    codigo: "95.40",
    descripcion: "Actividades de intermediaci\xF3n para reparaci\xF3n y mantenimiento de ordenadores, art\xEDculos personales y enseres dom\xE9sticos y veh\xEDculos de motor y motocicletas"
  },
  {
    codigo: "96",
    descripcion: "Servicios personales"
  },
  {
    codigo: "96.1",
    descripcion: "Lavado y limpieza de prendas de tela y de piel"
  },
  {
    codigo: "96.10",
    descripcion: "Lavado y limpieza de prendas de tela y de piel"
  },
  {
    codigo: "96.2",
    descripcion: "Peluquer\xEDa, tratamientos de belleza, spas y actividades similares"
  },
  {
    codigo: "96.21",
    descripcion: "Peluquer\xEDas y barber\xEDas"
  },
  {
    codigo: "96.22",
    descripcion: "Actividades de cuidados de belleza y otras actividades de tratamiento de belleza"
  },
  {
    codigo: "96.23",
    descripcion: "Actividades de spas, saunas y ba\xF1os turcos"
  },
  {
    codigo: "96.3",
    descripcion: "Pompas f\xFAnebres y actividades relacionadas"
  },
  {
    codigo: "96.30",
    descripcion: "Pompas f\xFAnebres y actividades relacionadas"
  },
  {
    codigo: "96.4",
    descripcion: "Actividades de intermediaci\xF3n para servicios personales"
  },
  {
    codigo: "96.40",
    descripcion: "Actividades de intermediaci\xF3n para servicios personales"
  },
  {
    codigo: "96.9",
    descripcion: "Otros servicios personales"
  },
  {
    codigo: "96.91",
    descripcion: "Prestaci\xF3n de servicios personales dom\xE9sticos"
  },
  {
    codigo: "96.99",
    descripcion: "Otros servicios personales n.c.o.p."
  },
  {
    codigo: "U",
    descripcion: "ACTIVIDADES DE LOS HOGARES COMO EMPLEADORES DE PERSONAL DOM\xC9STICO Y COMO PRODUCTORES DE BIENES Y SERVICIOS PARA USO PROPIO"
  },
  {
    codigo: "97",
    descripcion: "Actividades de los hogares como empleadores de personal dom\xE9stico"
  },
  {
    codigo: "97.0",
    descripcion: "Actividades de los hogares como empleadores de personal dom\xE9stico"
  },
  {
    codigo: "97.00",
    descripcion: "Actividades de los hogares como empleadores de personal dom\xE9stico"
  },
  {
    codigo: 98,
    descripcion: "Actividades de los hogares como productores de bienes y servicios para uso propio"
  },
  {
    codigo: "98.1",
    descripcion: "Actividades de los hogares como productores de bienes para uso propio"
  },
  {
    codigo: "98.10",
    descripcion: "Actividades de los hogares como productores de bienes para uso propio"
  },
  {
    codigo: "98.2",
    descripcion: "Actividades de los hogares como productores de servicios para uso propio"
  },
  {
    codigo: "98.20",
    descripcion: "Actividades de los hogares como productores de servicios para uso propio"
  },
  {
    codigo: "V",
    descripcion: "ORGANISMOS EXTRATERRITORIALES"
  },
  {
    codigo: "99",
    descripcion: "Actividades de organizaciones y organismos extraterritoriales"
  },
  {
    codigo: "99.0",
    descripcion: "Actividades de organizaciones y organismos extraterritoriales"
  },
  {
    codigo: "99.00",
    descripcion: "Actividades de organizaciones y organismos extraterritoriales"
  }
];

// app/hooks/useCNAEData.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\hooks\\useCNAEData.ts"
  );
  import.meta.hot.lastModified = "1748616272451.4514";
}
function useCNAEData() {
  const [data, setData] = (0, import_react.useState)([]);
  const [isLoading, setIsLoading] = (0, import_react.useState)(true);
  const [error, setError] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    try {
      if (!cnae_default || !Array.isArray(cnae_default)) {
        throw new Error("El formato de los datos CNAE no es v\xE1lido");
      }
      const formattedData = cnae_default.map((item) => ({
        ...item,
        // Aseguramos tener tanto los campos originales como los que usa el componente
        code: String(item.codigo),
        description: item.descripcion
      }));
      setData(formattedData);
      console.log("Datos CNAE cargados:", formattedData.length);
    } catch (err) {
      console.error("Error al cargar datos CNAE:", err);
      setError(err instanceof Error ? err : new Error("Error desconocido"));
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { data, isLoading, error };
}

// app/components/CNAESelect.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\CNAESelect.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\CNAESelect.tsx"
  );
  import.meta.hot.lastModified = "1748622095550.5076";
}
function CNAESelect({
  onSelect,
  value = "",
  placeholder = "Buscar c\xF3digo CNAE...",
  className = ""
}) {
  _s();
  const {
    data,
    isLoading,
    error
  } = useCNAEData();
  const [inputValue, setInputValue] = (0, import_react2.useState)("");
  const [isOpen, setIsOpen] = (0, import_react2.useState)(false);
  const [filteredOptions, setFilteredOptions] = (0, import_react2.useState)([]);
  const [selectedOption, setSelectedOption] = (0, import_react2.useState)(null);
  const [highlightedIndex, setHighlightedIndex] = (0, import_react2.useState)(-1);
  const inputRef = (0, import_react2.useRef)(null);
  const dropdownRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    if (value && data.length > 0) {
      const option = data.find((opt) => String(opt.codigo) === value || opt.code === value);
      if (option) {
        setSelectedOption(option);
        setInputValue(`${option.codigo} - ${option.descripcion}`);
      }
    } else if (!value) {
      setSelectedOption(null);
      setInputValue("");
    }
  }, [value, data]);
  (0, import_react2.useEffect)(() => {
    if (!inputValue.trim()) {
      setFilteredOptions(data.slice(0, 100));
      return;
    }
    const lowerCaseInput = inputValue.toLowerCase();
    const filtered = data.filter((option) => String(option.codigo).toLowerCase().includes(lowerCaseInput) || option.descripcion.toLowerCase().includes(lowerCaseInput) || `${option.codigo} - ${option.descripcion}`.toLowerCase().includes(lowerCaseInput)).slice(0, 100);
    setFilteredOptions(filtered);
  }, [inputValue, data]);
  (0, import_react2.useEffect)(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  (0, import_react2.useEffect)(() => {
    if (isOpen && data.length > 0 && filteredOptions.length === 0) {
      setFilteredOptions(data.slice(0, 100));
    }
  }, [isOpen, data, filteredOptions]);
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setInputValue(`${option.codigo} - ${option.descripcion}`);
    setIsOpen(false);
    onSelect(option);
  };
  const handleKeyDown = (e) => {
    if (filteredOptions.length === 0)
      return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => prev < filteredOptions.length - 1 ? prev + 1 : 0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => prev > 0 ? prev - 1 : filteredOptions.length - 1);
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectOption(filteredOptions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };
  const handleInputClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (filteredOptions.length === 0) {
        setFilteredOptions(data.slice(0, 100));
      }
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `relative ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { ref: inputRef, type: "text", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white pr-10", placeholder, value: inputValue, onChange: (e) => {
        setInputValue(e.target.value);
        setIsOpen(true);
      }, onFocus: handleInputClick, onClick: handleInputClick, onKeyDown: handleKeyDown, disabled: isLoading }, void 0, false, {
        fileName: "app/components/CNAESelect.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "p-1 text-gray-400 hover:text-gray-600", onClick: () => {
        setIsOpen(!isOpen);
        if (!isOpen && filteredOptions.length === 0) {
          setFilteredOptions(data.slice(0, 100));
        }
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: `w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }, void 0, false, {
        fileName: "app/components/CNAESelect.tsx",
        lineNumber: 149,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/components/CNAESelect.tsx",
        lineNumber: 148,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/CNAESelect.tsx",
        lineNumber: 142,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/CNAESelect.tsx",
        lineNumber: 141,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/CNAESelect.tsx",
      lineNumber: 136,
      columnNumber: 7
    }, this),
    isOpen && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { ref: dropdownRef, className: "absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto", children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-2 text-sm text-blue-600", children: "Cargando opciones CNAE..." }, void 0, false, {
      fileName: "app/components/CNAESelect.tsx",
      lineNumber: 156,
      columnNumber: 24
    }, this) : filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-2 text-sm text-gray-500", children: "No se encontraron resultados" }, void 0, false, {
      fileName: "app/components/CNAESelect.tsx",
      lineNumber: 158,
      columnNumber: 53
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "py-1", children: [
      filteredOptions.map((option, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${highlightedIndex === index ? "bg-blue-50 text-blue-700" : ""}`, onClick: () => handleSelectOption(option), onMouseEnter: () => setHighlightedIndex(index), children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-semibold", children: option.codigo }, void 0, false, {
          fileName: "app/components/CNAESelect.tsx",
          lineNumber: 162,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-1", children: "-" }, void 0, false, {
          fileName: "app/components/CNAESelect.tsx",
          lineNumber: 163,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: option.descripcion }, void 0, false, {
          fileName: "app/components/CNAESelect.tsx",
          lineNumber: 164,
          columnNumber: 19
        }, this)
      ] }, option.codigo, true, {
        fileName: "app/components/CNAESelect.tsx",
        lineNumber: 161,
        columnNumber: 55
      }, this)),
      data.length > 100 && filteredOptions.length === 100 && !inputValue.trim() && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "px-4 py-2 text-xs text-center text-gray-500 italic border-t border-gray-100", children: [
        "Mostrando 100 de ",
        data.length,
        " opciones. Escribe para filtrar m\xE1s resultados."
      ] }, void 0, true, {
        fileName: "app/components/CNAESelect.tsx",
        lineNumber: 166,
        columnNumber: 93
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/CNAESelect.tsx",
      lineNumber: 160,
      columnNumber: 22
    }, this) }, void 0, false, {
      fileName: "app/components/CNAESelect.tsx",
      lineNumber: 155,
      columnNumber: 18
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/CNAESelect.tsx",
    lineNumber: 135,
    columnNumber: 10
  }, this);
}
_s(CNAESelect, "6/s77clQWEWuyN1dy1SFPBfbhik=", false, function() {
  return [useCNAEData];
});
_c = CNAESelect;
var _c;
$RefreshReg$(_c, "CNAESelect");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/hooks/useGeografiaData.ts
var import_react3 = __toESM(require_react());

// app/data/catalunya.json
var catalunya_default = {
  provincias: [
    {
      provincia: "Barcelona",
      comarcas: [
        { comarca: "Alt Pened\xE8s", municipios: ["Avinyonet del Pened\xE8s", "Castellet i la Gornal", "Gelida", "La Granada", "Olesa de Bonesvalls", "Ol\xE8rdola", "Pacs del Pened\xE8s", "Pontons", "Puigd\xE0lber", "Sant Cugat Sesgarrigues", "Sant Lloren\xE7 d'Hortons", "Sant Mart\xED Sarroca", "Sant Pere de Riudebitlles", "Sant Quint\xED de Mediona", "Sant Sadurn\xED d'Anoia", "Santa Fe del Pened\xE8s", "Santa Margarida i els Monjos", "Subirats", "Torrelavit", "Torrelles de Foix", "Vilafranca del Pened\xE8s", "Vilob\xED del Pened\xE8s"] },
        { comarca: "Anoia", municipios: ["Argen\xE7ola", "Bellprat", "Cabrera d'Anoia", "Calaf", "Calonge de Segarra", "Capellades", "Carme", "Castellfollit de Riubreg\xF3s", "Castellol\xED", "Copons", "El Bruc", "Els Hostalets de Pierola", "Igualada", "Jorba", "La Llacuna", "La Pobla de Claramunt", "La Torre de Claramunt", "Masquefa", "Montmaneu", "\xD2dena", "Orp\xED", "Piera", "Prats de Rei, els", "Pujalt", "Rubi\xF3", "Sant Mart\xED de Tous", "Sant Mart\xED Sesgueioles", "Sant Pere Sallavinera", "Santa Margarida de Montbui", "Santa Maria de Miralles", "Vallbona d'Anoia", "Veciana", "Vilanova del Cam\xED"] },
        { comarca: "Bages", municipios: ["Aguilar de Segarra", "Art\xE9s", "Aviny\xF3", "Balsareny", "Calders", "Call\xFAs", "Cardona", "Castellbell i el Vilar", "Castellfollit del Boix", "Castellgal\xED", "Castellnou de Bages", "El Pont de Vilomara i Rocafort", "Fonollosa", "Gai\xE0", "L'Estany", "Manresa", "Marganell", "Moi\xE0", "Monistrol de Calders", "Monistrol de Montserrat", "Mura", "Navarcles", "Nav\xE0s", "Rajadell", "Sallent", "Sant Feliu Sasserra", "Sant Fruit\xF3s de Bages", "Sant Joan de Vilatorrada", "Sant Mateu de Bages", "Sant Salvador de Guardiola", "Sant Vicen\xE7 de Castellet", "Santa Maria d'Ol\xF3", "Santpedor", "S\xFAria", "Talamanca"] },
        { comarca: "Baix Llobregat", municipios: ["Abrera", "Begues", "Castelldefels", "Castellv\xED de Rosanes", "Cervell\xF3", "Collbat\xF3", "Corbera de Llobregat", "Cornell\xE0 de Llobregat", "El Prat de Llobregat", "Esparreguera", "Esplugues de Llobregat", "Gav\xE0", "La Palma de Cervell\xF3", "Martorell", "Molins de Rei", "Olesa de Montserrat", "Pallej\xE0", "Sant Andreu de la Barca", "Sant Boi de Llobregat", "Sant Climent de Llobregat", "Sant Esteve Sesrovires", "Sant Feliu de Llobregat", "Sant Joan Desp\xED", "Sant Just Desvern", "Sant Vicen\xE7 dels Horts", "Santa Coloma de Cervell\xF3", "Torrelles de Llobregat", "Vallirana", "Viladecans"] },
        { comarca: "Barcelon\xE8s", municipios: ["Badalona", "Barcelona", "L'Hospitalet de Llobregat", "Sant Adri\xE0 de Bes\xF2s", "Santa Coloma de Gramenet"] },
        { comarca: "Garraf", municipios: ["Canyelles", "Cubelles", "Olivella", "Sant Pere de Ribes", "Sitges", "Vilanova i la Geltr\xFA"] },
        { comarca: "Maresme", municipios: ["Alella", "Arenys de Mar", "Arenys de Munt", "Argentona", "Cabrera de Mar", "Cabrils", "Caldes d'Estrac", "Calella", "Canet de Mar", "Dosrius", "El Masnou", "Malgrat de Mar", "Matar\xF3", "Montgat", "\xD2rrius", "Palafolls", "Pineda de Mar", "Premi\xE0 de Dalt", "Premi\xE0 de Mar", "Sant Andreu de Llavaneres", "Sant Cebri\xE0 de Vallalta", "Sant Iscle de Vallalta", "Sant Pol de Mar", "Sant Vicen\xE7 de Montalt", "Santa Susanna", "Tei\xE0", "Tiana", "Tordera", "Vilassar de Dalt", "Vilassar de Mar"] },
        { comarca: "Moian\xE8s", municipios: ["Calders", "Castellcir", "Castellter\xE7ol", "Collsuspina", "Granera", "L'Estany", "Moi\xE0", "Monistrol de Calders", "Sant Quirze Safaja", "Santa Maria d'Ol\xF3"] },
        { comarca: "Osona", municipios: ["Alpens", "Baleny\xE0", "Calldetenes", "Centelles", "Collsuspina", "El Brull", "Espinelves", "Folgueroles", "Gurb", "Les Masies de Roda", "Les Masies de Voltreg\xE0", "Llu\xE7\xE0", "Malla", "Manlleu", "Montesquiu", "Muntanyola", "Olost", "Or\xEDs", "Orist\xE0", "Perafita", "Prats de Llu\xE7an\xE8s", "Roda de Ter", "Rupit i Pruit", "Sant Agust\xED de Llu\xE7an\xE8s", "Sant Bartomeu del Grau", "Sant Boi de Llu\xE7an\xE8s", "Sant Hip\xF2lit de Voltreg\xE0", "Sant Juli\xE0 de Vilatorta", "Sant Mart\xED d'Albars", "Sant Mart\xED de Centelles", "Sant Pere de Torell\xF3", "Sant Quirze de Besora", "Sant Sadurn\xED d'Osormort", "Sant Vicen\xE7 de Torell\xF3", "Santa Cec\xEDlia de Voltreg\xE0", "Santa Eug\xE8nia de Berga", "Santa Eul\xE0lia de Riuprimer", "Santa Maria de Besora", "Santa Maria de Corc\xF3", "Seva", "Sobremunt", "Sora", "Taradell", "Tav\xE8rnoles", "Tavertet", "Tona", "Torell\xF3", "Vic", "Vidr\xE0", "Viladrau", "Vilanova de Sau"] },
        { comarca: "Vall\xE8s Occidental", municipios: ["Badia del Vall\xE8s", "Barber\xE0 del Vall\xE8s", "Castellar del Vall\xE8s", "Castellbisbal", "Cerdanyola del Vall\xE8s", "Gallifa", "Matadepera", "Montcada i Reixac", "Palau-solit\xE0 i Plegamans", "Poliny\xE0", "Rellinars", "Ripollet", "Rub\xED", "Sabadell", "Sant Cugat del Vall\xE8s", "Sant Lloren\xE7 Savall", "Sant Quirze del Vall\xE8s", "Santa Perp\xE8tua de Mogoda", "Sentmenat", "Terrassa", "Ullastrell", "Vacarisses", "Viladecavalls"] },
        { comarca: "Vall\xE8s Oriental", municipios: ["Aiguafreda", "Bigues i Riells", "Caldes de Montbui", "Campins", "Canovelles", "C\xE0noves i Samal\xFAs", "Cardedeu", "Figar\xF3-Montmany", "Fogars de Montcl\xFAs", "Granollers", "Gualba", "La Garriga", "La Llagosta", "La Roca del Vall\xE8s", "Les Franqueses del Vall\xE8s", "Lli\xE7\xE0 d'Amunt", "Lli\xE7\xE0 de Vall", "Llinars del Vall\xE8s", "Martorelles", "Mollet del Vall\xE8s", "Montmel\xF3", "Montorn\xE8s del Vall\xE8s", "Montseny", "Parets del Vall\xE8s", "Sant Antoni de Vilamajor", "Sant Celoni", "Sant Esteve de Palautordera", "Sant Feliu de Codines", "Sant Fost de Campsentelles", "Sant Pere de Vilamajor", "Sant Quirze Safaja", "Santa Eul\xE0lia de Ron\xE7ana", "Santa Maria de Martorelles", "Santa Maria de Palautordera", "Tagamanent", "Vallgorguina", "Vallromanes", "Vilalba Sasserra", "Vilanova del Vall\xE8s"] }
      ]
    },
    {
      provincia: "Girona",
      comarcas: [
        { comarca: "Alt Empord\xE0", municipios: ["Agullana", "Albany\xE0", "L'Armentera", "Avinyonet de Puigvent\xF3s", "B\xE0scara", "Biure", "Boadella i les Escaules", "Borrass\xE0", "Cabanelles", "Cabanes", "Cadaqu\xE9s", "Cantallops", "Capmany", "Castell\xF3 d'Emp\xFAries", "Cistella", "Colera", "Darnius", "El Far d'Empord\xE0", "El Port de la Selva", "El Vol\xF3", "Espolla", "Figueres", "Forti\xE0", "Garrig\xE0s", "Garriguella", "La Jonquera", "La Selva de Mar", "La Vajol", "L'Escala", "Llad\xF3", "Llan\xE7\xE0", "Llers", "Ma\xE7anet de Cabrenys", "Masarac", "Mollet de Peralada", "Navata", "Ordis", "Palau de Santa Eul\xE0lia", "Palau-saverdera", "Pau", "Pedret i Marz\xE0", "Peralada", "Pont de Molins", "Pont\xF3s", "Portbou", "Rab\xF3s", "Riumors", "Roses", "Sant Climent Sescebes", "Sant Lloren\xE7 de la Muga", "Sant Miquel de Fluvi\xE0", "Sant Mori", "Sant Pere Pescador", "Santa Llogaia d'\xC0lguema", "Saus, Camallera i Llampaies", "Siurana", "Terrades", "Torroella de Fluvi\xE0", "Ventall\xF3", "Vilabertran", "Viladamat", "Vilafant", "Vilaju\xEFga", "Vilamacolum", "Vilamalla", "Vilamaniscle", "Vilanant", "Vila-sacra"] },
        { comarca: "Baix Empord\xE0", municipios: ["Albons", "Begur", "Bellcaire d'Empord\xE0", "Calonge", "Castell-Platja d'Aro", "Colomers", "Cor\xE7\xE0", "Cru\xEFlles, Monells i Sant Sadurn\xED de l'Heura", "Foix\xE0", "Fontanilles", "Forallac", "Garrigoles", "Gualta", "Jafre", "La Bisbal d'Empord\xE0", "La Pera", "La Tallada d'Empord\xE0", "Mont-ras", "Palafrugell", "Palam\xF3s", "Palau-sator", "Pals", "Parlav\xE0", "Regenc\xF3s", "Rupi\xE0", "Sant Feliu de Gu\xEDxols", "Santa Cristina d'Aro", "Serra de Dar\xF3", "Torrent", "Torroella de Montgr\xED", "Ull\xE0", "Ullastret", "Ultramort", "Vall-llobrega", "Verges", "Vilopriu"] },
        { comarca: "Cerdanya", municipios: ["Alp", "Bellver de Cerdanya", "Bolvir", "Das", "Fontanals de Cerdanya", "Ger", "Guils de Cerdanya", "Is\xF2vol", "Lles de Cerdanya", "Ll\xEDvia", "Meranges", "Montell\xE0 i Martinet", "Prats i Sansor", "Prullans", "Puigcerd\xE0", "Riu de Cerdanya", "Ur\xFAs"] },
        { comarca: "Garrotxa", municipios: ["Argelaguer", "Besal\xFA", "Beuda", "Castellfollit de la Roca", "Les Planes d'Hostoles", "Les Preses", "Mai\xE0 de Montcal", "Mieres", "Montagut i Oix", "Olot", "Riudaura", "Sales de Llierca", "Sant Aniol de Finestres", "Sant Feliu de Pallerols", "Sant Ferriol", "Sant Jaume de Llierca", "Sant Joan les Fonts", "Santa Pau", "Tortell\xE0", "La Vall de Bianya", "La Vall d'en Bas"] },
        { comarca: "Giron\xE8s", municipios: ["Aiguaviva", "Bescan\xF3", "Bordils", "Campllong", "Canet d'Adri", "Cass\xE0 de la Selva", "Celr\xE0", "Cervi\xE0 de Ter", "Fla\xE7\xE0", "Fornells de la Selva", "Girona", "Jui\xE0", "Llagostera", "Llambilles", "Madremanya", "Quart", "Salt", "Sant Andreu Salou", "Sant Gregori", "Sant Joan de Mollet", "Sant Jordi Desvalls", "Sant Juli\xE0 de Ramis", "Sant Mart\xED de Ll\xE9mena", "Sant Mart\xED Vell", "Sarri\xE0 de Ter", "Vilablareix", "Viladasens"] },
        { comarca: "Pla de l'Estany", municipios: ["Banyoles", "Cam\xF3s", "Cornell\xE0 del Terri", "Crespi\xE0", "Esponell\xE0", "Fontcoberta", "Palol de Revardit", "Porqueres", "Sant Miquel de Campmajor", "Seriny\xE0", "Vilademuls"] },
        { comarca: "Ripoll\xE8s", municipios: ["Campdev\xE0nol", "Campelles", "Camprodon", "Gombr\xE8n", "Llanars", "Les Llosses", "Moll\xF3", "Ogassa", "Pardines", "Planoles", "Queralbs", "Ribes de Freser", "Ripoll", "Sant Joan de les Abadesses", "Sant Pau de Seg\xFAries", "Setcases", "Toses", "Vallfogona de Ripoll\xE8s", "Vilallonga de Ter"] },
        { comarca: "Selva", municipios: ["Amer", "Angl\xE8s", "Arb\xFAcies", "Breda", "Brunyola", "Caldes de Malavella", "Cellera de Ter, la", "Fogars de la Selva", "Hostalric", "La Selva de Mar", "Lloret de Mar", "Ma\xE7anet de la Selva", "Massanes", "Osor", "Riells i Viabrea", "Riudarenes", "Riudellots de la Selva", "Sant Feliu de Buixalleu", "Sant Hilari Sacalm", "Sant Juli\xE0 del Llor i Bonmat\xED", "Santa Coloma de Farners", "Sils", "Susqueda", "Tossa de Mar", "Vidreres", "Vilob\xED d'Onyar"] }
      ]
    },
    {
      provincia: "Lleida",
      comarcas: [
        { comarca: "Alt Urgell", municipios: ["Al\xE0s i Cerc", "Ars\xE8guel", "Bassella", "Cab\xF3", "Cava", "Coll de Narg\xF3", "El Pont de Bar", "Estamariu", "F\xEDgols i Aliny\xE0", "Josa i Tuix\xE9n", "La Seu d'Urgell", "La Vansa i F\xF3rnols", "Les Valls d'Aguilar", "Les Valls de Valira", "Montferrer i Castellb\xF2", "Oliana", "Organy\xE0", "Peramola", "Ribera d'Urgellet", "Tuixent"] },
        { comarca: "Alta Ribagor\xE7a", municipios: ["El Pont de Suert", "La Vall de Bo\xED", "Vilaller"] },
        { comarca: "Garrigues", municipios: ["L'Albag\xE9s", "L'Albi", "Arbeca", "Bellaguarda", "Borges Blanques, les", "Bovera", "Castelldans", "Cervi\xE0 de les Garrigues", "Cogul, el", "Espluga Calba, l'", "Floresta, la", "Fulleda", "Granadella, la", "Granyena de les Garrigues", "Juncosa", "Juneda", "Pobla de C\xE9rvoles, la", "Puiggr\xF2s", "Soler\xE0s, el", "Sudanell", "Sunyer", "Tarr\xE9s", "Torms, els", "Vilosell, el", "Vinaixa"] },
        { comarca: "Noguera", municipios: ["\xC0ger", "Albesa", "Algerri", "Al\xF2s de Balaguer", "Artesa de Segre", "Balaguer", "Baronia de Rialb, la", "Bellcaire d'Urgell", "Bellmunt d'Urgell", "Cabanabona", "Camarasa", "Castell\xF3 de Farfanya", "Cubells", "Foradada", "Ivars de Noguera", "La Sentiu de Si\xF3", "Men\xE0rguens", "Montgai", "Oliola", "Os de Balaguer", "Penelles", "Ponts", "Preixens", "T\xE9rmens", "Tiurana", "Torrelameu", "Vallfogona de Balaguer", "Vilanova de l'Aguda", "Vilanova de Mei\xE0"] },
        { comarca: "Pallars Juss\xE0", municipios: ["Abella de la Conca", "Castell de Mur", "Conca de Dalt", "Gavet de la Conca", "Isona i Conca Dell\xE0", "La Pobla de Segur", "La Torre de Cabdella", "Llimiana", "Sal\xE0s de Pallars", "Sant Esteve de la Sarga", "Sarroca de Bellera", "Senterada", "Talarn", "Tremp"] },
        { comarca: "Pallars Sobir\xE0", municipios: ["Alins", "Alt \xC0neu", "Baix Pallars", "Espot", "Esterri d'\xC0neu", "Esterri de Card\xF3s", "Farrera", "La Guingueta d'\xC0neu", "Lladorre", "Llavors\xED", "Rialp", "Soriguera", "Sort", "T\xEDrvia", "Vall de Card\xF3s"] },
        { comarca: "Pla d'Urgell", municipios: ["Barbens", "Bell-lloc d'Urgell", "Bellv\xEDs", "Castellnou de Seana", "El Poal", "Fondarella", "Golm\xE9s", "Ivars d'Urgell", "Linyola", "Miralcamp", "Mollerussa", "Palau d'Anglesola, el", "Sidamon", "Torregrossa", "Vila-sana", "Vilanova de Bellpuig"] },
        { comarca: "Segarra", municipios: ["Biosca", "Cervera", "Estar\xE0s", "Granyanella", "Granyena de Segarra", "Guissona", "Ivorra", "Les Oluges", "Massoteres", "Montoliu de Segarra", "Montorn\xE8s de Segarra", "Plans de Si\xF3, els", "Ribera d'Ondara", "Sana\xFCja", "Sant Guim de Freixenet", "Sant Guim de la Plana", "Sant Ramon", "Talavera", "Tarroja de Segarra", "Tor\xE0", "Torrefeta i Florejacs"] },
        { comarca: "Segri\xE0", municipios: ["Aitona", "Alam\xFAs, els", "Albat\xE0rrec", "Alcan\xF3", "Alcarr\xE0s", "Alcoletge", "Alfarr\xE0s", "Alf\xE9s", "Alguaire", "Almacelles", "Almenar", "Alpicat", "Artesa de Lleida", "Aspa", "Benavent de Segri\xE0", "Corbins", "Gimenells i el Pla de la Font", "Granja d'Escarp, la", "La Portella", "Lleida", "Maials", "Massalcoreig", "Montoliu de Lleida", "Puigverd de Lleida", "Rossell\xF3", "Sarroca de Lleida", "Ser\xF2s", "Soses", "Sudanell", "Sunyer", "Torre-serona", "Torrebesses", "Torrefarrera", "Torres de Segre", "Vilanova de la Barca", "Vilanova de Segri\xE0"] },
        { comarca: "Solson\xE8s", municipios: ["Castellar de la Ribera", "Clariana de Cardener", "Guixers", "La Coma i la Pedra", "La Molsosa", "Lladurs", "Llobera", "Nav\xE8s", "Od\xE8n", "Olius", "Pinell de Solson\xE8s", "Pin\xF3s", "Riner", "Sant Lloren\xE7 de Morunys", "Solsona"] },
        { comarca: "Urgell", municipios: ["Agramunt", "Anglesola", "Belianes", "Bellpuig", "Castellser\xE0", "Ciutadilla", "Fuliola, la", "Guimer\xE0", "Mald\xE0", "Nalec", "Omells de na Gaia, els", "Oss\xF3 de Si\xF3", "Preixana", "Puigverd d'Agramunt", "Sant Mart\xED de Riucorb", "T\xE0rrega", "Tornabous", "Vallbona de les Monges", "Verd\xFA", "Vilagrassa"] },
        { comarca: "Val d'Aran", municipios: ["Arres", "Bausen", "Boss\xF2st", "Canejan", "Es B\xF2rdes", "Les", "Naut Aran", "Vielha e Mijaran", "Vilam\xF2s"] }
      ]
    },
    {
      provincia: "Tarragona",
      comarcas: [
        { comarca: "Alt Camp", municipios: ["Aiguam\xFArcia", "Alcover", "Ali\xF3", "Br\xE0fim", "Cabra del Camp", "El Pla de Santa Maria", "El Pont d'Armentera", "Figuerola del Camp", "Els Garidells", "La Mas\xF3", "La Riba", "Mila, el", "Montferri", "Mont-ral", "Nulles", "Puigpelat", "Querol", "Rodony\xE0", "Rourell, el", "Vallmoll", "Valls", "Vila-rodona", "Vilabella"] },
        { comarca: "Baix Camp", municipios: ["L'Albiol", "L'Aleixar", "Alforja", "Almoster", "Arbol\xED", "L'Argentera", "Les Borges del Camp", "Botarell", "Cambrils", "Capafonts", "Castellvell del Camp", "Colldejou", "Duesaig\xFCes", "La Febr\xF3", "Maspujols", "Montbri\xF3 del Camp", "Mont-roig del Camp", "Prades", "Pratdip", "Reus", "Riudecanyes", "Riudecols", "Riudoms", "La Selva del Camp", "Vandell\xF2s i l'Hospitalet de l'Infant", "Vilanova d'Escornalbou", "Vilaplana", "Vinyols i els Arcs"] },
        { comarca: "Baix Ebre", municipios: ["L'Aldea", "Aldover", "Alfara de Carles", "L'Ametlla de Mar", "L'Ampolla", "Benifallet", "Camarles", "Deltebre", "Pa\xFCls", "El Perell\xF3", "Roquetes", "Tivenys", "Tortosa", "Xerta"] },
        { comarca: "Baix Pened\xE8s", municipios: ["Albinyana", "L'Arbo\xE7", "Banyeres del Pened\xE8s", "Bellvei", "La Bisbal del Pened\xE8s", "Bonastre", "Calafell", "Cunit", "Lloren\xE7 del Pened\xE8s", "Maslloren\xE7", "El Montmell", "Sant Jaume dels Domenys", "Santa Oliva", "El Vendrell"] },
        { comarca: "Conca de Barber\xE0", municipios: ["Barber\xE0 de la Conca", "Blancafort", "Conesa", "L'Espluga de Francol\xED", "For\xE8s", "Llorac", "Montblanc", "Passanant i Belltall", "Les Piles", "Pira", "Pontils", "Rocafort de Queralt", "Santa Coloma de Queralt", "Sarral", "Savall\xE0 del Comtat", "Senan", "Solivella", "Vallclara", "Vallfogona de Riucorb", "Vilanova de Prades", "Vilaverd", "Vimbod\xED i Poblet"] },
        { comarca: "Montsi\xE0", municipios: ["Alcanar", "Amposta", "Freginals", "La Galera", "Godall", "Mas de Barberans", "Masdenverge", "Sant Carles de la R\xE0pita", "Sant Jaume d'Enveja", "Santa B\xE0rbara", "Ulldecona"] },
        { comarca: "Priorat", municipios: ["Bellmunt del Priorat", "La Bisbal de Falset", "Cabac\xE9s", "Cap\xE7anes", "Cornudella de Montsant", "Falset", "La Figuera", "Gratallops", "Els Guiamets", "El Lloar", "Mar\xE7\xE0", "Margalef", "El Masroig", "El Molar", "La Morera de Montsant", "Poboleda", "Porrera", "Pradell de la Teixeta", "La Torre de Fontaubella", "Torroja del Priorat", "Ulldemolins", "La Vilella Alta", "La Vilella Baixa"] },
        { comarca: "Ribera d'Ebre", municipios: ["Asc\xF3", "Benissanet", "Flix", "Garcia", "Ginestar", "Miravet", "M\xF3ra d'Ebre", "M\xF3ra la Nova", "La Palma d'Ebre", "Rasquera", "Riba-roja d'Ebre", "Tivissa", "La Torre de l'Espanyol", "Vinebre"] },
        { comarca: "Tarragon\xE8s", municipios: ["El Catllar", "Constant\xED", "Creixell", "El Morell", "La Nou de Gai\xE0", "La Pobla de Mafumet", "La Pobla de Montorn\xE8s", "Renau", "La Riera de Gai\xE0", "Roda de Ber\xE0", "Salom\xF3", "Salou", "La Secuita", "Tarragona", "Torredembarra", "Vespella de Gai\xE0", "Vila-seca", "Vilallonga del Camp"] },
        { comarca: "Terra Alta", municipios: ["Arnes", "Batea", "Bot", "Caseres", "Corbera d'Ebre", "La Fatarella", "Gandesa", "Horta de Sant Joan", "El Pinell de Brai", "La Pobla de Massaluca", "Prat de Comte", "Vilalba dels Arcs"] }
      ]
    }
  ]
};

// app/hooks/useGeografiaData.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\hooks\\useGeografiaData.ts"
  );
  import.meta.hot.lastModified = "1748614570146.937";
}
function useGeografiaData() {
  const [data, setData] = (0, import_react3.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react3.useState)(true);
  const [error, setError] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
    try {
      if (!catalunya_default || !Array.isArray(catalunya_default.provincias)) {
        throw new Error("El formato de los datos geogr\xE1ficos no es v\xE1lido");
      }
      console.log("Datos geogr\xE1ficos cargados:", {
        provincias: catalunya_default.provincias.length,
        primeraProvinciaComarcas: catalunya_default.provincias[0]?.comarcas?.length || 0
      });
      setData(catalunya_default);
    } catch (err) {
      console.error("Error al cargar datos geogr\xE1ficos:", err);
      setError(err instanceof Error ? err : new Error("Error desconocido"));
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { data, isLoading, error };
}

// app/routes/assignments.filter-panel.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\assignments.filter-panel.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\assignments.filter-panel.tsx"
  );
  import.meta.hot.lastModified = "1748619109212.9084";
}
function FilterPanel({
  onApplyFilters,
  initialFilters = {},
  isLoading = false,
  activeFilterCount = 0
}) {
  _s2();
  const loaderData = useLoaderData();
  const actividades = loaderData?.actividades || [];
  const {
    data: geografiaData,
    isLoading: isLoadingGeografia,
    error: geografiaError
  } = useGeografiaData();
  const {
    isLoading: isLoadingCNAE,
    error: cnaeError
  } = useCNAEData();
  const [filters, setFilters] = (0, import_react4.useState)(initialFilters);
  const [showAdvancedFilters, setShowAdvancedFilters] = (0, import_react4.useState)(false);
  const [selectedProvincia, setSelectedProvincia] = (0, import_react4.useState)(initialFilters.provincia_lead || "");
  const [selectedComarca, setSelectedComarca] = (0, import_react4.useState)(initialFilters.comarca_lead || "");
  const [selectedMunicipio, setSelectedMunicipio] = (0, import_react4.useState)(initialFilters.poblacio_lead || "");
  (0, import_react4.useEffect)(() => {
    console.log("Initial filters changed:", initialFilters);
    setFilters(initialFilters);
    setSelectedProvincia(initialFilters.provincia_lead || "");
    setSelectedComarca(initialFilters.comarca_lead || "");
    setSelectedMunicipio(initialFilters.poblacio_lead || "");
  }, [initialFilters]);
  (0, import_react4.useEffect)(() => {
    console.log("=== FILTER PANEL MOUNTED ===");
    console.log("Geograf\xEDa data cargada:", !!geografiaData);
    if (geografiaData) {
      console.log("N\xFAmero de provincias:", geografiaData.provincias?.length || 0);
      console.log("Provincias disponibles:", geografiaData.provincias?.map((p) => p.provincia));
    }
    console.log("Actividades disponibles:", actividades);
    if (geografiaError) {
      console.error("Error al cargar datos geogr\xE1ficos:", geografiaError);
    }
    if (cnaeError) {
      console.error("Error al cargar datos CNAE:", cnaeError);
    }
  }, [geografiaData, actividades, geografiaError, cnaeError]);
  const availableComarcas = (0, import_react4.useMemo)(() => {
    if (!selectedProvincia || !geografiaData?.provincias) {
      return [];
    }
    const provincia = geografiaData.provincias.find((p) => p.provincia === selectedProvincia);
    console.log("Comarcas para", selectedProvincia, ":", provincia?.comarcas?.length || 0);
    return provincia?.comarcas || [];
  }, [selectedProvincia, geografiaData]);
  const availableMunicipios = (0, import_react4.useMemo)(() => {
    if (!selectedComarca || !availableComarcas.length) {
      return [];
    }
    const comarca = availableComarcas.find((c) => c.comarca === selectedComarca);
    console.log("Municipios para", selectedComarca, ":", comarca?.municipios?.length || 0);
    return comarca?.municipios || [];
  }, [selectedComarca, availableComarcas]);
  const handleFilterChange = (field, value) => {
    console.log(`Filter change: ${field} = ${value}`);
    if (value === "" || value === void 0) {
      const newFilters = {
        ...filters
      };
      delete newFilters[field];
      setFilters(newFilters);
    } else {
      setFilters({
        ...filters,
        [field]: value
      });
    }
  };
  const handleProvinciaChange = (provincia) => {
    console.log("Provincia changed:", provincia);
    setSelectedProvincia(provincia);
    setSelectedComarca("");
    setSelectedMunicipio("");
    const newFilters = {
      ...filters
    };
    if (provincia) {
      newFilters.provincia_lead = provincia;
    } else {
      delete newFilters.provincia_lead;
    }
    delete newFilters.comarca_lead;
    delete newFilters.poblacio_lead;
    setFilters(newFilters);
  };
  const handleComarcaChange = (comarca) => {
    console.log("Comarca changed:", comarca);
    setSelectedComarca(comarca);
    setSelectedMunicipio("");
    const newFilters = {
      ...filters
    };
    if (comarca) {
      newFilters.comarca_lead = comarca;
    } else {
      delete newFilters.comarca_lead;
    }
    delete newFilters.poblacio_lead;
    setFilters(newFilters);
  };
  const handleMunicipioChange = (municipio) => {
    console.log("Municipio changed:", municipio);
    setSelectedMunicipio(municipio);
    const newFilters = {
      ...filters
    };
    if (municipio) {
      newFilters.poblacio_lead = municipio;
    } else {
      delete newFilters.poblacio_lead;
    }
    setFilters(newFilters);
  };
  const handleCNAESelect = (cnae) => {
    console.log("CNAE selected:", cnae);
    handleFilterChange("cnae_lead", String(cnae.codigo));
  };
  const handleApplyFilters = () => {
    console.log("=== APLICANDO FILTROS ===");
    console.log("Filtros actuales:", filters);
    const booleanFields = ["actiu_lead", "cotitza_borsa_lead", "nomes_temporada_lead", "conciencia_ecologica_lead", "solidaria_social_lead"];
    const processedFilters = Object.entries(filters).reduce((result, [key, value]) => {
      if (booleanFields.includes(key) && typeof value === "string") {
        result[key] = value === "true";
      } else {
        result[key] = value;
      }
      return result;
    }, {});
    console.log("Filtros procesados:", processedFilters);
    onApplyFilters(processedFilters);
  };
  const handleClearFilters = () => {
    console.log("Limpiando todos los filtros");
    setFilters({});
    setSelectedProvincia("");
    setSelectedComarca("");
    setSelectedMunicipio("");
    onApplyFilters({});
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "text-base font-medium text-gray-700", children: "Filtrar Leads" }, void 0, false, {
        fileName: "app/routes/assignments.filter-panel.tsx",
        lineNumber: 230,
        columnNumber: 9
      }, this),
      activeFilterCount > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full", children: [
        activeFilterCount,
        " activos"
      ] }, void 0, true, {
        fileName: "app/routes/assignments.filter-panel.tsx",
        lineNumber: 231,
        columnNumber: 35
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.filter-panel.tsx",
      lineNumber: 229,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "space-y-5", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h4", { className: "font-medium text-sm text-gray-700 mb-2", children: "Ubicaci\xF3n" }, void 0, false, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 240,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-1 gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "provincia", className: "block text-xs font-medium text-gray-500 mb-1", children: "Provincia" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 244,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { id: "provincia", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white", value: selectedProvincia, onChange: (e) => handleProvinciaChange(e.target.value), disabled: isLoadingGeografia, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Todas las provincias" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 248,
                columnNumber: 19
              }, this),
              geografiaData?.provincias?.map((provincia) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: provincia.provincia, children: provincia.provincia }, provincia.provincia, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 249,
                columnNumber: 64
              }, this)) || null
            ] }, void 0, true, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 247,
              columnNumber: 17
            }, this),
            isLoadingGeografia && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-xs text-blue-600 mt-1", children: "Cargando provincias..." }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 253,
              columnNumber: 40
            }, this),
            geografiaError && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-xs text-red-600 mt-1", children: "Error al cargar datos geogr\xE1ficos" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 254,
              columnNumber: 36
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 243,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "comarca", className: "block text-xs font-medium text-gray-500 mb-1", children: "Comarca" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 259,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { id: "comarca", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-50 disabled:text-gray-500", value: selectedComarca, onChange: (e) => handleComarcaChange(e.target.value), disabled: !selectedProvincia || isLoadingGeografia, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Todas las comarcas" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 263,
                columnNumber: 19
              }, this),
              availableComarcas.map((comarca) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: comarca.comarca, children: comarca.comarca }, comarca.comarca, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 264,
                columnNumber: 53
              }, this))
            ] }, void 0, true, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 262,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 258,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "municipio", className: "block text-xs font-medium text-gray-500 mb-1", children: "Municipio" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 272,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { id: "municipio", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-50 disabled:text-gray-500", value: selectedMunicipio, onChange: (e) => handleMunicipioChange(e.target.value), disabled: !selectedComarca || isLoadingGeografia, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Todos los municipios" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 276,
                columnNumber: 19
              }, this),
              availableMunicipios.map((municipio) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: municipio, children: municipio }, municipio, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 277,
                columnNumber: 57
              }, this))
            ] }, void 0, true, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 275,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 271,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 241,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.filter-panel.tsx",
        lineNumber: 239,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h4", { className: "font-medium text-sm text-gray-700 mb-2", children: "Informaci\xF3n B\xE1sica" }, void 0, false, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 287,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "mida_lead", className: "block text-xs font-medium text-gray-500 mb-1", children: "Tama\xF1o de empresa" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 291,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { id: "mida_lead", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white", value: filters.mida_lead || "", onChange: (e) => handleFilterChange("mida_lead", e.target.value ? Number(e.target.value) : void 0), children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Cualquier tama\xF1o" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 295,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: 1 /* MICROEMPRESA */, children: formatMidaLead(1 /* MICROEMPRESA */) }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 296,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: 2 /* PEQUEÑA */, children: formatMidaLead(2 /* PEQUEÑA */) }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 297,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: 3 /* MEDIANA */, children: formatMidaLead(3 /* MEDIANA */) }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 298,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: 4 /* GRANDE */, children: formatMidaLead(4 /* GRANDE */) }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 299,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 294,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 290,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "activitat_lead", className: "block text-xs font-medium text-gray-500 mb-1", children: "Actividad" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 305,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { id: "activitat_lead", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white", value: filters.activitat_lead || "", onChange: (e) => handleFilterChange("activitat_lead", e.target.value || void 0), children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Todas las actividades" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 309,
                columnNumber: 19
              }, this),
              actividades?.map((actividad) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: actividad, children: actividad }, actividad, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 310,
                columnNumber: 50
              }, this))
            ] }, void 0, true, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 308,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 304,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "actiu_lead", className: "block text-xs font-medium text-gray-500 mb-1", children: "Estado" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 318,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { id: "actiu_lead", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white", value: filters.actiu_lead === void 0 ? "" : String(filters.actiu_lead), onChange: (e) => {
              const value = e.target.value;
              if (value === "") {
                handleFilterChange("actiu_lead", void 0);
              } else {
                handleFilterChange("actiu_lead", value === "true");
              }
            }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Todos los estados" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 329,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "true", children: "Activos" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 330,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "false", children: "Inactivos" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 331,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 321,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 317,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-xs font-medium text-gray-500 mb-1", children: "C\xF3digo CNAE" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 337,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CNAESelect, { value: filters.cnae_lead, onSelect: handleCNAESelect, placeholder: "Buscar por c\xF3digo o descripci\xF3n..." }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 340,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 336,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 288,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.filter-panel.tsx",
        lineNumber: 286,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { type: "button", className: "flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors", onClick: () => setShowAdvancedFilters(!showAdvancedFilters), children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: `w-4 h-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }, void 0, false, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 348,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 347,
          columnNumber: 13
        }, this),
        showAdvancedFilters ? "Ocultar filtros avanzados" : "Mostrar filtros avanzados"
      ] }, void 0, true, {
        fileName: "app/routes/assignments.filter-panel.tsx",
        lineNumber: 346,
        columnNumber: 11
      }, this),
      showAdvancedFilters && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "space-y-5 pt-2 border-t border-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h4", { className: "font-medium text-sm text-gray-700 mb-2", children: "Datos Temporales" }, void 0, false, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 357,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "any_creacio_lead", className: "block text-xs font-medium text-gray-500 mb-1", children: "A\xF1o de creaci\xF3n" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 361,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "text", id: "any_creacio_lead", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white", value: filters.any_creacio_lead || "", onChange: (e) => handleFilterChange("any_creacio_lead", e.target.value || void 0), placeholder: "Ej: 2020" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 364,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 360,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center h-full pt-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "flex items-center hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500", checked: !!filters.nomes_temporada_lead, onChange: (e) => handleFilterChange("nomes_temporada_lead", e.target.checked || void 0) }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 370,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Solo temporada" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 371,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 369,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 368,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 358,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 356,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h4", { className: "font-medium text-sm text-gray-700 mb-2", children: "Datos Econ\xF3micos" }, void 0, false, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 379,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-xs font-medium text-gray-500 mb-1", children: "Rango de trabajadores" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 383,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "number", id: "nombre_treballadors_lead_min", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white", value: filters.nombre_treballadors_lead_min || "", onChange: (e) => handleFilterChange("nombre_treballadors_lead_min", e.target.value ? Number(e.target.value) : void 0), placeholder: "M\xEDnimo", min: "0" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 387,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "number", id: "nombre_treballadors_lead_max", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white", value: filters.nombre_treballadors_lead_max || "", onChange: (e) => handleFilterChange("nombre_treballadors_lead_max", e.target.value ? Number(e.target.value) : void 0), placeholder: "M\xE1ximo", min: "0" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 388,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 386,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 382,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "mb-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-xs font-medium text-gray-500 mb-1", children: "Capital social (\u20AC)" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 394,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "number", id: "capital_social_lead_min", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white", value: filters.capital_social_lead_min || "", onChange: (e) => handleFilterChange("capital_social_lead_min", e.target.value ? Number(e.target.value) : void 0), placeholder: "M\xEDnimo", min: "0" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 398,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "number", id: "capital_social_lead_max", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white", value: filters.capital_social_lead_max || "", onChange: (e) => handleFilterChange("capital_social_lead_max", e.target.value ? Number(e.target.value) : void 0), placeholder: "M\xE1ximo", min: "0" }, void 0, false, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 399,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 397,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 393,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "flex items-center hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500", checked: !!filters.cotitza_borsa_lead, onChange: (e) => handleFilterChange("cotitza_borsa_lead", e.target.checked || void 0) }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 406,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Cotiza en bolsa" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 407,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 405,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 404,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 378,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h4", { className: "font-medium text-sm text-gray-700 mb-2", children: "Caracter\xEDsticas Adicionales" }, void 0, false, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 414,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "flex items-center hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500", checked: !!filters.conciencia_ecologica_lead, onChange: (e) => handleFilterChange("conciencia_ecologica_lead", e.target.checked || void 0) }, void 0, false, {
                  fileName: "app/routes/assignments.filter-panel.tsx",
                  lineNumber: 419,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Conciencia ecol\xF3gica" }, void 0, false, {
                  fileName: "app/routes/assignments.filter-panel.tsx",
                  lineNumber: 420,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 418,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "flex items-center hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500", checked: !!filters.solidaria_social_lead, onChange: (e) => handleFilterChange("solidaria_social_lead", e.target.checked || void 0) }, void 0, false, {
                  fileName: "app/routes/assignments.filter-panel.tsx",
                  lineNumber: 423,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Solidaria social" }, void 0, false, {
                  fileName: "app/routes/assignments.filter-panel.tsx",
                  lineNumber: 424,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 422,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 417,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "space-y-3", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "importa_exporta_lead", className: "block text-xs font-medium text-gray-500 mb-1", children: "Importa/Exporta" }, void 0, false, {
                  fileName: "app/routes/assignments.filter-panel.tsx",
                  lineNumber: 432,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { id: "importa_exporta_lead", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white", value: filters.importa_exporta_lead || "", onChange: (e) => handleFilterChange("importa_exporta_lead", e.target.value || void 0), children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Cualquiera" }, void 0, false, {
                    fileName: "app/routes/assignments.filter-panel.tsx",
                    lineNumber: 436,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "Importa", children: "Importa" }, void 0, false, {
                    fileName: "app/routes/assignments.filter-panel.tsx",
                    lineNumber: 437,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "Exporta", children: "Exporta" }, void 0, false, {
                    fileName: "app/routes/assignments.filter-panel.tsx",
                    lineNumber: 438,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "Ambos", children: "Ambos" }, void 0, false, {
                    fileName: "app/routes/assignments.filter-panel.tsx",
                    lineNumber: 439,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "Ninguno", children: "Ninguno" }, void 0, false, {
                    fileName: "app/routes/assignments.filter-panel.tsx",
                    lineNumber: 440,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.filter-panel.tsx",
                  lineNumber: 435,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 431,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "idioma_preferent_lead", className: "block text-xs font-medium text-gray-500 mb-1", children: "Idioma preferente" }, void 0, false, {
                  fileName: "app/routes/assignments.filter-panel.tsx",
                  lineNumber: 446,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { id: "idioma_preferent_lead", className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white", value: filters.idioma_preferent_lead || "", onChange: (e) => handleFilterChange("idioma_preferent_lead", e.target.value || void 0), children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Cualquiera" }, void 0, false, {
                    fileName: "app/routes/assignments.filter-panel.tsx",
                    lineNumber: 450,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "Catal\xE1n", children: "Catal\xE1n" }, void 0, false, {
                    fileName: "app/routes/assignments.filter-panel.tsx",
                    lineNumber: 451,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "Castellano", children: "Castellano" }, void 0, false, {
                    fileName: "app/routes/assignments.filter-panel.tsx",
                    lineNumber: 452,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "Ingl\xE9s", children: "Ingl\xE9s" }, void 0, false, {
                    fileName: "app/routes/assignments.filter-panel.tsx",
                    lineNumber: 453,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "Franc\xE9s", children: "Franc\xE9s" }, void 0, false, {
                    fileName: "app/routes/assignments.filter-panel.tsx",
                    lineNumber: 454,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "Alem\xE1n", children: "Alem\xE1n" }, void 0, false, {
                    fileName: "app/routes/assignments.filter-panel.tsx",
                    lineNumber: 455,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.filter-panel.tsx",
                  lineNumber: 449,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.filter-panel.tsx",
                lineNumber: 445,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 429,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 415,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 413,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.filter-panel.tsx",
        lineNumber: 354,
        columnNumber: 35
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex gap-2 mt-6 pt-4 border-t border-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { type: "button", className: "flex-1 px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors", onClick: handleClearFilters, disabled: isLoading, children: "Limpiar" }, void 0, false, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 465,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { type: "button", className: "flex-1 px-3 py-2 text-sm bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm flex justify-center items-center gap-2", onClick: handleApplyFilters, disabled: isLoading, children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "animate-spin h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 471,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, false, {
              fileName: "app/routes/assignments.filter-panel.tsx",
              lineNumber: 472,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 470,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { children: "Aplicando..." }, void 0, false, {
            fileName: "app/routes/assignments.filter-panel.tsx",
            lineNumber: 474,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 469,
          columnNumber: 28
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { children: "Aplicar filtros" }, void 0, false, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 475,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.filter-panel.tsx",
          lineNumber: 468,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.filter-panel.tsx",
        lineNumber: 464,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.filter-panel.tsx",
      lineNumber: 237,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.filter-panel.tsx",
      lineNumber: 236,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/assignments.filter-panel.tsx",
    lineNumber: 227,
    columnNumber: 10
  }, this);
}
_s2(FilterPanel, "V0ezySVzrDj3FtrAw6IYdQcCvQs=", false, function() {
  return [useLoaderData, useGeografiaData, useCNAEData];
});
_c2 = FilterPanel;
var _c2;
$RefreshReg$(_c2, "FilterPanel");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  FilterPanel
};
//# sourceMappingURL=/build/_shared/chunk-DNVXOUNB.js.map
