import React from 'react';
import { Carousel } from 'react-bootstrap';

const Inicio = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://wallpapers.com/images/featured/4k-oaax18kaapkokaro.webp"
          alt="Primer slide"
        />
        <Carousel.Caption>
          <h3>Bienvenido a mi Proyecto de Comprensión Lectora</h3>
          <p>Aquí puedes encontrar información sobre 
            nuestro proyecto de comprensión lectora. 
            Nos enfocamos en mejorar las habilidades de lectura y 
            comprensión de textos.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://w.forfun.com/fetch/32/32e4ac93987df7dd32f8ef6963fe70be.jpeg?w=1470&r=0.5625"
          alt="Segundo slide"
        />
        <Carousel.Caption>
          <h3>Únete a nuestra iniciativa</h3>
          <p>Nuestro objetivo es ayudarte a desarrollar tus habilidades de 
            lectura para que 
            puedas comprender y analizar textos de manera efectiva.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Inicio;
