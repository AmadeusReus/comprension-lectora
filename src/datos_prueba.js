const nivelesData = [
  {
    id: 1,
    nombre: 'Básico',
    textos: [
      {
        id: 101,
        titulo: 'El Sol: Fuente de Energía',
        contenido: 'El Sol es una estrella que se encuentra en el centro de nuestro sistema solar. Es la fuente principal de energía para la vida en la Tierra y es fundamental para muchos procesos naturales.',
        preguntas: [
          {
            id: 201,
            pregunta: '¿Qué es el Sol?',
            opciones: [
              'Un planeta',
              'Una estrella',
              'Un satélite',
            ],
            respuestaCorrecta: 'Una estrella'
          },
          // ... otras preguntas
        ],
      },
      // ... otros textos básicos
    ],
  },
  {
    id: 2,
    nombre: 'Medio',
    textos: [
      {
        id: 102,
        titulo: 'Photosynthesis: The Vital Process',
        contenido: 'Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that can later be released to fuel the organisms\' activities.',
        preguntas: [
          {
            id: 202,
            pregunta: '¿Qué convierte la fotosíntesis?',
            opciones: [
              'Luz en calor',
              'Luz en energía química',
              'Energía química en luz',
            ],
            respuestaCorrecta: 'Luz en energía química'
          },
          // ... otras preguntas
        ],
      },
      // ... otros textos medios
    ],
  },
  {
    id: 3,
    nombre: 'Avanzado',
    textos: [
      {
        id: 103,
        titulo: 'La Teoría de la Relatividad',
        contenido: 'La teoría de la relatividad, desarrollada por Albert Einstein, revolucionó la manera en que entendemos el tiempo, el espacio y la gravedad. Introduce conceptos como la dilatación del tiempo y la contracción del espacio.',
        preguntas: [
          {
            id: 203,
            pregunta: '¿Quién formuló la teoría de la relatividad?',
            opciones: [
              'Isaac Newton',
              'Nicolas Copérnico',
              'Albert Einstein',
            ],
            respuestaCorrecta: 'Albert Einstein'
          },
          // ... otras preguntas
        ],
      },
      // ... otros textos avanzados
    ],
  },
];

export default nivelesData;
