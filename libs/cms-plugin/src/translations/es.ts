import type { TranslationsObject } from "./types.js";

export const es: TranslationsObject = {
  cmsPlugin: {
    admin: {
      groups: { admin: "Administración", content: "Contenido" },
    },
    apiKeys: {
      labels: {
        plural: "Claves API",
        singular: "Clave API",
      },
      remark: { label: "Comentario" },
      role: {
        label: "Rol",
        options: { cicd: "CI/CD", e2eTests: "E2E Tests", frontend: "Frontend" },
      },
    },
    common: {
      id: "ID",
      loading: "Cargando…",
      usages: {
        label: "Usos",
      },
    },
    fields: {
      description: {
        label: "Descripción",
      },
      elementId: {
        description:
          "Un ID de elemento te permite enlazar a este elemento desde otras partes del sitio. Si el ID es 'about-us', puedes enlazar a él con una URL que termine en '#about-us'.",
        label: "ID de Elemento",
      },
      image: { label: "Imagen" },
      link: {
        doc: { label: "Elige un documento a enlazar" },
        fragment: {
          description:
            "Si se proporciona un fragmento, se añadirá a la URL con un carácter '#'. Úsalo para enlazar a una sección de una página, definida por un 'ID de elemento'.",
          label: "Fragmento",
        },
        label: "Enlace",
        linkType: {
          description:
            "Elige entre ingresar una URL personalizada o enlazar a otro documento.",
          label: "Tipo de enlace",
          options: {
            custom: "URL Personalizada",
            internal: "Enlace interno",
          },
        },
        queryString: {
          description:
            "Si se proporciona una cadena de consulta, se añadirá a la URL con un carácter '?'.",
          label: "Cadena de consulta",
        },
        url: { label: "URL" },
      },
      moreOptions: { label: "Más opciones" },
      richText: { label: "Texto" },
      show: { label: "Mostrar" },
      text: { label: "Texto" },
      textarea: { label: "Texto" },
      usages: {
        label: "Usos",
      },
    },
    globals: {
      common: {
        label: "Común",
        pageNotFoundScreen: {
          description:
            "Esta pantalla se muestra cuando un usuario intenta acceder a una página que no existe.",
          heading: {
            label: "Título",
          },
          label: "Pantalla de Página No Encontrada",
        },
      },
    },
    localeConfigs: {
      deeplSourceLanguage: { label: "Idioma de Origen DeepL" },
      deeplTargetLanguage: { label: "Idioma de Destino DeepL" },
      displayLabel: {
        description:
          "La etiqueta que se mostrará en la aplicación. Este debería ser el nombre en el idioma respectivo para que pueda ser fácilmente reconocido por los hablantes de ese idioma. Por ejemplo, 'English' para inglés, 'Español' para español.",
        label: "Etiqueta de Visualización",
      },
      googleMapsLanguage: { label: "Idioma de Google Maps" },
      labels: {
        plural: "Configuraciones de Idioma",
        singular: "Configuración de Idioma",
      },
      locale: { label: "Idioma" },
    },
    media: {
      alt: {
        description:
          "Una breve descripción del medio para lectores de pantalla y motores de búsqueda. No se muestra en la página pero es importante para la accesibilidad. Para las imágenes se puede generar un texto alternativo automáticamente utilizando OpenAI.",
        label: "Texto Alternativo",
      },
      category: {
        description:
          "Agrega una categoría de medios para encontrar fácilmente este medio. Al seleccionar el medio, puedes filtrar por esta categoría.",
        label: "Categoría",
      },
      comment: {
        description:
          "Agrega un comentario interno para anotar cualquier información importante sobre este medio, por ejemplo, la fuente.",
        label: "Comentario (interno)",
      },
      generate: {
        confirm:
          "Esto enviará la imagen a OpenAI para generar un texto alternativo para el idioma actual.\n\nEl texto alternativo existente será sobrescrito. ¿Desea continuar?",
        failure: "Error al generar el texto alternativo",
        generate: "Generar",
        generating: "Generando…",
        pleaseSaveYourChangesToGenerateAltText:
          "Por favor, guarde sus cambios para generar el texto alternativo.",
        success: "Texto alternativo generado con éxito",
      },
      labels: {
        plural: "Medios",
        singular: "Medio",
      },
    },
    mediaCategories: {
      name: {
        label: "Nombre",
      },
      admin: {
        description:
          "Usa las categorías de medios para organizar tus medios como te sea útil. Al seleccionar medios, puedes filtrar por categoría.",
      },
      labels: {
        plural: "Categorías de medios",
        singular: "Categoría de medios",
      },
      media: {
        label: "Medios",
      },
    },
    translations: {
      autoTranslate: "Auto-traducir",
      autoTranslatedSuccessfully: "Auto-traducido con éxito",
      confirmAutoTranslate:
        "Esto traducirá el texto de {{ sourceLocale }} a los otros idiomas y sobrescribirá las otras traducciones.\n\n¿Desea continuar?",
      currentLocale: "Idioma actual",
      failedToAutoTranslate: "Error al auto-traducir",
      goToTranslation: "Ir a la traducción",
      pleaseSaveYourChangesToEnableAutoTranslate:
        "Por favor, guarde sus cambios para habilitar la traducción.",
      selectLocales: "Seleccionar idiomas",
      selectLocalesDescription:
        "Confirme los idiomas de destino a continuación. El texto se traducirá del idioma actual {{ sourceLocale }} a los idiomas seleccionados. La traducción es proporcionada por el servicio de traducción automática <a>DeepL</a>.",
      selectLocalesNote:
        "<s>Nota:</s> Las traducciones existentes se sobrescribirán.",
      translateToSelectedLocales: "Traducir a los idiomas seleccionados",
      translating: "Traduciendo…",
      translationsButtonLabel: "Traducciones…",
      translationsTitle: "Traducciones",
    },
    usages: {
      name: "Nombre",
      type: "Tipo",
      fieldPath: "Ruta del campo",
      global: "Global",
      noUsages: "No hay usos de este elemento.",
      numberOfUsages_one: "{{ count }} uso",
      numberOfUsages_other: "{{ count }} usos",
    },
    users: {
      labels: {
        plural: "Usuarios",
        singular: "Usuario",
      },
      role: {
        label: "Rol",
        options: {
          admin: "Administrador",
          editor: "Editor",
        },
      },
    },
    validation: {
      mustBeValidUrl: "Debe ser una URL válida",
    },
  },
};
