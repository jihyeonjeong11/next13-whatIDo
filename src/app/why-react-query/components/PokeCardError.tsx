import React from 'react';
import Image from 'next/image';

const PokeCardError = ({ error }: { error: any }) => (
  <article className="card">
    <figure>
      <Image
        width={200}
        height={200}
        src="https://ui.dev/images/courses/pokemon-unknown.png"
        alt="pokemon error"
      />
      <figcaption>
        <h4>Oops.</h4>
        <h6>{error}</h6>
      </figcaption>
    </figure>
  </article>
);

export default PokeCardError;
